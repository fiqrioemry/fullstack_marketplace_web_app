package middleware

import (
	"net/http"
	"server/utils"
	"strings"

	"github.com/gin-gonic/gin"
)

func IsAuthenticated() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		tokenParts := strings.Split(authHeader, "Bearer ")
		if len(tokenParts) != 2 {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token format"})
			c.Abort()
			return
		}

		tokenString := tokenParts[1]
		user, err := utils.ValidateAccessToken(tokenString)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token invalid or expired"})
			c.Abort()
			return
		}

		c.Set("userId", user.UserID)
		c.Set("storeId", user.StoreID)
		c.Set("role", user.Role)

		c.Next()
	}
}
