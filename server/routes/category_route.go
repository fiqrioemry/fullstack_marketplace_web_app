package routes

import (
	"server/controllers"
	"server/middleware"

	"github.com/gin-gonic/gin"
)

func CategoryRoutes(router *gin.Engine) {
	category := router.Group("/api/category")
	category.Use(middleware.ApiKeyAuth(), middleware.IsAuthenticated(), middleware.IsAdmin())

	router.GET("/api/category", controllers.GetCategories)
	category.POST("/", middleware.IsAuthenticated(), middleware.IsAdmin(), controllers.CreateCategory)
	category.PUT("/:categoryId", middleware.IsAuthenticated(), middleware.IsAdmin(), controllers.UpdateCategory)
	category.DELETE("/:categoryId", middleware.IsAuthenticated(), middleware.IsAdmin(), controllers.DeleteCategory)
}
