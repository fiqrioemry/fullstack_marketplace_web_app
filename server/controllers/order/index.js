const {
  Cart,
  Order,
  User,
  Address,
  Product,
  sequelize,
  Store,
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
    const transactionStatus = statusResponse.transaction_status;
    console.log('transaction status midtrans :', statusResponse);
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

// customer
const createNewTransaction = async (req, res) => {
  const userId = req.user.userId;
  const { address, orders } = req.body;
  const transaction = await sequelize.transaction();

  try {
    if (!address || orders.length === 0) {
      return res
        .status(400)
        .json({ message: 'Invalid Order information data' });
    }

    const savedAddress = await Address.findOne({
      where: { id: address.id, userId },
      transaction,
    });

    if (!savedAddress) {
      return res.status(400).json({ message: 'Address not found' });
    }

    const newTransaction = await Transaction.create(
      {
        userId,
        totalAmount: 0,
        amountToPay: 0,
        totalShipmentCost: 0,
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
        .json({ message: 'Cart Not Found or Has Been Removed' });
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
          addressId: address.id,
          totalPrice: 0,
          shipmentCost,
          totalOrderAmount: 0,
          orderStatus: 'waiting payment',
          orderNumber: generateOrderNumber(newTransaction.id),
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

        const totalItemPrice = cart.quantity * product.price;
        orderTotalPrice += totalItemPrice;

        orderDetailsToCreate.push({
          orderId: newOrder.id,
          price: product.price,
          productId: product.id,
          quantity: cart.quantity,
          totalPrice: totalItemPrice,
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
        name: `Shipping Cost`,
        quantity: 1,
        price: shipmentCost,
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
        amountToPay,
        totalShipmentCost,
      },
      { transaction },
    );

    await Notification.create({
      userId,
      type: 'order',
      message: 'New Transaction waiting for payment process',
      metadata: { transactionId: newTransaction.id },
    });
    console.log('transaction id :', newTransaction.id);
    const parameter = {
      transaction_details: {
        order_id: newTransaction.id,
        gross_amount: amountToPay,
      },
      item_details: midtransItems,
      customer_details: {
        phone: address.phone,
        first_name: address.name,
        shipping_address: address.address,
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

const getUserTransactions = async (req, res) => {
  const userId = req.user.userId;
  try {
    const transactionData = await Transaction.findAll({
      where: { userId },
      include: [
        { model: Order, as: 'order', include: { model: Store, as: 'store' } },
      ],
    });

    const transactions = transactionData.map((data) => {
      return {
        id: data.id,
        totalAmount: data.totalAmount,
        shipmentCost: data.shipmentCost,
      };
    });
    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// seller
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

const updateOrderStatus = async (req, res) => {
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

    await order.update({ orderStatus }, { transaction });

    if (orderStatus === 'process') {
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

module.exports = {
  createNewTransaction,
  getStoreOrders,
  getUserTransactions,
  updateOrderStatus,
  PaymentNotifications,
};
