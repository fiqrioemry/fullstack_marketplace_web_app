"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId", as: "user" });

      this.hasMany(models.Product);
      this.hasMany(models.Order);
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
