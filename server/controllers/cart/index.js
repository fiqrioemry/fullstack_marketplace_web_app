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

    return res.status(201).json({
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

  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid quantity' });
  }

  try {
    const cart = await Cart.findByPk(id, {
      include: {
        model: Product,
        as: 'product',
      },
    });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    if (cart.userId !== userId) {
      return res.status(401).json({ message: 'Unauthorized request' });
    }

    if (cart.product.stock < quantity) {
      return res.status(400).json({ message: 'Product is out of stock' });
    }

    await cart.update({ quantity });

    return res.status(200).json({
      message: 'Cart is updated',
      data: cart,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
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
  if (!req.user || !req.user.userId) {
    return res.status(401).json({ message: 'Unauthorized: User not found' });
  }

  const { userId } = req.user;

  try {
    const cart = await Cart.findAll({
      where: { userId },
      attributes: ['id', 'productId', 'quantity'],
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'storeId', 'name', 'slug', 'price', 'stock'],
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
      const product = item.product;
      const store = product.store || {};

      if (!product) return result;

      const storeId = store.id;
      const storeName = store.name;
      const storeSlug = store.slug;
      const storeImage = store.image;

      if (!result[storeId]) {
        result[storeId] = {
          storeId,
          storeName,
          storeSlug,
          storeImage,
          items: [],
        };
      }

      result[storeId].items.push({
        cartId: item.id,
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        stock: product.stock,
        quantity: item.quantity,
        images: product.gallery ? product.gallery.map((img) => img.image) : [],
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
