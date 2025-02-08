const { client } = require('../../utils/redis');
const {
  User,
  Order,
  OrderDetail,
  Product,
  Address,
  Cart,
} = require('../../models');

const { Order, OrderDetail, Product, Address, Cart } = require('../../models');
const { Op } = require('sequelize');

const createNewOrder = async (req, res) => {
  try {
    const userId = req.user.id; // Anggap userId didapat dari middleware autentikasi
    const { shippingAddressId } = req.body;

    // Ambil alamat pengiriman
    const address = await Address.findOne({
      where: { id: shippingAddressId, userId },
    });
    if (!address) {
      return res.status(400).json({ message: 'Alamat tidak ditemukan' });
    }

    // Ambil item di cart berdasarkan userId
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [
        { model: Product, attributes: ['id', 'storeId', 'price', 'stock'] },
      ],
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Keranjang kosong' });
    }

    // Kelompokkan cart items berdasarkan storeId
    const groupedOrders = {};
    cartItems.forEach((item) => {
      const storeId = item.Product.storeId;
      if (!groupedOrders[storeId]) {
        groupedOrders[storeId] = [];
      }
      groupedOrders[storeId].push(item);
    });

    let createdOrders = [];
    let cartIdsToRemove = [];

    // Proses setiap order per storeId
    for (const storeId in groupedOrders) {
      const items = groupedOrders[storeId];
      let totalAmount = 0;
      let shippingCost = 10000; // Contoh biaya pengiriman tetap (bisa diubah)
      let amountToPay = 0;

      // Buat Order
      const newOrder = await Order.create({
        userId,
        storeId,
        totalAmount: 0, // Akan diupdate nanti
        shippingCost,
        AmountToPay: 0, // Akan diupdate nanti
        shippingAddress: shippingAddressId,
        orderStatus: 'Pending',
        shippingStatus: 'Not Shipped',
        shippingNumber: null,
      });

      // Buat Order Details dan perbarui stok produk
      for (const item of items) {
        if (item.Product.stock < item.quantity) {
          return res
            .status(400)
            .json({
              message: `Stok tidak cukup untuk produk ID ${item.productId}`,
            });
        }

        const totalPrice = item.quantity * item.Product.price;
        totalAmount += totalPrice;
        amountToPay = totalAmount + shippingCost;

        await OrderDetail.create({
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.Product.price,
          totalPrice,
        });

        // Kurangi stok produk
        await Product.update(
          { stock: item.Product.stock - item.quantity },
          { where: { id: item.productId } },
        );

        // Tambahkan cartId ke list yang akan dihapus
        cartIdsToRemove.push(item.id);
      }

      // Update totalAmount dan AmountToPay di Order
      await newOrder.update({
        totalAmount,
        AmountToPay: amountToPay,
      });

      createdOrders.push(newOrder);
    }

    // Hapus item yang telah diorder dari cart
    if (cartIdsToRemove.length > 0) {
      await Cart.destroy({ where: { id: { [Op.in]: cartIdsToRemove } } });
    }

    return res.status(201).json({
      message: 'Order berhasil dibuat',
      orders: createdOrders,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Terjadi kesalahan', error: error.message });
  }
};

module.exports = { createNewOrder };
