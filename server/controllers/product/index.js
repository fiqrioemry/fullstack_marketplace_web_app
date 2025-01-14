const { Store, Product, Categories, Galleries } = require("../../models");

async function getProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      where: { id: id },
      attributes: ["id", "slug", "name", "description", "price", "stock"],
      include: [
        {
          model: Store,
          as: "store",
          attributes: ["id", "name", "slug", "image", "city"],
        },
        {
          model: Categories,
          as: "categories",
          attributes: ["id", "name", "slug", "image"],
        },
        {
          model: Galleries,
          as: "galleries",
          attributes: ["image"],
        },
      ],
    });

    if (product) {
      return res.status(200).send({ data: [], message: "Product not found" });
    }

    return res.status(200).send({
      data: {
        id: item.id,
        name: item.name,
        slug: item.slug,
        description: item.description,
        price: item.price,
        stock: item.stock,
        city: item.store.city,
        storeId: item.storeId,
        storeName: item.store.name,
        storeSlug: item.store.slug,
        storeImage: item.store.image,
        categoryId: item.categories.id,
        categoryName: item.categories.name,
        categorySlug: item.categories.slug,
        images: item.galleries.map((item) => item.image),
      },
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function getAllProducts(req, res) {
  try {
    const {
      limit,
      sortBy,
      order,
      page,
      search,
      category,
      minPrice,
      maxPrice,
      city,
    } = req.query;
    const dataPerPage = parseInt(limit) || 10;
    const currentPage = parseInt(page) || 1;
    const offset = (currentPage - 1) * dataPerPage;

    // check if there are any queries
    const query = {};
    if (search) {
      query[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `${search}` } },
      ];
    }

    if (category) {
      const findCategory = await Categories.findOne({
        where: { slug: category },
      });
      if (findCategory) {
        query.categoryId = findCategory.id;
      } else {
        return res
          .status(404)
          .send({ message: "Product with specified category Not Found" });
      }
    }
    if (city) {
      const cities = city.split(",");
      const findCities = await Store.findAll({
        where: { city: { [Op.in]: cities } },
      });
      if (findCities.length > 0) {
        query.storeId = { [Op.in]: findCities.map((c) => c.id) };
      } else {
        return res.status(404).send({
          message: "Product with specified city Not Found",
        });
      }
    }
    if (minPrice && maxPrice) {
      query.price = {
        [Op.between]: [minPrice, maxPrice],
      };
    } else if (minPrice) {
      query.price = {
        [Op.gte]: minPrice,
      };
    } else if (maxPrice) {
      query.price = {
        [Op.lte]: maxPrice,
      };
    }

    const product = await Product.findAndCountAll({
      where: query,
      limit: dataPerPage,
      offset: offset,
      attributes: [
        "id",
        "storeId",
        "name",
        "slug",
        "price",
        "stock",
        "createdAt",
        "description",
      ],
      include: [
        {
          model: Store,
          as: "store",
          attributes: ["name", "slug", "city"],
        },
        {
          model: Categories,
          as: "categories",
          attributes: ["id", "name", "image", "slug"],
        },
        {
          model: Galleries,
          as: "galleries",
          attributes: ["image"],
        },
      ],
      distinct: true,
      order: [[sortBy || "createdAt", order || "DESC"]],
    });

    if (product.count === 0) {
      return res.status(404).send({ message: "Products not found" });
    }

    const totalPages = Math.ceil(product.count / dataPerPage);
    if (currentPage > totalPages || currentPage < 1) {
      return res.status(404).send({ message: "Page not found" });
    }

    const data = product.rows.map((item) => {
      return {
        id: item.id,
        name: item.name,
        slug: item.slug,
        description: item.description,
        price: item.price,
        stock: item.stock,
        city: item.store.city,
        storeId: item.storeId,
        storeName: item.store.name,
        storeSlug: item.store.slug,
        storeImage: item.store.image,
        categoryId: item.categories.id,
        categoryName: item.categories.name,
        categorySlug: item.categories.slug,
        images: item.galleries.map((item) => item.image),
      };
    });

    return res.status(200).send({
      data: data,
      totalProducts: product.count,
      currentPage,
      dataPerPage,
      totalPages,
      offset,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  getProduct,
  getAllProducts,
};
