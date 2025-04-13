// ======= repositories/cart_repository.go =======
package repositories

import (
	"server/config"
	"server/models"
)

func FindProductByID(productID uint) (*models.Product, error) {
	var product models.Product
	err := config.DB.Select("id", "stock", "store_id").First(&product, productID).Error
	return &product, err
}

func FindCart(query map[string]interface{}) (*models.Cart, error) {
	var cart models.Cart
	if err := config.DB.Where(query).First(&cart).Error; err != nil {
		return nil, err
	}
	return &cart, nil
}

func FindCartByID(cartID string) (*models.Cart, error) {
	var cart models.Cart
	if err := config.DB.First(&cart, cartID).Error; err != nil {
		return nil, err
	}
	return &cart, nil
}

func CreateCart(cart *models.Cart) error {
	return config.DB.Create(cart).Error
}

func UpdateCart(cart *models.Cart) error {
	return config.DB.Save(cart).Error
}

func DeleteCart(cart *models.Cart) error {
	return config.DB.Delete(cart).Error
}
