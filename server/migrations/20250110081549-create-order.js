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
      orderNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
        // set as shipping address relation to model address
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
        values: [
          'waiting payment',
          'pending',
          'process',
          'shipped',
          'delivered',
          'canceled',
        ],
        defaultValue: 'waiting payment',
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
