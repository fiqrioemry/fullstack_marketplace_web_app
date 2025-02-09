'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Pastikan order_number unik
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      storeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      addressId: {
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
        values: ['pending', 'paid', 'canceled', 'expired'],
        defaultValue: 'pending',
        allowNull: false,
      },
      shippingCost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      shippingStatus: {
        type: Sequelize.ENUM,
        values: ['pending', 'process', 'shipped', 'delivered'],
        defaultValue: 'pending',
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
    await queryInterface.dropTable('Orders');
  },
};
