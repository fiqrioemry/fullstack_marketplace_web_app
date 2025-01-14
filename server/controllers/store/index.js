const { Product, Categories, Galleries, Store } = require("../../models");

async function createProduct(req, res) {
  const files = req.files;
  const { storeId } = req.user;
  const t = await sequelize.transaction();
  const { name, description, price, stock, category } = req.body;

  try {
    if (!storeId) {
      return res.status(400).json({ message: "You don't have a store" });
    }

    if (req.files.length === 0) {
      return res.status(400).send({ error: "Must upload atleast 1 image" });
    }

    const product = await Product.create(
      {
        slug,
        name,
        price,
        stock,
        storeId,
        category,
        description,
      },
      { transaction: t }
    );

    const uploadPromises = files.map((fileItem) =>
      uploadMediaToCloudinary(fileItem.path)
    );

    const results = await Promise.all(uploadPromises);

    const images = results.map((result) => {
      return {
        image: result.secure_url,
        productId: product.id,
      };
    });

    await Galleries.bulkCreate(images, { transaction: t });

    await t.commit();

    return res.status(201).send({
      message: "Product is created",
      data: product,
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).send(error.message);
  }
}

async function updateProduct(req, res) {
  const files = req.files;
  const { storeId } = req.user;
  const { productId } = req.params;
  const t = await sequelize.transaction();
  const { name, description, price, stock, categoryId } = req.body;
  try {
    if (!name || !price || !categoryId) {
      return res.status(400).send({ message: "Invalid input data" });
    }

    const slug = createSlug(name);

    const product = await Product.findOne({
      where: { id: productId },
    });

    if (!product) {
      await t.rollback();
      return res.status(404).send({ message: "Product not found" });
    }

    if (req.user.userRole !== "admin" && product.storeId !== storeId) {
      await t.rollback();
      return res.status(401).send({ message: "Unauthorized Access" });
    }

    await product.update(
      {
        name,
        slug,
        price,
        stock,
        categoryId,
        description,
      },
      { transaction: t }
    );

    if (files && files.length > 0) {
      const oldImages = await Galleries.findAll({
        where: { productId },
      });

      const updatedImages = files.map((fileItem) =>
        uploadMediaToCloudinary(fileItem.path)
      );

      const results = await Promise.all(updatedImages);

      const newImages = results.map((result) => ({
        productId,
        image: result.secure_url,
      }));

      const oldImagesUrls = oldImages.map((image) => image.image);
      for (const imageUrl of oldImagesUrls) {
        await deleteMediaFromCloudinary(imageUrl);
      }

      await Galleries.destroy({ where: { productId }, transaction: t });

      await Galleries.bulkCreate(newImages, { transaction: t });
    }

    await t.commit();

    return res.status(200).send({
      message: "Product is updated",
    });
  } catch (error) {
    await t.rollback();
    return res
      .status(500)
      .send({ message: "Something went wrong", error: error.message });
  }
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

async function getStoreDetail(req, res) {
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

async function getAllStoreProducts(req, res) {
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
  getAllStore,
  getStoreDetail,
  getStoreProducts,
};
