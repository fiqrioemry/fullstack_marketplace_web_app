"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Address.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      isMain: DataTypes.BOOLEAN,
      address: DataTypes.TEXT,
      province: DataTypes.STRING,
      city: DataTypes.STRING,
      district: DataTypes.STRING,
      zipcode: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
