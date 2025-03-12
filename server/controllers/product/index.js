const { Op } = require('sequelize');
const { Store, Product, Category, Gallery } = require('../../models');

async function getProduct(req, res) {
  const slug = req.params.slug;
  try {
    const data = await Product.findOne({
      where: { slug: slug },
      include: ['store', 'category', 'gallery'],
    });

    if (!data) return res.status(404).send({ message: ' Product Not Found' });

    const product = {
      id: data.id,
      name: data.name,
      slug: data.slug,
      price: data.price,
      stock: data.stock,
      store: data.store,
      category: data.category,
      description: data.description,
      images: data.gallery.map((product) => product.image),
    };

    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    const results = await Product.findAndCountAll({
      where: query,
      limit: dataPerPage,
      offset: offset,
      include: ['store', 'category', 'gallery'],
      order: [[sortBy || 'createdAt', orderBy?.toUpperCase() || 'DESC']],
      distinct: true,
    });

    // **Jika tidak ada produk, kembalikan array kosong**
    if (results.count === 0) {
      return res.status(200).json({ products: [] });
    }

    const products = results.rows.map((data) => ({
      id: data.id,
      name: data.name,
      slug: data.slug,
      price: data.price,
      stock: data.stock,
      category: data.category?.name,
      description: data.description,
      images: data.gallery.map((gal) => gal.image),
      store: data.store,
    }));

    const totalPage = Math.floor(results.count / dataPerPage);
    const totalData = results.count;

    return res.status(200).json({
      products,
      totalPage,
      totalData,
      currentPage: parseInt(page),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
module.exports = {
  getProduct,
  getProducts,
};
