package routes

import (
	"server/controllers"
	"server/middleware"

	"github.com/gin-gonic/gin"
)

func StoreRoutes(router *gin.Engine) {
	store := router.Group("/api/store")
	store.Use(middleware.ApiKeyAuth(), middleware.IsAuthenticated(), middleware.IsSeller())

	store.POST("/product", controllers.CreateProduct)
	store.GET("/summary", controllers.GetStoreSummary)
	store.GET("/profile", controllers.GetMyStoreProfile)
	store.PUT("/profile", controllers.UpdateStoreProfile)
	store.GET("/product", controllers.GetMyStoreProducts)
	store.PUT("/product/:productId", controllers.UpdateProduct)
	store.DELETE("/product/:productId", controllers.DeleteProduct)
}
