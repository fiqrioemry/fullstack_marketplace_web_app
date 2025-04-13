package routes

import (
	"server/controllers"
	"server/middleware"

	"github.com/gin-gonic/gin"
)

func ProductRoutes(router *gin.Engine) {
	product := router.Group("/api/product")
	product.Use(middleware.ApiKeyAuth())

	product.GET("/", controllers.GetProducts)
	product.GET("/:slug", controllers.GetProduct)
	product.GET("/store/:slug", controllers.GetStoreInfo)

}
