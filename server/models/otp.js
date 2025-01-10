"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Otp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
  }
  Otp.init(
    {
      userId: DataTypes.INTEGER,
      code: DataTypes.STRING,
      expiresAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Otp",
    }
  );
  return Otp;
};
