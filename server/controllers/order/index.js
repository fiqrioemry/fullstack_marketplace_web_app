const {
  Order,
  OrderDetail,
  Product,
  Address,
  Cart,
  sequelize,
} = require('../../models');
const { Op } = require('sequelize');
const midtransClient = require('midtrans-client');

const createNewOrder = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const userId = req.user.id;
    const { shippingAddressId, orders } = req.body;

    // Validasi input
    if (!shippingAddressId || !Array.isArray(orders) || orders.length === 0) {
      return res
        .status(400)
        .json({ message: 'Data order tidak lengkap atau salah format' });
    }

    // Ambil alamat pengiriman
    const address = await Address.findOne({
      where: { id: shippingAddressId, userId },
      transaction,
    });
    if (!address) {
      return res.status(400).json({ message: 'Alamat tidak ditemukan' });
    }

    let createdOrders = [];
    let cartIdsToRemove = [];
    let totalGrossAmount = 0;
    let midtransItems = [];

    // Midtrans Configuration
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: 'YOUR_MIDTRANS_SERVER_KEY',
    });

    // Proses setiap order per storeId dari request
    for (const orderData of orders) {
      const { storeId, shippingCost, products } = orderData;
      let totalAmount = 0;

      // Validasi storeId dan shippingCost
      if (
        !storeId ||
        shippingCost == null ||
        !Array.isArray(products) ||
        products.length === 0
      ) {
        return res.status(400).json({
          message: 'Store ID, Shipping Cost, atau Produk tidak valid',
        });
      }

      // Buat Order
      const newOrder = await Order.create(
        {
          userId,
          storeId,
          totalAmount: 0, // Akan diupdate nanti
          shippingCost,
          AmountToPay: 0, // Akan diupdate nanti
          shippingAddress: shippingAddressId,
          orderStatus: 'pending',
          shippingStatus: 'pending',
          shippingNumber: null,
        },
        { transaction },
      );

      // Proses setiap produk dalam order
      for (const item of products) {
        if (!item.productId || !item.quantity) {
          await transaction.rollback();
          return res.status(400).json({ message: 'Data produk tidak lengkap' });
        }

        const product = await Product.findOne({
          where: { id: item.productId },
          transaction,
        });
        if (!product || product.stock < item.quantity) {
          await transaction.rollback();
          return res.status(400).json({
            message: `Stok tidak cukup untuk produk ID ${item.productId}`,
          });
        }

        const totalPrice = item.quantity * product.price;
        totalAmount += totalPrice;

        await OrderDetail.create(
          {
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            price: product.price,
            totalPrice,
          },
          { transaction },
        );

        // Kurangi stok produk
        await Product.update(
          { stock: product.stock - item.quantity },
          { where: { id: item.productId }, transaction },
        );

        cartIdsToRemove.push(item.cartId);

        // Tambahkan produk ke daftar item Midtrans
        midtransItems.push({
          id: `PRODUCT-${product.id}`,
          price: product.price,
          quantity: item.quantity,
          name: product.name.substring(0, 50), // Batas maksimal nama di Midtrans
        });
      }

      // Tambahkan shipping cost sebagai item Midtrans
      midtransItems.push({
        id: `SHIPPING-${newOrder.id}`,
        price: shippingCost,
        quantity: 1,
        name: `Ongkos Kirim - Store ${storeId}`,
      });

      // Update totalAmount dan AmountToPay di Order
      const amountToPay = totalAmount + shippingCost;
      totalGrossAmount += amountToPay; // Tambahkan ke total transaksi Midtrans

      await newOrder.update(
        { totalAmount, AmountToPay: amountToPay },
        { transaction },
      );

      createdOrders.push(newOrder);
    }

    // Hapus item yang telah diorder dari cart
    if (cartIdsToRemove.length > 0) {
      await Cart.destroy({
        where: { id: { [Op.in]: cartIdsToRemove } },
        transaction,
      });
    }

    // Buat satu transaksi Midtrans untuk semua order
    let parameter = {
      transaction_details: {
        order_id: `ORDER-GROUP-${userId}-${Date.now()}`,
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
      message: 'Order berhasil dibuat dalam satu transaksi',
      orders: createdOrders,
      transactionToken: transactionMidtrans.token,
      transactionUrl: transactionMidtrans.redirect_url,
    });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

const handleMidtransNotification = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { order_id, transaction_status } = req.body;

    // Cari order berdasarkan order_id
    const order = await Order.findOne({ where: { id: order_id }, transaction });
    if (!order) {
      return res.status(404).json({ message: 'Order tidak ditemukan' });
    }

    // Cek status transaksi Midtrans
    if (
      transaction_status === 'settlement' ||
      transaction_status === 'capture'
    ) {
      // Pembayaran berhasil
      await order.update({ orderStatus: 'paid' }, { transaction });
    } else if (transaction_status === 'expire') {
      // Pembayaran kadaluarsa, ubah status order
      await order.update({ orderStatus: 'expired' }, { transaction });

      // Kembalikan stok barang
      const orderDetails = await OrderDetail.findAll({
        where: { orderId: order.id },
        transaction,
      });
      for (const item of orderDetails) {
        await Product.increment('stock', {
          by: item.quantity,
          where: { id: item.productId },
        });
      }
    } else if (transaction_status === 'cancel') {
      // Pembayaran dibatalkan, ubah status order
      await order.update({ orderStatus: 'canceled' }, { transaction });

      // Kembalikan stok barang
      const orderDetails = await OrderDetail.findAll({
        where: { orderId: order.id },
        transaction,
      });
      for (const item of orderDetails) {
        await Product.increment('stock', {
          by: item.quantity,
          where: { id: item.productId },
        });
      }
    }

    await transaction.commit();
    return res.status(200).json({
      message: 'Status order diperbarui sesuai dengan pembayaran Midtrans',
    });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

const getAllOrders = async (req, res) => {
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
        // {
        //   model: Address,
        //   as: 'address',
        //   attributes: ['address', 'city', 'province', 'zipcode'],
        // },
      ],
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      message: 'Data order berhasil diambil',
      orders,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

module.exports = { createNewOrder, getAllOrders };
