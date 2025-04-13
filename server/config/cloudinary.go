package config

import (
	"fmt"
	"log"
	"os"

	"github.com/cloudinary/cloudinary-go/v2"
)

var Cloud *cloudinary.Cloudinary

func InitCloudinary() {

	apiKey := os.Getenv("API_KEY")
	apiSecret := os.Getenv("API_SECRET")
	cloudName := os.Getenv("CLOUD_NAME")

	cloud, err := cloudinary.NewFromParams(cloudName, apiKey, apiSecret)
	if err != nil {
		log.Fatalf("Failed to initialize Cloudinary: %v", err)
	}

	Cloud = cloud
	fmt.Println("Cloudinary configured!")
}
