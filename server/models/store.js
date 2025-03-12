'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    static associate(models) {
      // has many
      this.hasMany(models.Order, { foreignkey: 'storeId', as: 'order' });
      this.hasMany(models.Product, { foreignKey: 'storeId', as: 'product' });

      // belongs to
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  Store.init(
    {
      userId: DataTypes.INTEGER,
      city: DataTypes.STRING,
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      banner: DataTypes.STRING,
      avatar: DataTypes.STRING,
      description: DataTypes.STRING,
      balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Store',
    },
  );
  return Store;
};
