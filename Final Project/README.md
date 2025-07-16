🍕 Πλατφόρμα Παραγγελιών Φαγητού - Full Stack Εφαρμογή

Μια σύγχρονη, full-stack πλατφόρμα παραγγελιών φαγητού κατασκευασμένη με Spring Boot backend και React frontend. Η εφαρμογή παρέχει μια πλήρη λύση για online παραγγελίες φαγητού με αυθεντικοποίηση χρηστών, διαχείριση προϊόντων, λειτουργικότητα καλαθιού, επεξεργασία παραγγελιών και admin dashboard.

🚀 Χαρακτηριστικά

Χαρακτηριστικά Χρηστών
- Αυθεντικοποίηση & Εξουσιοδότηση Χρηστών - Ασφαλής σύνδεση/εγγραφή με JWT tokens
- Κατάλογος Προϊόντων - Περιήγηση προϊόντων με κατηγορίες και λειτουργία αναζήτησης
- Καλάθι Αγορών - Προσθήκη/αφαίρεση αντικειμένων με πραγματικές ενημερώσεις
- Διαχείριση Παραγγελιών - Τοποθέτηση παραγγελιών και παρακολούθηση κατάστασης
- Προφίλ Χρήστη - Διαχείριση προσωπικών πληροφοριών και διευθύνσεων
- Κριτικές & Βαθμολογίες - Βαθμολόγηση και κριτική προϊόντων
- Αγαπημένα - Αποθήκευση αγαπημένων προϊόντων για γρήγορη πρόσβαση
- Σύστημα Πιστότητας - Κέρδος πόντων και ανταμοιβών
- Υποστήριξη Επικοινωνίας - Υποβολή ερωτήσεων και λήψη υποστήριξης

Χαρακτηριστικά Διαχειριστή
- Admin Dashboard - Περιεκτική διεπαφή διαχείρισης
- Διαχείριση Προϊόντων - Προσθήκη, επεξεργασία και διαχείριση προϊόντων
- Διαχείριση Παραγγελιών - Επεξεργασία και παρακολούθηση όλων των παραγγελιών
- Διαχείριση Χρηστών - Διαχείριση λογαριασμών χρηστών και ρόλων
- Διαχείριση Επικοινωνίας - Χειρισμός ερωτήσεων πελατών
- Αναλυτικά - Προβολή στατιστικών πωλήσεων και χρηστών

🛠️ Τεχνολογίες

Backend (Spring Boot)
- Framework: Spring Boot 3.2.0
- Γλώσσα: Java 17
- Βάση Δεδομένων: PostgreSQL 17
- ORM: Spring Data JPA με Hibernate
- Ασφάλεια: Spring Security με JWT αυθεντικοποίηση
- Τεκμηρίωση API: OpenAPI 3 (Swagger)
- Εργαλείο Build: Maven
- Testing: JUnit 5, TestContainers, Spring Security Test
- Πρόσθετες Βιβλιοθήκες:
  - Jackson για επεξεργασία JSON
  - Apache Commons Lang3
  - Spring WebFlux για reactive programming

Frontend (React)
- Framework: React 18.2.0
- Γλώσσα: TypeScript 4.9.5
- UI Library: Material-UI (MUI) 5.14.20
- Routing: React Router DOM 6.20.1
- HTTP Client: Axios 1.10.0
- Εικονίδια: React Icons 4.10.1
- Styling: 
  - Emotion (CSS-in-JS)
  - Tailwind CSS 4.1.11
- Virtual Scrolling: React Window 1.8.11
- Εργαλείο Build: Create React App 5.0.1

Υποδομή
- Containerization: Docker & Docker Compose
- Web Server: Nginx (για production frontend)
- Βάση Δεδομένων: PostgreSQL με health checks
- Δικτύωση: Προσαρμοσμένο Docker network

📋 Προαπαιτούμενα

Για Εγκατάσταση με Docker
- Docker Desktop (Windows/Mac) ή Docker Engine (Linux)
- Docker Compose (συνήθως περιλαμβάνεται με Docker Desktop)
- Τουλάχιστον 4GB RAM διαθέσιμο για containers

Για Τοπική Ανάπτυξη (Windows)
- Java Development Kit (JDK) 17
  - Κατεβάστε από [Oracle](https://www.oracle.com/java/technologies/downloads/#java17) ή [OpenJDK](https://adoptium.net/)
  - Ορίστε την μεταβλητή περιβάλλοντος JAVA_HOME
- Maven 3.9+
  - Κατεβάστε από [Apache Maven](https://maven.apache.org/download.cgi)
  - Προσθέστε στο PATH
- Node.js 18+
  - Κατεβάστε από [Node.js](https://nodejs.org/)
  - Περιλαμβάνει npm package manager
- PostgreSQL 17
  - Κατεβάστε από [PostgreSQL](https://www.postgresql.org/download/windows/)
  - Ή χρησιμοποιήστε [PostgreSQL Installer](https://www.postgresql.org/download/windows/)
- Git
  - Κατεβάστε από [Git for Windows](https://git-scm.com/download/win)

🐳 Εγκατάσταση με Docker (Προτεινόμενο)

Γρήγορη Εκκίνηση
1. Κλωνοποιήστε το repository

   git clone https://github.com/whoami91192/Code-Factory.git

   cd "Final Project"

2. Εκκινήστε όλες τις υπηρεσίες

   docker-compose up -d

3. Πρόσβαση στην εφαρμογή
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api
   - Τεκμηρίωση Swagger: http://localhost:8080/api/swagger-ui.html
   - Βάση Δεδομένων: localhost:5432

Εντολές Docker

Εκκίνηση υπηρεσιών:
docker-compose up -d

Προβολή logs:
# Όλες οι υπηρεσίες
docker-compose logs -f

# Συγκεκριμένη υπηρεσία
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

Διακοπή υπηρεσιών:
docker-compose down

Διακοπή και αφαίρεση volumes (δεδομένα βάσης):
docker-compose down -v

Επανεκκίνηση και rebuild:
docker-compose down
docker-compose build --no-cache
docker-compose up -d

💻 Τοπική Εγκατάσταση Ανάπτυξης (Windows)

1. Ρύθμιση Βάσης Δεδομένων

1. Εγκατάσταση PostgreSQL
   - Κατεβάστε και εγκαταστήστε PostgreSQL 17
   - Ορίστε κωδικό για τον χρήστη postgres (θυμηθείτε τον!)
   - Προεπιλεγμένη θύρα: 5432

2. Δημιουργία Βάσης Δεδομένων

   CREATE DATABASE food_ordering_db;

   CREATE USER postgres WITH PASSWORD '12345';

   GRANT ALL PRIVILEGES ON DATABASE food_ordering_db TO postgres;

2. Ρύθμιση Backend

1. Μετάβαση στον φάκελο backend
   cd backend

2. Ενημέρωση ρυθμίσεων βάσης (αν χρειάζεται)
   - Επεξεργαστείτε το src/main/resources/application.properties
   - Ενημερώστε URL βάσης, όνομα χρήστη και κωδικό αν διαφέρουν

3. Build και εκκίνηση
   # Καθαρισμός και build
   mvn clean install

   # Εκκίνηση της εφαρμογής
   mvn spring-boot:run

4. Επιβεβαίωση ότι το backend τρέχει
   - API: http://localhost:8080/api
   - Swagger: http://localhost:8080/api/swagger-ui.html

3. Ρύθμιση Frontend

1. Μετάβαση στον φάκελο frontend
   cd frontend

2. Εγκατάσταση dependencies
   npm install

3. Εκκίνηση development server
   npm start

4. Επιβεβαίωση ότι το frontend τρέχει
   - Εφαρμογή: http://localhost:3000

🔧 Ρύθμιση

Μεταβλητές Περιβάλλοντος

Ρύθμιση Backend
# Βάση Δεδομένων
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/food_ordering_db
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=12345

# JWT
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure_for_production
JWT_EXPIRATION=900000
JWT_REFRESH_EXPIRATION=604800000

# Server
SERVER_PORT=8080
SERVER_SERVLET_CONTEXT_PATH=/api

Ρύθμιση Frontend
// Αρχείο .env
REACT_APP_API_URL=http://localhost:8080/api

Ρύθμιση Βάσης Δεδομένων

Η εφαρμογή χρησιμοποιεί PostgreSQL με τις ακόλουθες προεπιλεγμένες ρυθμίσεις:
- Βάση Δεδομένων: food_ordering_db
- Όνομα Χρήστη: postgres
- Κωδικός: 12345
- Θύρα: 5432

Σημαντικό: Αλλάξτε αυτές τις πληροφορίες για χρήση σε production!

🧪 Testing

Backend Tests
cd backend
mvn test

Frontend Tests
cd frontend
npm test

📁 Δομή Project

Final Project/
├── backend/                 # Spring Boot εφαρμογή
│   ├── src/main/java/
│   │   └── com/foodordering/
│   │       ├── config/      # Κλάσεις ρύθμισης
│   │       ├── controller/  # REST controllers
│   │       ├── dto/         # Data Transfer Objects
│   │       ├── entity/      # JPA entities
│   │       ├── repository/  # Data access layer
│   │       ├── security/    # Ρύθμιση ασφαλείας
│   │       └── service/     # Business logic
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── data.sql         # Αρχικά δεδομένα
│   └── Dockerfile
├── frontend/                # React εφαρμογή
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # React contexts
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   └── types/           # TypeScript types
│   ├── nginx.conf           # Ρύθμιση nginx
│   └── Dockerfile
├── docker-compose.yml       # Docker orchestration
└── README.md

🔐 Χαρακτηριστικά Ασφαλείας

- JWT Αυθεντικοποίηση - Ασφαλής αυθεντικοποίηση με tokens
- Κρυπτογράφηση Κωδικών - BCrypt hashing για κωδικούς
- Ρύθμιση CORS - Cross-origin resource sharing
- Επικύρωση Εισόδου - Επικύρωση και καθαρισμός αιτημάτων
- Έλεγχος Πρόσβασης με Βάση Ρόλους - Ρόλοι χρηστών και διαχειριστών

🚀 Deployment

Σκέψεις για Production

1. Μεταβλητές Περιβάλλοντος
   - Χρησιμοποιήστε ισχυρά JWT secrets
   - Αλλάξτε προεπιλεγμένες πληροφορίες βάσης
   - Ρυθμίστε σωστά CORS origins

2. Βάση Δεδομένων
   - Χρησιμοποιήστε production PostgreSQL instance
   - Ρυθμίστε στρατηγικές backup
   - Ρυθμίστε connection pooling

3. Ασφάλεια
   - Ενεργοποιήστε HTTPS
   - Ρυθμίστε σωστά firewall rules
   - Χρησιμοποιήστε ρυθμίσεις για συγκεκριμένο περιβάλλον

4. Παρακολούθηση
   - Ρυθμίστε παρακολούθηση εφαρμογής
   - Ρυθμίστε logging
   - Ρυθμίστε health checks

🐛 Επίλυση Προβλημάτων

Συχνά Προβλήματα

1. Η θύρα χρησιμοποιείται ήδη
   # Έλεγχος τι χρησιμοποιεί τη θύρα
   netstat -ano | findstr :8080
   # Τερματισμός της διεργασίας
   taskkill /PID <process_id> /F

2. Αποτυχία σύνδεσης βάσης
   - Επιβεβαιώστε ότι το PostgreSQL τρέχει
   - Ελέγξτε τις πληροφορίες βάσης
   - Βεβαιωθείτε ότι η βάση υπάρχει

3. Τα Docker containers δεν εκκινούν
   # Έλεγχος logs containers
   docker-compose logs
   
   # Επανεκκίνηση containers
   docker-compose down
   docker-compose up -d

4. Το frontend δεν συνδέεται με το backend
   - Επιβεβαιώστε ότι το backend τρέχει στη θύρα 8080
   - Ελέγξτε τη ρύθμιση CORS
   - Επιβεβαιώστε το API URL στις ρυθμίσεις frontend

Τοποθεσία Logs

- Docker logs: docker-compose logs -f
- Backend logs: Console output ή Docker logs
- Frontend logs: Browser developer tools

📞 Υποστήριξη

Για προβλήματα και ερωτήσεις:
1. Ελέγξτε την ενότητα επίλυσης προβλημάτων
2. Δείτε την τεκμηρίωση Swagger στο http://localhost:8080/api/swagger-ui.html
3. Ελέγξτε τα logs της εφαρμογής
4. Δημιουργήστε ένα issue στο repository