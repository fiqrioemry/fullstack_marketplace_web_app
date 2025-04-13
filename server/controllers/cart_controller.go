package controllers

import (
	"net/http"

	"server/config"
	"server/dto"
	"server/models"
	"server/services"
	"server/utils"

	"github.com/gin-gonic/gin"
)

func AddCart(c *gin.Context) {
	storeId := utils.GetStoreID(c)
	userId := utils.MustGetUserID(c)

	var req dto.AddCartRequest
	if !utils.BindAndValidateJSON(c, &req) {
		return
	}

	err := services.AddProductToCart(userId, storeId, req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Product added to cart"})
}

func UpdateCart(c *gin.Context) {
	cartId := c.Param("cartId")
	storeId := utils.GetStoreID(c)
	userId := utils.MustGetUserID(c)

	var req dto.AddCartRequest
	if !utils.BindAndValidateJSON(c, &req) {
		return
	}

	if err := services.UpdateCartService(userId, storeId, cartId, req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Cart updated"})
}

func RemoveCart(c *gin.Context) {
	cartID := c.Param("cartId")
	userID := utils.MustGetUserID(c)

	if err := services.RemoveCartService(userID, cartID); err != nil {
		switch err.Error() {
		case "cart not found":
			c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
		case "unauthorized access":
			c.JSON(http.StatusUnauthorized, gin.H{"message": err.Error()})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to remove cart"})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Product removed from cart"})
}

func GetCarts(c *gin.Context) {
	userId := utils.MustGetUserID(c)

	var carts []models.Cart
	err := config.DB.Where("user_id = ?", userId).
		Preload("Product.Store").
		Preload("Product.Galleries").
		Find(&carts).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	if len(carts) == 0 {
		c.JSON(http.StatusOK, gin.H{"message": "Cart is empty", "cart": []gin.H{}})
		return
	}

	grouped := map[uint]gin.H{}

	for _, item := range carts {
		product := item.Product
		store := product.Store

		if _, exists := grouped[store.ID]; !exists {
			grouped[store.ID] = gin.H{
				"storeId":    store.ID,
				"storeName":  store.Name,
				"storeSlug":  store.Slug,
				"storeImage": store.Avatar,
				"items":      []gin.H{},
			}
		}

		images := []string{}
		for _, g := range product.Galleries {
			images = append(images, g.Image)
		}

		itemData := gin.H{
			"cartId":    item.ID,
			"productId": product.ID,
			"name":      product.Name,
			"slug":      product.Slug,
			"price":     product.Price,
			"stock":     product.Stock,
			"quantity":  item.Quantity,
			"images":    images,
		}

		grouped[store.ID]["items"] = append(grouped[store.ID]["items"].([]gin.H), itemData)
	}

	result := []gin.H{}
	for _, val := range grouped {
		result = append(result, val)
	}

	c.JSON(http.StatusOK, gin.H{"cart": result})
}
