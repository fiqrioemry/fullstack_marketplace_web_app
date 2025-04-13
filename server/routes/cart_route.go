package routes

import (
	"server/controllers"
	"server/middleware"

	"github.com/gin-gonic/gin"
)

func CartRoutes(router *gin.Engine) {
	cart := router.Group("/api/cart")
	cart.Use(middleware.ApiKeyAuth(), middleware.IsAuthenticated())

	cart.GET("/", controllers.GetCarts)
	cart.POST("/", controllers.AddCart)
	cart.PUT("/:cartId", controllers.UpdateCart)
	cart.DELETE("/:cartId", controllers.RemoveCart)
}
