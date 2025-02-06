const createSlug = require('../../utils/createSlug');
const { removeUploadFile } = require('../../utils/removeUploadFile');
const { uploadMediaToCloudinary } = require('../../utils/cloudinary');
const { Store, Product, Category, Gallery } = require('../../models');

async function getStoreInfo(req, res) {
  const slug = req.params;
  try {
    const store = await Store.findOne({
      where: { slug },
      attributes: [{ exclude: ['userId'] }],
      include: [
        {
          model: Product,
          as: 'product',
          include: [
            {
              model: Category,
              as: 'category',
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

    if (!store) return res.status(404).json({ message: 'Store not found' });

    const products = store.product.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      stock: item.stock,
      city: item.store?.city,
      description: item.description,
      images: item.gallery.map((img) => img.image),
    }));

    const payload = {
      name: store.name,
      slug: slug,
      image: store.image,
      city: store.city,
      avatar: store.avatar,
      description: store.description,
      products: products,
    };

    return res.status(200).json({ data: payload });
  } catch (error) {
    res.status(500).send({
      message: 'Failed to retrieve store info',
      error: error.message,
    });
  }
}

async function getMyStoreProfile(req, res) {
  const { storeId } = req.user;
  try {
    const store = await Store.findByPk(storeId);

    if (!store)
      return res.status(401).json({ message: 'UnAuthorized Access !!!' });

    const payload = {
      name: store.name,
      image: store.image,
      city: store.city,
      avatar: store.avatar,
      description: store.description,
    };

    return res.status(200).json({ data: payload });
  } catch (error) {
    res.status(500).send({
      message: 'Failed to retrieve store info',
      error: error.message,
    });
  }
}

async function getMyStoreProducts(req, res) {
  try {
    let { search, category, minPrice, maxPrice, page, sortBy, orderBy, limit } =
      req.query;
    const { storeId } = req.user;

    const dataPerPage = Number(limit) > 0 ? parseInt(limit) : 5;
    const currentPage = Number(page) > 0 ? parseInt(page) : 1;
    const offset = (currentPage - 1) * dataPerPage;

    let query = {};

    // **Filter by Search**
    if (search && search.trim()) {
      query[Op.or] = [
        { name: { [Op.like]: `%${search.trim()}%` } },
        { description: { [Op.like]: `%${search.trim()}%` } },
      ];
    }

    // **Filter by Category**
    if (category) {
      const categoryArray = category
        .split(',')
        .map((c) => slugify(c.trim(), { lower: true }));

      const findCategories = await Category.findAll({
        where: { slug: { [Op.in]: categoryArray } },
        attributes: ['id'],
      });

      if (findCategories.length > 0) {
        query.categoryId = { [Op.in]: findCategories.map((c) => c.id) };
      } else {
        return res.status(200).json({ data: [] });
      }
    }

    // **Filter by Price Range**
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price[Op.gte] = Number(minPrice) || 0;
      if (maxPrice) query.price[Op.lte] = Number(maxPrice) || 0;
    }

    // **Fetch Products**
    const product = await Product.findAndCountAll({
      where: query,
      limit: dataPerPage,
      offset: offset,
      include: [
        { model: Gallery, as: 'gallery', attributes: ['image'] },
        { model: Category, as: 'category', attributes: ['id', 'name', 'slug'] },
      ],
      distinct: true,
      order: [[sortBy || 'createdAt', orderBy?.toUpperCase() || 'DESC']],
    });

    // **Jika tidak ada produk, kembalikan array kosong**
    if (product.count === 0) {
      return res.status(200).json({ data: [] });
    }

    // **Format Response**
    const data = product.rows.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      stock: item.stock,
      city: item.store?.city,
      storeId: item.storeId,
      storeName: item.store?.name,
      storeSlug: item.store?.slug,
      storeImage: item.store?.image,
      description: item.description,
      categoryId: item.category?.id,
      categoryName: item.category?.name,
      categorySlug: item.category?.slug,
      images: item.gallery.map((img) => img.image),
    }));

    const totalPage = Math.floor(product.count / dataPerPage);

    return res.status(200).json({
      products: data,
      currentPage: parseInt(page),
      totalPage: totalPage,
      totalData: product.count,
    });
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
async function createProduct(req, res) {
  try {
    const storeId = req.user?.storeId;

    if (!storeId) {
      return res.status(400).send({ message: "You don't have a store." });
    }

    const { name, description, price, stock, categoryId } = req.body;

    if (!name || !description || !price || !stock || !categoryId) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .send({ message: 'You must upload at least 1 image' });
    }

    const slug = await createSlug(name);

    const existingProduct = await Product.findOne({ where: { slug } });
    if (existingProduct) {
      return res.status(400).send({
        message: 'Product name must be unique, Please choose another',
      });
    }

    const newProduct = await Product.create({
      storeId,
      name,
      slug,
      description,
      price,
      stock,
      categoryId,
    });

    const uploadPromises = req.files.map(async (file) => {
      // Upload media ke Cloudinary
      const uploadedMedia = await uploadMediaToCloudinary(file.path);

      // Setelah berhasil upload, hapus file lokal
      await removeUploadFile(file.path);

      return uploadedMedia;
    });

    const uploadedImages = await Promise.all(uploadPromises);

    const images = uploadedImages.map((url) => ({
      productId: newProduct.id,
      image: url.secure_url, // Misalnya Cloudinary mengembalikan URL di property secure_url
    }));

    await Gallery.bulkCreate(images);

    return res.status(201).send({ message: 'New product is added' });
  } catch (error) {
    return res.status(500).send({
      message: 'Failed to create new product',
      error: error.message,
    });
  }
}

async function getAllStoreProducts(req, res) {
  try {
  } catch (error) {}
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
      attributes: [{ exclude: ['userId'] }],
      include: [{ model: Product, as: 'product' }],
    });

    if (!store) return res.status(404).json({ message: 'Store not found' });

    return res.status(200).json({ data: store });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve store detail',
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
