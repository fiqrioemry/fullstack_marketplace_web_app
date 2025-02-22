const {
  Cart,
  Order,
  User,
  Address,
  Product,
  sequelize,
  Shipment,
  Transaction,
  OrderDetail,
  Notification,
} = require('../../models');
const snap = require('../../config/midtrans');
const generateOrderNumber = require('../../utils/generateOrderNumber');

const PaymentNotifications = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const statusResponse = await snap.transaction.notification(req.body);
    const transactionId = statusResponse.order_id;
    const transactionStatus = statusResponse.transactionStatus;

    const userTransaction = await Transaction.findOne({
      where: { id: transactionId },
      include: [
        {
          model: Order,
          as: 'order',
          include: [{ model: OrderDetail, as: 'orderDetail' }],
        },
      ],
      transaction,
    });

    if (!userTransaction) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Transaction not found' });
    }

    let message = '';

    if (transactionStatus === 'settlement' || transactionStatus === 'capture') {
      await userTransaction.update({ paymentStatus: 'paid' }, { transaction });
      message = 'Your payment is successful, order will be processed';

      const productStockUpdates = [];

      // Process each order concurrently
      await Promise.all(
        userTransaction.order.map(async (order) => {
          // Update the order status to 'pending'
          await order.update({ orderStatus: 'pending' }, { transaction });

          await Shipment.create(
            {
              orderId: order.id,
              shipmentStatus: 'pending',
            },
            { transaction },
          );

          // Gather product stock updates from each order detail
          order.orderDetail.forEach((orderDetail) => {
            productStockUpdates.push({
              id: orderDetail.productId,
              stock: orderDetail.quantity,
            });
          });

          // Create a notification for the store regarding the new paid order
          await Notification.create(
            {
              storeId: order.storeId,
              type: 'order',
              message: `You have a new paid order to process: Rp${order.totalOrderAmount}`,
              metadata: { orderNumber: order.orderNumber },
            },
            { transaction },
          );
        }),
      );

      // Update product stocks concurrently if there are any stock updates
      if (productStockUpdates.length > 0) {
        await Promise.all(
          productStockUpdates.map((item) =>
            Product.update(
              { stock: sequelize.literal(`stock - ${item.stock}`) },
              { where: { id: item.id }, transaction },
            ),
          ),
        );
      }
    } else if (transactionStatus === 'expire') {
      // Update transaction status to 'expired' and cancel each order
      await userTransaction.update(
        { paymentStatus: 'expired' },
        { transaction },
      );
      message = 'Transaction has expired';

      await Promise.all(
        userTransaction.order.map((order) =>
          order.update({ orderStatus: 'canceled' }, { transaction }),
        ),
      );
    } else if (transactionStatus === 'cancel') {
      // Update transaction status to 'canceled' and cancel shipping for each order
      await userTransaction.update(
        { paymentStatus: 'canceled' },
        { transaction },
      );
      message = 'Transaction has been canceled';

      await Promise.all(
        userTransaction.order.map((order) =>
          order.update({ shippingStatus: 'canceled' }, { transaction }),
        ),
      );
    }

    // Create a notification for the user about the update
    await Notification.create(
      {
        userId: userTransaction.userId,
        type: 'order',
        message,
      },
      { transaction },
    );

    await transaction.commit();
    return res.status(200).json({ message: 'Order status updated' });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ message: error.message });
  }
};

const createNewOrder = async (req, res) => {
  const userId = req.user.userId;
  const { addressId, orders } = req.body;
  const transaction = await sequelize.transaction();

  try {
    if (!addressId || !Array.isArray(orders) || orders.length === 0) {
      return res
        .status(400)
        .json({ message: 'Order information not complete or wrong' });
    }

    const address = await Address.findOne({
      where: { id: addressId, userId },
      transaction,
    });
    if (!address) {
      return res.status(400).json({ message: 'Address not found' });
    }

    const newTransaction = await Transaction.create(
      {
        userId,
        totalAmount: 0,
        totalShipmentCost: 0,
        amountToPay: 0,
        paymentStatus: 'pending',
      },
      { transaction },
    );

    const cartIds = orders.flatMap((order) => order.cartItems);
    const cartItems = await Cart.findAll({
      where: { id: cartIds, userId },
      include: [{ model: Product, as: 'product' }],
      transaction,
    });
    if (!cartItems || cartItems.length === 0) {
      return res
        .status(400)
        .json({ message: 'Cart is empty or items not found' });
    }

    const cartMap = new Map(cartItems.map((cart) => [cart.id, cart]));

    let totalAmount = 0;
    let totalShipmentCost = 0;
    const midtransItems = [];
    const cartIdsToRemove = [];
    const orderDetailsToCreate = [];
    for (const order of orders) {
      const { storeId, shipmentCost, cartItems: orderCartItems } = order;

      if (
        !storeId ||
        shipmentCost == null ||
        !Array.isArray(orderCartItems) ||
        orderCartItems.length === 0
      ) {
        throw new Error('Invalid Store ID, Shipping Cost, or CartItems');
      }

      const newOrder = await Order.create(
        {
          userId,
          transactionId: newTransaction.id,
          storeId,
          addressId,
          orderNumber: generateOrderNumber(newTransaction.id),
          totalPrice: 0,
          shipmentCost,
          totalOrderAmount: 0,
          orderStatus: 'waiting payment',
        },
        { transaction },
      );

      let orderTotalPrice = 0;

      for (const cartId of orderCartItems) {
        const cart = cartMap.get(cartId);
        if (!cart || !cart.product) {
          throw new Error(
            `Cart item not found or already removed. Cart ID: ${cartId}`,
          );
        }

        const product = cart.product;
        if (product.stock < cart.quantity) {
          throw new Error(`Insufficient stock for product ${product.name}`);
        }

        const itemTotalPrice = cart.quantity * product.price;
        orderTotalPrice += itemTotalPrice;

        // Tambahkan data order detail ke array untuk bulkCreate
        orderDetailsToCreate.push({
          orderId: newOrder.id,
          productId: product.id,
          quantity: cart.quantity,
          price: product.price,
          totalPrice: itemTotalPrice,
        });

        midtransItems.push({
          id: `PRODUCT-${product.id}`,
          price: product.price,
          quantity: cart.quantity,
          name: product.name.substring(0, 50),
        });

        cartIdsToRemove.push(cart.id);
      }

      midtransItems.push({
        id: `SHIPPING-${newOrder.orderNumber}`,
        price: shipmentCost,
        quantity: 1,
        name: `Shipping Cost`,
      });

      const totalOrderAmount = orderTotalPrice + shipmentCost;
      totalAmount += orderTotalPrice;
      totalShipmentCost += shipmentCost;

      await newOrder.update(
        { totalPrice: orderTotalPrice, totalOrderAmount },
        { transaction },
      );
    }

    if (orderDetailsToCreate.length > 0) {
      await OrderDetail.bulkCreate(orderDetailsToCreate, { transaction });
    }

    // Hapus cart items yang sudah dipesan
    if (cartIdsToRemove.length > 0) {
      await Cart.destroy({
        where: { id: cartIdsToRemove },
        transaction,
      });
    }

    const amountToPay = totalAmount + totalShipmentCost;

    await newTransaction.update(
      {
        totalAmount,
        totalShipmentCost,
        amountToPay,
      },
      { transaction },
    );

    await Notification.create({
      userId,
      type: 'order',
      message: 'New Transaction waiting for payment process',
      metadata: { transactionId: newTransaction.id },
    });

    const parameter = {
      transaction_details: {
        order_id: newTransaction.id,
        gross_amount: amountToPay,
      },
      item_details: midtransItems,
      customer_details: {
        first_name: address.name,
        shipping_address: address.address,
        phone: address.phone,
      },
    };

    const transactionMidtrans = await snap.createTransaction(parameter);

    await transaction.commit();

    return res.status(201).json({
      message: 'New Order is created',
      transaction: newTransaction,
      transactionToken: transactionMidtrans.token,
      transactionUrl: transactionMidtrans.redirect_url,
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ message: error.message });
  }
};

const getStoreOrders = async (req, res) => {
  const storeId = req.user.storeId;
  try {
    if (!storeId) {
      return res.status(400).json({ message: 'Unauthorized Access' });
    }

    const orders = await Order.findAll({
      where: {
        storeId,
        orderStatus: 'pending',
      },
      include: [
        {
          model: Shipment,
          attributes: ['shipmentStatus', 'shipmentNumber'],
        },
      ],
    });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateStoreOrder = async (req, res) => {
  const orderId = req.params.orderId;
  const { orderStatus, shipmentNumber } = req.body;

  const transaction = await sequelize.transaction();
  try {
    if (!['process', 'canceled'].includes(orderStatus)) {
      return res.status(400).json({ message: 'Invalid order status.' });
    }

    if (orderStatus === 'process' && !shipmentNumber) {
      return res.status(400).json({
        message: 'Shipment number is required to process order.',
      });
    }

    const order = await Order.findByPk(orderId, { transaction });
    if (!order) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Order not found.' });
    }

    // Update status order
    await order.update({ orderStatus }, { transaction });

    if (orderStatus === 'process') {
      // Insert or update shipment data
      await Shipment.upsert(
        {
          orderId: order.id,
          shipmentStatus: 'shipped',
          shipmentNumber,
        },
        { transaction },
      );

      await Notification.create(
        {
          userId: order.userId,
          type: 'order',
          message: `Your order has been processed for shipment.`,
          metadata: { orderNumber: order.orderNumber },
        },
        { transaction },
      );
    } else {
      await User.increment(
        { balance: order.totalOrderAmount },
        { where: { id: order.userId }, transaction },
      );

      await Notification.create(
        {
          userId: order.userId,
          type: 'order',
          message: `Your order has been canceled. A refund of ${order.totalOrderAmount} has been issued.`,
          metadata: { orderNumber: order.orderNumber },
        },
        { transaction },
      );
    }

    await transaction.commit();
    return res.status(200).json({ message: 'Order updated successfully.' });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ message: error.message });
  }
};

const getUserOrders = async (req, res) => {
  const userId = req.user.userId;
  try {
    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderDetail,
          as: 'orderDetail',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['name', 'price', 'stock'],
            },
          ],
        },
        {
          model: Address,
          as: 'address',
          attributes: ['address', 'city', 'province', 'district', 'zipcode'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNewOrder,
  getStoreOrders,
  getUserOrders,
  updateStoreOrder,
  PaymentNotifications,
};
