const {
  Cart,
  Order,
  Address,
  Product,
  sequelize,
  Notification,
  Transaction,
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
    let orderId = statusResponse.order_id;
    let transactionStatus = statusResponse.transaction_status;

    const masterOrder = await Order.findOne({
      where: { orderNumber: orderId },
      include: [{ model: OrderStore, as: 'orderStores' }],
      transaction,
    });

    if (!masterOrder) {
      return res.status(404).json({ message: 'Order Not Found' });
    }

    let message = '';

    if (transactionStatus === 'settlement' || transactionStatus === 'capture') {
      await masterOrder.update({ orderStatus: 'paid' }, { transaction });
      message = 'Your Payment is Successful';

      for (const orderStore of masterOrder.orderStores) {
        await orderStore.update({ shippingStatus: 'pending' }, { transaction });

        await Notification.create(
          {
            userId: orderStore.storeId,
            type: 'order',
            message: `You have a new paid order: Rp${orderStore.amountToPay}`,
            metadata: { orderNumber: masterOrder.orderNumber },
          },
          { transaction },
        );
      }
    } else if (transactionStatus === 'expire') {
      await masterOrder.update({ orderStatus: 'expired' }, { transaction });
      message = 'Your Payment has Expired';

      for (const orderStore of masterOrder.orderStores) {
        await orderStore.update(
          { shippingStatus: 'canceled' },
          { transaction },
        );
      }
    } else if (transactionStatus === 'cancel') {
      await masterOrder.update({ orderStatus: 'canceled' }, { transaction });
      message = 'Your Order has been Canceled';

      for (const orderStore of masterOrder.orderStores) {
        await orderStore.update(
          { shippingStatus: 'canceled' },
          { transaction },
        );
      }
    }

    // 🔹 Gunakan `message` dalam Notifikasi Buyer
    await Notification.create(
      {
        userId: masterOrder.userId,
        type: 'order',
        message: message, // ✅ Sekarang digunakan!
        metadata: { orderNumber: masterOrder.orderNumber },
      },
      { transaction },
    );

    await transaction.commit();
    return res.status(200).json({ message: 'Order status updated' });
  } catch (error) {
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

    const newTransaction = await Transaction.create(
      {
        userId,
        totalPrice: 0, // will be updated later
        amountToPay: 0, // will be updated later
        totalShipmentCost: 0,
        paymentStatus: 'pending',
      },
      { transaction },
    );

    for (const order of orders) {
      const { storeId, shipmentCost, products } = order;

      if (
        !storeId ||
        shipmentCost == null ||
        !Array.isArray(products) ||
        products.length === 0
      ) {
        return res
          .status(400)
          .json({ message: 'Invalid Store ID, Shipping Cost, or Products' });
      }

      // masing2 seller/store memiliki order berbeda
      const newOrder = await Order.create(
        {
          userId,
          transactionId: newTransaction.id,
          storeId,
          addressId,
          orderNumer: `INV/${transaction.id}/${Date.now}`,
          totalPrice: 0,
          shipmentCost,
          totalAmount: 0, // totalPrice + shipmentCost
          orderStatus: 'waiting payment',
        },
        { transaction },
      );

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

        await OrderDetail.create(
          {
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            price: product.price,
            // total price function is defined already in model
          },
          { transaction },
        );

        // NOTE : product stock will be updated later after payment status is paid

        cartIdsToRemove.push(item.cartId);
      }

      const amountToPay = totalAmount + shippingCost;
      totalGrossAmount += amountToPay;

      await newOrder.update({ totalAmount }, { transaction });
    }

    if (cartIdsToRemove.length > 0) {
      await Cart.destroy({
        where: { id: { [Op.in]: cartIdsToRemove } },
        transaction,
      });
    }

    let parameter = {
      transaction_details: {
        order_id: newTransaction.id,
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
      message: 'New Order is created',
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
