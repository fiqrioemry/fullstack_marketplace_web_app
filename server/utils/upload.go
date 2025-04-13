package utils

import (
	"context"
	"errors"
	"fmt"
	"io"
	"log"
	"mime/multipart"
	"os"
	"strings"

	"server/config"

	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
)

const MaxFileSize = 1 * 1024 * 1024 // 1MB

var AllowedImageTypes = []string{"image/jpeg", "image/png", "image/gif", "image/webp"}

func UploadToCloudinary(file io.Reader) (string, error) {
	ctx := context.Background()

	folder := os.Getenv("CLOUD_FOLDER")

	uploadResult, err := config.Cloud.Upload.Upload(ctx, file, uploader.UploadParams{
		Folder:         folder,
		Transformation: "w_500,h_500,c_limit,f_webp",
	})

	if err != nil {
		log.Printf("failed to upload file to Cloudinary %v :", err)
		return "", err
	}

	return uploadResult.SecureURL, nil
}

func DeleteFromCloudinary(imageURL string) error {
	ctx := context.Background()

	publicID, err := extractPublicID(imageURL)
	if err != nil {
		return err
	}

	fmt.Println(publicID)

	deleteResult, err := config.Cloud.Upload.Destroy(ctx, uploader.DestroyParams{
		PublicID: os.Getenv("CLOUD_FOLDER") + "/" + publicID,
	})
	if err != nil {
		log.Printf("Failed to delete file from Cloudinary: %v", err)
		return errors.New("failed to delete asset from Cloudinary")
	}

	if deleteResult.Result != "ok" {
		return errors.New("failed to delete asset from Cloudinary: not found")
	}

	return nil
}

func extractPublicID(imageURL string) (string, error) {
	parts := strings.Split(imageURL, "/")
	if len(parts) == 0 {
		return "", errors.New("invalid image URL")
	}

	fileName := parts[len(parts)-1]

	publicID := strings.Split(fileName, ".")[0]
	if publicID == "" {
		return "", errors.New("failed to extract public_id from image URL")
	}

	return publicID, nil
}

func ValidateImageFile(file *multipart.FileHeader) error {
	if file.Size > MaxFileSize {
		return errors.New("File size is too large, Maximum 1MB")
	}

	fileType := file.Header.Get("Content-Type")
	if !isAllowedImageType(fileType) {
		return errors.New("Invalid File format, only JPG, PNG, GIF, and WEBP are allowed")
	}

	return nil
}

func isAllowedImageType(fileType string) bool {
	for _, allowedType := range AllowedImageTypes {
		if strings.EqualFold(fileType, allowedType) {
			return true
		}
	}
	return false
}
