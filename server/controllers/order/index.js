const {
  Cart,
  Order,
  Address,
  Product,
  sequelize,
  Notification,
  OrderDetail,
} = require('../../models');
require('dotenv').config();
const { Op } = require('sequelize');
const midtransClient = require('midtrans-client');

// Midtrans Configuration
let snap = new midtransClient.Snap({
  isProduction: process.env.NODE_ENV === 'production',
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

const PaymentNotifications = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const statusResponse = await snap.transaction.notification(req.body);
    console.log(
      'ORDER MASUK ORDER MASUK ORDER MASUK ORDER MASUK ORDER MASUK ORDER MASUK ORDER MASUK ORDER MASUK ',
    );
    console.log(statusResponse);
    let orderId = statusResponse.order_id;
    let transactionStatus = statusResponse.transaction_status;

    const order = await Order.findOne({
      where: { orderNumber: orderId },
      transaction,
    });

    if (!order) {
      return res.status(404).json({ message: 'Order Not Found' });
    }

    let message = '';

    if (transactionStatus === 'settlement' || transactionStatus === 'capture') {
      await order.update(
        { orderStatus: 'paid', shippingStatus: 'pending' },
        { transaction },
      );
      message = 'Your Payment is Successful';

      // Notifikasi untuk Seller
      await Notification.create(
        {
          userId: order.storeId,
          type: 'order',
          message: 'You have a new order to process.',
          metadata: { orderNumber: order.orderNumber },
        },
        { transaction },
      );
    } else if (transactionStatus === 'expire') {
      await order.update(
        { orderStatus: 'expired', shippingStatus: 'canceled' },
        { transaction },
      );
      message = 'Your Payment has Expired';

      const orderDetails = await OrderDetail.findAll({
        where: { orderId: order.id },
        transaction,
      });

      for (const item of orderDetails) {
        await Product.increment('stock', {
          by: item.quantity,
          where: { id: item.productId },
          transaction,
        });
      }
    } else if (transactionStatus === 'cancel') {
      await order.update(
        { orderStatus: 'canceled', shippingStatus: 'canceled' },
        { transaction },
      );
      message = 'Your Order has been Canceled';
      const orderDetails = await OrderDetail.findAll({
        where: { orderId: order.id },
        transaction,
      });

      for (const item of orderDetails) {
        await Product.increment('stock', {
          by: item.quantity,
          where: { id: item.productId },
          transaction,
        });
      }
    }

    // Notifikasi untuk Buyer
    await Notification.create(
      {
        userId: order.userId,
        type: 'order',
        message,
        metadata: { orderNumber: order.orderNumber },
      },
      { transaction },
    );

    await transaction.commit();
    return res.status(200).json({ message: 'Order status updated' });
  } catch (error) {
    console.error('Error processing webhook:', error.message);
    await transaction.rollback();
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};

const createNewOrder = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { userId } = req.user;
    const { addressId, orders } = req.body;

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

    let cartIdsToRemove = [];
    let totalGrossAmount = 0;
    let midtransItems = [];

    // 1️⃣ Buat Master Order (Satu orderNumber untuk transaksi Midtrans)
    const masterOrder = await Order.create(
      {
        userId,
        orderNumber: `ORDER-${userId}-${Date.now()}`,
        addressId,
        totalAmount: 0,
        shippingCost: 0,
        amountToPay: 0,
        shippingNumber: null,
      },
      { transaction },
    );

    let orderStores = []; // Menyimpan order untuk setiap seller

    for (const orderData of orders) {
      const { storeId, shippingCost, products } = orderData;
      let totalAmount = 0;

      if (
        !storeId ||
        shippingCost == null ||
        !Array.isArray(products) ||
        products.length === 0
      ) {
        return res
          .status(400)
          .json({ message: 'Invalid Store ID, Shipping Cost, or Products' });
      }

      // 2️⃣ Buat Order Store (Satu order untuk tiap seller)
      const orderStore = await OrderStore.create(
        {
          orderId: masterOrder.id, // Hubungkan ke Master Order
          storeId,
          totalAmount: 0,
          shippingCost,
          amountToPay: 0,
          shippingStatus: 'waiting payment',
        },
        { transaction },
      );

      orderStores.push(orderStore);

      for (const item of products) {
        if (!item.productId || !item.quantity) {
          await transaction.rollback();
          return res.status(400).json({ message: 'Product data is not valid' });
        }

        const product = await Product.findOne({
          where: { id: item.productId },
          transaction,
        });

        if (!product || product.stock < item.quantity) {
          await transaction.rollback();
          return res
            .status(400)
            .json({ message: `Insufficient product stock` });
        }

        const totalPrice = item.quantity * product.price;
        totalAmount += totalPrice;

        // 3️⃣ Buat Order Detail (Detail pesanan dalam tiap OrderStore)
        await OrderDetail.create(
          {
            orderStoreId: orderStore.id, // Hubungkan ke OrderStore
            productId: item.productId,
            quantity: item.quantity,
            price: product.price,
            totalPrice,
          },
          { transaction },
        );

        await Product.update(
          { stock: product.stock - item.quantity },
          { where: { id: item.productId }, transaction },
        );

        cartIdsToRemove.push(item.cartId);

        midtransItems.push({
          id: `PRODUCT-${product.id}`,
          price: product.price,
          quantity: item.quantity,
          name: product.name.substring(0, 50),
        });
      }

      midtransItems.push({
        id: `SHIPPING-${orderStore.id}`,
        price: shippingCost,
        quantity: 1,
        name: `Shipping Cost for Store ${storeId}`,
      });

      const amountToPay = totalAmount + shippingCost;
      totalGrossAmount += amountToPay;

      await orderStore.update({ totalAmount, amountToPay }, { transaction });
    }

    if (cartIdsToRemove.length > 0) {
      await Cart.destroy({
        where: { id: { [Op.in]: cartIdsToRemove } },
        transaction,
      });
    }

    // 4️⃣ Midtrans hanya menggunakan Master Order
    let parameter = {
      transaction_details: {
        order_id: masterOrder.orderNumber, // Menggunakan Master Order
        gross_amount: totalGrossAmount,
      },
      item_details: midtransItems,
      customer_details: {
        user_id: userId,
        shipping_address: address.address,
      },
    };

    const transactionMidtrans = await snap.createTransaction(parameter);

    await transaction.commit();

    return res.status(201).json({
      message: 'Order is created',
      orders: orderStores,
      transactionToken: transactionMidtrans.token,
      transactionUrl: transactionMidtrans.redirect_url,
    });
  } catch (error) {
    await transaction.rollback();
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};

// get all orders for store / seller
const getStoreOrders = async (req, res) => {
  const { storeId } = req.user;
  try {
    const orders = await Order.findAll({
      where: { storeId },
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

    return res.status(200).json({
      data: orders,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};

// get all order for user

const getUserOrders = async (req, res) => {
  const { userId } = req.user;
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

    return res.status(200).json({
      data: orders,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = {
  createNewOrder,
  PaymentNotifications,
  getStoreOrders,
  getUserOrders,
};
