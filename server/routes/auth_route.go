package routes

import (
	"server/controllers"

	"server/middleware"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(router *gin.Engine) {

	auth := router.Group("/api/auth")
	auth.Use(middleware.ApiKeyAuth())

	auth.POST("/login", controllers.Login)
	auth.POST("/send-otp", controllers.SendOTP)
	auth.POST("/register", controllers.Register)
	auth.POST("/refresh", controllers.RefreshToken)
	auth.POST("/verify-otp", controllers.VerifyOTP)
	auth.GET("/me", middleware.IsAuthenticated(), controllers.AuthCheck)
	auth.POST("/logout", middleware.IsAuthenticated(), controllers.Logout)
	auth.POST("/create-store", middleware.IsAuthenticated(), controllers.CreateStore)

	router.GET("/api/auth/google", middleware.IsAuthenticated(), controllers.GoogleAuth)
	router.GET("/api/auth/google/callback", middleware.IsAuthenticated(), controllers.GoogleAuthCallback)
}
