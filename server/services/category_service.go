package services

import (
	"errors"
	"mime/multipart"
	"server/models"
	"server/repositories"
	"server/utils"
)

func GetAllCategoryService() ([]map[string]interface{}, error) {
	categories, err := repositories.GetAllCategories()
	if err != nil {
		return nil, err
	}

	var result []map[string]interface{}
	for _, category := range categories {
		result = append(result, map[string]interface{}{
			"id":    category.ID,
			"name":  category.Name,
			"slug":  category.Slug,
			"image": category.Image,
		})
	}
	return result, nil
}

func CreateCategoryService(name string, fileHeader *multipart.FileHeader) error {
	if name == "" {
		return errors.New("name is required")
	}

	if fileHeader == nil {
		return errors.New("image file is required")
	}

	if err := utils.ValidateImageFile(fileHeader); err != nil {
		return err
	}

	file, err := fileHeader.Open()
	if err != nil {
		return errors.New("failed to read image")
	}
	defer file.Close()

	imageURL, err := utils.UploadToCloudinary(file)
	if err != nil {
		return errors.New("failed to upload image")
	}

	category := &models.Category{
		Name:  name,
		Slug:  utils.CreateSlug(name),
		Image: imageURL,
	}

	if err := repositories.CreateCategory(category); err != nil {
		_ = utils.DeleteFromCloudinary(imageURL)
		return err
	}

	return nil
}

func UpdateCategoryService(id string, name string, fileHeader *multipart.FileHeader) error {
	category, err := repositories.FindCategoryByID(id)
	if err != nil {
		return errors.New("category not found")
	}

	if fileHeader != nil {
		if err := utils.ValidateImageFile(fileHeader); err != nil {
			return err
		}

		file, err := fileHeader.Open()
		if err != nil {
			return errors.New("failed to read image")
		}
		defer file.Close()

		imageURL, err := utils.UploadToCloudinary(file)
		if err != nil {
			return errors.New("failed to upload image")
		}

		if category.Image != "" {
			_ = utils.DeleteFromCloudinary(category.Image)
		}
		category.Image = imageURL
	}

	if name != "" && name != category.Name {
		category.Name = name
		category.Slug = utils.CreateSlug(name)
	}

	return repositories.UpdateCategory(category)
}

func DeleteCategoryService(id string) error {
	category, err := repositories.FindCategoryByID(id)
	if err != nil {
		return errors.New("category not found")
	}

	_ = utils.DeleteFromCloudinary(category.Image)

	return repositories.DeleteCategory(category)
}
