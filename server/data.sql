use fullstack_marketplace_db;

INSERT INTO users (fullname, email, password, role, gender, phone, balance, created_at, updated_at) VALUES 
('Customer 01', 'customer01@mail.com', 'hashed_password1', 'customer', 'male', '081234567890', 1000000, NOW(), NOW()),
('Seller 01', 'seller01@mail.com', 'hashed_password2', 'seller', 'male', '081234567891', 0, NOW(), NOW()),
('Admin 01', 'admin01@mail.com', 'hashed_password3', 'admin', 'female', '081234567892', 0, NOW(), NOW());

INSERT INTO addresses (user_id, name, is_main, address, province, city, zipcode, phone, created_at, updated_at)
VALUES 
(1, 'Customer 01 Home', TRUE, 'Jl. Pelajar No. 1', 'Sumatera Utara', 'Medan', '20222', '081234567890', NOW(), NOW());

INSERT INTO stores (user_id, city, name, slug, banner, avatar, description, balance, created_at, updated_at)
VALUES 
(2, 'Medan', 'Toko Seller 01', 'toko-seller-01', 'https://placehold.co/400x600', 'https://placehold.co/400x600', 'Deskripsi toko seller 01', 0, NOW(), NOW());

INSERT INTO categories (name, image, slug, created_at, updated_at)
VALUES 
('Elektronik', 'https://placehold.co/400x600', 'elektronik', NOW(), NOW()),
('Pakaian', 'https://placehold.co/400x600', 'pakaian', NOW(), NOW()),
('Makanan', 'https://placehold.co/400x600', 'makanan', NOW(), NOW());

INSERT INTO products (store_id, category_id, name, slug, description, price, stock, sold, created_at, updated_at)
VALUES 
(1, 1, 'Smartphone XYZ', 'smartphone-xyz', 'Smartphone dengan fitur canggih', 2500000, 10, 0, NOW(), NOW()),
(1, 2, 'Kaos Pria Lengan Pendek', 'kaos-pria', 'Kaos bahan katun', 80000, 20, 0, NOW(), NOW()),
(1, 3, 'Roti Gandum', 'roti-gandum', 'Roti sehat dari gandum utuh', 15000, 50, 0, NOW(), NOW());

INSERT INTO carts (user_id, product_id, quantity, created_at, updated_at)
VALUES 
(1, 1, 2, NOW(), NOW()),
(1, 2, 2, NOW(), NOW()),
(1, 3, 2, NOW(), NOW());

INSERT INTO transactions (
  id, user_id, total_amount, total_shipment_cost, amount_to_pay, payment_link, payment_due, payment_status, created_at, updated_at
) VALUES (
  '35b5642f-9224-46bf-a58e-559e150b080c', 
  1,             
  280000.00,      
  15000.00,          
  295000.00,          
  'https://payment-gateway.test/checkout/123abc', 
  NOW() + INTERVAL 1 DAY, 
  'paid', 
  NOW(), NOW()
);

INSERT INTO orders (
  transaction_id, user_id, store_id, address_id, order_number,
  total_price, shipment_cost, total_order_amount,
  order_status, created_at, updated_at
) VALUES (
  '35b5642f-9224-46bf-a58e-559e150b080c',
  1,2, 1,'ORDER-001',280000.00, 15000.00, 295000.00, 'pending', NOW(), NOW());
  
  
  INSERT INTO notifications (
  user_id, store_id, type, message, metadata, status,
  created_at, updated_at
) VALUES (
  NULL,
  2,
  'order',
  'You have a new order from customer01',
  JSON_OBJECT('order_number', 'ORDER-001'),
  'unread',
  NOW(), NOW()
);

INSERT INTO notifications (
  user_id, store_id, type, message, metadata, status,
  created_at, updated_at
) VALUES (
  1,
  NULL,
  'order',
  'Your order ORDER-001 has been placed successfully.',
  JSON_OBJECT('order_number', 'ORDER-001'),
  'unread',
  NOW(), NOW()
);