const { Product, Cart } = require("../../models");

async function addCart(req, res) {
  const { userId } = req.user;
  const { productId, quantity } = req.body;
  try {
    let cartItem = await Cart.findOne({
      where: {
        productId,
        userId,
      },
    });

    if (cartItem) {
      await cartItem.update({
        quantity: cartItem.quantity + quantity,
      });
    } else {
      cartItem = await Cart.create({
        productId,
        userId,
        quantity,
      });
    }

    return res.status(200).send({
      message: "Product added to cart",
      data: cartItem,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function updateCart(req, res) {
  const { id } = req.params;
  const { userId } = req.user;
  const { quantity } = req.body;
  try {
    const cart = await Cart.findByPk(id);

    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    if (cart.userId !== userId) {
      return res.status(401).send({ message: "Unauthorized request" });
    }

    await Cart.update({ quantity }, { where: { id: id } });

    return res.status(200).send({
      message: "Cart is updated",
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function deleteCart(req, res) {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const cart = await Cart.findByPk(id);

    if (!cart) {
      return res.status(404).json({
        error: "Cart not found",
      });
    }

    if (cart.userId !== userId) {
      return res.status(401).json({
        error: "Unauthorized access",
      });
    }

    await cart.destroy();

    return res.status(200).send({
      message: "Cart is deleted",
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function getAllCartItem(req, res) {
  const { userId } = req.user;

  try {
    const cartItems = await Cart.findAll({
      where: { userId },
      attributes: ["id", "quantity"],
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "storeId", "name", "price", "stock"],
          include: [
            {
              model: Store,
              as: "store",
              attributes: ["id", "name", "slug", "image", "city"],
            },
            {
              model: Galleries,
              as: "galleries",
              attributes: ["image"],
            },
          ],
        },
      ],
    });

    if (!cartItems || cartItems.length === 0) {
      return res.status(200).send({ message: "No items in cart", data: [] });
    }

    const groupedCart = cartItems.reduce((result, item) => {
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
        storeName: item.store.slug,
        storeImage: item.store.image,
        images: item.galleries.map((item) => item.image),
      });

      return result;
    }, {});

    const groupedCartArray = Object.values(groupedCart);

    return res.status(200).send({
      message: "Cart items retrieved successfully",
      data: groupedCartArray,
    });
  } catch (error) {
    return res.status(500).send({
      message: "An error occurred while fetching cart items",
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
