const { Category } = require("../../models");
const { deleteMediaFromCloudinary } = require("../../utils/cloudinary");
const createSlug = require("../../utils/createSlug");

async function createCategory(req, res) {
  const image = req.file;
  const { name } = req.body;
  try {
    const slug = createSlug(name);

    const category = await Category.create({
      name,
      image,
      slug,
    });

    return res.status(201).send({
      message: "New Category is created",
      data: category,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function updateCategory(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const image = req.file;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    let imageUrl = category.image;

    if (image) {
      const uploadResult = await uploadMediaToCloudinary(image.path);

      if (category.image) {
        await deleteMediaFromCloudinary(category.image);
      }

      imageUrl = uploadResult.secure_url;
    }

    const slug = name ? createSlug(name) : category.slug;

    await category.update({
      name: name || category.name,
      image: imageUrl,
      slug,
    });

    return res.status(200).send({
      message: "Category is updated",
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
}

async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    await deleteMediaFromCloudinary(category.image);

    await category.destroy();

    return res.status(200).send({
      message: "Category is deleted",
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function getAllCategory(req, res) {
  try {
    const category = await Category.findAll();

    return res.status(200).send({
      data: category,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
