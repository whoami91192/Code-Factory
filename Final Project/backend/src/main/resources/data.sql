-- ================================
-- Sample data for Food Ordering Platform
-- ================================

-- Reset sequences
ALTER SEQUENCE IF EXISTS users_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS products_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS carts_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS cart_items_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS orders_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS order_items_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS contacts_id_seq RESTART WITH 1;

-- Clear existing data
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM cart_items;
DELETE FROM carts;
DELETE FROM products;
DELETE FROM users;
DELETE FROM contacts;

-- Insert users (κωδικός: password123 για όλους)
INSERT INTO users (id, username, email, password, role, is_active, created_at, updated_at) VALUES
(1, 'admin', 'admin@foodordering.com', '$2a$10$X6KMIGDJQuyfi8MsvkmXX./2X3a76ALOKbF5H42nyTslpTyqEytMi', 'ADMIN', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'user1', 'user1@example.com', '$2a$10$X6KMIGDJQuyfi8MsvkmXX./2X3a76ALOKbF5H42nyTslpTyqEytMi', 'USER', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'user2', 'user2@example.com', '$2a$10$X6KMIGDJQuyfi8MsvkmXX./2X3a76ALOKbF5H42nyTslpTyqEytMi', 'USER', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert products
INSERT INTO products (id, name, description, price, category, image_url, is_available, created_at, updated_at) VALUES
(1, 'Classic Burger', 'Juicy beef patty, tomato, lettuce, sauce and fresh bun.', 7.50, 'BURGER', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Burger with Fries', 'Burger with fried potatoes and sauce.', 8.50, 'BURGER', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Spaghetti Napolitana', 'Classic spaghetti with tomato sauce and basil.', 6.80, 'APPETIZER', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Penne with Broccoli', 'Penne with fresh broccoli and light sauce.', 7.20, 'APPETIZER', 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Pepperoni Pizza', 'Classic pizza with spicy pepperoni and cheese.', 9.50, 'PIZZA', 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Margherita Pizza', 'Traditional pizza with tomato sauce and mozzarella.', 8.80, 'PIZZA', 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Greek Salad', 'Fresh salad with tomato, cucumber, onion and feta cheese.', 5.50, 'SALAD', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Caesar Salad', 'Crispy lettuce with Caesar dressing and croutons.', 6.20, 'SALAD', 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'Chicken with Vegetables', 'Chicken fillet with fresh vegetables and sauce.', 10.20, 'SIDE', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 'Athletic Plate', 'Healthy plate with grilled chicken and fresh vegetables.', 11.50, 'SIDE', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(11, 'French Fries', 'Crispy golden fries with sea salt.', 4.50, 'SIDE', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(12, 'Onion Rings', 'Crispy battered onion rings.', 5.20, 'SIDE', 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=400', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(13, 'Chocolate Cake', 'Rich chocolate cake with cream.', 6.80, 'DESSERT', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(14, 'Ice Cream', 'Vanilla ice cream with toppings.', 4.90, 'DESSERT', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(15, 'Tiramisu', 'Classic Italian dessert with coffee and mascarpone.', 7.50, 'DESSERT', 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(16, 'Coca Cola', 'Refreshing cola drink.', 2.50, 'BEVERAGE', 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(17, 'Orange Juice', 'Fresh squeezed orange juice.', 3.20, 'BEVERAGE', 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(18, 'Coffee', 'Hot brewed coffee.', 2.80, 'BEVERAGE', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(19, 'Water', 'Fresh mineral water.', 1.50, 'BEVERAGE', 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(20, 'Beer', 'Cold draft beer.', 4.20, 'BEVERAGE', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert contacts
INSERT INTO contacts (name, email, subject, message, phone_number, status, created_at, updated_at) VALUES
('Γιώργος Παπαδόπουλος', 'giorgos@example.com', 'Ερώτηση για παραγγελία', 'Καλησπέρα! Θα ήθελα να ρωτήσω για την παραγγελία μου με αριθμό #12345. Πότε θα παραδοθεί;', '+30 6971234567', 'PENDING', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Μαρία Κωνσταντίνου', 'maria@example.com', 'Πρόβλημα με την εφαρμογή', 'Δεν μπορώ να συνδεθώ στην εφαρμογή. Εμφανίζεται σφάλμα κάθε φορά που προσπαθώ να κάνω login.', '+30 6987654321', 'IN_PROGRESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Νίκος Αλεξίου', 'nikos@example.com', 'Παρατήρηση για το φαγητό', 'Το φαγητό ήταν εξαιρετικό! Θα ήθελα να σας ευχαριστήσω για την ποιότητα και την ταχύτητα της παράδοσης.', NULL, 'RESOLVED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Ελένη Δημητρίου', 'eleni@example.com', 'Αίτημα για συνεργασία', 'Εργάζομαι σε εταιρεία catering και θα ήθελα να συζητήσουμε για πιθανή συνεργασία.', '+30 6945678901', 'PENDING', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Δημήτρης Παπαγεωργίου', 'dimitris@example.com', 'Ερώτηση για προσφορά', 'Θα ήθελα να μάθω αν προσφέρετε εκπτώσεις για μεγάλες παραγγελίες για εταιρικά events.', '+30 6934567890', 'CLOSED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Update sequences
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('carts_id_seq', (SELECT MAX(id) FROM carts));
SELECT setval('cart_items_id_seq', (SELECT MAX(id) FROM cart_items));
SELECT setval('orders_id_seq', (SELECT MAX(id) FROM orders));
SELECT setval('order_items_id_seq', (SELECT MAX(id) FROM order_items));
SELECT setval('contacts_id_seq', (SELECT MAX(id) FROM contacts));