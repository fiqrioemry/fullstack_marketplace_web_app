'use strict';
const createSlug = require('../utils/createSlug');
const randomStoreAvatar = require('../utils/randomStoreAvatar');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Stores',
      [
        {
          userId: 1,
          city: 'Jakarta',
          name: 'Gramedia Official Store',
          slug: createSlug('Gramedia Official Store'),
          description: 'Your go-to store for books.',
          avatar: randomStoreAvatar(),
          banner: 'https://placehold.co/900x500',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          city: 'Surabaya',
          name: 'GadgetHub Electronics Store',
          slug: createSlug('GadgetHub Electronics Store'),
          description: 'Latest gadgets and electronics.',
          avatar: randomStoreAvatar(),
          banner: 'https://placehold.co/900x500',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          city: 'Bandung',
          name: 'Tasty Bites Food Store',
          slug: createSlug('Tasty Bites Food Store'),
          description: 'Delicious food and drinks.',
          avatar: randomStoreAvatar(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          city: 'Medan',
          name: 'Beauty Essentials Cosmetics',
          slug: createSlug('Beauty Essentials Cosmetics'),
          description: 'Top cosmetic products for your beauty.',
          avatar: randomStoreAvatar(),
          banner: 'https://placehold.co/900x500',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          city: 'Yogyakarta',
          name: 'Fashionista Apparel',
          slug: createSlug('Fashionista Apparel'),
          description: 'Trendy fashion styles for everyone.',
          avatar: randomStoreAvatar(),
          banner: 'https://placehold.co/900x500',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stores', null, {});
  },
};
