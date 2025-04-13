package controllers

import (
	"fmt"
	"net/http"
	"server/config"
	"server/models"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

func GetProduct(c *gin.Context) {
	slug := c.Param("slug")

	var product models.Product
	err := config.DB.
		Preload("Store").
		Preload("Category").
		Preload("Galleries").
		Where("slug = ?", slug).
		First(&product).Error

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Product Not Found"})
		return
	}

	store := gin.H{
		"id":     product.Store.ID,
		"name":   product.Store.Name,
		"slug":   product.Store.Slug,
		"avatar": product.Store.Avatar,
		"city":   product.Store.City,
	}

	images := []string{}
	for _, gallery := range product.Galleries {
		images = append(images, gallery.Image)
	}

	response := gin.H{
		"id":          product.ID,
		"name":        product.Name,
		"slug":        product.Slug,
		"price":       product.Price,
		"stock":       product.Stock,
		"store":       store,
		"category":    product.Category,
		"description": product.Description,
		"images":      images,
	}

	c.JSON(http.StatusOK, gin.H{"product": response})
}

func GetProducts(c *gin.Context) {

	city := c.Query("city")
	search := c.Query("search")
	category := c.Query("category")
	minPriceStr := c.Query("minPrice")
	maxPriceStr := c.Query("maxPrice")
	pageStr := c.DefaultQuery("page", "1")
	limitStr := c.DefaultQuery("limit", "5")
	sortBy := c.DefaultQuery("sortBy", "created_at")
	orderBy := strings.ToUpper(c.DefaultQuery("orderBy", "DESC"))

	page, _ := strconv.Atoi(pageStr)
	if page < 1 {
		page = 1
	}
	limit, _ := strconv.Atoi(limitStr)
	if limit < 1 {
		limit = 5
	}
	offset := (page - 1) * limit

	db := config.DB.Model(&models.Product{}).Preload("Store").Preload("Category").Preload("Galleries")

	if search != "" {
		search = "%" + search + "%"
		db = db.Where("name LIKE ? OR slug LIKE ? OR description LIKE ?", search, search, search)
	}

	if category != "" {
		categories := strings.Split(category, ",")
		var categoryIDs []uint
		config.DB.Model(&models.Category{}).Where("slug IN ?", categories).Pluck("id", &categoryIDs)

		if len(categoryIDs) == 0 {
			c.JSON(http.StatusOK, gin.H{"products": []models.Product{}})
			return
		}
		db = db.Where("category_id IN ?", categoryIDs)
	}

	if city != "" {
		cities := strings.Split(city, ",")
		for i := range cities {
			cities[i] = strings.ToLower(cities[i])
		}
		var storeIDs []uint
		config.DB.Model(&models.Store{}).Where("LOWER(city) IN ?", cities).Pluck("id", &storeIDs)

		if len(storeIDs) == 0 {
			c.JSON(http.StatusOK, gin.H{"products": []models.Product{}})
			return
		}
		db = db.Where("store_id IN ?", storeIDs)
	}

	if minPriceStr != "" || maxPriceStr != "" {
		if minPrice, err := strconv.ParseFloat(minPriceStr, 64); err == nil {
			db = db.Where("price >= ?", minPrice)
		}
		if maxPrice, err := strconv.ParseFloat(maxPriceStr, 64); err == nil {
			db = db.Where("price <= ?", maxPrice)
		}
	}

	var total int64
	db.Count(&total)

	var products []models.Product
	err := db.Order(fmt.Sprintf("%s %s", sortBy, orderBy)).
		Limit(limit).
		Offset(offset).
		Find(&products).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	result := make([]gin.H, 0)
	for _, p := range products {
		images := []string{}
		for _, g := range p.Galleries {
			images = append(images, g.Image)
		}

		result = append(result, gin.H{
			"id":          p.ID,
			"name":        p.Name,
			"slug":        p.Slug,
			"price":       p.Price,
			"stock":       p.Stock,
			"description": p.Description,
			"images":      images,
			"store": gin.H{
				"name":   p.Store.Name,
				"slug":   p.Store.Slug,
				"avatar": p.Store.Avatar,
			},
			"category": p.Category.Name,
		})
	}
	totalPage := int((total + int64(limit) - 1) / int64(limit))

	c.JSON(http.StatusOK, gin.H{
		"products":    result,
		"totalPage":   totalPage,
		"currentPage": page,
		"totalData":   total,
	})
}
