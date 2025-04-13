package utils

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type UserClaims struct {
	UserID  uint   `json:"userId"`
	StoreID *uint  `json:"storeId,omitempty"`
	Role    string `json:"role"`
	jwt.RegisteredClaims
}

func (c UserClaims) Valid() error {
	if c.ExpiresAt != nil && time.Now().After(c.ExpiresAt.Time) {
		return errors.New("token is expired")
	}
	return nil
}

func GenerateAccessToken(userID uint, storeID *uint, role string) (string, error) {
	secret := os.Getenv("ACCESS_TOKEN")
	if secret == "" {
		return "", errors.New("ACCESS_TOKEN Secret not found")
	}

	claims := UserClaims{
		UserID:  userID,
		StoreID: storeID,
		Role:    role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(1 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

func GenerateRefreshToken(userID uint, storeID *uint, role string) (string, error) {
	secret := os.Getenv("REFRESH_TOKEN")
	if secret == "" {
		return "", errors.New("REFRESH_TOKEN secret not found")
	}

	claims := UserClaims{
		UserID:  userID,
		StoreID: storeID,
		Role:    role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(7 * 24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

func ValidateAccessToken(tokenString string) (*UserClaims, error) {
	return validate(tokenString, os.Getenv("ACCESS_TOKEN"))
}

func ValidateRefreshToken(tokenString string) (*UserClaims, error) {
	return validate(tokenString, os.Getenv("REFRESH_TOKEN"))
}

func validate(tokenString string, secret string) (*UserClaims, error) {
	claims := &UserClaims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})
	if err != nil || !token.Valid {
		return nil, err
	}
	return claims, nil
}
