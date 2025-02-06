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
  const { userId, storeId, role } = req.user;
  try {
    if (role !== 'seller')
      return res.status(401).json({ message: 'UnAuthorized Access !!!' });

    const store = await Store.findByPk(storeId);

    if (!store || store.userId !== userId)
      return res.status(404).json({ message: 'UnAuthorized Access !!!' });

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

const updateMyStoreProfile = async function (req, res) {
  const { userId, storeId, role } = req.user;
  const { name, city, description, updateType } = req.body;
  const avatarFile = req.files?.avatar?.[0];
  const imageFile = req.files?.image?.[0];

  try {
    if (role !== 'seller') {
      return res.status(401).send({ message: 'Unauthorized Access' });
    }

    const store = await Store.findByPk(storeId);

    if (!store || store.userId !== userId) {
      if (avatarFile) await fs.unlink(avatarFile.path);
      if (imageFile) await fs.unlink(imageFile.path);
      return res.status(404).json({ message: 'Unauthorized Access' });
    }

    let avatar = store.avatar;
    let image = store.image;

    if (avatarFile && (!updateType || updateType.includes('avatar'))) {
      const updatedAvatar = await uploadMediaToCloudinary(avatarFile.path);

      if (store.avatar) {
        await deleteMediaFromCloudinary(store.avatar);
      }

      avatar = updatedAvatar.secure_url;
      await fs.unlink(avatarFile.path);
    }

    if (imageFile && (!updateType || updateType.includes('image'))) {
      const updatedImage = await uploadMediaToCloudinary(imageFile.path);

      if (store.image) {
        await deleteMediaFromCloudinary(store.image);
      }

      image = updatedImage.secure_url;
      await fs.unlink(imageFile.path);
    }

    const updatedStore = {
      name: name || store.name,
      avatar: avatar,
      image: image,
      city: city || store.city,
      description: description || store.description,
    };

    await store.update(updatedStore);

    return res.status(200).json({
      message: 'Store Profile is updated',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to Update Profile',
      error: error.message,
    });
  }
};
async function getMyStoreProducts(req, res) {
  try {
    let { search, category, minPrice, maxPrice, page, sortBy, orderBy, limit } =
      req.query;
    const { storeId, role } = req.user;

    const dataPerPage = Number(limit) > 0 ? parseInt(limit) : 5;
    const currentPage = Number(page) > 0 ? parseInt(page) : 1;
    const offset = (currentPage - 1) * dataPerPage;

    let query = {
      storeId: storeId,
    };

    if (role !== 'seller')
      return res.status(401).json({ message: 'UnAuthorized Access !!!' });

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
      description: item.description,
      categoryId: item.category?.id,
      categoryName: item.category?.name,
      images: item.gallery.map((img) => img.image),
    }));

    const totalPage = Math.ceil(product.count / dataPerPage);

    return res.status(200).json({
      products: data,
      currentPage: parseInt(page),
      totalPage: totalPage,
      totalData: product.count,
    });
  } catch (error) {
    console.error('Error in getMyStoreProducts:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createProduct(req, res) {
  try {
    const { storeId, role } = req.user;

    if (role !== 'seller')
      return res.status(401).json({ message: 'UnAuthorized Access !!!' });

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
      const uploadedMedia = await uploadMediaToCloudinary(file.path);

      await fs.unlink(file.path);

      return uploadedMedia;
    });

    const uploadedImages = await Promise.all(uploadPromises);

    const images = uploadedImages.map((url) => ({
      productId: newProduct.id,
      image: url.secure_url,
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

async function updateProduct(req, res) {
  try {
  } catch (error) {}
}

async function deleteProduct(req, res) {
  try {
  } catch (error) {}
}

module.exports = {
  createProduct,
  updateProduct,
  getStoreInfo,
  getMyStoreProfile,
  updateMyStoreProfile,
  getMyStoreProducts,
  deleteProduct,
};
