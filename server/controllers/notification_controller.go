package controllers

import (
	"fmt"
	"net/http"

	"server/config"
	"server/models"
	"server/utils"

	"github.com/gin-gonic/gin"
)

func CreateOrderNotification(c *gin.Context) {
	tx := config.DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Something went wrong"})
		}
	}()

	var body map[string]interface{}
	if err := c.ShouldBindJSON(&body); err != nil {
		tx.Rollback()
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid payload", "error": err.Error()})
		return
	}
	orderID, _ := body["order_id"].(string)

	statusResp, err := config.CoreClient.CheckTransaction(orderID)
	if err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to check transaction", "error": err.Error()})
		return
	}

	transactionID := statusResp.OrderID
	transactionStatus := statusResp.TransactionStatus

	var userTransaction models.Transaction
	if err := tx.
		Select("id", "user_id", "payment_status").
		Preload("Orders.OrderDetails").
		Where("id = ?", transactionID).
		First(&userTransaction).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusNotFound, gin.H{"message": "Transaction not found"})
		return
	}

	if userTransaction.UserID == 0 {
		tx.Rollback()
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid user in transaction"})
		return
	}

	var message string

	switch transactionStatus {
	case "settlement", "capture":
		if err := tx.Model(&userTransaction).Update("payment_status", "paid").Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to update transaction status"})
			return
		}
		message = "Your payment is successful, order will be processed"

		var stockUpdates []struct {
			ProductID uint
			Qty       int
		}

		for _, order := range userTransaction.Orders {
			if err := tx.Model(&order).Update("order_status", "pending").Error; err != nil {
				tx.Rollback()
				c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to update order"})
				return
			}

			shipment := models.Shipment{
				OrderID:        order.ID,
				ShipmentStatus: string(models.ShipmentStatusPending),
			}
			if err := tx.Create(&shipment).Error; err != nil {
				tx.Rollback()
				c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to create shipment"})
				return
			}

			notification := models.Notification{
				StoreID:  &order.StoreID,
				Type:     string(models.NotificationTypeOrder),
				Message:  fmt.Sprintf("You have a new paid order to process: Rp%.0f", order.TotalOrderAmount),
				Metadata: fmt.Sprintf(`{"orderNumber":"%s"}`, order.OrderNumber),
			}
			if err := tx.Create(&notification).Error; err != nil {
				tx.Rollback()
				c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to create store notification"})
				return
			}

			for _, item := range order.OrderDetails {
				stockUpdates = append(stockUpdates, struct {
					ProductID uint
					Qty       int
				}{ProductID: item.ProductID, Qty: item.Quantity})
			}
		}

		for _, update := range stockUpdates {
			if err := tx.Exec("UPDATE products SET stock = stock - ? WHERE id = ?", update.Qty, update.ProductID).Error; err != nil {
				tx.Rollback()
				c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to update product stock"})
				return
			}
		}

	case "expire":
		_ = tx.Model(&userTransaction).Update("payment_status", "expired").Error
		message = "Transaction has expired"

		for _, order := range userTransaction.Orders {
			_ = tx.Model(&order).Update("order_status", "canceled").Error
		}

	case "cancel":
		_ = tx.Model(&userTransaction).Update("payment_status", "canceled").Error
		message = "Transaction has been canceled"

		for _, order := range userTransaction.Orders {
			_ = tx.Model(&order).Update("order_status", "canceled").Error
		}
	}

	notif := models.Notification{
		UserID:   &userTransaction.UserID,
		Type:     string(models.NotificationTypeOrder),
		Message:  message,
		Metadata: "{}",
	}
	if err := tx.Create(&notif).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to create user notification"})
		return
	}

	tx.Commit()
	c.JSON(http.StatusOK, gin.H{"message": "Order status updated"})
}

func GetAllCustomerNotifications(c *gin.Context) {
	userID := utils.MustGetUserID(c)

	var notifications []models.Notification
	if err := config.DB.Where("user_id = ?", userID).Order("created_at DESC").Find(&notifications).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	if len(notifications) == 0 {
		c.JSON(http.StatusOK, gin.H{
			"message":       "You don't have any notifications",
			"notifications": []models.Notification{},
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{"notifications": notifications})
}

func GetAllSellerNotifications(c *gin.Context) {
	storeID := utils.MustGetStoreID(c)

	var notifications []models.Notification
	if err := config.DB.Where("store_id = ?", storeID).
		Order("created_at DESC").
		Find(&notifications).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	if len(notifications) == 0 {
		c.JSON(http.StatusOK, gin.H{
			"message":       "You don't have any notifications",
			"notifications": []models.Notification{},
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{"notifications": notifications})
}
