package config

import (
	"fmt"
	"log"
	"os"
	"time"

	"server/models"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	_ = godotenv.Load("/app/.env") // ignore error, karena bisa juga pakai docker-compose env_file

	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT") // tambahkan port
	username := os.Getenv("DB_USERNAME")
	password := os.Getenv("DB_PASSWORD")
	database := os.Getenv("DB_DATABASE")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true", username, password, host, port, database)

	var db *gorm.DB
	var err error

	// Retry maksimal 10x dengan jeda 2 detik
	for i := 1; i <= 10; i++ {
		db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
		if err == nil {
			DB = db
			fmt.Println("Database connected!")
			migrate()
			return
		}

		log.Printf("Gagal koneksi ke database (percobaan %d): %v", i, err)
		time.Sleep(2 * time.Second)
	}

	log.Fatal("Gagal koneksi ke database setelah 10 kali percobaan.")
}

func migrate() {
	err := DB.AutoMigrate(
		&models.User{},
		&models.Store{},
		&models.Product{},
		&models.Category{},
		&models.Transaction{},
		&models.Order{},
		&models.OrderDetail{},
		&models.Cart{},
		&models.Address{},
		&models.Notification{},
		&models.Gallery{},
		&models.Shipment{},
	)
	if err != nil {
		log.Fatal("Migration failed:", err)
	}

	fmt.Println("Migration success!")
}
