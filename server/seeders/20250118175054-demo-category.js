"use strict";
const createSlug = require("../utils/createSlug");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Books",
          image:
            "https://cf.shopee.co.id/file/998c7682fd5e7a3563b2ad00aaa4e6f3_tn",
          slug: "books",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Electronics",
          image:
            "https://cf.shopee.co.id/file/dcd61dcb7c1448a132f49f938b0cb553_tn",
          slug: "electronics",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Food & Beverages",
          image:
            "https://cf.shopee.co.id/file/7873b8c3824367239efb02d18eeab4f5_tn",
          slug: "food-and-beverages",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cosmetics",
          image:
            "https://cf.shopee.co.id/file/2715b985ae706a4c39a486f83da93c4b_tn",
          slug: "cosmetics",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fashion",
          image:
            "https://cf.shopee.co.id/file/04dba508f1ad19629518defb94999ef9_tn",
          slug: "fashion",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
