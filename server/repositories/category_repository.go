package repositories

import (
	"server/config"
	"server/models"
)

func GetAllCategories() ([]models.Category, error) {
	var categories []models.Category
	err := config.DB.Find(&categories).Error
	return categories, err
}

func FindCategoryByID(id string) (*models.Category, error) {
	var category models.Category
	err := config.DB.First(&category, id).Error
	return &category, err
}

func CreateCategory(category *models.Category) error {
	return config.DB.Create(category).Error
}

func UpdateCategory(category *models.Category) error {
	return config.DB.Save(category).Error
}

func DeleteCategory(category *models.Category) error {
	return config.DB.Delete(category).Error
}
