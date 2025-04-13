package routes

import (
	"server/controllers"
	"server/middleware"

	"github.com/gin-gonic/gin"
)

func OrderRoutes(router *gin.Engine) {

	customer := router.Group("/api/customer")
	customer.Use(middleware.ApiKeyAuth(), middleware.IsAuthenticated())

	// transaction
	customer.GET("/transaction", controllers.GetAllTransactions)
	customer.POST("/transaction", controllers.CreateNewTransaction)
	customer.PUT("/transaction/:transactionId", controllers.CancelTransaction)
	customer.GET("/transaction/:transactionId", controllers.GetTransactionDetail)

	// order - customer
	customer.GET("/order", controllers.GetAllCustomerOrders)
	customer.GET("/order/:orderId", controllers.GetCustomerOrderDetail)
	customer.GET("/order/:orderId/shipment", controllers.GetShipmentDetail)
	customer.PUT("/order/:orderId/cancel", controllers.CancelOrderByCustomer)
	customer.PUT("/order/:orderId/confirm", controllers.ConfirmOrderByCustomer)

	seller := router.Group("/api/seller")
	seller.Use(middleware.IsAuthenticated(), middleware.IsSeller())

	// order - seller
	seller.GET("/order", controllers.GetAllSellerOrders)
	seller.GET("/order/:orderId", controllers.GetSellerOrderDetail)
	seller.PUT("/order/:orderId/cancel", controllers.CancelOrderBySeller)
	seller.PUT("/order/:orderId/confirm", controllers.ConfirmOrderBySeller)

}
