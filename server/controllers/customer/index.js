const {
  Cart,
  Order,
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

async function PaymentNotifications(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const statusResponse = await snap.transaction.notification(req.body);
    const transactionStatus = statusResponse.transaction_status;
    const transactionId = statusResponse.order_id;

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

          order.orderDetail.forEach((orderDetail) => {
            productStockUpdates.push({
              id: orderDetail.productId,
              stock: orderDetail.quantity,
            });
          });

          await Notification.create(
            {
              type: 'order',
              storeId: order.storeId,
              metadata: { orderNumber: order.orderNumber },
              message: `You have a new paid order to process: Rp${order.totalOrderAmount}`,
            },
            { transaction },
          );
        }),
      );

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
}

async function createNewTransaction(req, res) {
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
        phone: address.phone,
        first_name: address.name,
        shipping_address: address.address,
      },
    };

    const transactionMidtrans = await snap.createTransaction(parameter);

    const paymentDueDate = new Date();

    paymentDueDate.setHours(paymentDueDate.getHours() + 24);

    await newTransaction.update(
      {
        totalAmount,
        amountToPay,
        totalShipmentCost,
        paymentDue: paymentDueDate,
        paymentLink: transactionMidtrans.redirect_url,
      },
      { transaction },
    );
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
}

async function getAllTransactions(req, res) {
  try {
    const userId = req.user.userId;

    const transactions = await Transaction.findAll({
      where: { userId },
    });

    return res.status(200).json({ transactions });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getTransactionDetail(req, res) {
  const userId = req.user.userId;
  const transactionId = req.params.transactionId;
  try {
    const transaction = await Transaction.findOne({
      where: { id: transactionId, userId },
      include: [
        {
          model: Order,
          as: 'order',
          include: ['orderDetail', 'store', 'address'],
        },
      ],
    });

    if (!transaction)
      return res.status(404).json({ message: 'Transaction not found' });

    const transactionDetail = {
      totalAmount: transaction.totalAmount,
      totalShipmentCost: transaction.totalShipmentCost,
      amountToPay: transaction.amountToPay,
      orders: transaction.order.map((order) => ({
        store: order.store.name,
        shipmentCost: order.shipmentCost,
        shipmentAddress: order.address.address,
        products: order.orderDetail.map((product) => ({
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          totalPrice: product.totalPrice,
        })),
      })),
    };

    return res.status(200).json(transactionDetail);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getAllOrders(req, res) {
  const userId = req.user.userId;
  try {
    const rawOrders = await Order.findAll({
      where: { userId },
      include: ['store', 'orderDetail'],
    });

    if (!rawOrders)
      return res.status(200).send({
        message: 'You dont have any orders',
        orders: [],
      });

    const orders = rawOrders.map((order) => {
      return {
        id: order.id,
        transactionId: order.transactionId,
        orderNumber: order.orderNumber,
        totalPrice: order.totalPrice,
        orderStatus: order.orderStatus,
        createdAt: order.createdAt,
        product: order.orderDetail.map(({ quantity, price }) => ({
          quantity,
          price,
        })),
      };
    });
    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getOrderDetail(req, res) {
  const orderId = req.params.orderId;
  try {
    const rawOrder = await Order.findOne({
      where: { id: orderId },
      include: ['orderDetail', 'store', 'shipment'],
    });

    if (!rawOrder) return res.status(404).json({ message: 'Order not found' });

    const orderDetail = {
      store: rawOrder.store.name,
      orderNumber: rawOrder.orderNumber,
      totalPrice: rawOrder.totalPrice,
      shipmentCost: rawOrder.shipmentCost,
      totalAmount: rawOrder.totalOrderAmount,
      products: rawOrder.orderDetail.map((product) => ({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      })),
      shipmentNumber: rawOrder.shipment.shipmentNumber,
      shipmentStatus: rawOrder.shipment.shipmentStatus,
      createdAt: rawOrder.createdAt,
    };

    return res.status(200).json({ orderDetail });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getOrderShipmentDetail(req, res) {
  try {
    const { orderId } = req.params;
    const shipment = await Shipment.findOne({ where: { orderId } });

    return res.status(200).json({ shipment });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getDashboardSummary(req, res) {
  try {
    const userId = req.user.userId;
    const totalTransactions = await Transaction.count({ where: { userId } });
    const totalOrders = await Order.count({ where: { userId } });
    const totalSpending = await Transaction.sum('totalAmount', {
      where: { userId },
    });
    const pendingOrders = await Order.count({
      where: { userId, orderStatus: 'pending' },
    });

    return res.status(200).json({
      totalTransactions,
      totalOrders,
      totalSpending,
      pendingOrders,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getOrderDetail,
  getAllOrders,
  getAllTransactions,
  getTransactionDetail,
  createNewTransaction,
  PaymentNotifications,
  getOrderShipmentDetail,
  getDashboardSummary,
};
