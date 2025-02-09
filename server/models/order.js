'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.Transaction, {
        foreignKey: 'transactionId',
        as: 'transaction',
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
      this.belongsTo(models.Store, {
        foreignKey: 'storeId',
        as: 'store',
      });
      this.belongsTo(models.Address, {
        foreignKey: 'addressId',
        as: 'address',
      });
      this.hasMany(models.OrderDetail, {
        foreignKey: 'orderId',
        as: 'orderDetails',
      });
      this.hasOne(models.Shipment, {
        foreignKey: 'orderId',
        as: 'shipment',
      });
    }
  }

  Order.init(
    {
      transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      storeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      addressId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      orderNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      shipmentCost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      totalOrderAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      orderStatus: {
        type: DataTypes.ENUM(
          'waiting payment',
          'pending',
          'process',
          'canceled',
        ),
        allowNull: false,
        defaultValue: 'waiting payment',
      },
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );

  return Order;
};
