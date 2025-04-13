package routes

import (
	"server/controllers"
	"server/middleware"

	"github.com/gin-gonic/gin"
)

func UserRoutes(router *gin.Engine) {
	user := router.Group("/api/user")
	user.Use(middleware.ApiKeyAuth(), middleware.IsAuthenticated(), middleware.IsSeller())

	user.GET("/profile", controllers.GetProfile)
	user.PUT("/profile", controllers.UpdateProfile)
	user.GET("/address", controllers.GetAddress)
	user.POST("/address", controllers.AddAddress)
	user.PUT("/address/:addressId", controllers.UpdateAddress)
	user.DELETE("/address/:addressId", controllers.DeleteAddress)

}
