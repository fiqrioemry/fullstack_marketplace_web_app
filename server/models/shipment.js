'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Shipment extends Model {
    static associate(models) {
      this.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order',
      });
    }
  }

  Shipment.init(
    {
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      shipmentStatus: {
        type: DataTypes.ENUM(
          'pending',
          'shipped',
          'delivered',
          'returned',
          'canceled',
        ),
        allowNull: false,
        defaultValue: 'pending',
      },
      shipmentNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Shipment',
    },
  );

  return Shipment;
};
