package controllers

import (
	"fmt"
	"net/http"
	"time"

	"server/config"
	"server/dto"
	"server/models"
	"server/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	midtrans "github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
)

func CreateNewTransaction(c *gin.Context) {
	var req dto.CreateTransactionRequest
	if !utils.BindAndValidateJSON(c, &req) {
		return
	}

	userID := utils.MustGetUserID(c)
	if req.Address.ID == 0 || len(req.Orders) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid Order information data"})
		return
	}

	tx := config.DB.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Something went wrong"})
		}
	}()

	var address models.Address
	if err := tx.Where("id = ? AND user_id = ?", req.Address.ID, userID).First(&address).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusBadRequest, gin.H{"message": "Address not found"})
		return
	}

	transaction := models.Transaction{
		ID:                uuid.NewString(),
		UserID:            userID,
		TotalAmount:       0,
		AmountToPay:       0,
		TotalShipmentCost: 0,
	}
	if err := tx.Create(&transaction).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to create transaction"})
		return
	}

	var allCartIDs []uint
	for _, order := range req.Orders {
		allCartIDs = append(allCartIDs, order.CartItems...)
	}

	var cartItems []models.Cart
	if err := tx.Preload("Product").Where("id IN ? AND user_id = ?", allCartIDs, userID).Find(&cartItems).Error; err != nil || len(cartItems) == 0 {
		tx.Rollback()
		c.JSON(http.StatusBadRequest, gin.H{"message": "Cart not found or already removed"})
		return
	}

	cartMap := map[uint]models.Cart{}
	for _, cart := range cartItems {
		cartMap[cart.ID] = cart
	}

	var (
		totalAmount       float64
		totalShipmentCost float64
		midtransItems     []midtrans.ItemDetails
		cartIDsToRemove   []uint
		orderDetails      []models.OrderDetail
	)

	for _, order := range req.Orders {
		if order.StoreID == 0 || order.ShipmentCost < 0 || len(order.CartItems) == 0 {
			tx.Rollback()
			c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid store ID, shipment cost, or cart items"})
			return
		}

		newOrder := models.Order{
			UserID:        userID,
			StoreID:       order.StoreID,
			AddressID:     address.ID,
			TransactionID: uuid.MustParse(transaction.ID),
			OrderNumber:   utils.GenerateOrderNumber(transaction.ID),
			OrderStatus:   string(models.OrderStatusWaitingPayment),
		}
		if err := tx.Create(&newOrder).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to create order"})
			return
		}

		var orderTotal float64
		for _, cartID := range order.CartItems {
			cart, exists := cartMap[cartID]
			if !exists || cart.Product.ID == 0 {
				tx.Rollback()
				c.JSON(http.StatusBadRequest, gin.H{"message": "Cart not found or already removed"})
				return
			}

			if cart.Product.Stock < cart.Quantity {
				tx.Rollback()
				c.JSON(http.StatusBadRequest, gin.H{"message": "Insufficient stock for product: " + cart.Product.Name})
				return
			}

			totalItemPrice := float64(cart.Quantity) * cart.Product.Price
			orderTotal += totalItemPrice

			orderDetails = append(orderDetails, models.OrderDetail{
				OrderID:    newOrder.ID,
				ProductID:  cart.ProductID,
				Quantity:   cart.Quantity,
				Price:      cart.Product.Price,
				TotalPrice: totalItemPrice,
			})

			midtransItems = append(midtransItems, midtrans.ItemDetails{
				ID:    "PRODUCT-" + utils.UintToString(cart.Product.ID),
				Name:  cart.Product.Name,
				Price: int64(cart.Product.Price),
				Qty:   int32(cart.Quantity),
			})

			cartIDsToRemove = append(cartIDsToRemove, cart.ID)
		}

		midtransItems = append(midtransItems, midtrans.ItemDetails{
			ID:    "SHIPPING-" + newOrder.OrderNumber,
			Name:  "Shipping Cost",
			Price: int64(order.ShipmentCost),
			Qty:   1,
		})

		newOrder.TotalPrice = orderTotal
		newOrder.ShipmentCost = order.ShipmentCost
		newOrder.TotalOrderAmount = orderTotal + order.ShipmentCost
		if err := tx.Save(&newOrder).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to update order"})
			return
		}

		totalAmount += orderTotal
		totalShipmentCost += order.ShipmentCost
	}

	if err := tx.Create(&orderDetails).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to create order details"})
		return
	}

	if err := tx.Where("id IN ?", cartIDsToRemove).Delete(&models.Cart{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to delete carts"})
		return
	}

	amountToPay := totalAmount + totalShipmentCost

	notif := models.Notification{
		UserID:   &userID,
		Type:     string(models.NotificationTypeOrder),
		Message:  "New Transaction waiting for payment process",
		Metadata: `{"transactionId":"` + transaction.ID + `"}`,
	}
	if err := tx.Create(&notif).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to create notification"})
		return
	}

	paymentDue := time.Now().Add(24 * time.Hour)
	param := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  transaction.ID,
			GrossAmt: int64(amountToPay),
		},
		Items: &midtransItems,
		CustomerDetail: &midtrans.CustomerDetails{
			FName: address.Name,
			Phone: address.Phone,
		},
	}

	snapResp, err := config.SnapClient.CreateTransaction(param)
	if err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Midtrans transaction failed", "error": err.Error()})
		return
	}

	transaction.PaymentDue = &paymentDue
	transaction.TotalAmount = totalAmount
	transaction.AmountToPay = amountToPay
	transaction.PaymentLink = snapResp.RedirectURL
	transaction.TotalShipmentCost = totalShipmentCost

	if err := tx.Save(&transaction).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to update transaction"})
		return
	}

	tx.Commit()
	c.JSON(http.StatusCreated, gin.H{
		"transactionToken": snapResp.Token,
		"transactionUrl":   snapResp.RedirectURL,
		"message":          "New Order is created",
	})
}

func GetAllTransactions(c *gin.Context) {
	userID := utils.MustGetUserID(c)
	status := c.Query("status")

	var transactions []models.Transaction
	query := config.DB.Where("user_id = ?", userID)

	if status != "" {
		query = query.Where("payment_status = ?", status)
	}

	if err := query.Order("created_at DESC").Find(&transactions).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	if len(transactions) == 0 {
		c.JSON(http.StatusOK, gin.H{
			"message":      "You don't have any transactions",
			"transactions": []gin.H{},
		})
		return
	}

	var result []gin.H
	for _, t := range transactions {
		result = append(result, gin.H{
			"id":                t.ID,
			"totalAmount":       t.TotalAmount,
			"totalShipmentCost": t.TotalShipmentCost,
			"amountToPay":       t.AmountToPay,
			"paymentLink":       t.PaymentLink,
			"paymentDue":        t.PaymentDue,
			"paymentStatus":     t.PaymentStatus,
			"createdAt":         t.CreatedAt,
			"updatedAt":         t.UpdatedAt,
		})
	}

	c.JSON(http.StatusOK, gin.H{"transactions": result})
}

func GetTransactionDetail(c *gin.Context) {
	userID := utils.MustGetUserID(c)
	transactionID := c.Param("transactionId")

	var transaction models.Transaction
	err := config.DB.
		Preload("Orders.OrderDetails.Product").
		Preload("Orders.Store").
		Preload("Orders.Address").
		Where("id = ? AND user_id = ?", transactionID, userID).
		First(&transaction).Error

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Transaction not found"})
		return
	}

	var orders []gin.H
	for _, order := range transaction.Orders {
		var details []gin.H
		for _, detail := range order.OrderDetails {
			details = append(details, gin.H{
				"name":       detail.Product.Name,
				"price":      detail.Price,
				"quantity":   detail.Quantity,
				"totalPrice": detail.TotalPrice,
			})
		}

		orders = append(orders, gin.H{
			"orderNumber":     order.OrderNumber,
			"store":           order.Store.Name,
			"shipmentCost":    order.ShipmentCost,
			"shipmentAddress": order.Address.Address,
			"details":         details,
		})
	}

	result := gin.H{
		"totalAmount":       transaction.TotalAmount,
		"totalShipmentCost": transaction.TotalShipmentCost,
		"amountToPay":       transaction.AmountToPay,
		"orders":            orders,
	}

	c.JSON(http.StatusOK, gin.H{"transaction": result})
}

func GetAllCustomerOrders(c *gin.Context) {
	userID := utils.MustGetUserID(c)
	status := c.Query("status")

	var ordersRaw []models.Order
	db := config.DB.Preload("OrderDetails.Product").Preload("Store").Where("user_id = ?", userID)

	if status != "" {
		db = db.Where("order_status = ?", status)
	} else {
		db = db.Where("order_status != ?", "waiting payment")
	}

	if err := db.Order("created_at DESC").Find(&ordersRaw).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	if len(ordersRaw) == 0 {
		c.JSON(http.StatusOK, gin.H{
			"message": "You don't have any orders",
			"orders":  []models.Order{},
		})
		return
	}

	var orders []gin.H
	for _, order := range ordersRaw {
		orders = append(orders, gin.H{
			"id":            order.ID,
			"store":         order.Store.Name,
			"createdAt":     order.CreatedAt,
			"totalPrice":    order.TotalPrice,
			"orderNumber":   order.OrderNumber,
			"orderStatus":   order.OrderStatus,
			"transactionId": order.TransactionID,
			"totalProducts": len(order.OrderDetails),
		})
	}

	c.JSON(http.StatusOK, gin.H{"orders": orders})
}

func GetCustomerOrderDetail(c *gin.Context) {
	orderID := c.Param("orderId")

	var order models.Order
	err := config.DB.
		Preload("OrderDetails.Product.Galleries").
		Preload("Address").
		Where("id = ?", orderID).
		First(&order).Error

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Order not found"})
		return
	}

	mapGalleries := func(galleries []models.Gallery) []string {
		var urls []string
		for _, g := range galleries {
			urls = append(urls, g.Image)
		}
		return urls
	}

	var details []gin.H
	for _, od := range order.OrderDetails {
		details = append(details, gin.H{
			"id":         od.ID,
			"quantity":   od.Quantity,
			"price":      od.Price,
			"totalPrice": od.TotalPrice,
			"product": gin.H{
				"id":        od.Product.ID,
				"name":      od.Product.Name,
				"Galleries": mapGalleries(od.Product.Galleries),
			},
		})
	}

	// Response
	response := gin.H{
		"id":               order.ID,
		"transactionId":    order.TransactionID.String(),
		"storeId":          order.StoreID,
		"orderNumber":      order.OrderNumber,
		"totalPrice":       order.TotalPrice,
		"shipmentCost":     order.ShipmentCost,
		"totalOrderAmount": order.TotalOrderAmount,
		"orderStatus":      order.OrderStatus,
		"address": gin.H{
			"id":       order.Address.ID,
			"userID":   order.Address.UserID,
			"name":     order.Address.Name,
			"isMain":   order.Address.IsMain,
			"address":  order.Address.Address,
			"province": order.Address.Province,
			"city":     order.Address.City,
			"zipcode":  order.Address.Zipcode,
			"phone":    order.Address.Phone,
		},
		"orderDetails": details,
	}

	c.JSON(http.StatusOK, gin.H{"order": response})
}

func GetShipmentDetail(c *gin.Context) {
	orderID := c.Param("orderId")

	var shipment models.Shipment
	if err := config.DB.Preload("Order").
		Where("order_id = ?", orderID).
		First(&shipment).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Shipment Not Found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"shipment": shipment})
}

func ConfirmOrderByCustomer(c *gin.Context) {
	userID := utils.MustGetUserID(c)
	orderID := c.Param("orderId")

	var req struct {
		Status  string `json:"status"`
		Message string `json:"message"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid request"})
		return
	}

	tx := config.DB.Begin()

	var order models.Order
	if err := tx.Where("id = ?", orderID).First(&order).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusNotFound, gin.H{"message": "Order Not Found"})
		return
	}

	if req.Status == "success" {
		if err := tx.Model(&order).Update("order_status", "success").Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		if err := tx.Exec("UPDATE stores SET balance = balance + ? WHERE id = ?", order.TotalOrderAmount, order.StoreID).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		var details []models.OrderDetail
		if err := tx.Where("order_id = ?", orderID).Find(&details).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		for _, d := range details {
			if err := tx.Exec("UPDATE products SET sold = sold + ? WHERE id = ?", d.Quantity, d.ProductID).Error; err != nil {
				tx.Rollback()
				c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
				return
			}
		}

		notif := models.Notification{
			UserID:  &order.UserID,
			StoreID: &order.StoreID,
			Type:    string(models.NotificationTypeOrder),
			Message: "Order is received by customer, and your store balance has been updated.",
		}
		if err := tx.Create(&notif).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		tx.Commit()
		c.JSON(http.StatusOK, gin.H{"message": "Order received successfully"})
		return

	} else if req.Status == "canceled" {
		if err := tx.Model(&order).Update("order_status", "canceled").Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		if err := tx.Exec("UPDATE users SET balance = balance + ? WHERE id = ?", order.TotalOrderAmount, userID).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		if err := tx.Model(&models.Shipment{}).Where("order_id = ?", orderID).
			Update("shipment_status", string(models.ShipmentStatusReturned)).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		notif := models.Notification{
			UserID:  &userID,
			StoreID: &order.StoreID,
			Type:    string(models.NotificationTypeOrder),
			Message: req.Message,
		}
		if err := tx.Create(&notif).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}

		tx.Commit()
		c.JSON(http.StatusOK, gin.H{"message": "Order is being returned"})
		return
	}

	tx.Rollback()
	c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid status provided"})
}

func CancelTransaction(c *gin.Context) {
	userID := utils.MustGetUserID(c)
	transactionID := c.Param("transactionId")

	var req struct {
		CancelReason string `json:"cancel_reason"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid cancel reason"})
		return
	}

	tx := config.DB.Begin()

	var transaction models.Transaction
	if err := tx.Preload("Orders.OrderDetails").Where("id = ?", transactionID).First(&transaction).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusNotFound, gin.H{"message": "Transaction not found"})
		return
	}

	if transaction.PaymentStatus != string(models.PaymentStatusPending) {
		tx.Rollback()
		c.JSON(http.StatusBadRequest, gin.H{"message": "Transaction cannot be canceled"})
		return
	}

	// Update payment_status ke "canceled"
	if err := tx.Model(&transaction).Update("payment_status", string(models.PaymentStatusCanceled)).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to update transaction status"})
		return
	}

	// Update semua order jadi canceled
	if err := tx.Model(&models.Order{}).Where("transaction_id = ?", transactionID).
		Update("order_status", string(models.OrderStatusCanceled)).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	// Batalkan shipment yang berkaitan
	var orderIDs []uint
	for _, order := range transaction.Orders {
		orderIDs = append(orderIDs, order.ID)
	}
	if err := tx.Model(&models.Shipment{}).Where("order_id IN ?", orderIDs).
		Update("shipment_status", string(models.ShipmentStatusCanceled)).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	// Kembalikan stok
	for _, order := range transaction.Orders {
		for _, item := range order.OrderDetails {
			if err := tx.Exec("UPDATE products SET stock = stock + ? WHERE id = ?", item.Quantity, item.ProductID).Error; err != nil {
				tx.Rollback()
				c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
				return
			}
		}
	}

	// Refund saldo user
	if err := tx.Exec("UPDATE users SET balance = balance + ? WHERE id = ?", transaction.AmountToPay, userID).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	// Notifikasi ke semua store terkait
	storeIDs := make(map[uint]bool)
	for _, order := range transaction.Orders {
		storeIDs[order.StoreID] = true
	}

	for storeID := range storeIDs {
		notif := models.Notification{
			UserID:   &userID,
			StoreID:  &storeID,
			Type:     string(models.NotificationTypeOrder),
			Message:  "Order dalam transaksi #" + transactionID + " telah dibatalkan. Alasan: " + req.CancelReason,
			Metadata: `{"transactionId":"` + transactionID + `"}`,
		}
		if err := tx.Create(&notif).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
			return
		}
	}

	tx.Commit()
	c.JSON(http.StatusOK, gin.H{"message": "Transaction successfully canceled"})
}

func CancelOrderByCustomer(c *gin.Context) {
	userID := utils.MustGetUserID(c)
	orderID := c.Param("orderId")

	var req struct {
		CancelReason string `json:"cancel_reason"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid cancel reason"})
		return
	}

	tx := config.DB.Begin()

	var order models.Order
	err := tx.Preload("OrderDetails").
		Where("id = ? AND order_status != ?", orderID, "waiting payment").
		First(&order).Error
	if err != nil {
		tx.Rollback()
		c.JSON(http.StatusNotFound, gin.H{"message": "Order not found"})
		return
	}

	var transaction models.Transaction
	if err := tx.Where("id = ?", order.TransactionID).First(&transaction).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Transaction not found"})
		return
	}

	if transaction.PaymentStatus != string(models.PaymentStatusPending) {
		tx.Rollback()
		c.JSON(http.StatusBadRequest, gin.H{"message": "Order cannot be canceled"})
		return
	}

	if order.OrderStatus == string(models.OrderStatusPending) {
		timeDiff := time.Since(order.CreatedAt).Hours()
		if timeDiff > 2 {
			tx.Rollback()
			c.JSON(http.StatusBadRequest, gin.H{"message": "Cancellation time limit exceeded"})
			return
		}
	}

	if err := tx.Model(&models.Order{}).
		Where("id = ?", orderID).
		Update("order_status", "canceled").Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to cancel order"})
		return
	}

	// Update shipment
	if err := tx.Model(&models.Shipment{}).
		Where("order_id = ?", orderID).
		Update("shipment_status", "canceled").Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to update shipment"})
		return
	}

	// Kembalikan stok
	for _, item := range order.OrderDetails {
		if err := tx.Exec("UPDATE products SET stock = stock + ? WHERE id = ?", item.Quantity, item.ProductID).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to update product stock"})
			return
		}
	}

	// Refund saldo user
	if err := tx.Exec("UPDATE users SET balance = balance + ? WHERE id = ?", order.TotalOrderAmount, userID).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to refund user balance"})
		return
	}

	// Buat notifikasi pembatalan
	notif := models.Notification{
		UserID:   &userID,
		StoreID:  &order.StoreID,
		Type:     string(models.NotificationTypeOrder),
		Message:  fmt.Sprintf("Order number #%s has been canceled. Reason: %s", order.OrderNumber, req.CancelReason),
		Metadata: orderID,
	}
	if err := tx.Create(&notif).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to create notification"})
		return
	}

	tx.Commit()
	c.JSON(http.StatusOK, gin.H{"message": "Order successfully canceled"})
}

func CancelOrderBySeller(c *gin.Context) {
	storeID := utils.MustGetStoreID(c)
	orderID := c.Param("orderId")

	var req struct {
		CancelReason string `json:"cancel_reason"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid cancel reason"})
		return
	}

	tx := config.DB.Begin()

	var order models.Order
	if err := tx.Preload("OrderDetails").Where("id = ?", orderID).First(&order).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusNotFound, gin.H{"message": "Order Not Found"})
		return
	}

	var user models.User
	if err := tx.Where("id = ?", order.UserID).First(&user).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusNotFound, gin.H{"message": "User Not Found"})
		return
	}

	if err := tx.Exec("UPDATE users SET balance = balance + ? WHERE id = ?", order.TotalOrderAmount, order.UserID).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to refund user"})
		return
	}

	for _, item := range order.OrderDetails {
		if err := tx.Exec("UPDATE products SET stock = stock + ? WHERE id = ?", item.Quantity, item.ProductID).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to return product stock"})
			return
		}
	}

	if err := tx.Model(&models.Shipment{}).Where("order_id = ?", order.ID).
		Updates(map[string]interface{}{
			"shipment_number": nil,
			"shipment_status": string(models.ShipmentStatusCanceled),
		}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to cancel shipment"})
		return
	}

	if err := tx.Model(&order).Update("order_status", string(models.OrderStatusCanceled)).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to cancel order"})
		return
	}

	notif := models.Notification{
		StoreID:  &storeID,
		UserID:   &order.UserID,
		Type:     string(models.NotificationTypeOrder),
		Message:  req.CancelReason,
		Metadata: fmt.Sprintf(`{"orderId":%d,"orderNumber":"%s"}`, order.ID, order.OrderNumber),
	}
	if err := tx.Create(&notif).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to create notification"})
		return
	}

	tx.Commit()
	c.JSON(http.StatusOK, gin.H{"message": "Order is canceled"})
}

func ConfirmOrderBySeller(c *gin.Context) {
	storeID := utils.MustGetStoreID(c)
	orderID := c.Param("orderId")

	var req struct {
		ShipmentNumber string `json:"shipmentNumber"`
		Message        string `json:"message"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}

	if req.ShipmentNumber == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Shipment number required"})
		return
	}

	if req.Message == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Message is required"})
		return
	}

	tx := config.DB.Begin()

	var order models.Order
	if err := tx.Where("id = ?", orderID).First(&order).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusNotFound, gin.H{"message": "Order Not Found"})
		return
	}

	if err := tx.Model(&models.Shipment{}).
		Where("order_id = ?", orderID).
		Updates(map[string]interface{}{
			"shipment_number": req.ShipmentNumber,
			"shipment_status": string(models.ShipmentStatusShipped),
		}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to update shipment"})
		return
	}

	if err := tx.Model(&order).
		Update("order_status", string(models.OrderStatusProcess)).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to update order"})
		return
	}

	notif := models.Notification{
		UserID:   &order.UserID,
		StoreID:  &storeID,
		Type:     string(models.NotificationTypeOrder),
		Message:  req.Message,
		Metadata: fmt.Sprintf(`{"shipmentNumber":"%s"}`, req.ShipmentNumber),
	}
	if err := tx.Create(&notif).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Failed to create notification"})
		return
	}

	tx.Commit()
	c.JSON(http.StatusOK, gin.H{
		"message": "Order Proceeded for shipment",
	})
}

func GetAllSellerOrders(c *gin.Context) {
	storeID := utils.MustGetStoreID(c)
	status := c.Query("status")

	var rawOrders []models.Order

	db := config.DB.Preload("OrderDetails.Product").Where("store_id = ?", storeID)

	if status != "" {
		db = db.Where("order_status = ?", status)
	} else {
		db = db.Where("order_status != ?", "waiting payment")
	}

	if err := db.Order("created_at DESC").Find(&rawOrders).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}

	if len(rawOrders) == 0 {
		c.JSON(http.StatusOK, gin.H{
			"message": "You don't have any order",
			"orders":  []models.Order{},
		})
		return
	}

	var orders []gin.H
	for _, order := range rawOrders {
		orders = append(orders, gin.H{
			"id":            order.ID,
			"createdAt":     order.CreatedAt,
			"totalPrice":    order.TotalPrice,
			"orderNumber":   order.OrderNumber,
			"orderStatus":   order.OrderStatus,
			"transactionId": order.TransactionID,
			"totalProducts": len(order.OrderDetails),
		})
	}

	c.JSON(http.StatusOK, gin.H{"orders": orders})
}

func GetSellerOrderDetail(c *gin.Context) {
	orderID := c.Param("orderId")

	var order models.Order
	err := config.DB.
		Preload("OrderDetails.Product.Galleries").
		Preload("Address").
		Preload("Shipment").
		Where("id = ?", orderID).
		First(&order).Error

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "Order Not Found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"order": order})
}
