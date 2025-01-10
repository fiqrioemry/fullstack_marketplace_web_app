"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      storeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      amountToPay: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      orderStatus: {
        type: Sequelize.ENUM,
        values: ["pending", "challange", "failure", "success"],
        defaultValue: "pending",
        allowNull: false,
      },
      shippingAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shippingCost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      shippingStatus: {
        type: Sequelize.ENUM,
        values: ["pending", "packaging", "shipped", "delivered"],
        defaultValue: "pending",
        allowNull: false,
      },
      shippingNumber: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
