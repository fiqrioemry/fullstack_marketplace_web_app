const { Store, Product, Gallery, sequelize } = require('../../models');
const { Op } = require('sequelize');
const createSlug = require('../../utils/createSlug');
const uploadToCloudinary = require('../../utils/uploadToCloudinary');
const deleteFromCloudinary = require('../../utils/deleteFromCloudinary');

async function getStoreInfo(req, res) {
  const slug = req.params.slug;
  try {
    const storeData = await Store.findOne({
      where: { slug },
    });

    if (!storeData) return res.status(404).json({ message: 'Store not found' });

    const productsData = await Product.findAll({
      where: { storeId: storeData.id },
      include: ['gallery', 'category'],
    });

    const store = {
      slug: slug,
      name: storeData.name,
      image: storeData.image,
      city: storeData.city,
      avatar: storeData.avatar,
      description: storeData.description,
    };

    const products = productsData.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      images: item.gallery.map((img) => img.image),
      store: store,
    }));

    return res.status(200).json({ store, products });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function getMyStoreProfile(req, res) {
  const { userId, storeId } = req.user;
  try {
    const storeData = await Store.findByPk(storeId);

    if (!storeData || storeData.userId !== userId)
      return res.status(403).json({ message: 'Forbidden !!! Access Denied' });

    const store = {
      name: store.name,
      image: store.image,
      city: store.city,
      avatar: store.avatar,
      description: store.description,
    };

    return res.status(200).json(store);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

// tested - completed
async function getMyStoreProducts(req, res) {
  const storeId = req.user.storeId;
  try {
    let {
      sortBy = 'createdAt',
      orderBy = 'desc',
      page = 1,
      limit = 5,
      search = '',
    } = req.query;
    const dataPerPage = Number(limit) > 0 ? parseInt(limit) : 5;
    const currentPage = Number(page) > 0 ? parseInt(page) : 1;
    const offset = (currentPage - 1) * dataPerPage;

    let query = { storeId };

    const validSortFields = ['price', 'stock', 'category', 'name', 'createdAt'];
    if (!validSortFields.includes(sortBy)) {
      sortBy = 'createdAt';
    }

    orderBy = orderBy.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    // **Filter berdasarkan search jika ada**
    if (search) {
      query = {
        ...query,
        [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
      };
    }

    // Fetch Products
    const product = await Product.findAndCountAll({
      where: query,
      limit: dataPerPage,
      offset: offset,
      order: [[sortBy, orderBy]],
      include: ['gallery', 'category'],
      distinct: true,
    });

    if (product.count === 0) {
      return res.status(200).json({ products: [] });
    }

    const products = product.rows.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      stock: item.stock,
      category: item.category,
      description: item.description,
      images: item.gallery.map((img) => img.image),
    }));

    const totalPage = Math.ceil(product.count / dataPerPage);

    return res.status(200).json({
      products,
      totalPage,
      currentPage,
      totalData: product.count,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
// tested - completed
async function createProduct(req, res) {
  const files = req.files;
  const storeId = req.user.storeId;
  const transaction = await sequelize.transaction();
  const { name, description, price, stock, categoryId } = req.body;

  try {
    if (!name || !description || !price || !stock || !categoryId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'Must upload at least 1 image' });
    }

    const slug = await createSlug(name);

    const existingProduct = await Product.findOne({ where: { slug } });

    if (existingProduct) {
      return res.status(400).json({
        message: 'Product name must be unique',
      });
    }

    const newProduct = await Product.create(
      {
        name,
        slug,
        price,
        stock,
        storeId,
        categoryId,
        description,
      },
      { transaction },
    );
    const uploadPromises = req.files.map(async (file) => {
      const uploadedMedia = await uploadToCloudinary(
        file.buffer,
        file.mimetype,
      );
      return uploadedMedia;
    });

    const uploadedImages = await Promise.all(uploadPromises);

    const images = uploadedImages.map((url) => ({
      productId: newProduct.id,
      image: url.secure_url,
    }));

    await Gallery.bulkCreate(images, { transaction });

    await transaction.commit();

    return res.status(201).json({ message: 'New product is created' });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function updateProduct(req, res) {
  const files = req.files;
  const productId = req.params.productId;
  const transaction = await sequelize.transaction();
  let { name, images, description, price, stock, categoryId } = req.body;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (!Array.isArray(images)) {
      images = images ? [images] : [];
    }

    const imagesToDelete = await Gallery.findAll({
      where: {
        productId,
        image: { [Op.notIn]: images },
      },
    });

    for (const img of imagesToDelete) {
      await deleteFromCloudinary(img.image);
    }

    await Gallery.destroy({
      where: {
        productId,
        image: { [Op.notIn]: images },
      },
      transaction,
    });

    let newImages = [];

    await Gallery.bulkCreate(images, { transaction });

    if (files && files.length > 0) {
      const uploadPromises = req.files.map(async (file) => {
        const uploadedMedia = await uploadToCloudinary(
          file.buffer,
          file.mimetype,
        );
        return uploadedMedia;
      });

      const uploadedImages = await Promise.all(uploadPromises);
      newImages = uploadedImages.map((url) => ({
        productId: product.id,
        image: url.secure_url,
      }));

      await Gallery.bulkCreate(newImages, { transaction });
    }

    await product.update(
      {
        name,
        price,
        stock,
        categoryId,
        description,
      },
      { transaction },
    );

    await transaction.commit();

    return res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    await transaction.rollback();

    return res.status(500).json({
      message: error.message,
    });
  }
}

async function deleteProduct(req, res) {
  const productId = req.params.productId;
  const transaction = await sequelize.transaction();

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const images = await Gallery.findAll({ where: { productId } });
    for (const img of images) {
      await deleteFromCloudinary(img.image);
    }
    await Gallery.destroy({ where: { productId }, transaction });

    await product.destroy({ transaction });

    await transaction.commit();

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  getStoreInfo,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyStoreProfile,
  getMyStoreProducts,
};
