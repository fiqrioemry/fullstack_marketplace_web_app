package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID        uint    `gorm:"primaryKey"`
	Fullname  string  `gorm:"type:varchar(255)"`
	Email     string  `gorm:"type:varchar(255);uniqueIndex"`
	Password  string  `gorm:"type:text"`
	Role      string  `gorm:"type:varchar(20);not null;default:'customer'"`
	Birthday  string  `gorm:"type:varchar(255)"`
	Gender    string  `gorm:"type:varchar(10)"`
	Avatar    string  `gorm:"type:varchar(255)"`
	Phone     string  `gorm:"type:varchar(20)"`
	Balance   float64 `gorm:"type:decimal(10,2);not null;default:0"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`

	// Relasi
	Store         *Store         `gorm:"foreignKey:UserID"`
	Carts         []Cart         `gorm:"foreignKey:UserID"`
	Transactions  []Transaction  `gorm:"foreignKey:UserID"`
	Orders        []Order        `gorm:"foreignKey:UserID"`
	Addresses     []Address      `gorm:"foreignKey:UserID"`
	Notifications []Notification `gorm:"foreignKey:UserID"`
}

type RoleType string

const (
	RoleCustomer RoleType = "customer"
	RoleSeller   RoleType = "seller"
	RoleAdmin    RoleType = "admin"
)

type GenderType string

const (
	GenderMale   GenderType = "male"
	GenderFemale GenderType = "female"
)

type Transaction struct {
	ID                string  `gorm:"type:char(36);primaryKey"`
	UserID            uint    `gorm:"not null"`
	TotalAmount       float64 `gorm:"type:decimal(10,2);not null;default:0"`
	TotalShipmentCost float64 `gorm:"type:decimal(10,2);not null;default:0"`
	AmountToPay       float64 `gorm:"type:decimal(10,2);not null;default:0"`
	PaymentLink       string  `gorm:"type:varchar(255)"`
	PaymentDue        *time.Time
	PaymentStatus     string `gorm:"type:varchar(20);not null;default:'pending'"`
	CreatedAt         time.Time
	UpdatedAt         time.Time
	DeletedAt         gorm.DeletedAt `gorm:"index"`

	// Relasi
	User   User    `gorm:"foreignKey:UserID"`
	Orders []Order `gorm:"foreignKey:TransactionID"`
}

type PaymentStatusType string

const (
	PaymentStatusPending  PaymentStatusType = "pending"
	PaymentStatusPaid     PaymentStatusType = "paid"
	PaymentStatusExpired  PaymentStatusType = "expired"
	PaymentStatusCanceled PaymentStatusType = "canceled"
)

type Product struct {
	ID          uint    `gorm:"primaryKey"`
	StoreID     uint    `gorm:"not null"`
	CategoryID  uint    `gorm:"not null"`
	Name        string  `gorm:"type:varchar(255);not null"`
	Slug        string  `gorm:"type:varchar(255);uniqueIndex"`
	Description string  `gorm:"type:text"`
	Price       float64 `gorm:"type:decimal(10,2);not null"`
	Stock       int     `gorm:"not null;default:0"`
	Sold        int     `gorm:"default:0"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
	DeletedAt   gorm.DeletedAt `gorm:"index"`

	Store        Store         `gorm:"foreignKey:StoreID"`
	Category     Category      `gorm:"foreignKey:CategoryID"`
	Carts        []Cart        `gorm:"foreignKey:ProductID"`
	Galleries    []Gallery     `gorm:"foreignKey:ProductID"`
	OrderDetails []OrderDetail `gorm:"foreignKey:ProductID"`
}

type Store struct {
	ID          uint    `gorm:"primaryKey"`
	UserID      uint    `gorm:"not null;uniqueIndex"`
	City        string  `gorm:"type:varchar(255)"`
	Name        string  `gorm:"type:varchar(255);not null"`
	Slug        string  `gorm:"type:varchar(255);uniqueIndex"`
	Banner      string  `gorm:"type:varchar(255)"`
	Avatar      string  `gorm:"type:varchar(255)"`
	Description string  `gorm:"type:text"`
	Balance     float64 `gorm:"type:decimal(10,2);not null;default:0"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
	DeletedAt   gorm.DeletedAt `gorm:"index"`

	Orders   []Order   `gorm:"foreignKey:StoreID"`
	Products []Product `gorm:"foreignKey:StoreID"`
}

type Category struct {
	ID        uint   `gorm:"primaryKey"`
	Name      string `gorm:"type:varchar(255);not null"`
	Image     string `gorm:"type:varchar(255)"`
	Slug      string `gorm:"type:varchar(255);uniqueIndex"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}

type Order struct {
	ID               uint      `gorm:"primaryKey"`
	TransactionID    uuid.UUID `gorm:"type:uuid;not null"`
	UserID           uint      `gorm:"not null"`
	StoreID          uint      `gorm:"not null"`
	AddressID        uint      `gorm:"not null"`
	OrderNumber      string    `gorm:"type:varchar(255);not null;uniqueIndex"`
	TotalPrice       float64   `gorm:"type:decimal(10,2);not null;default:0"`
	ShipmentCost     float64   `gorm:"type:decimal(10,2);not null;default:0"`
	TotalOrderAmount float64   `gorm:"type:decimal(10,2);not null;default:0"`
	OrderStatus      string    `gorm:"type:varchar(20);not null;default:'waiting payment'"`
	CreatedAt        time.Time
	UpdatedAt        time.Time
	DeletedAt        gorm.DeletedAt `gorm:"index"`

	Store        Store         `gorm:"foreignKey:StoreID"`
	Address      Address       `gorm:"foreignKey:AddressID"`
	OrderDetails []OrderDetail `gorm:"foreignKey:OrderID"`
	Shipment     Shipment      `gorm:"foreignKey:OrderID"`
}

type OrderStatusType string

const (
	OrderStatusWaitingPayment OrderStatusType = "waiting payment"
	OrderStatusPending        OrderStatusType = "pending"
	OrderStatusProcess        OrderStatusType = "process"
	OrderStatusSuccess        OrderStatusType = "success"
	OrderStatusCanceled       OrderStatusType = "canceled"
)

type OrderDetail struct {
	ID         uint    `gorm:"primaryKey"`
	OrderID    uint    `gorm:"not null"`
	ProductID  uint    `gorm:"not null"`
	Quantity   int     `gorm:"not null;default:1"`
	Price      float64 `gorm:"type:decimal(10,2);not null"`
	TotalPrice float64 `gorm:"type:decimal(10,2);not null"`
	CreatedAt  time.Time
	UpdatedAt  time.Time
	DeletedAt  gorm.DeletedAt `gorm:"index"`

	Order   Order   `gorm:"foreignKey:OrderID"`
	Product Product `gorm:"foreignKey:ProductID"`
}

type Cart struct {
	ID        uint `gorm:"primaryKey"`
	UserID    uint `gorm:"not null"`
	ProductID uint `gorm:"not null"`
	Quantity  int  `gorm:"not null;default:1"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`

	User    User    `gorm:"foreignKey:UserID"`
	Product Product `gorm:"foreignKey:ProductID"`
}

type Address struct {
	ID        uint   `gorm:"primaryKey"`
	UserID    uint   `gorm:"not null"`
	Name      string `gorm:"type:varchar(255);not null"`
	IsMain    bool   `gorm:"default:false"`
	Address   string `gorm:"type:text;not null"`
	Province  string `gorm:"type:varchar(255);not null"`
	City      string `gorm:"type:varchar(255);not null"`
	Zipcode   string `gorm:"type:varchar(10);not null"`
	Phone     string `gorm:"type:varchar(20);not null"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}

type Notification struct {
	ID        uint   `gorm:"primaryKey"`
	UserID    *uint  `gorm:"index"`
	StoreID   *uint  `gorm:"index"`
	Type      string `gorm:"type:varchar(20);not null"`
	Message   string `gorm:"type:varchar(255);not null"`
	Metadata  string `gorm:"type:json"`
	Status    string `gorm:"type:varchar(20);not null;default:'unread'"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`

	User  User  `gorm:"foreignKey:UserID"`
	Store Store `gorm:"foreignKey:StoreID"`
}

type NotificationType string

const (
	NotificationTypeOrder NotificationType = "order"
	NotificationTypePromo NotificationType = "promo"
)

type NotificationStatus string

const (
	NotificationStatusUnread NotificationStatus = "unread"
	NotificationStatusRead   NotificationStatus = "read"
)

type Gallery struct {
	ID        uint   `gorm:"primaryKey"`
	ProductID uint   `gorm:"not null"`
	Image     string `gorm:"type:varchar(255);not null"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type Shipment struct {
	ID             uint   `gorm:"primaryKey"`
	OrderID        uint   `gorm:"not null;uniqueIndex"`
	ShipmentStatus string `gorm:"type:varchar(20);not null;default:'pending'"`
	ShipmentNumber string `gorm:"type:varchar(255)"`
	CreatedAt      time.Time
	UpdatedAt      time.Time
	DeletedAt      gorm.DeletedAt `gorm:"index"`
}

type ShipmentStatusType string

const (
	ShipmentStatusPending   ShipmentStatusType = "pending"
	ShipmentStatusShipped   ShipmentStatusType = "shipped"
	ShipmentStatusDelivered ShipmentStatusType = "delivered"
	ShipmentStatusReturned  ShipmentStatusType = "returned"
	ShipmentStatusCanceled  ShipmentStatusType = "canceled"
)
