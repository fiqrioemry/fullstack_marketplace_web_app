package controllers

import (
	"fmt"
	"net/http"
	"server/config"
	"server/models"
	"server/utils"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

func GetStoreInfo(c *gin.Context) {
	slug := c.Param("slug")

	var store models.Store
	err := config.DB.Where("slug = ?", slug).First(&store).Error
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Store not found"})
		return
	}

	var products []models.Product
	config.DB.Preload("Galleries").Preload("Category").Where("store_id = ?", store.ID).Find(&products)

	storeData := gin.H{
		"slug":        store.Slug,
		"name":        store.Name,
		"banner":      store.Banner,
		"city":        store.City,
		"avatar":      store.Avatar,
		"description": store.Description,
	}

	productData := []gin.H{}
	for _, p := range products {
		images := []string{}
		for _, g := range p.Galleries {
			images = append(images, g.Image)
		}
		productData = append(productData, gin.H{
			"id":     p.ID,
			"name":   p.Name,
			"slug":   p.Slug,
			"price":  p.Price,
			"images": images,
			"store":  storeData,
		})
	}

	c.JSON(http.StatusOK, gin.H{"store": storeData, "products": productData})
}

func GetMyStoreProfile(c *gin.Context) {
	userID := utils.MustGetUserID(c)
	storeID := utils.MustGetStoreID(c)

	var store models.Store
	err := config.DB.First(&store, storeID).Error
	if err != nil || store.UserID != userID {
		c.JSON(http.StatusForbidden, gin.H{"message": "Forbidden !!! Access Denied"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"name":        store.Name,
		"city":        store.City,
		"banner":      store.Banner,
		"avatar":      store.Avatar,
		"balance":     store.Balance,
		"description": store.Description,
	})
}

func UpdateStoreProfile(c *gin.Context) {
	storeID := utils.MustGetStoreID(c)
	name := c.PostForm("name")
	city := c.PostForm("city")
	description := c.PostForm("description")
	avatarHeader, _ := c.FormFile("avatar")
	bannerHeader, _ := c.FormFile("banner")

	var store models.Store
	if err := config.DB.First(&store, storeID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Store not found"})
		return
	}

	isUpdated := (name != "" && name != store.Name) ||
		(city != "" && city != store.City) ||
		(description != "" && description != store.Description) ||
		avatarHeader != nil || bannerHeader != nil

	if !isUpdated {
		c.JSON(http.StatusBadRequest, gin.H{"message": "No changes detected"})
		return
	}

	// Avatar
	if avatarHeader != nil {
		if err := utils.ValidateImageFile(avatarHeader); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}
		avatarFile, err := avatarHeader.Open()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to read avatar"})
			return
		}
		defer avatarFile.Close()

		uploadedURL, err := utils.UploadToCloudinary(avatarFile)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to upload avatar"})
			return
		}
		if store.Avatar != "" {
			_ = utils.DeleteFromCloudinary(store.Avatar)
		}
		store.Avatar = uploadedURL
	}

	// Banner
	if bannerHeader != nil {
		if err := utils.ValidateImageFile(bannerHeader); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}
		bannerFile, err := bannerHeader.Open()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to read banner"})
			return
		}
		defer bannerFile.Close()

		uploadedURL, err := utils.UploadToCloudinary(bannerFile)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to upload banner"})
			return
		}
		if store.Banner != "" {
			_ = utils.DeleteFromCloudinary(store.Banner)
		}
		store.Banner = uploadedURL
	}

	// Update text fields
	store.Name = utils.IfEmpty(name, store.Name)
	store.City = utils.IfEmpty(city, store.City)
	store.Description = utils.IfEmpty(description, store.Description)

	if err := config.DB.Save(&store).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to update store profile"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Store profile updated"})
}

func GetMyStoreProducts(c *gin.Context) {
	storeID := utils.MustGetStoreID(c)
	search := c.Query("search")
	sortBy := c.DefaultQuery("sortBy", "created_at")
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "5"))
	orderBy := strings.ToUpper(c.DefaultQuery("orderBy", "DESC"))

	offset := (page - 1) * limit

	var products []models.Product
	db := config.DB.Model(&models.Product{}).Where("store_id = ?", storeID)

	if search != "" {
		db = db.Where("name LIKE ?", "%"+search+"%")
	}

	db = db.Preload("Galleries").Preload("Category")

	var total int64
	db.Count(&total)
	db.Limit(limit).Offset(offset).Order(fmt.Sprintf("%s %s", sortBy, orderBy)).Find(&products)

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
			"category":    p.Category.Name,
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

func CreateProduct(c *gin.Context) {
	storeID := utils.MustGetStoreID(c)

	name := c.PostForm("name")
	price := c.PostForm("price")
	stock := c.PostForm("stock")
	categoryID := c.PostForm("categoryId")
	description := c.PostForm("description")

	if name == "" || description == "" || price == "" || stock == "" || categoryID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "All fields are required"})
		return
	}

	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid form data"})
		return
	}

	files := form.File["images"]
	if len(files) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Must upload at least 1 image"})
		return
	}

	for _, file := range files {
		if err := utils.ValidateImageFile(file); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}
	}

	slug := utils.CreateSlug(name)

	var existing models.Product
	if err := config.DB.Where("slug = ? AND store_id = ?", slug, storeID).First(&existing).Error; err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Product name must be unique"})
		return
	}

	tx := config.DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	var category models.Category
	if err := tx.First(&category, utils.StringToUint(categoryID)).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid category"})
		return
	}

	var galleries []models.Gallery
	var uploadedURLs []string

	for _, file := range files {
		opened, err := file.Open()
		if err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to read image"})
			return
		}
		defer opened.Close()

		url, err := utils.UploadToCloudinary(opened)
		if err != nil {
			tx.Rollback()
			for _, uploaded := range uploadedURLs {
				_ = utils.DeleteFromCloudinary(uploaded)
			}
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to upload image"})
			return
		}

		uploadedURLs = append(uploadedURLs, url)
		galleries = append(galleries, models.Gallery{Image: url})
	}
	product := models.Product{
		Name:        name,
		Slug:        slug,
		Description: description,
		StoreID:     storeID,
		Price:       utils.StringToFloat(price),
		Stock:       utils.StringToInt(stock),
		CategoryID:  utils.StringToUint(categoryID),
	}

	if err := tx.Create(&product).Error; err != nil {
		tx.Rollback()
		for _, url := range uploadedURLs {
			_ = utils.DeleteFromCloudinary(url)
		}
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to create product"})
		return
	}

	for i := range galleries {
		galleries[i].ProductID = product.ID
	}

	if err := tx.Create(&galleries).Error; err != nil {
		tx.Rollback()
		for _, url := range uploadedURLs {
			_ = utils.DeleteFromCloudinary(url)
		}
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to save product gallery"})
		return
	}

	tx.Commit()

	c.JSON(http.StatusCreated, gin.H{"message": "New product is created"})
}

func UpdateProduct(c *gin.Context) {
	productID := c.Param("productId")
	storeID := utils.MustGetStoreID(c)
	name := c.PostForm("name")
	price := c.PostForm("price")
	stock := c.PostForm("stock")
	categoryID := c.PostForm("categoryId")
	description := c.PostForm("description")

	var product models.Product
	if err := config.DB.Preload("Galleries").Where("id = ? AND store_id = ?", productID, storeID).First(&product).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Product not found"})
		return
	}

	form, err := c.MultipartForm()
	if err != nil && err != http.ErrNotMultipart {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid form data"})
		return
	}

	files := form.File["images"]

	var uploadedURLs []string
	var newGalleries []models.Gallery

	if len(files) > 0 {
		for _, file := range files {
			if err := utils.ValidateImageFile(file); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
				return
			}

			opened, err := file.Open()
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to read image"})
				return
			}
			defer opened.Close()

			url, err := utils.UploadToCloudinary(opened)
			if err != nil {
				for _, u := range uploadedURLs {
					_ = utils.DeleteFromCloudinary(u)
				}
				c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to upload image"})
				return
			}

			uploadedURLs = append(uploadedURLs, url)
			newGalleries = append(newGalleries, models.Gallery{Image: url})
		}
	}

	product.Name = utils.IfEmpty(name, product.Name)
	product.Description = utils.IfEmpty(description, product.Description)
	if price != "" {
		product.Price = utils.StringToFloat(price)
	}
	if stock != "" {
		product.Stock = utils.StringToInt(stock)
	}
	if categoryID != "" {
		product.CategoryID = utils.StringToUint(categoryID)
	}
	product.Slug = utils.CreateSlug(product.Name)

	if err := config.DB.Save(&product).Error; err != nil {
		for _, u := range uploadedURLs {
			_ = utils.DeleteFromCloudinary(u)
		}
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to update product"})
		return
	}

	if len(newGalleries) > 0 {
		for _, old := range product.Galleries {
			_ = utils.DeleteFromCloudinary(old.Image)
		}

		_ = config.DB.Where("product_id = ?", product.ID).Delete(&models.Gallery{})

		for i := range newGalleries {
			newGalleries[i].ProductID = product.ID
		}
		if err := config.DB.Create(&newGalleries).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to update gallery"})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "Product updated successfully"})
}

func DeleteProduct(c *gin.Context) {
	productID := c.Param("productId")
	tx := config.DB.Begin()

	var product models.Product
	if err := tx.First(&product, productID).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusNotFound, gin.H{"message": "Product not found"})
		return
	}

	var images []models.Gallery
	tx.Where("product_id = ?", productID).Find(&images)
	for _, img := range images {
		_ = utils.DeleteFromCloudinary(img.Image)
	}
	tx.Where("product_id = ?", productID).Delete(&models.Gallery{})
	tx.Delete(&product)
	tx.Commit()

	c.JSON(http.StatusOK, gin.H{"message": "Product deleted successfully"})
}

func GetStoreSummary(c *gin.Context) {
	storeID := utils.MustGetStoreID(c)

	type DayStat struct {
		Date         string  `json:"date"`
		OrderCount   int     `json:"order_count"`
		TotalRevenue float64 `json:"total_revenue"`
	}

	type TopProduct struct {
		ProductID uint `json:"productId"`
		TotalSold int  `json:"total_sold"`
		Product   struct {
			ID    uint    `json:"id"`
			Name  string  `json:"name"`
			Price float64 `json:"price"`
			Stock int     `json:"stock"`
			Sold  int     `json:"sold"`
		} `json:"product"`
	}

	var (
		totalOrders   int64
		pendingOrders int64
		totalRevenue  float64
		ordersByDay   []DayStat
		revenueByDay  []DayStat
		topSelling    []TopProduct
		totalProducts int64
	)

	db := config.DB
	// 1. Count total orders (pending + success)
	db.Model(&models.Order{}).
		Where("store_id = ? AND order_status IN ?", storeID, []string{"pending", "success"}).
		Count(&totalOrders)

	// 2. Count pending orders
	db.Model(&models.Order{}).
		Where("store_id = ? AND order_status = ?", storeID, "pending").
		Count(&pendingOrders)

	// 3. Sum total revenue
	db.Model(&models.Order{}).
		Select("COALESCE(SUM(total_order_amount), 0)").
		Where("store_id = ?", storeID).
		Scan(&totalRevenue)

	// 4. Orders by day
	db.Raw(`
		SELECT DATE(created_at) as date, COUNT(id) as order_count, 0 as total_revenue
		FROM orders
		WHERE store_id = ? AND order_status IN ('pending', 'success')
		GROUP BY DATE(created_at)
		ORDER BY DATE(created_at) ASC
	`, storeID).Scan(&ordersByDay)

	// 5. Revenue by day
	db.Raw(`
		SELECT DATE(created_at) as date, 0 as order_count, SUM(total_order_amount) as total_revenue
		FROM orders
		WHERE store_id = ? AND order_status IN ('pending', 'success')
		GROUP BY DATE(created_at)
		ORDER BY DATE(created_at) ASC
	`, storeID).Scan(&revenueByDay)

	// 6. Top 5 selling products
	db.Raw(`
		SELECT od.product_id,
			SUM(od.quantity) as total_sold,
			p.id as "product.id",
			p.name as "product.name",
			p.price as "product.price",
			p.stock as "product.stock",
			p.sold as "product.sold"
		FROM order_details od
		JOIN products p ON p.id = od.product_id
		WHERE p.store_id = ?
		GROUP BY od.product_id, p.id, p.name, p.price, p.stock, p.sold
		ORDER BY total_sold DESC
		LIMIT 5
	`, storeID).Scan(&topSelling)

	// 7. Total products
	db.Model(&models.Product{}).
		Where("store_id = ?", storeID).
		Count(&totalProducts)

	c.JSON(http.StatusOK, gin.H{
		"statistic": gin.H{
			"totalOrders":        totalOrders,
			"pendingOrders":      pendingOrders,
			"totalRevenue":       totalRevenue,
			"ordersByDay":        ordersByDay,
			"revenueByDay":       revenueByDay,
			"totalProducts":      totalProducts,
			"topSellingProducts": topSelling,
		},
	})
}
