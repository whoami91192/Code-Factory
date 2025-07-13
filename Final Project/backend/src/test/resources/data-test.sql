-- Test data for Food Ordering Platform (H2 compatible)
-- This script inserts sample data for testing the application

-- Clear existing data (if any)
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM cart_items;
DELETE FROM carts;
DELETE FROM products;
DELETE FROM users;

-- Insert sample users
-- Password for all users is 'password123' (BCrypt encoded)
INSERT INTO users (id, username, email, password, role, is_active, created_at, updated_at) VALUES
(1, 'admin', 'admin@foodordering.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'ADMIN', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'user1', 'user1@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'USER', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'user2', 'user2@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'USER', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample products
INSERT INTO products (id, name, description, price, category, image_url, is_available, created_at, updated_at) VALUES
(1, 'Classic Burger', 'Juicy beef patty, tomato, lettuce, sauce and fresh bun.', 7.50, 'BURGER', '/images/burger.jpg', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Burger with Fries', 'Burger with fried potatoes and sauce.', 8.50, 'BURGER', '/images/burger-with-potatoes.png', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Spaghetti Napolitana', 'Classic spaghetti with tomato sauce and basil.', 6.80, 'APPETIZER', '/images/pasta.jpg', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Penne with Broccoli', 'Penne with fresh broccoli and light sauce.', 7.20, 'APPETIZER', '/images/pasta.png', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Pepperoni Pizza', 'Classic pizza with spicy pepperoni and cheese.', 9.50, 'PIZZA', '/images/pizza.png', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Pizza & Rice', 'Pizza with rice and fresh vegetables.', 8.80, 'PIZZA', '/images/pizza-and-rice.png', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Greek Salad', 'Fresh salad with tomato, cucumber, onion and feta cheese.', 5.50, 'SALAD', '/images/salad.png', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Chicken with Vegetables', 'Chicken fillet with fresh vegetables and sauce.', 10.20, 'SIDE', '/images/meat.png', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'Athletic Plate', 'Healthy plate with grilled chicken and fresh vegetables.', 11.50, 'SIDE', '/images/athletic-menu.png', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); 