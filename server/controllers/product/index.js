const { Store, Product, Category, Gallery } = require("../../models");
const { Op } = require("sequelize");

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
          model: Category,
          as: "category",
          attributes: ["id", "name", "slug", "image"],
        },
        {
          model: Gallery,
          as: "gallery",
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
        categoryId: item.Category.id,
        categoryName: item.Category.name,
        categorySlug: item.Category.slug,
        images: item.gallery.map((item) => item.image),
      },
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await Product.findAndCountAll({
      include: [
        { model: Store, as: "store" },
        { model: Gallery, as: "gallery" },
        { model: Category, as: "category" },
      ],
    });

    if (products.count === 0) {
      return res.status(404).send({ message: "Products not found" });
    }

    console.log(products);
    const product = products.rows.map((item) => {
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
        categoryId: item.category.id,
        categoryName: item.category.name,
        categorySlug: item.category.slug,
        images: item.gallery?.map((item) => item.image),
      };
    });

    return res.status(200).send({ data: product });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
}

// async function getAllProducts(req, res) {
//   try {
//     const {
//       limit,
//       sortBy,
//       order,
//       page,
//       search,
//       category,
//       minPrice,
//       maxPrice,
//       city,
//     } = req.query;
//     const product = await Product.findAndCountAll({
//       where: query,
//       limit: dataPerPage,
//       offset: offset,

//       include: [
//         {
//           model: Store,
//           as: "store",
//         },
//         {
//           model: Gallery,
//           as: "gallery",
//         },
//       ],
//       distinct: true,
//       order: [[sortBy || "createdAt", order || "DESC"]],
//     });

//     console.log(product);

//     if (product.count === 0) {
//       return res.status(404).send({ message: "Products not found" });
//     }

//     const totalPages = Math.ceil(product.count / dataPerPage);
//     if (currentPage > totalPages || currentPage < 1) {
//       return res.status(404).send({ message: "Page not found" });
//     }

//     const data = product.rows.map((item) => {
//       return {
//         id: item.id,
//         name: item.name,
//         slug: item.slug,
//         description: item.description,
//         price: item.price,
//         stock: item.stock,
//         city: item.store.city,
//         storeId: item.storeId,
//         storeName: item.store.name,
//         storeSlug: item.store.slug,
//         storeImage: item.store.image,
//         categoryId: item.category.id,
//         categoryName: item.category.name,
//         categorySlug: item.category.slug,
//         images:
//           item.gallery && item.gallery.length
//             ? item.gallery.map((g) => g.image)
//             : [],
//       };
//     });

//     return res.status(200).send({
//       data: data,
//     });
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// }

module.exports = {
  getProduct,
  getAllProducts,
};
