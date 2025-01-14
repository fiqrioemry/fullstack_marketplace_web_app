const { Product, Categories, Galleries, Store } = require("../../models");

async function getStoreInfo(req, res) {
  const slug = req.params;
  try {
    const store = await Store.findOne({
      where: { slug },
      attributes: [{ exclude: ["userId"] }],
    });

    if (!store) return res.status(404).json({ message: "Store not found" });

    const payload = {
      name: store.name,
      slug: slug,
      image: store.image,
      city: store.city,
      avatar: store.avatar,
      description: store.description,
    };

    return res.status(200).json({ data: payload });
  } catch (error) {
    res.status(500).send({
      message: "Failed to retrieve store info",
      error: error.message,
    });
  }
}

async function getAllStoreProducts(req, res) {
  const slug = req.params;

  try {
    const store = await Store.findOne({
      where: { slug },
      attributes: ["userId", "name"],
    });

    if (!store) return res.status(404).json({ message: "Store not found" });

    const product = await Product.findAll({
      where: { storeId: store.id },
      include: [
        {
          model: Product,
          as: "product",
          include: { model: Galleries, as: "galleries" },
        },
      ],
    });

    if (!product)
      return res
        .status(200)
        .json({ data: [], message: "Store has no product" });

    const payload = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      stock: product.stock,
      description: product.description,
      images: product.Galleries.map((image) => image.image),
      storeId: store.id,
      storeSlug: slug,
      storeName: store.name,
    };

    return res.status(200).json({ data: payload });
  } catch (error) {
    res.status(500).send({
      message: "Failed to retrieve store products",
      error: error.message,
    });
  }
}

async function createProduct(req, res) {
  console.log(req.files);
  console.log(req.body);
  try {
    return res.status(200).json({ message: "New product is added" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create new product",
      error: error.message,
    });
  }
}

// async function createProduct(req, res) {
//   const files = req.files;
//   const { storeId } = req.user;
//   const t = await sequelize.transaction();
//   const { name, description, price, stock, category } = req.body;

//   try {
//     if (!storeId) {
//       return res.status(400).json({ message: "You don't have a store" });
//     }

//     if (req.files.length === 0) {
//       return res.status(400).send({ error: "Must upload atleast 1 image" });
//     }

//     const product = await Product.create(
//       {
//         slug,
//         name,
//         price,
//         stock,
//         storeId,
//         category,
//         description,
//       },
//       { transaction: t }
//     );

//     const uploadPromises = files.map((fileItem) =>
//       uploadMediaToCloudinary(fileItem.path)
//     );

//     const results = await Promise.all(uploadPromises);

//     const images = results.map((result) => {
//       return {
//         image: result.secure_url,
//         productId: product.id,
//       };
//     });

//     await Galleries.bulkCreate(images, { transaction: t });

//     await t.commit();

//     return res.status(201).send({
//       message: "Product is created",
//       data: product,
//     });
//   } catch (error) {
//     await t.rollback();
//     return res.status(500).send(error.message);
//   }
// }

async function updateProduct(req, res) {
  try {
  } catch (error) {}
}

async function deleteProduct(req, res) {
  try {
  } catch (error) {}
}

// admin only
async function getAllStores(req, res) {
  try {
  } catch (error) {}
}

async function getStoreStatistic(req, res) {
  const slug = req.params;
  try {
    const store = await Store.findOne({
      where: { slug },
      attributes: [{ exclude: ["userId"] }],
      include: [{ model: Product, as: "product" }],
    });

    if (!store) return res.status(404).json({ message: "Store not found" });

    return res.status(200).json({ data: store });
  } catch (error) {
    res.status(500).send({
      message: "Failed to retrieve store detail",
      error: error.message,
    });
  }
}

async function updateStore(req, res) {
  try {
  } catch (error) {}
}

// admin only
async function deleteStore(req, res) {
  try {
  } catch (error) {}
}

async function getMyStoreProduct(req, res) {
  try {
  } catch (error) {}
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllStores,
  getStoreInfo,
  getStoreStatistic,
  getAllStoreProducts,
};
