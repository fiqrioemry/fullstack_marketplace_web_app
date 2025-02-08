const { Product, Cart, Store, Gallery } = require('../../models');

async function addCart(req, res) {
  const { userId } = req.user;
  const { productId, quantity } = req.body;

  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid quantity' });
  }

  try {
    const product = await Product.findByPk(productId, {
      attributes: ['stock'],
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cartItem = await Cart.findOne({
      where: { productId, userId },
    });

    const newQuantity = cartItem ? cartItem.quantity + quantity : quantity;

    if (product.stock < newQuantity) {
      return res.status(400).json({ message: 'Product is out of stock' });
    }

    if (cartItem) {
      await cartItem.update({ quantity: newQuantity });
    } else {
      cartItem = await Cart.create({
        productId,
        userId,
        quantity,
      });
    }

    return res.status(200).json({
      message: 'Product added to cart',
      data: cartItem,
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
}

async function updateCart(req, res) {
  const { id } = req.params;
  const { userId } = req.user;
  const { quantity } = req.body;

  // Validasi input
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid quantity' });
  }

  try {
    const cart = await Cart.findByPk(id, {
      include: {
        model: Product,
        attributes: ['stock'],
      },
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    if (cart.userId !== userId) {
      return res.status(401).json({ message: 'Unauthorized request' });
    }

    if (cart.Product.stock < quantity) {
      return res.status(400).json({ message: 'Product is out of stock' });
    }

    await cart.update({ quantity });

    return res.status(200).json({
      message: 'Cart is updated',
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
}

async function deleteCart(req, res) {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const cart = await Cart.findByPk(id);

    if (!cart) {
      return res.status(404).json({
        error: 'Cart not found',
      });
    }

    if (cart.userId !== userId) {
      return res.status(401).json({
        error: 'Unauthorized access',
      });
    }

    await cart.destroy();

    return res.status(200).json({
      message: 'Cart is deleted',
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function getAllCartItem(req, res) {
  const { userId } = req.user;

  try {
    const cart = await Cart.findAll({
      where: { userId },
      attributes: ['id', 'quantity'],
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'storeId', 'name', 'price', 'stock'],
          include: [
            {
              model: Store,
              as: 'store',
              attributes: ['id', 'name', 'slug', 'image'],
            },
            {
              model: Gallery,
              as: 'gallery',
              attributes: ['image'],
            },
          ],
        },
      ],
    });

    if (!cart || cart.length === 0) {
      return res.status(200).json({ message: 'No items in cart', data: [] });
    }

    const cartItems = cart.reduce((result, item) => {
      const storeId = item.product.storeId;
      const storeName = item.product.store.name;

      if (!result[storeId]) {
        result[storeId] = {
          storeId,
          storeName,
          items: [],
        };
      }

      result[storeId].items.push({
        cartId: item.id,
        productId: item.product.id,
        name: item.product.name,
        slug: item.product.slug,
        price: item.product.price,
        stock: item.product.stock,
        quantity: item.quantity,
        storeId: item.store.id,
        storeName: item.store.name,
        storeSlug: item.store.slug,
        storeImage: item.store.image,
        images: item.galleries.map((item) => item.image),
      });

      return result;
    }, {});

    const groupedCart = Object.values(cartItems);

    return res.status(200).json({
      message: 'Cart items retrieved successfully',
      data: groupedCart,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error occurred while fetching cart items',
      error: error.message,
    });
  }
}

module.exports = {
  addCart,
  updateCart,
  deleteCart,
  getAllCartItem,
};
