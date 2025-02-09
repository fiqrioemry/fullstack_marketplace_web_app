'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderStore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderStore.init({
    orderId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER,
    totalAmount: DataTypes.DECIMAL,
    shippingCost: DataTypes.DECIMAL,
    amountToPay: DataTypes.DECIMAL,
    orderStatus: DataTypes.ENUM,
    shippingStatus: DataTypes.ENUM,
    shippingNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OrderStore',
  });
  return OrderStore;
};