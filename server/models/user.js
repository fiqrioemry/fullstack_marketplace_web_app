"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Store);
      this.hasMany(models.Cart);
      this.hasMany(models.Order);
      this.hasMany(models.Address);
    }
  }
  User.init(
    {
      fullname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.TEXT,
      role: {
        type: DataTypes.ENUM,
        values: ["customer", "seller", "admin"],
        defaultValue: "customer",
        allowNull: false,
      },
      birthday: DataTypes.STRING,
      gender: {
        type: DataTypes.ENUM,
        values: ["male", "female"],
        allowNull: true,
      },
      avatar: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
