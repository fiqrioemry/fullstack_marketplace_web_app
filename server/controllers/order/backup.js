const PaymentNotifications = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const statusResponse = await snap.transaction.notification(req.body);
    console.log(
      'ORDER MASUK ORDER MASUK ORDER MASUK ORDER MASUK ORDER MASUK ORDER MASUK ORDER MASUK ORDER MASUK ',
    );
    console.log(statusResponse);
    let orderId = statusResponse.order_id;
    let transactionStatus = statusResponse.transaction_status;

    const order = await Order.findOne({
      where: { orderNumber: orderId },
      transaction,
    });

    if (!order) {
      return res.status(404).json({ message: 'Order Not Found' });
    }

    let message = '';

    if (transactionStatus === 'settlement' || transactionStatus === 'capture') {
      await order.update(
        { orderStatus: 'paid', shippingStatus: 'pending' },
        { transaction },
      );
      message = 'Your Payment is Successful';

      // Notifikasi untuk Seller
      await Notification.create(
        {
          userId: order.storeId,
          type: 'order',
          message: 'You have a new order to process.',
          metadata: { orderNumber: order.orderNumber },
        },
        { transaction },
      );
    } else if (transactionStatus === 'expire') {
      await order.update(
        { orderStatus: 'expired', shippingStatus: 'canceled' },
        { transaction },
      );
      message = 'Your Payment has Expired';

      const orderDetails = await OrderDetail.findAll({
        where: { orderId: order.id },
        transaction,
      });

      for (const item of orderDetails) {
        await Product.increment('stock', {
          by: item.quantity,
          where: { id: item.productId },
          transaction,
        });
      }
    } else if (transactionStatus === 'cancel') {
      await order.update(
        { orderStatus: 'canceled', shippingStatus: 'canceled' },
        { transaction },
      );
      message = 'Your Order has been Canceled';
      const orderDetails = await OrderDetail.findAll({
        where: { orderId: order.id },
        transaction,
      });

      for (const item of orderDetails) {
        await Product.increment('stock', {
          by: item.quantity,
          where: { id: item.productId },
          transaction,
        });
      }
    }

    // Notifikasi untuk Buyer
    await Notification.create(
      {
        userId: order.userId,
        type: 'order',
        message,
        metadata: { orderNumber: order.orderNumber },
      },
      { transaction },
    );

    await transaction.commit();
    return res.status(200).json({ message: 'Order status updated' });
  } catch (error) {
    console.error('Error processing webhook:', error.message);
    await transaction.rollback();
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};
