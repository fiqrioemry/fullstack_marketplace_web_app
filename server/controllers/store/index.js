const { removeUploadFile } = require("../../utils/removeUploadFile");
const { uploadMediaToCloudinary } = require("../../utils/cloudinary");
const { Product, Galleries, Store, sequelize } = require("../../models");

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
      storeSlug: slug,
      storeId: store.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      stock: product.stock,
      storeName: store.name,
      description: product.description,
      images: product.Galleries.map((image) => image.image),
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
  const t = await sequelize.transaction();

  try {
    const storeId = req.user.storeId;
    const { name, description, price, stock, categoryId } = req.body;

    console.log(req.user);
    console.log(req.body);
    if (!name || !description || !price || !stock || !categoryId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!storeId) {
      return res
        .status(401)
        .json({ message: "Unauthorized! You don't have a store." });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "You must upload at least 1 image" });
    }

    const newProduct = await Product.create(
      {
        storeId,
        name,
        description,
        price,
        stock,
        categoryId,
      },
      { transaction: t }
    );

    const uploadPromises = req.files.map((fileItem) =>
      uploadMediaToCloudinary(fileItem.path)
    );

    const uploadedImages = await Promise.all(uploadPromises);

    const images = uploadedImages.map((url) => ({
      productId: newProduct.id,
      image: url,
    }));

    await Galleries.bulkCreate(images, { transaction: t });

    await t.commit();

    return res.status(201).json({ message: "New product is added" });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      message: "Failed to create new product",
      error: error.message,
    });
  }
}

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
    res.status(500).json({
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
