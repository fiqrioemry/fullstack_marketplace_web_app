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

// Midtrans Configuration
let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: 'SB-Mid-server-m3MYaqWijoP7FNBUrryhHWik',
});

const createNewOrder = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const userId = req.user.id; // Anggap userId didapat dari middleware autentikasi
    const { shippingAddressId, orders } = req.body;

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
    let transactionData = [];

    // Proses setiap order per storeId dari request
    for (const orderData of orders) {
      const { storeId, shippingCost, products } = orderData;
      let totalAmount = 0;
      let amountToPay = 0;

      // Buat Order
      const newOrder = await Order.create(
        {
          userId,
          storeId,
          totalAmount: 0, // Akan diupdate nanti
          shippingCost,
          AmountToPay: 0, // Akan diupdate nanti
          shippingAddress: shippingAddressId,
          orderStatus: 'Pending',
          shippingStatus: 'Not Shipped',
          shippingNumber: null,
        },
        { transaction },
      );

      // Buat Order Details dan perbarui stok produk
      for (const item of products) {
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

        const totalPrice = item.quantity * item.price;
        totalAmount += totalPrice;
        amountToPay = totalAmount + shippingCost;

        await OrderDetail.create(
          {
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            totalPrice,
          },
          { transaction },
        );

        // Kurangi stok produk
        await Product.update(
          { stock: product.stock - item.quantity },
          { where: { id: item.productId }, transaction },
        );
      }

      // Update totalAmount dan AmountToPay di Order
      await newOrder.update(
        {
          totalAmount,
          AmountToPay: amountToPay,
        },
        { transaction },
      );

      // Integrasi dengan Midtrans
      let parameter = {
        transaction_details: {
          order_id: `ORDER-${newOrder.id}-${Date.now()}`,
          gross_amount: amountToPay,
        },
        customer_details: {
          user_id: userId,
          shipping_address: address.address,
        },
      };

      const transactionMidtrans = await snap.createTransaction(parameter);
      transactionData.push({
        orderId: newOrder.id,
        transactionToken: transactionMidtrans.token,
        transactionUrl: transactionMidtrans.redirect_url,
      });

      createdOrders.push(newOrder);
    }

    // Hapus item yang telah diorder dari cart
    const cartProductIds = orders.flatMap((order) =>
      order.products.map((product) => product.productId),
    );
    if (cartProductIds.length > 0) {
      await Cart.destroy({
        where: { userId, productId: { [Op.in]: cartProductIds } },
        transaction,
      });
    }

    await transaction.commit();

    return res.status(201).json({
      message: 'Order berhasil dibuat',
      orders: createdOrders,
      transactions: transactionData,
    });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

module.exports = { createNewOrder };
