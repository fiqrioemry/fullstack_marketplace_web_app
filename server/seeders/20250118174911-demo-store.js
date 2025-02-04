"use strict";
const createSlug = require("../utils/createSlug");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Stores",
      [
        {
          userId: 1, // ID user seller yang relevan
          city: "Jakarta", // Nama kota untuk store
          name: "Gramedia Official Store", // Nama toko untuk kategori Books
          slug: createSlug("Gramedia Official Store"),
          description: "Your go-to store for books.",
          avatar:
            "https://cf.shopee.co.id/file/998c7682fd5e7a3563b2ad00aaa4e6f3_tn",
          image: "https://placehold.co/700x500", // Contoh gambar
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          city: "Surabaya", // Nama kota untuk store
          name: "GadgetHub Electronics Store",
          slug: createSlug("GadgetHub Electronics Store"),
          description: "Latest gadgets and electronics.",
          avatar:
            "https://cf.shopee.co.id/file/dcd61dcb7c1448a132f49f938b0cb553_tn",
          image: "https://placehold.co/700x500",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          city: "Bandung", // Nama kota untuk store
          name: "Tasty Bites Food Store",
          slug: createSlug("Tasty Bites Food Store"),
          description: "Delicious food and drinks.",
          avatar:
            "https://cf.shopee.co.id/file/7873b8c3824367239efb02d18eeab4f5_tn",
          image: "https://placehold.co/700x500",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          city: "Medan", // Nama kota untuk store
          name: "Beauty Essentials Cosmetics",
          slug: createSlug("Beauty Essentials Cosmetics"),
          description: "Top cosmetic products for your beauty.",
          avatar:
            "https://cf.shopee.co.id/file/2715b985ae706a4c39a486f83da93c4b_tn",
          image: "https://placehold.co/700x500",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          city: "Yogyakarta", // Nama kota untuk store
          name: "Fashionista Apparel",
          slug: createSlug("Fashionista Apparel"),
          description: "Trendy fashion styles for everyone.",
          avatar:
            "https://cf.shopee.co.id/file/04dba508f1ad19629518defb94999ef9_tn",
          image: "https://placehold.co/700x500",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Stores", null, {});
  },
};
