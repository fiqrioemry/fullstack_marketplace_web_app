const { Product, Cart, Store, Gallery } = require('../../models');

async function addCart(req, res) {
  const userId = req.user.userId;
  const { productId, quantity } = req.body;

  try {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    const product = await Product.findByPk(productId, {
      attributes: ['stock'],
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let newCart = await Cart.findOne({
      where: { productId, userId },
    });

    const newQuantity = newCart ? newCart.quantity + quantity : quantity;

    if (product.stock < newQuantity) {
      return res.status(400).json({ message: 'Product is out of stock' });
    }

    if (newCart) {
      await newCart.update({ quantity: newQuantity });
    } else {
      newCart = await Cart.create({
        productId,
        userId,
        quantity,
      });
    }

    return res.status(201).json({
      message: 'Product added to cart',
      newCart,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function updateCart(req, res) {
  const id = req.params.id;
  const userId = req.user.userId;
  const quantity = req.body.quantity;

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
      quantity,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
}

async function deleteCart(req, res) {
  const id = req.params.id;
  const userId = req.user.userIdd;

  try {
    const cart = await Cart.findByPk(id);

    if (!cart) {
      return res.status(404).json({
        message: 'Cart not found',
      });
    }

    if (cart.userId !== userId) {
      return res.status(401).json({
        message: 'Unauthorized access',
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

async function getCarts(req, res) {
  const userId = req.user.userId;

  try {
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }
    const cartData = await Cart.findAll({
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

    if (!cartData || cartData.length === 0) {
      return res.status(200).json({ message: 'No items in cart', cart: [] });
    }

    const cartItems = cartData.reduce((result, item) => {
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

    const cart = Object.values(cartItems);

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  addCart,
  updateCart,
  deleteCart,
  getCarts,
};
