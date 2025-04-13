package services

import (
	"context"
	"errors"
	"server/config"
	"server/dto"
	"server/models"
	"server/repositories"
	"server/utils"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
	"golang.org/x/crypto/bcrypt"
)

func RegisterUser(req dto.RegisterRequest) error {
	if existing, _ := repositories.FindUserByEmail(req.Email); existing != nil {
		return errors.New("email already registered")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), 10)
	if err != nil {
		return errors.New("failed to hash password")
	}

	user := models.User{
		Fullname: req.Fullname,
		Email:    req.Email,
		Password: string(hashedPassword),
		Avatar:   utils.RandomUserAvatar(),
	}

	return repositories.CreateUser(&user)
}

func SendOTPService(email string) error {
	if user, _ := repositories.FindUserByEmail(email); user != nil {
		return errors.New("email already registered")
	}

	otp := utils.GenerateOtp()

	if err := config.RedisClient.Set(context.Background(), "otp:"+email, otp, 10*time.Minute).Err(); err != nil {
		return errors.New("failed to store OTP")
	}

	if err := utils.SendEmailOTP(email, otp); err != nil {
		return errors.New("failed to send OTP")
	}

	return nil
}

func VerifyOTPService(email, otp string) error {
	val, err := config.RedisClient.Get(context.Background(), "otp:"+email).Result()
	if err == redis.Nil {
		return errors.New("the OTP is expired")
	} else if err != nil {
		return errors.New("redis error")
	}

	if val != otp {
		return errors.New("invalid OTP code")
	}

	return nil
}

func LoginUserService(email, password string) (gin.H, string, string, error) {
	user, err := repositories.FindUserByEmail(email)
	if err != nil {
		return nil, "", "", errors.New("invalid email")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return nil, "", "", errors.New("invalid password")
	}

	var storeID *uint
	var storeData gin.H = nil
	if user.Store != nil {
		storeID = &user.Store.ID
		storeData = gin.H{
			"id":     user.Store.ID,
			"name":   user.Store.Name,
			"avatar": user.Store.Avatar,
		}
	}

	accessToken, _ := utils.GenerateAccessToken(user.ID, storeID, user.Role)

	refreshToken, _ := utils.GenerateRefreshToken(user.ID, storeID, user.Role)

	userData := gin.H{
		"userId":   user.ID,
		"role":     user.Role,
		"email":    user.Email,
		"store":    storeData,
		"avatar":   user.Avatar,
		"fullname": user.Fullname,
	}

	return userData, accessToken, refreshToken, nil
}

func GetAuthUser(userID uint) (gin.H, error) {
	user, err := repositories.FindUserWithStoreByID(userID)
	if err != nil {
		return nil, errors.New("user not found")
	}

	var storeData gin.H = nil
	if user.Store != nil {
		storeData = gin.H{
			"id":     user.Store.ID,
			"name":   user.Store.Name,
			"avatar": user.Store.Avatar,
		}
	}

	return gin.H{
		"userId":   user.ID,
		"role":     user.Role,
		"email":    user.Email,
		"avatar":   user.Avatar,
		"fullname": user.Fullname,
		"store":    storeData,
	}, nil
}

func RefreshAccessToken(refreshToken string) (string, error) {
	claims, err := utils.ValidateRefreshToken(refreshToken)
	if err != nil {
		return "", errors.New("invalid or expired refresh token")
	}

	user, err := repositories.FindUserWithStoreByID(claims.UserID)
	if err != nil {
		return "", errors.New("user not found")
	}

	var storeID *uint
	if user.Store != nil {
		storeID = &user.Store.ID
	}

	return utils.GenerateAccessToken(user.ID, storeID, user.Role)
}

func CreateStoreService(userID uint, req dto.CreateStoreRequest) error {

	if exists, _ := repositories.FindStoreByUserID(userID); exists != nil {
		return errors.New("you already have a store")
	}

	_, err := repositories.FindUserByID(userID)
	if err != nil {
		return errors.New("user not found")
	}

	slug := utils.CreateSlug(req.Name)

	store := models.Store{
		UserID:      userID,
		Name:        req.Name,
		Slug:        slug,
		City:        req.City,
		Description: req.Description,
		Avatar:      utils.RandomUserAvatar(),
	}

	if err := repositories.CreateStore(&store); err != nil {
		return errors.New("failed to create store")
	}

	return repositories.UpdateUserRole(userID, "seller")
}
