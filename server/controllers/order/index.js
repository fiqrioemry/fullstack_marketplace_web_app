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
    let transactionId = statusResponse.order_id;
    let transactionStatus = statusResponse.transaction_status;

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
      return res.status(404).json({ message: 'Transaction not found' });
    }

    let message = '';

    if (transactionStatus === 'settlement' || transactionStatus === 'capture') {
      // 1️⃣ Update status pembayaran menjadi 'paid'
      await userTransaction.update({ paymentStatus: 'paid' }, { transaction });
      message = 'Your payment is successful, order will be processed';

      let productStockUpdates = [];

      for (const order of userTransaction.order) {
        await order.update({ orderStatus: 'pending' }, { transaction });

        // 2️⃣ Ambil productId dan kurangi stok
        for (const orderDetail of order.orderDetail) {
          productStockUpdates.push({
            id: orderDetail.productId,
            stock: orderDetail.quantity, // Simpan quantity untuk update nanti
          });
        }

        await Notification.create(
          {
            storeId: order.storeId,
            type: 'order',
            message: `You have a new paid order to process: Rp${order.totalOrderAmount}`,
            metadata: { orderNumber: order.orderNumber },
          },
          { transaction },
        );
      }

      // 3️⃣ Update stok produk dengan metode lebih aman
      if (productStockUpdates.length > 0) {
        await Promise.all(
          productStockUpdates.map(async (item) => {
            await Product.update(
              { stock: sequelize.literal(`stock - ${item.stock}`) }, // Kurangi stok
              { where: { id: item.id }, transaction },
            );
          }),
        );
      }
    } else if (transactionStatus === 'expire') {
      await userTransaction.update(
        { paymentStatus: 'expired' },
        { transaction },
      );
      message = 'Transaction has expired';

      for (const order of userTransaction.order) {
        await order.update({ orderStatus: 'canceled' }, { transaction });
      }
    } else if (transactionStatus === 'cancel') {
      await userTransaction.update(
        { paymentStatus: 'canceled' },
        { transaction },
      );
      message = 'Transaction has been canceled';

      for (const order of userTransaction.order) {
        await order.update({ shippingStatus: 'canceled' }, { transaction });
      }
    }

    // 4️⃣ Buat notifikasi untuk user
    await Notification.create(
      {
        userId: userTransaction.userId,
        type: 'order',
        message: message,
      },
      { transaction },
    );

    await transaction.commit();
    return res.status(200).json({ message: 'Order status updated' });
  } catch (error) {
    await transaction.rollback();
    console.error('Error updating payment status:', error);
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

    // Cek apakah alamat ada
    const address = await Address.findOne({
      where: { id: addressId, userId },
      transaction,
    });

    if (!address) {
      return res.status(400).json({ message: 'Address not found' });
    }

    // Buat transaksi baru
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

    let totalAmount = 0;
    let totalShipmentCost = 0;
    let midtransItems = [];
    let cartIdsToRemove = [];

    // Ambil semua cartItems dalam satu query
    const cartIds = orders.flatMap((order) => order.cartItems);
    const cartItems = await Cart.findAll({
      where: {
        id: cartIds,
        userId, // Pastikan hanya mengambil cart milik user yang login
      },
      include: [{ model: Product, as: 'product' }],
      transaction,
    });

    // **Perbaikan: Cek apakah cart ditemukan**
    if (!cartItems || cartItems.length === 0) {
      return res
        .status(400)
        .json({ message: 'Cart is empty or items not found' });
    }

    // Buat map dari cartId ke data cart
    const cartMap = new Map(cartItems.map((cart) => [cart.id, cart]));

    // Iterasi setiap order
    const orderPromises = orders.map(async (order) => {
      const { storeId, shipmentCost, cartItems } = order;
      let totalPrice = 0;

      if (
        !storeId ||
        shipmentCost == null ||
        !Array.isArray(cartItems) ||
        cartItems.length === 0
      ) {
        throw new Error('Invalid Store ID, Shipping Cost, or CartItems');
      }

      // Buat pesanan baru
      const newOrder = await Order.create(
        {
          userId,
          transactionId: newTransaction.id,
          storeId,
          addressId,
          orderNumber: `INV/${newTransaction.id}/${Date.now()}`,
          totalPrice: 0,
          shipmentCost,
          totalOrderAmount: 0,
          orderStatus: 'waiting payment',
        },
        { transaction },
      );

      // Iterasi setiap item dalam cart
      const orderDetails = cartItems.map(async (cartId) => {
        const cart = cartMap.get(cartId);

        // **Perbaikan: Cek apakah cart dan produknya ada**
        if (!cart || !cart.product) {
          console.error(
            `Cart ID ${cartId} not found or no product associated.`,
          );
          return res.status(400).json({
            message: `Cart item not found or already removed`,
            cartId,
          });
        }

        const product = cart.product;

        if (product.stock < cart.quantity) {
          throw new Error(`Insufficient stock for product ${product.name}`);
        }

        // Buat detail order
        await OrderDetail.create(
          {
            orderId: newOrder.id,
            productId: product.id,
            quantity: cart.quantity,
            price: product.price,
            totalPrice: cart.quantity * product.price,
          },
          { transaction },
        );

        totalAmount += product.price * cart.quantity;

        // Tambahkan ke daftar pembayaran Midtrans
        midtransItems.push({
          id: `PRODUCT-${product.id}`,
          price: product.price,
          quantity: cart.quantity,
          name: product.name.substring(0, 50),
        });

        cartIdsToRemove.push(cart.id);
      });

      await Promise.all(orderDetails);

      // Tambahkan biaya pengiriman ke daftar Midtrans
      midtransItems.push({
        id: `SHIPPING-${newOrder.orderNumber}`,
        price: shipmentCost,
        quantity: 1,
        name: `Shipping Cost - Store ${storeId}`,
      });

      const totalOrderAmount = totalPrice + shipmentCost;
      totalShipmentCost += shipmentCost;
      totalAmount += totalPrice;

      // Update order dengan total harga
      await newOrder.update({ totalPrice, totalOrderAmount }, { transaction });
    });

    await Promise.all(orderPromises);

    // Hapus item dari cart jika sudah berhasil dipesan
    if (cartIdsToRemove.length > 0) {
      await Cart.destroy({
        where: { id: cartIdsToRemove },
        transaction,
      });
    }

    // Update transaksi dengan total harga yang benar
    const amountToPay = totalAmount + totalShipmentCost;
    await newTransaction.update(
      {
        totalAmount,
        totalShipmentCost,
        amountToPay,
      },
      { transaction },
    );

    // Buat notifikasi
    await Notification.create({
      userId,
      type: 'order',
      message: 'New Transaction waiting for payment process',
      metadata: { transactionId: newTransaction.id },
    });

    let parameter = {
      transaction_details: {
        order_id: newTransaction.id,
        gross_amount: amountToPay,
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
      transaction: newTransaction,
      transactionToken: transactionMidtrans.token,
      transactionUrl: transactionMidtrans.redirect_url,
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating order:', error);
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
