package config

import (
	"context"
	"fmt"
	"os"

	"github.com/redis/go-redis/v9"
)

var RedisClient *redis.Client

func InitRedis() {
	addr := fmt.Sprintf("%s:%s", os.Getenv("REDIS_HOST"), os.Getenv("REDIS_PORT"))

	RedisClient = redis.NewClient(&redis.Options{
		Addr: addr,
	})

	_, err := RedisClient.Ping(context.Background()).Result()
	if err != nil {
		fmt.Printf("Gagal koneksi ke Redis: %v\n", err)
		os.Exit(1)
	}
}
