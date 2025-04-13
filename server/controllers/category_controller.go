package controllers

import (
	"net/http"
	"server/services"

	"github.com/gin-gonic/gin"
)

func GetCategories(c *gin.Context) {
	data, err := services.GetAllCategoryService()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"categories": data})
}

func CreateCategory(c *gin.Context) {
	name := c.PostForm("name")
	file, err := c.FormFile("image")
	if err != nil && err != http.ErrMissingFile {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid image file"})
		return
	}
	if err := services.CreateCategoryService(name, file); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "New Category Created"})
}

func UpdateCategory(c *gin.Context) {
	id := c.Param("categoryId")
	name := c.PostForm("name")
	file, _ := c.FormFile("image")

	if err := services.UpdateCategoryService(id, name, file); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Category updated"})
}

func DeleteCategory(c *gin.Context) {
	id := c.Param("categoryId")
	if err := services.DeleteCategoryService(id); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Category Deleted"})
}
