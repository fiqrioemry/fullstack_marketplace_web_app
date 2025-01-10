"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.OrderDetail, {
        foreignKey: "orderId",
        as: "orderDetails",
      });
      this.belongsTo(models.Store, { foreignKey: "storeId", as: "store" });
      this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
  }
  Order.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      storeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      amountToPay: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      orderStatus: {
        type: DataTypes.ENUM,
        values: ["pending", "challange", "failure", "success"],
        defaultValue: "pending",
        allowNull: false,
      },
      shippingAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shippingCost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      shippingStatus: {
        type: DataTypes.ENUM,
        values: ["pending", "packaging", "shipped", "delivered"],
        defaultValue: "pending",
        allowNull: false,
      },
      shippingNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
