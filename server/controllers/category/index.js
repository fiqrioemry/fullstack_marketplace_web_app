const { Category } = require('../../models');
const createSlug = require('../../utils/createSlug');
const uploadToCloudinary = require('../../utils/uploadToCloudinary');
const deleteFromCloudinary = require('../../utils/deleteFromCloudinary');

async function createCategory(req, res) {
  const image = req.file;
  const name = req.body.name;
  try {
    const slug = createSlug(name);

    const category = await Category.create({
      name,
      image,
      slug,
    });

    return res.status(201).send({
      message: 'New Category Created',
      category,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

async function updateCategory(req, res) {
  const image = req.file;
  const id = req.params.id;
  const name = req.body.name;

  try {
    if (!image || !id || !name)
      return res.status(400).send({ message: 'All field required' });

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }

    let imageUrl = category.image;

    if (image) {
      const uploadResult = await uploadToCloudinary(image.path);

      if (category.image) {
        await deleteFromCloudinary(category.image);
      }

      imageUrl = uploadResult.secure_url;
    }

    const slug = name ? createSlug(name) : category.slug;

    const updatedCategory = {
      name: name || category.name,
      image: imageUrl,
      slug,
    };

    await category.update(updatedCategory);

    return res.status(200).send({
      message: 'Category Updated',
      updatedCategory,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

async function deleteCategory(req, res) {
  const id = req.params.id;
  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }

    await deleteFromCloudinary(category.image);

    await category.destroy();

    return res.status(200).send({
      message: 'Category Deleted',
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function getCategories(req, res) {
  try {
    const category = await Category.findAll();

    return res.status(200).send({
      category,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
