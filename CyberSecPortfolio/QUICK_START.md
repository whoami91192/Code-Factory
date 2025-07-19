# 🚀 Quick Start Guide - Cyber Security Portfolio

## ✅ Εγκατάσταση και Εκκίνηση

### 1. Εγκατάσταση Dependencies
```bash
# Εγκατάσταση root dependencies
npm install

# Εγκατάσταση client dependencies
cd client
npm install

# Εγκατάσταση server dependencies
cd ../server
npm install
```

### 2. Ρύθμιση Database
- Εγκαταστήστε PostgreSQL
- Δημιουργήστε database: `cyber_portfolio`
- Το .env file έχει ήδη δημιουργηθεί με default values

### 3. Εκκίνηση Εφαρμογής

#### Επιλογή Α: Χρήση του startup script (Προτεινόμενο)
```bash
# Από το root directory
start-dev.bat
```

#### Επιλογή Β: Χειροκίνητη εκκίνηση
```bash
# Terminal 1 - Server
cd server
npm run dev

# Terminal 2 - Client
cd client
npm run dev
```

### 4. Πρόσβαση στην Εφαρμογή
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:5173/admin

## 🔧 Troubleshooting

### Αν υπάρχουν npm errors:
1. Διαγράψτε node_modules:
```bash
rm -rf node_modules
rm -rf client/node_modules
rm -rf server/node_modules
```

2. Καθαρίστε npm cache:
```bash
npm cache clean --force
```

3. Επανεγκαταστήστε dependencies:
```bash
npm install
cd client && npm install
cd ../server && npm install
```

### Αν δεν μπορείτε να συνδεθείτε στη database:
1. Ελέγξτε αν το PostgreSQL τρέχει
2. Ενημερώστε το server/.env με τα σωστά credentials
3. Δημιουργήστε το database: `CREATE DATABASE cyber_portfolio;`

## 📁 Project Structure
```
cyber-security-portfolio/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components
│   │   ├── pages/         # Pages
│   │   └── lib/           # Utilities
├── server/                 # Node.js Backend
│   ├── src/
│   │   ├── routes/        # API Routes
│   │   ├── middleware/    # Security Middleware
│   │   └── db/           # Database
├── docker-compose.yml     # Docker Configuration
└── README.md             # Full Documentation
```

## 🎯 Features Available
- ✅ Modern React UI with TailwindCSS
- ✅ Responsive Design
- ✅ Interactive Pages (Home, About, Projects, Tools, Contact)
- ✅ Working API with Express
- ✅ Database Connection (PostgreSQL)
- ✅ Security Features (Helmet, Rate Limiting, CORS)
- ✅ JWT Authentication
- ✅ Admin Panel
- ✅ Dark/Light Mode Toggle
- ✅ Animated UI with Framer Motion

## 🔐 Default Admin Credentials
- **Username**: admin
- **Password**: admin123
- **Change these in production!**

## 📞 Support
Αν αντιμετωπίζετε προβλήματα, ελέγξτε:
1. Node.js version (>= 16)
2. PostgreSQL installation
3. Port availability (5173, 5000)
4. Firewall settings 