const slugify = require('slugify');
const { Op } = require('sequelize');
const { Store, Product, Category, Gallery } = require('../../models');

async function getProduct(req, res) {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({
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

    return res.status(200).send({
      data: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        stock: product.stock,
        city: product.store.city,
        storeId: product.storeId,
        storeName: product.store.name,
        storeSlug: product.store.slug,
        storeImage: product.store.image,
        categoryId: product.category.id,
        categoryName: product.category.name,
        categorySlug: product.category.slug,
        images: product.gallery.map((p) => p.image),
      },
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function getProducts(req, res) {
  try {
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

    // **Filter by City**
    if (city) {
      const cities = city.split(',');

      const findCities = await Store.findAll({
        where: { city: { [Op.in]: cities } },
        attributes: ['id'],
      });
      if (findCities.length > 0) {
        query.storeId = { [Op.in]: findCities.map((c) => c.id) };
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
        {
          model: Store,
          as: 'store',
          attributes: ['id', 'name', 'slug', 'city', 'image'],
        },
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
    return res.status(500).json({ message: error.message });
  }
}
module.exports = {
  getProduct,
  getProducts,
};
