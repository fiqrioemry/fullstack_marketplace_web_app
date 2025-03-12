'use strict';
const createSlug = require('../utils/createSlug');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Products',
      [
        {
          storeId: 1,
          categoryId: 1,
          name: 'The Great Gatsby',
          slug: createSlug('The Great Gatsby'),
          description: 'A classic novel by F. Scott Fitzgerald.',
          price: 120000.0,
          stock: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 5,
          categoryId: 5,
          name: 'Men’s Leather Wallet',
          slug: createSlug('Men’s Leather Wallet'),
          description: 'A sleek leather wallet with a minimalist design.',
          price: 250000.0,
          stock: 400,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 1,
          categoryId: 1,
          name: "Harry Potter and the Sorcerer's Stone",
          slug: createSlug("Harry Potter and the Sorcerer's Stone"),
          description:
            'The first book in the Harry Potter series by J.K. Rowling.',
          price: 100000.0,
          stock: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 1,
          categoryId: 1,
          name: 'The Catcher in the Rye',
          slug: createSlug('The Catcher in the Rye'),
          description:
            'A novel by J.D. Salinger, exploring teenage alienation.',
          price: 95000.0,
          stock: 40,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 3,
          categoryId: 3,
          name: 'Gourmet Coffee Beans',
          slug: createSlug('Gourmet Coffee Beans'),
          description: 'Premium roasted coffee beans from the best farms.',
          price: 100000.0,
          stock: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 2,
          categoryId: 2,
          name: 'Samsung Galaxy S23',
          slug: createSlug('Samsung Galaxy S23'),
          description:
            'The latest flagship phone from Samsung with cutting-edge features.',
          price: 15000000.0,
          stock: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 2,
          categoryId: 2,
          name: 'Apple MacBook Pro M2',
          slug: createSlug('Apple MacBook Pro M2'),
          description:
            "A powerful laptop with Apple's new M2 chip, perfect for professionals.",
          price: 25000000.0,
          stock: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 2,
          categoryId: 2,
          name: 'Sony WH-1000XM5 Headphones',
          slug: createSlug('Sony WH-1000XM5 Headphones'),
          description: 'Premium noise-canceling headphones for audiophiles.',
          price: 4000000.0,
          stock: 150,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 2,
          categoryId: 2,
          name: 'LG 55-inch OLED TV',
          slug: createSlug('LG 55-inch OLED TV'),
          description:
            'A stunning 4K OLED TV with perfect black levels and vivid colors.',
          price: 18000000.0,
          stock: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 2,
          categoryId: 2,
          name: 'GoPro HERO11 Black',
          slug: createSlug('GoPro HERO11 Black'),
          description:
            'The latest action camera with stunning 5.3K video capture.',
          price: 8000000.0,
          stock: 40,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 1,
          categoryId: 1,
          name: 'Pride and Prejudice',
          slug: createSlug('Pride and Prejudice'),
          description:
            'A romantic novel by Jane Austen, set in the 19th century.',
          price: 90000.0,
          stock: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 4,
          categoryId: 4,
          name: 'Firming Eye Cream',
          slug: createSlug('Firming Eye Cream'),
          description:
            'A firming eye cream that reduces puffiness and dark circles.',
          price: 300000.0,
          stock: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 1,
          categoryId: 1,
          name: 'The Hobbit',
          slug: createSlug('The Hobbit'),
          description:
            'A fantasy novel by J.R.R. Tolkien, precursor to Lord of the Rings.',
          price: 95000.0,
          stock: 45,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 1,
          categoryId: 1,
          name: 'Animal Farm',
          slug: createSlug('Animal Farm'),
          description:
            'A satirical novella by George Orwell about the Russian Revolution.',
          price: 85000.0,
          stock: 55,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 1,
          categoryId: 1,
          name: 'Jane Eyre',
          slug: createSlug('Jane Eyre'),
          description:
            'A novel by Charlotte Brontë about the life of an orphaned girl.',
          price: 95000.0,
          stock: 40,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 5,
          categoryId: 5,
          name: 'Casual Denim Jacket',
          slug: createSlug('Casual Denim Jacket'),
          description: 'A stylish casual denim jacket for everyday wear.',
          price: 350000.0,
          stock: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 5,
          categoryId: 5,
          name: "Men's Slim Fit T-Shirt",
          slug: createSlug("Men's Slim Fit T-Shirt"),
          description: 'A comfortable slim fit t-shirt, perfect for layering.',
          price: 150000.0,
          stock: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 5,
          categoryId: 5,
          name: 'Women’s Floral Dress',
          slug: createSlug('Women’s Floral Dress'),
          description: 'A beautiful floral dress perfect for spring outings.',
          price: 450000.0,
          stock: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 5,
          categoryId: 5,
          name: 'Leather Crossbody Bag',
          slug: createSlug('Leather Crossbody Bag'),
          description: 'A chic leather crossbody bag to complement any outfit.',
          price: 700000.0,
          stock: 150,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          storeId: 3,
          categoryId: 3,
          name: 'Organic Granola Bars',
          slug: createSlug('Organic Granola Bars'),
          description:
            'Healthy and delicious granola bars made with organic ingredients.',
          price: 50000.0,
          stock: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 3,
          categoryId: 3,
          name: 'Fresh Fruit Smoothies',
          slug: createSlug('Fresh Fruit Smoothies'),
          description: 'Refreshing smoothies made with fresh fruits.',
          price: 30000.0,
          stock: 150,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          storeId: 2,
          categoryId: 2,
          name: 'Dell XPS 13 Laptop',
          slug: createSlug('Dell XPS 13 Laptop'),
          description:
            'A sleek, lightweight laptop perfect for daily use and productivity.',
          price: 15000000.0,
          stock: 75,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 2,
          categoryId: 2,
          name: 'Bose QuietComfort 45',
          slug: createSlug('Bose QuietComfort 45'),
          description:
            'Exceptional noise-canceling headphones for long listening sessions.',
          price: 5000000.0,
          stock: 60,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 2,
          categoryId: 2,
          name: 'Apple iPad Pro 12.9-inch',
          slug: createSlug('Apple iPad Pro 12.9-inch'),
          description:
            'A powerful tablet with the M1 chip, perfect for creative work.',
          price: 22000000.0,
          stock: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 2,
          categoryId: 2,
          name: 'Amazon Echo Show 10',
          slug: createSlug('Amazon Echo Show 10'),
          description:
            'A smart display with Alexa for hands-free control of your smart home.',
          price: 4500000.0,
          stock: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 2,
          categoryId: 2,
          name: 'Microsoft Surface Pro 8',
          slug: createSlug('Microsoft Surface Pro 8'),
          description:
            'A 2-in-1 laptop and tablet with a stunning display and performance.',
          price: 18000000.0,
          stock: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 4,
          categoryId: 4,
          name: 'Luxe Face Serum',
          slug: createSlug('Luxe Face Serum'),
          description:
            'A premium face serum that rejuvenates and brightens skin.',
          price: 450000.0,
          stock: 150,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 4,
          categoryId: 4,
          name: 'Rosewater Toner',
          slug: createSlug('Rosewater Toner'),
          description:
            'Soothing toner with natural rosewater for a refreshing feel.',
          price: 150000.0,
          stock: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 3,
          categoryId: 3,
          name: 'Organic Honey Jar',
          slug: createSlug('Organic Honey Jar'),
          description: 'Pure and organic honey sourced from local farms.',
          price: 150000.0,
          stock: 80,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 3,
          categoryId: 3,
          name: 'Spicy Nacho Chips',
          slug: createSlug('Spicy Nacho Chips'),
          description: 'Crispy nacho chips with a spicy kick.',
          price: 35000.0,
          stock: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 3,
          categoryId: 3,
          name: 'Cold Brew Coffee Bottle',
          slug: createSlug('Cold Brew Coffee Bottle'),
          description:
            'Ready-to-drink cold brew coffee, smooth and refreshing.',
          price: 90000.0,
          stock: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 3,
          categoryId: 3,
          name: 'Assorted Tea Sampler',
          slug: createSlug('Assorted Tea Sampler'),
          description: 'A variety of premium teas in one sampler pack.',
          price: 60000.0,
          stock: 150,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 3,
          categoryId: 3,
          name: 'Almond Butter Spread',
          slug: createSlug('Almond Butter Spread'),
          description:
            'Creamy almond butter, perfect for spreading or adding to smoothies.',
          price: 110000.0,
          stock: 120,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 4,
          categoryId: 4,
          name: 'Premium Anti-Aging Cream',
          slug: createSlug('Premium Anti-Aging Cream'),
          description: 'An anti-aging cream to reduce wrinkles and fine lines.',
          price: 750000.0,
          stock: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 4,
          categoryId: 4,
          name: 'Deep Cleansing Face Wash',
          slug: createSlug('Deep Cleansing Face Wash'),
          description: 'A deep cleansing face wash that removes dirt and oil.',
          price: 120000.0,
          stock: 250,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          storeId: 4,
          categoryId: 4,
          name: 'Nourishing Hair Oil',
          slug: createSlug('Nourishing Hair Oil'),
          description:
            'Hair oil that nourishes and strengthens hair from root to tip.',
          price: 180000.0,
          stock: 150,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 4,
          categoryId: 4,
          name: 'Vitamin C Face Mask',
          slug: createSlug('Vitamin C Face Mask'),
          description:
            'A brightening face mask enriched with vitamin C for glowing skin.',
          price: 250000.0,
          stock: 120,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          storeId: 4,
          categoryId: 4,
          name: 'Mineral Sunscreen SPF 50',
          slug: createSlug('Mineral Sunscreen SPF 50'),
          description:
            'A broad-spectrum sunscreen that protects skin from harmful UV rays.',
          price: 350000.0,
          stock: 180,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 1,
          categoryId: 1,
          name: '1984',
          slug: createSlug('1984'),
          description:
            'A dystopian novel by George Orwell, set in a totalitarian regime.',
          price: 110000.0,
          stock: 35,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 1,
          categoryId: 1,
          name: 'To Kill a Mockingbird',
          slug: createSlug('To Kill a Mockingbird'),
          description:
            'A novel by Harper Lee about racial inequality in the South.',
          price: 105000.0,
          stock: 60,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          storeId: 4,
          categoryId: 4,
          name: 'Hydrating Aloe Vera Gel',
          slug: createSlug('Hydrating Aloe Vera Gel'),
          description:
            'Moisturizing aloe vera gel to calm and hydrate the skin.',
          price: 80000.0,
          stock: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 4,
          categoryId: 4,
          name: 'Organic Lip Balm',
          slug: createSlug('Organic Lip Balm'),
          description: 'Natural lip balm to keep your lips soft and smooth.',
          price: 30000.0,
          stock: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 5,
          categoryId: 5,
          name: 'Unisex Sneakers',
          slug: createSlug('Unisex Sneakers'),
          description:
            'Comfortable and stylish sneakers for any casual occasion.',
          price: 500000.0,
          stock: 250,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 5,
          categoryId: 5,
          name: 'Men’s Formal Suit',
          slug: createSlug('Men’s Formal Suit'),
          description:
            'A sophisticated men’s formal suit for special occasions.',
          price: 1500000.0,
          stock: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 5,
          categoryId: 5,
          name: 'Classic Aviator Sunglasses',
          slug: createSlug('Classic Aviator Sunglasses'),
          description:
            'Timeless aviator sunglasses for a cool and confident look.',
          price: 250000.0,
          stock: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 5,
          categoryId: 5,
          name: 'Floral Print Kimono',
          slug: createSlug('Floral Print Kimono'),
          description: 'A trendy kimono with floral prints for a stylish look.',
          price: 450000.0,
          stock: 120,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 3,
          categoryId: 3,
          name: 'Vegan Protein Shake',
          slug: createSlug('Vegan Protein Shake'),
          description: 'Plant-based protein shakes to fuel your workouts.',
          price: 120000.0,
          stock: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 3,
          categoryId: 3,
          name: 'Gluten-Free Cookies',
          slug: createSlug('Gluten-Free Cookies'),
          description:
            'Delicious cookies made without gluten, perfect for sensitive diets.',
          price: 70000.0,
          stock: 250,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 5,
          categoryId: 5,
          name: 'Women’s High-Waisted Pants',
          slug: createSlug('Women’s High-Waisted Pants'),
          description:
            'Chic high-waisted pants that are both fashionable and comfortable.',
          price: 350000.0,
          stock: 180,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 1,
          categoryId: 1,
          name: 'Moby-Dick',
          slug: createSlug('Moby-Dick'),
          description: 'A tale of adventure and obsession by Herman Melville.',
          price: 130000.0,
          stock: 25,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          storeId: 5,
          categoryId: 5,
          name: 'Men’s Leather Wallet',
          slug: createSlug('Men’s Leather Wallet'),
          description: 'A sleek leather wallet with a minimalist design.',
          price: 250000.0,
          stock: 400,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
