'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      this.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order',
      });
      this.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
      });
    }
  }

  OrderDetail.init(
    {
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'OrderDetail',
      hooks: {
        beforeCreate: (orderDetail, options) => {
          orderDetail.totalPrice = orderDetail.price * orderDetail.quantity;
        },
        beforeUpdate: (orderDetail, options) => {
          orderDetail.totalPrice = orderDetail.price * orderDetail.quantity;
        },
      },
    },
  );

  return OrderDetail;
};
