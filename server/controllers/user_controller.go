// package controllers

// import (
// 	"net/http"
// 	"server/config"
// 	"server/dto"
// 	"server/models"
// 	"server/utils"

// 	"github.com/gin-gonic/gin"
// )

// func GetProfile(c *gin.Context) {
// 	userID := utils.MustGetUserID(c)

// 	var user models.User
// 	err := config.DB.First(&user, userID).Error
// 	if err != nil {
// 		c.JSON(http.StatusNotFound, gin.H{"message": "User not found"})
// 		return
// 	}

// 	profile := gin.H{
// 		"phone":     user.Phone,
// 		"avatar":    user.Avatar,
// 		"gender":    user.Gender,
// 		"fullname":  user.Fullname,
// 		"birthday":  user.Birthday,
// 		"email":     user.Email,
// 		"balance":   user.Balance,
// 		"createdAt": user.CreatedAt,
// 	}

// 	c.JSON(http.StatusOK, gin.H{"profile": profile})
// }

// func UpdateProfile(c *gin.Context) {
// 	userID := utils.MustGetUserID(c)
// 	phone := c.PostForm("phone")
// 	gender := c.PostForm("gender")
// 	fullname := c.PostForm("fullname")
// 	birthday := c.PostForm("birthday")

// 	fileHeader, err := c.FormFile("avatar")
// 	if err != nil && err != http.ErrMissingFile {
// 		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid avatar file"})
// 		return
// 	}

// 	var user models.User
// 	if err := config.DB.First(&user, userID).Error; err != nil {
// 		c.JSON(http.StatusNotFound, gin.H{"message": "User not found"})
// 		return
// 	}

// 	isUpdated := (phone != "" && phone != user.Phone) ||
// 		(gender != "" && gender != user.Gender) ||
// 		(birthday != "" && birthday != user.Birthday) ||
// 		(fullname != "" && fullname != user.Fullname) ||
// 		fileHeader != nil

// 	if !isUpdated {
// 		c.JSON(http.StatusBadRequest, gin.H{"message": "No changes detected"})
// 		return
// 	}

// 	if fileHeader != nil {
// 		if err := utils.ValidateImageFile(fileHeader); err != nil {
// 			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
// 			return
// 		}

// 		file, err := fileHeader.Open()
// 		if err != nil {
// 			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to read avatar"})
// 			return
// 		}
// 		defer file.Close()

// 		uploadedURL, err := utils.UploadToCloudinary(file)
// 		if err != nil {
// 			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to upload avatar"})
// 			return
// 		}

// 		if user.Avatar != "" {
// 			_ = utils.DeleteFromCloudinary(user.Avatar)
// 		}

// 		user.Avatar = uploadedURL
// 	}

// 	user.Phone = utils.IfEmpty(phone, user.Phone)
// 	user.Gender = utils.IfEmpty(gender, user.Gender)
// 	user.Fullname = utils.IfEmpty(fullname, user.Fullname)
// 	user.Birthday = utils.IfEmpty(birthday, user.Birthday)

// 	// Simpan ke database
// 	if err := config.DB.Save(&user).Error; err != nil {
// 		if fileHeader != nil && user.Avatar != "" {
// 			_ = utils.DeleteFromCloudinary(user.Avatar)
// 		}
// 		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to update profile"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{
// 		"message": "Profile updated",
// 	})
// }

// func GetAddress(c *gin.Context) {
// 	userID := utils.MustGetUserID(c)

// 	var addresses []models.Address
// 	if err := config.DB.Where("user_id = ?", userID).Find(&addresses).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
// 		return
// 	}

// 	if len(addresses) == 0 {
// 		c.JSON(http.StatusOK, gin.H{
// 			"message": "No Address is found, Try to add one",
// 			"address": []models.Address{},
// 		})
// 		return
// 	}

// 	var result []gin.H
// 	for _, addr := range addresses {
// 		result = append(result, gin.H{
// 			"id":       addr.ID,
// 			"name":     addr.Name,
// 			"isMain":   addr.IsMain,
// 			"address":  addr.Address,
// 			"province": addr.Province,
// 			"city":     addr.City,
// 			"zipcode":  addr.Zipcode,
// 			"phone":    addr.Phone,
// 		})
// 	}

// 	c.JSON(http.StatusOK, gin.H{
// 		"address": result,
// 	})
// }

// func AddAddress(c *gin.Context) {
// 	userID := utils.MustGetUserID(c)

// 	var req dto.AddAddressRequest

// 	if !utils.BindAndValidateJSON(c, &req) {
// 		return
// 	}

// 	var count int64
// 	config.DB.Model(&models.Address{}).Where("user_id = ?", userID).Count(&count)

// 	if count == 0 {
// 		req.IsMain = true
// 	} else if req.IsMain {
// 		config.DB.Model(&models.Address{}).Where("user_id = ?", userID).Update("is_main", false)
// 	}

// 	if err := config.DB.Create(&req).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusCreated, gin.H{
// 		"message": "Added New Address",
// 	})
// }

// func UpdateAddress(c *gin.Context) {
// 	userID := utils.MustGetUserID(c)
// 	addressID := c.Param("addressId")

// 	var req dto.AddAddressRequest

// 	if !utils.BindAndValidateJSON(c, &req) {
// 		return
// 	}
// 	var current models.Address
// 	if err := config.DB.First(&current, addressID).Error; err != nil || current.UserID != userID {
// 		c.JSON(http.StatusNotFound, gin.H{"message": "Address not found"})
// 		return
// 	}

// 	if req.IsMain {
// 		config.DB.Model(&models.Address{}).Where("user_id = ? AND id != ?", userID, addressID).Update("is_main", false)
// 	}

// 	result := config.DB.Model(&current).Updates(models.Address{
// 		Name:     req.Name,
// 		Phone:    req.Phone,
// 		Address:  req.Address,
// 		Province: req.Province,
// 		City:     req.City,
// 		Zipcode:  req.Zipcode,
// 		IsMain:   req.IsMain,
// 	})

// 	if result.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"message": "No changes made to the address"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{
// 		"message": "Address updated",
// 	})
// }

// func DeleteAddress(c *gin.Context) {
// 	userID := utils.MustGetUserID(c)
// 	addressID := c.Param("addressId")

// 	var address models.Address
// 	if err := config.DB.First(&address, addressID).Error; err != nil || address.UserID != userID {
// 		c.JSON(http.StatusNotFound, gin.H{"message": "Address not found"})
// 		return
// 	}

// 	if err := config.DB.Delete(&address).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{
// 			"message": "Failed to Delete Address",
// 			"error":   err.Error(),
// 		})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"message": "Address is deleted"})
// }

package controllers

import (
	"net/http"
	"server/dto"
	"server/services"
	"server/utils"

	"github.com/gin-gonic/gin"
)

func GetProfile(c *gin.Context) {
	userID := utils.MustGetUserID(c)
	profile, err := services.GetUserProfile(userID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"profile": profile})
}

func UpdateProfile(c *gin.Context) {
	userID := utils.MustGetUserID(c)
	err := services.UpdateUserProfile(c, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Profile updated"})
}

func GetAddress(c *gin.Context) {
	userID := utils.MustGetUserID(c)
	addresses, err := services.GetUserAddresses(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"address": addresses})
}

func AddAddress(c *gin.Context) {
	userID := utils.MustGetUserID(c)
	var req dto.AddAddressRequest
	if !utils.BindAndValidateJSON(c, &req) {
		return
	}
	if err := services.AddUserAddress(userID, req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Added New Address"})
}

func UpdateAddress(c *gin.Context) {
	userID := utils.MustGetUserID(c)
	addressID := c.Param("addressId")
	var req dto.AddAddressRequest
	if !utils.BindAndValidateJSON(c, &req) {
		return
	}
	if err := services.UpdateUserAddress(userID, addressID, req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Address updated"})
}

func DeleteAddress(c *gin.Context) {
	userID := utils.MustGetUserID(c)
	addressID := c.Param("addressId")
	if err := services.DeleteUserAddress(userID, addressID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Address is deleted"})
}
