package repositories

import (
	"server/config"
	"server/models"
)

func FindUserByEmail(email string) (*models.User, error) {
	var user models.User
	if err := config.DB.Preload("Store").Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func FindUserWithStoreByID(userID uint) (*models.User, error) {
	var user models.User
	if err := config.DB.Preload("Store").First(&user, userID).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func CreateUser(user *models.User) error {
	return config.DB.Create(user).Error
}

func FindStoreByUserID(userID uint) (*models.Store, error) {
	var store models.Store
	if err := config.DB.Where("user_id = ?", userID).First(&store).Error; err != nil {
		return nil, err
	}
	return &store, nil
}

func CreateStore(store *models.Store) error {
	return config.DB.Create(store).Error
}

func FindUserByID(userID uint) (*models.User, error) {
	var user models.User
	if err := config.DB.First(&user, userID).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func UpdateUserRole(userID uint, role string) error {
	return config.DB.Model(&models.User{}).
		Where("id = ?", userID).
		Update("role", role).Error
}
