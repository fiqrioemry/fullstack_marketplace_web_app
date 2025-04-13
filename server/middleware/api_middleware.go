package middleware

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func ApiKeyAuth() gin.HandlerFunc {

	return func(c *gin.Context) {
		apiKey := c.GetHeader("X-API-Key")

		if apiKey != os.Getenv("API_KEY") {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid API Key"})
			c.Abort()
			return
		}
		c.Next()
	}
}
