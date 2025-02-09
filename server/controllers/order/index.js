const {
  Cart,
  Order,
  Address,
  Product,
  sequelize,
  Notification,
  Shipment,
  Transaction,
  OrderDetail,
} = require('../../models');
require('dotenv').config();
const midtransClient = require('midtrans-client');
const { v4: uuidv4 } = require('uuid');

const generateOrderNumber = (transactionId) => {
  return `INV-${transactionId}-${uuidv4().split('-')[0]}`;
};
// Midtrans Configuration
let snap = new midtransClient.Snap({
  isProduction: process.env.NODE_ENV === 'production',
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

const PaymentNotifications = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    // Destructure the notification response from Midtrans
    const statusResponse = await snap.transaction.notification(req.body);
    const { order_id: transactionId, transaction_status: transactionStatus } =
      statusResponse;

    // Retrieve the transaction along with its orders and order details
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
      // Update the transaction's payment status to 'paid'
      await userTransaction.update({ paymentStatus: 'paid' }, { transaction });
      message = 'Your payment is successful, order will be processed';

      const productStockUpdates = [];

      // Process each order concurrently
      await Promise.all(
        userTransaction.order.map(async (order) => {
          // Update the order status to 'pending'
          await order.update({ orderStatus: 'pending' }, { transaction });

          // Create a shipment record for the order
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
    console.error('Error updating payment status:', error);
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};

const createNewOrder = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    // Ambil data dari request
    const { userId } = req.user;
    const { addressId, orders } = req.body;

    // Validasi input dasar
    if (!addressId || !Array.isArray(orders) || orders.length === 0) {
      return res
        .status(400)
        .json({ message: 'Order information not complete or wrong' });
    }

    // Periksa apakah alamat ada untuk user ini
    const address = await Address.findOne({
      where: { id: addressId, userId },
      transaction,
    });
    if (!address) {
      return res.status(400).json({ message: 'Address not found' });
    }

    // Buat record transaksi baru dengan nilai default
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

    // Ambil semua cart items yang diperlukan dalam satu query
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
    // Buat map untuk mempermudah pencarian cart item berdasarkan ID
    const cartMap = new Map(cartItems.map((cart) => [cart.id, cart]));

    // Inisialisasi variabel akumulasi
    let totalAmount = 0;
    let totalShipmentCost = 0;
    const midtransItems = [];
    const cartIdsToRemove = [];
    const orderDetailsToCreate = []; // Data untuk bulkCreate OrderDetail

    // Proses setiap order secara sequential
    for (const order of orders) {
      const { storeId, shipmentCost, cartItems: orderCartItems } = order;

      // Validasi data order
      if (
        !storeId ||
        shipmentCost == null ||
        !Array.isArray(orderCartItems) ||
        orderCartItems.length === 0
      ) {
        throw new Error('Invalid Store ID, Shipping Cost, or CartItems');
      }

      // Buat record order baru
      const newOrder = await Order.create(
        {
          userId,
          transactionId: newTransaction.id,
          storeId,
          addressId,
          orderNumber: generateOrderNumber(newTransaction.id),
          totalPrice: 0, // Akan diupdate setelah menghitung total harga produk
          shipmentCost,
          totalOrderAmount: 0, // Akan diupdate setelah ditambahkan biaya pengiriman
          orderStatus: 'waiting payment',
        },
        { transaction },
      );

      let orderTotalPrice = 0;

      // Proses tiap cart item yang ada dalam order ini
      for (const cartId of orderCartItems) {
        const cart = cartMap.get(cartId);
        if (!cart || !cart.product) {
          // Lempar error agar transaksi digagalkan, daripada mengirim response dari sini
          throw new Error(
            `Cart item not found or already removed. Cart ID: ${cartId}`,
          );
        }

        const product = cart.product;
        if (product.stock < cart.quantity) {
          throw new Error(`Insufficient stock for product ${product.name}`);
        }

        // Hitung harga total untuk item ini
        const itemTotalPrice = cart.quantity * product.price;
        orderTotalPrice += itemTotalPrice;

        // Tambahkan data order detail ke array untuk bulkCreate
        orderDetailsToCreate.push({
          orderId: newOrder.id,
          productId: product.id,
          quantity: cart.quantity,
          price: product.price,
          totalPrice: itemTotalPrice,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        // Tambahkan data untuk Midtrans item detail
        midtransItems.push({
          id: `PRODUCT-${product.id}`,
          price: product.price,
          quantity: cart.quantity,
          name: product.name.substring(0, 50),
        });

        // Tandai cart item untuk dihapus
        cartIdsToRemove.push(cart.id);
      }

      // Tambahkan biaya pengiriman sebagai item Midtrans
      midtransItems.push({
        id: `SHIPPING-${newOrder.orderNumber}`,
        price: shipmentCost,
        quantity: 1,
        name: `Shipping Cost - Store ${storeId}`,
      });

      // Hitung total order (produk + pengiriman)
      const totalOrderAmount = orderTotalPrice + shipmentCost;
      totalAmount += orderTotalPrice;
      totalShipmentCost += shipmentCost;

      // Update record order dengan total yang telah dihitung
      await newOrder.update(
        { totalPrice: orderTotalPrice, totalOrderAmount },
        { transaction },
      );
    }

    // Bulk create OrderDetail untuk mengurangi jumlah query
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

    // Update transaksi dengan total harga produk, biaya pengiriman, dan jumlah yang harus dibayar
    const amountToPay = totalAmount + totalShipmentCost;
    await newTransaction.update(
      {
        totalAmount,
        totalShipmentCost,
        amountToPay,
      },
      { transaction },
    );

    // Buat notifikasi untuk user
    await Notification.create({
      userId,
      type: 'order',
      message: 'New Transaction waiting for payment process',
      metadata: { transactionId: newTransaction.id },
    });

    // Persiapkan parameter untuk Midtrans Snap API
    const parameter = {
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

    // Buat transaksi melalui Midtrans Snap API
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
