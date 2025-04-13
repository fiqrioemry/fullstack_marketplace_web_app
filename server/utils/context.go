package utils

import (
	"github.com/gin-gonic/gin"
)

func MustGetUserID(c *gin.Context) uint {
	val, exists := c.Get("userId")
	if !exists {
		panic("userId not found in context — make sure to use IsAuthenticated middleware")
	}
	return val.(uint)
}

func MustGetRole(c *gin.Context) string {
	val, exists := c.Get("role")
	if !exists {
		panic("Role not found in context")
	}
	return val.(string)
}

func MustGetStoreID(c *gin.Context) uint {
	val, exists := c.Get("storeId")
	if !exists {
		panic("storeId not found in context")
	}

	switch v := val.(type) {
	case uint:
		return v
	case *uint:
		if v == nil {
			panic("storeId is nil pointer")
		}
		return *v
	default:
		panic("invalid storeId type in context")
	}
}

func GetStoreID(c *gin.Context) *uint {
	val, exists := c.Get("storeId")
	if !exists {
		return nil
	}

	switch v := val.(type) {
	case uint:
		return &v
	case *uint:
		return v
	default:
		return nil
	}
}
