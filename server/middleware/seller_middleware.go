package middleware

import (
	"net/http"
	"server/utils"

	"github.com/gin-gonic/gin"
)

func IsSeller() gin.HandlerFunc {
	return func(c *gin.Context) {
		role := utils.MustGetRole(c)
		if role != "seller" {
			c.JSON(http.StatusForbidden, gin.H{"message": "Forbidden: Seller only"})
			c.Abort()
			return
		}
		c.Next()
	}
}
