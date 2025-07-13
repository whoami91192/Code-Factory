# 🍔 Food Ordering Platform

Μια σύγχρονη πλατφόρμα παραγγελιών φαγητού με Spring Boot backend και React frontend.

🚀 Περιγραφή

Η εφαρμογή επιτρέπει σε χρήστες να περιηγούνται σε προϊόντα, να προσθέτουν στο καλάθι, να κάνουν παραγγελίες, να αφήνουν κριτικές, να κερδίζουν πόντους loyalty και να διαχειρίζονται το προφίλ τους. Υπάρχει πλήρες σύστημα authentication/authorization (JWT), admin dashboard, responsive UI και υποστήριξη για deployment με Docker.

🛠️ Τεχνολογίες
- Backend: Java 17+, Spring Boot, Spring Security, JPA/Hibernate, PostgreSQL, Maven, Swagger
- Frontend: React, TypeScript, Material UI, React Router, Context API, Axios
- Database: PostgreSQL
- Authentication: JWT (JSON Web Tokens)
- Documentation: Swagger/OpenAPI
- Testing: JUnit, Postman Collection
- Deployment: Docker, Docker Compose

⚡ Quick Start

Με Docker (Προτεινόμενο)

Clone το repository
git clone https://github.com/whoami91192/Code-Factory.git
cd "Code-Factory/Final Project/food-ordering-platform"

Εκκίνηση με Docker Compose
docker compose up -d

Η εφαρμογή θα είναι διαθέσιμη στα:
Frontend: http://localhost:3000
Backend API: http://localhost:8080/api
Swagger UI: http://localhost:8080/api/swagger-ui.html
Database: localhost:5432

Τοπική Εγκατάσταση

Backend
cd backend
./mvnw spring-boot:run

Frontend (σε νέο terminal)
cd frontend
npm install
npm start

👥 Sample Users

Μετά την εκκίνηση της εφαρμογής, μπορείτε να χρησιμοποιήσετε τους παρακάτω προ-δημιουργημένους χρήστες:

🔐 Admin User
- Username: admin
- Email: admin@foodordering.com
- Password: password123
- Role: ADMIN
- Δυνατότητες: Πλήρης πρόσβαση σε admin dashboard, διαχείριση χρηστών, παραγγελιών, προϊόντων

👤 Regular Users
- Username: user1
- Email: user1@example.com
- Password: password123
- Role: USER

- Username: user2
- Email: user2@example.com
- Password: password123
- Role: USER

Δυνατότητες Regular Users: Προβολή προϊόντων, προσθήκη στο καλάθι, παραγγελίες, κριτικές, loyalty points

🔧 Περιβάλλοντα

Backend (.env ή application.properties)

Database
spring.datasource.url=jdbc:postgresql://localhost:5432/food_ordering_db
spring.datasource.username=postgres
spring.datasource.password=password

JWT
jwt.secret=your-secret-key
jwt.expiration=86400000

Server
server.port=8080
server.servlet.context-path=/api

Frontend (.env)
REACT_APP_API_URL=http://localhost:8080/api

Δομή Φακέλων

food-ordering-platform/
├── backend/                 # Spring Boot Backend
│   ├── src/main/java/
│   │   ├── controller/      # REST Controllers
│   │   ├── service/         # Business Logic
│   │   ├── repository/      # Data Access
│   │   ├── entity/          # JPA Entities
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── security/        # JWT & Security
│   │   └── config/          # Configuration
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── data.sql         # Sample Data
│   └── pom.xml
├── frontend/                # React Frontend
│   ├── src/
│   │   ├── components/      # React Components
│   │   ├── pages/           # Page Components
│   │   ├── context/         # React Context
│   │   ├── services/        # API Services
│   │   └── types/           # TypeScript Types
│   ├── package.json
│   └── tsconfig.json
├── postman/                 # API Testing
│   └── food-ordering-api.postman_collection.json
├── docker-compose.yml
└── README.md

📚 API Documentation

Swagger UI
Μετά την εκκίνηση του backend, η API documentation είναι διαθέσιμη στο:
http://localhost:8080/api/swagger-ui.html

Βασικά Endpoints

Authentication:
POST   /api/auth/signup     # Εγγραφή χρήστη
POST   /api/auth/login      # Σύνδεση
POST   /api/auth/refresh    # Refresh token
GET    /api/auth/me         # Τρέχων χρήστης

Products:
GET    /api/products        # Λίστα προϊόντων
GET    /api/products/{id}   # Προϊόν με ID
POST   /api/products        # Δημιουργία (Admin)
PUT    /api/products/{id}   # Ενημέρωση (Admin)

Cart:
GET    /api/cart            # Καλάθι χρήστη
POST   /api/cart/items      # Προσθήκη στο καλάθι
PUT    /api/cart/items/{id} # Ενημέρωση ποσότητας

Orders:
POST   /api/orders          # Δημιουργία παραγγελίας
GET    /api/orders          # Παραγγελίες χρήστη
GET    /api/orders/{id}     # Παραγγελία με ID

Admin:
GET    /api/users           # Όλοι χρήστες (Admin)
GET    /api/orders          # Όλες παραγγελίες (Admin)
PATCH  /api/orders/{id}/status # Ενημέρωση status (Admin)

🧪 Testing

Unit Tests
cd backend
./mvnw test

Integration Tests με Postman
1. Εισάγετε το collection: postman/food-ordering-api.postman_collection.json
2. Εκκινήστε το backend
3. Εκτελέστε τα requests με τη σειρά

Manual Testing
1. Εκκινήστε την εφαρμογή
2. Συνδεθείτε με έναν από τους sample users
3. Δοκιμάστε όλες τις λειτουργίες (προϊόντα, καλάθι, παραγγελίες, κλπ.)

🔒 Ασφάλεια

- JWT Authentication: Όλα τα protected endpoints απαιτούν valid JWT token
- Role-based Authorization: Διαχωρισμός USER/ADMIN permissions
- Password Hashing: BCrypt για κωδικούς
- CORS Configuration: Configured για frontend
- Input Validation: @Valid annotations σε όλα τα DTOs

🚀 Deployment

Production με Docker

Build και εκκίνηση
docker-compose -f docker-compose.yml up -d

Environment variables για production
export SPRING_PROFILES_ACTIVE=prod
export DATABASE_URL=your-production-db-url
export JWT_SECRET=your-production-secret

Manual Deployment
1. Build backend: ./mvnw clean package
2. Build frontend: npm run build
3. Deploy JAR file και build folder
4. Configure database και environment variables

🐛 Troubleshooting

Συχνά Προβλήματα

Backend δεν ξεκινά:
- Έλεγχος αν PostgreSQL τρέχει
- Έλεγχος database credentials
- Έλεγχος port 8080 (αν είναι διαθέσιμος)

Frontend δεν συνδέεται:
- Έλεγχος REACT_APP_API_URL στο .env
- Έλεγχος αν backend τρέχει
- Έλεγχος CORS configuration

Database errors:
- Εκκίνηση PostgreSQL service
- Έλεγχος database schema
- Reset με data.sql

🔧 Αν δεν λειτουργούν οι Sample Users

Αν δεν μπορείτε να συνδεθείτε με τους προ-δημιουργημένους χρήστες, ακολουθήστε τα παρακάτω βήματα:

1. Σύνδεση στη PostgreSQL βάση:

Με Docker
docker exec -it food_ordering_db psql -U postgres -d food_ordering_db

Τοπική εγκατάσταση
psql -U postgres -d food_ordering_db

2. Έλεγχος αν υπάρχουν οι χρήστες:
SELECT id, username, email, role, is_active FROM users;

3. Αν δεν υπάρχουν χρήστες, εκτελέστε το seed script:
\i /path/to/backend/src/main/resources/data.sql

4. Αν υπάρχουν αλλά δεν λειτουργούν, αλλάξτε κωδικό:

Για admin user (κωδικός: password123)
UPDATE users 
SET password = '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa' 
WHERE username = 'admin';

Για regular users (κωδικός: password123)
UPDATE users 
SET password = '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa' 
WHERE username IN ('user1', 'user2');

5. Δημιουργία νέου admin user:
INSERT INTO users (username, email, password, role, is_active, created_at, updated_at) 
VALUES (
    'newadmin', 
    'newadmin@example.com', 
    '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 
    'ADMIN', 
    true, 
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP
);

6. Δημιουργία νέου regular user:
INSERT INTO users (username, email, password, role, is_active, created_at, updated_at) 
VALUES (
    'newuser', 
    'newuser@example.com', 
    '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 
    'USER', 
    true, 
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP
);

7. Έλεγχος αν ο χρήστης είναι ενεργός:
UPDATE users SET is_active = true WHERE username = 'admin';

8. Reset όλων των δεδομένων και επανεκκίνηση:

Διαγραφή όλων των δεδομένων
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM cart_items;
DELETE FROM carts;
DELETE FROM products;
DELETE FROM users;

Επαναφορά sequences
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE products_id_seq RESTART WITH 1;
ALTER SEQUENCE carts_id_seq RESTART WITH 1;
ALTER SEQUENCE cart_items_id_seq RESTART WITH 1;
ALTER SEQUENCE orders_id_seq RESTART WITH 1;
ALTER SEQUENCE order_items_id_seq RESTART WITH 1;

Εκτέλεση του seed script
\i /path/to/backend/src/main/resources/data.sql

Logs

Backend logs
docker-compose logs backend

Frontend logs
docker-compose logs frontend

Database logs
docker-compose logs postgres

🗄️ Database Setup & Data Import

Αν χρειάζεται να εισάγετε χειροκίνητα το data.sql αρχείο στη βάση:

Με Docker

Αντιγραφή του data.sql στο container
docker cp backend/src/main/resources/data.sql food_ordering_db:/tmp/data.sql

Σύνδεση στο container και εκτέλεση
docker exec -it food_ordering_db psql -U postgres -d food_ordering_db -f /tmp/data.sql

Εναλλακτικά, απευθείας εκτέλεση
docker exec -i food_ordering_db psql -U postgres -d food_ordering_db < backend/src/main/resources/data.sql

Τοπική PostgreSQL

Σύνδεση στη βάση
psql -U postgres -d food_ordering_db

Εκτέλεση του SQL αρχείου
\i backend/src/main/resources/data.sql

Εναλλακτικά, από terminal
psql -U postgres -d food_ordering_db -f backend/src/main/resources/data.sql

pgAdmin (GUI)
1. Ανοίξτε το pgAdmin
2. Συνδεθείτε στη βάση food_ordering_db
3. Ανοίξτε το Query Tool
4. Ανοίξτε το αρχείο backend/src/main/resources/data.sql
5. Εκτελέστε το script

Τι περιέχει το data.sql:
- 3 sample users (admin, user1, user2)
- 20 sample products με εικόνες από Unsplash
- Reset sequences για proper ID generation
- Όλοι οι κωδικοί είναι: password123 (BCrypt encoded)

👨‍💻 Credits

Food Ordering Platform - Τελική Εργασία Coding Factory

Features:
- User Authentication & Authorization
- Product Catalog & Search
- Shopping Cart Management
- Order Processing
- Review System
- Loyalty Points
- Admin Dashboard
- Responsive Design