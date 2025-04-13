package dto

import "server/models"

type RegisterRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Fullname string `json:"fullname" binding:"required,min=6"`
	Password string `json:"password" binding:"required,min=6"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

type SendOTPRequest struct {
	Email string `json:"email" binding:"required,email"`
}

type VerifyOTPRequest struct {
	OTP   string `json:"otp" binding:"required,min=6"`
	Email string `json:"email" binding:"required,email"`
}

type CreateStoreRequest struct {
	City        string `json:"city" binding:"required"`
	Name        string `json:"name" binding:"required,min=6"`
	Description string `json:"description" binding:"required,min=20"`
}

type AddCartRequest struct {
	ProductID uint `json:"productId" binding:"required"`
	Quantity  int  `json:"quantity" binding:"required"`
}

type AddAddressRequest struct {
	Name     string `json:"name" binding:"required"`
	Phone    string `json:"phone" binding:"required,min=11"`
	Address  string `json:"address" binding:"required,min=10"`
	IsMain   bool   `json:"isMain"`
	Province string `json:"province" binding:"required"`
	City     string `json:"city" binding:"required"`
	Zipcode  string `json:"zipcode" binding:"required,min=6"`
}

type OrderRequest struct {
	StoreID      uint    `json:"storeId"`
	CartItems    []uint  `json:"cartItems"`
	ShipmentCost float64 `json:"shipmentCost"`
}

type CreateTransactionRequest struct {
	Address models.Address `json:"address"`
	Orders  []OrderRequest `json:"orders"`
}
