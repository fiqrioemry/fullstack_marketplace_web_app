package services

import (
	"errors"
	"net/http"
	"server/config"
	"server/dto"
	"server/models"
	"server/utils"

	"github.com/gin-gonic/gin"
)

func GetUserProfile(userID uint) (map[string]interface{}, error) {
	var user models.User
	if err := config.DB.First(&user, userID).Error; err != nil {
		return nil, errors.New("user not found")
	}
	return map[string]interface{}{
		"phone":     user.Phone,
		"avatar":    user.Avatar,
		"gender":    user.Gender,
		"fullname":  user.Fullname,
		"birthday":  user.Birthday,
		"email":     user.Email,
		"balance":   user.Balance,
		"createdAt": user.CreatedAt,
	}, nil
}

func UpdateUserProfile(c *gin.Context, userID uint) error {
	phone := c.PostForm("phone")
	gender := c.PostForm("gender")
	fullname := c.PostForm("fullname")
	birthday := c.PostForm("birthday")
	fileHeader, err := c.FormFile("avatar")
	if err != nil && err != http.ErrMissingFile {
		return errors.New("invalid avatar file")
	}

	var user models.User
	if err := config.DB.First(&user, userID).Error; err != nil {
		return errors.New("user not found")
	}

	isUpdated := (phone != "" && phone != user.Phone) ||
		(gender != "" && gender != user.Gender) ||
		(birthday != "" && birthday != user.Birthday) ||
		(fullname != "" && fullname != user.Fullname) ||
		fileHeader != nil
	if !isUpdated {
		return errors.New("no changes detected")
	}

	if fileHeader != nil {
		if err := utils.ValidateImageFile(fileHeader); err != nil {
			return err
		}
		file, err := fileHeader.Open()
		if err != nil {
			return errors.New("failed to read avatar")
		}
		defer file.Close()
		uploadedURL, err := utils.UploadToCloudinary(file)
		if err != nil {
			return errors.New("failed to upload avatar")
		}
		if user.Avatar != "" {
			_ = utils.DeleteFromCloudinary(user.Avatar)
		}
		user.Avatar = uploadedURL
	}

	user.Phone = utils.IfEmpty(phone, user.Phone)
	user.Gender = utils.IfEmpty(gender, user.Gender)
	user.Fullname = utils.IfEmpty(fullname, user.Fullname)
	user.Birthday = utils.IfEmpty(birthday, user.Birthday)

	if err := config.DB.Save(&user).Error; err != nil {
		if fileHeader != nil && user.Avatar != "" {
			_ = utils.DeleteFromCloudinary(user.Avatar)
		}
		return errors.New("failed to update profile")
	}

	return nil
}

func GetUserAddresses(userID uint) ([]map[string]interface{}, error) {
	var addresses []models.Address
	if err := config.DB.Where("user_id = ?", userID).Find(&addresses).Error; err != nil {
		return nil, err
	}

	var result []map[string]interface{}
	for _, addr := range addresses {
		result = append(result, map[string]interface{}{
			"id":       addr.ID,
			"name":     addr.Name,
			"isMain":   addr.IsMain,
			"address":  addr.Address,
			"province": addr.Province,
			"city":     addr.City,
			"zipcode":  addr.Zipcode,
			"phone":    addr.Phone,
		})
	}

	return result, nil
}

func AddUserAddress(userID uint, req dto.AddAddressRequest) error {
	var count int64
	config.DB.Model(&models.Address{}).Where("user_id = ?", userID).Count(&count)

	if count == 0 {
		req.IsMain = true
	} else if req.IsMain {
		config.DB.Model(&models.Address{}).Where("user_id = ?", userID).Update("is_main", false)
	}

	address := models.Address{
		UserID:   userID,
		Name:     req.Name,
		Phone:    req.Phone,
		Address:  req.Address,
		Province: req.Province,
		City:     req.City,
		Zipcode:  req.Zipcode,
		IsMain:   req.IsMain,
	}

	return config.DB.Create(&address).Error
}

func UpdateUserAddress(userID uint, addressID string, req dto.AddAddressRequest) error {
	var current models.Address
	if err := config.DB.First(&current, addressID).Error; err != nil || current.UserID != userID {
		return errors.New("address not found")
	}

	if req.IsMain {
		config.DB.Model(&models.Address{}).Where("user_id = ? AND id != ?", userID, addressID).Update("is_main", false)
	}

	result := config.DB.Model(&current).Updates(models.Address{
		Name:     req.Name,
		Phone:    req.Phone,
		Address:  req.Address,
		Province: req.Province,
		City:     req.City,
		Zipcode:  req.Zipcode,
		IsMain:   req.IsMain,
	})

	if result.RowsAffected == 0 {
		return errors.New("no changes made to the address")
	}

	return nil
}

func DeleteUserAddress(userID uint, addressID string) error {
	var address models.Address
	if err := config.DB.First(&address, addressID).Error; err != nil || address.UserID != userID {
		return errors.New("address not found")
	}

	return config.DB.Delete(&address).Error
}
