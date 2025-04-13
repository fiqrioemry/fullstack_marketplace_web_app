package routes

import (
	"server/controllers"
	"server/middleware"

	"github.com/gin-gonic/gin"
)

func NotificationRoutes(router *gin.Engine) {
	notif := router.Group("/api/notification")

	notif.POST("/", controllers.CreateOrderNotification)
	notif.GET("/customer", middleware.IsAuthenticated(), controllers.GetAllCustomerNotifications)
	notif.GET("/seller", middleware.IsAuthenticated(), middleware.IsSeller(), controllers.GetAllSellerNotifications)
}
