"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    static associate(models) {
      // has many
      this.hasMany(models.Order, { foreignkey: "storeId", as: "order" });
      this.hasMany(models.Product, { foreignKey: "storeId", as: "product" });

      // belongs to
      this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
  }
  Store.init(
    {
      userId: DataTypes.INTEGER,
      city: DataTypes.STRING,
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      image: DataTypes.STRING,
      avatar: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Store",
    }
  );
  return Store;
};
