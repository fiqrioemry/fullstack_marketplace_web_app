package config

import (
	"context"
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/redis/go-redis/v9"
)

var RedisClient *redis.Client

func InitRedis() {

	host := os.Getenv("DB_HOST")
	portStr := os.Getenv("REDIS_PORT")

	port, err := strconv.Atoi(portStr)
	if err != nil {
		log.Fatalf("REDIS_PORT tidak valid: %v", err)
	}

	RedisClient = redis.NewClient(&redis.Options{
		Addr: fmt.Sprintf("%s:%d", host, port),
	})

	ctx := context.Background()
	_, err = RedisClient.Ping(ctx).Result()
	if err != nil {
		log.Fatalf("Gagal koneksi ke Redis: %v", err)
	}

	fmt.Println("Redis connected on port", port)
}
