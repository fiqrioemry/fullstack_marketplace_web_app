// ======= services/cart_service.go =======
package services

import (
	"errors"
	"server/dto"
	"server/models"
	"server/repositories"
)

func validateCartProduct(storeID *uint, req dto.AddCartRequest) (*models.Product, error) {
	if req.Quantity <= 0 {
		return nil, errors.New("invalid quantity")
	}

	product, err := repositories.FindProductByID(req.ProductID)
	if err != nil {
		return nil, errors.New("product not found")
	}

	if storeID != nil && product.StoreID == *storeID {
		return nil, errors.New("cannot operate on product from own store")
	}

	return product, nil
}

func AddProductToCart(userID uint, storeID *uint, req dto.AddCartRequest) error {
	product, err := validateCartProduct(storeID, req)
	if err != nil {
		return err
	}

	var (
		newQty = req.Quantity
	)

	cart, err := repositories.FindCart(map[string]interface{}{
		"user_id":    userID,
		"product_id": req.ProductID,
	})

	if err == nil && cart != nil {
		newQty = cart.Quantity + req.Quantity
		if product.Stock < newQty {
			return errors.New("product is out of stock")
		}

		cart.Quantity = newQty
		return repositories.UpdateCart(cart)
	}

	if product.Stock < newQty {
		return errors.New("product is out of stock")
	}

	newCart := models.Cart{
		ProductID: req.ProductID,
		UserID:    userID,
		Quantity:  newQty,
	}
	return repositories.CreateCart(&newCart)
}

func UpdateCartService(userID uint, storeID *uint, cartID string, req dto.AddCartRequest) error {
	product, err := validateCartProduct(storeID, req)
	if err != nil {
		return err
	}

	if product.Stock < req.Quantity {
		return errors.New("product is out of stock")
	}

	cart, err := repositories.FindCartByID(cartID)
	if err != nil {
		return errors.New("cart not found")
	}
	if cart.UserID != userID {
		return errors.New("unauthorized request")
	}

	cart.ProductID = req.ProductID
	cart.Quantity = req.Quantity
	return repositories.UpdateCart(cart)
}

func RemoveCartService(userID uint, cartID string) error {
	cart, err := repositories.FindCartByID(cartID)
	if err != nil {
		return errors.New("cart not found")
	}

	if cart.UserID != userID {
		return errors.New("unauthorized access")
	}

	return repositories.DeleteCart(cart)
}
