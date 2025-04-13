package config

import (
	"fmt"
	"log"
	"os"

	"server/models"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	err := godotenv.Load("/app/.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	host := os.Getenv("DB_HOST")
	username := os.Getenv("DB_USERNAME")
	password := os.Getenv("DB_PASSWORD")
	database := os.Getenv("DB_DATABASE")

	// Format DSN
	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?parseTime=true", username, password, host, database)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Error connection to database:", err)
	}

	DB = db
	fmt.Println("Database connected!")

	migrate()
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

	fmt.Println("Migrasi success!")
}
