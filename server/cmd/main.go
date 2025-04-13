package main

import (
	"fmt"

	"net/http"
	"server/config"
	"server/routes"

	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
)

func initConfig() {
	config.ConnectDatabase()
	config.InitOAuth()
	config.InitRedis()
	config.InitMailer()
	config.InitMidtrans()
	config.InitCloudinary()
}

func limitFileSize(maxSize int64) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, maxSize)
		c.Next()
	}
}

func rateLimiter(r rate.Limit, b int) gin.HandlerFunc {
	limiter := rate.NewLimiter(r, b)
	return func(c *gin.Context) {
		if !limiter.Allow() {
			c.JSON(http.StatusTooManyRequests, gin.H{"message": "Too many requests"})
			c.Abort()
			return
		}
		c.Next()
	}
}

// TODO : future enhancement. Add feature for reviewing product and comment on product
// TODO : future enhancement. Add feature for seller to able to appoint staff to managing order
// TODO : Migrate to microservices

func main() {
	initConfig()

	router := gin.Default()
	router.Use(rateLimiter(5, 10))
	router.Use(limitFileSize(5 << 20))

	routes.AuthRoutes(router)
	routes.UserRoutes(router)
	routes.CartRoutes(router)
	routes.StoreRoutes(router)
	routes.OrderRoutes(router)
	routes.ProductRoutes(router)
	routes.CategoryRoutes(router)
	routes.NotificationRoutes(router)

	port := ":5001"
	fmt.Println("Server is running on port", port)
	router.Run(port)
}
