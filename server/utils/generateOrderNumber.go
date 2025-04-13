package utils

import (
	"fmt"
	"math/rand"
	"strings"
	"time"
)

func GenerateOrderNumber(transactionID string) string {
	timestamp := time.Now().Format("20060102150405.000")
	shortID := strings.ToUpper(transactionID[:6])
	random := rand.Intn(9000) + 1000

	return fmt.Sprintf("ORDER-%s-%s-%d", shortID, timestamp, random)
}
