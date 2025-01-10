"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Order, { foreignKey: "orderId", as: "order" });
      this.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }
  OrderDetail.init(
    {
      orderId: DataTypes.UUID,
      productId: DataTypes.INTEGER,
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
      },
      totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OrderDetail",
    }
  );

  OrderDetail.beforeCreate((orderDetail, options) => {
    orderDetail.totalPrice = orderDetail.price * orderDetail.quantity;
  });

  return OrderDetail;
};
