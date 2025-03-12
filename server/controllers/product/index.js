const { Op } = require('sequelize');
const { Store, Product, Category, Gallery } = require('../../models');

async function getProduct(req, res) {
  const slug = req.params.slug;
  try {
    const productData = await Product.findOne({
      where: { slug: slug },
      include: [
        {
          model: Store,
          as: 'store',
        },
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
    });

    const product = {
      id: productData.id,
      name: productData.name,
      slug: productData.slug,
      price: productData.price,
      stock: productData.stock,
      store: productData.store,
      category: productData.category,
      description: productData.description,
      images: productData.gallery.map((p) => p.image),
    };

    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

async function getProducts(req, res) {
  let {
    search,
    city,
    category,
    minPrice,
    maxPrice,
    page,
    sortBy,
    orderBy,
    limit,
  } = req.query;
  try {
    const dataPerPage = limit > 0 ? parseInt(limit) : 5;
    const currentPage = page > 0 ? parseInt(page) : 1;
    const offset = (currentPage - 1) * dataPerPage;
    let query = {};

    // **Filter by Search**
    if (search && search.trim()) {
      query[Op.or] = [
        { name: { [Op.like]: `%${search.trim()}%` } },
        { slug: { [Op.like]: `%${search.trim()}%` } },
        { description: { [Op.like]: `%${search.trim()}%` } },
      ];
    }

    // **Filter by Category**
    if (category) {
      const categories = category.split(',').map((cat) => cat);
      console.log('kategori', categories);
      const findCategories = await Category.findAll({
        where: { slug: { [Op.in]: categories } },
        attributes: ['id'],
      });

      if (findCategories.length > 0) {
        query.categoryId = { [Op.in]: findCategories.map((cat) => cat.id) };
      } else {
        return res.status(200).json({ products: [] });
      }
    }

    // **Filter by City**
    if (city) {
      const cities = city.split(',').map((c) => c.toLowerCase());

      const findCities = await Store.findAll({
        where: { city: { [Op.in]: cities } },
        attributes: ['id'],
      });
      if (findCities.length > 0) {
        query.storeId = { [Op.in]: findCities.map((c) => c.id) };
      } else {
        return res.status(200).json({ products: [] });
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
        {
          model: Store,
          as: 'store',
          attributes: ['id', 'name', 'slug', 'avatar'],
        },
        { model: Gallery, as: 'gallery', attributes: ['image'] },
        { model: Category, as: 'category', attributes: ['id', 'name', 'slug'] },
      ],
      distinct: true,
      order: [[sortBy || 'createdAt', orderBy?.toUpperCase() || 'DESC']],
    });

    // **Jika tidak ada produk, kembalikan array kosong**
    if (product.count === 0) {
      return res.status(200).json({ products: [] });
    }

    const data = product.rows.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      stock: item.stock,
      category: item.category?.name,
      description: item.description,
      images: item.gallery.map((img) => img.image),
      store: item.store,
    }));

    const totalPage = Math.floor(product.count / dataPerPage);

    return res.status(200).json({
      products: data,
      totalPage: totalPage,
      currentPage: parseInt(page),
      totalData: product.count,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
module.exports = {
  getProduct,
  getProducts,
};
