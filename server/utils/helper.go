package utils

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func IfEmpty(newVal, oldVal string) string {
	if newVal == "" {
		return oldVal
	}
	return newVal
}

func BindAndValidateJSON[T any](c *gin.Context, req *T) bool {
	if err := c.ShouldBindJSON(req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid request", "error": err.Error()})
		return false
	}
	return true
}

func StringToFloat(s string) float64 {
	val, err := strconv.ParseFloat(s, 64)
	if err != nil {
		return 0
	}
	return val
}

func StringToInt(s string) int {
	val, err := strconv.Atoi(s)
	if err != nil {
		return 0
	}
	return val
}

func StringToUint(s string) uint {
	val, err := strconv.ParseUint(s, 10, 64)
	if err != nil {
		return 0
	}
	return uint(val)
}

func UintToString(value uint) string {
	return strconv.FormatUint(uint64(value), 10)
}
