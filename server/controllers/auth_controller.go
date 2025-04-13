package controllers

import (
	"context"
	"encoding/json"
	"net/http"
	"os"
	"server/config"
	"server/dto"
	"server/services"
	"server/utils"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
)

func SendOTP(c *gin.Context) {
	var req dto.SendOTPRequest

	if !utils.BindAndValidateJSON(c, &req) {
		return
	}

	if err := services.SendOTPService(req.Email); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "OTP sent to email"})
}

func VerifyOTP(c *gin.Context) {
	var req dto.VerifyOTPRequest

	if !utils.BindAndValidateJSON(c, &req) {
		return
	}

	if err := services.VerifyOTPService(req.Email, req.OTP); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "OTP is verified."})
}

func Register(c *gin.Context) {
	var req dto.RegisterRequest

	if !utils.BindAndValidateJSON(c, &req) {
		return
	}

	if err := services.RegisterUser(req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Registration successful"})
}

func Login(c *gin.Context) {
	var req dto.LoginRequest

	if !utils.BindAndValidateJSON(c, &req) {
		return
	}

	user, accessToken, refreshToken, err := services.LoginUserService(req.Email, req.Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.SetCookie("refreshToken", refreshToken, 7*24*60*60, "/", "", true, true)

	c.JSON(http.StatusOK, gin.H{
		"user":        user,
		"accessToken": accessToken,
		"message":     "Login successfully",
	})
}

func Logout(c *gin.Context) {
	c.Set("Authorization", "")
	c.SetCookie("refreshToken", "", -1, "/", "", true, true)
	c.JSON(http.StatusOK, gin.H{"message": "Logout successfully"})
}

func AuthCheck(c *gin.Context) {
	userID := utils.MustGetUserID(c)

	userResp, err := services.GetAuthUser(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"user": userResp})
}

func RefreshToken(c *gin.Context) {
	token, err := c.Cookie("refreshToken")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized. Please login"})
		return
	}

	newAccessToken, err := services.RefreshAccessToken(token)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"accessToken": newAccessToken})
}

func CreateStore(c *gin.Context) {
	userID := utils.MustGetUserID(c)

	var req dto.CreateStoreRequest
	if !utils.BindAndValidateJSON(c, &req) {
		return
	}

	if err := services.CreateStoreService(userID, req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Store Created Successfully"})
}

func GoogleAuth(c *gin.Context) {
	url := config.GoogleOAuthConfig.AuthCodeURL("random-state", oauth2.AccessTypeOffline)
	c.Redirect(http.StatusTemporaryRedirect, url)
}

type GoogleUser struct {
	ID      string  `json:"id"`
	StoreID *string `json:"store"`
	Role    string  `json:"role"`
}

func GoogleAuthCallback(c *gin.Context) {
	code := c.Query("code")

	token, err := config.GoogleOAuthConfig.Exchange(context.Background(), code)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Google authentication failed"})
		return
	}

	client := config.GoogleOAuthConfig.Client(context.Background(), token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to get user info"})
		return
	}
	defer resp.Body.Close()

	var userInfo GoogleUser
	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to decode user info"})
		return
	}

	idUint, err := strconv.ParseUint(userInfo.ID, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid user ID"})
		return
	}
	uintID := uint(idUint)

	var storeIDUint *uint
	if userInfo.StoreID != nil {
		sid, err := strconv.ParseUint(*userInfo.StoreID, 10, 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid store ID"})
			return
		}
		tmp := uint(sid)
		storeIDUint = &tmp
	}

	refreshToken, err := utils.GenerateRefreshToken(uintID, storeIDUint, userInfo.Role)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	c.SetCookie("refreshToken", refreshToken, int((7 * 24 * time.Hour).Seconds()), "/", "", true, true)
	c.Redirect(http.StatusTemporaryRedirect, os.Getenv("CLIENT_URL")+"/signin")
}
