# 🚀 Cyber Security Portfolio - Setup Guide

This guide will help you get the Cyber Security Portfolio application up and running.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **Docker** and **Docker Compose**
- **Git**

## 🛠 Quick Start

### Option 1: Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cyber-security-portfolio
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start the application**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Admin Panel: http://localhost:3000/admin

### Option 2: Local Development

1. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client && npm install
   
   # Install server dependencies
   cd ../server && npm install
   ```

2. **Set up database**
   ```bash
   # Start PostgreSQL
   docker-compose up postgres -d
   
   # Run database migrations
   cd server
   npm run migrate
   npm run seed
   ```

3. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd server && npm run dev
   
   # Terminal 2 - Frontend
   cd client && npm run dev
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cyber_portfolio
DB_USER=postgres
DB_PASSWORD=password

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h

# Email (for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Client
CLIENT_URL=http://localhost:3000
VITE_API_URL=http://localhost:5000/api

# Server
PORT=5000
NODE_ENV=development
```

### Database Setup

The application uses PostgreSQL. The database schema will be automatically created when you run the migrations.

## 🧪 Testing

### Frontend Tests
```bash
cd client
npm test
```

### Backend Tests
```bash
cd server
npm test
```

## 🚀 Production Deployment

### Using Docker

1. **Build and deploy**
   ```bash
   docker-compose -f docker-compose.yml --profile production up -d
   ```

2. **Set up SSL certificates**
   ```bash
   # Add your SSL certificates to nginx/ssl/
   # Update nginx configuration
   ```

### Manual Deployment

1. **Build frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy backend**
   ```bash
   cd server
   npm run build
   npm start
   ```

## 🔒 Security Features

The application includes several security features:

- **OWASP Top 10 Compliance**
- **Input Sanitization**
- **Rate Limiting**
- **CSP Headers**
- **JWT Authentication**
- **Audit Logging**
- **SQL Injection Prevention**

## 📁 Project Structure

```
cyber-security-portfolio/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── hooks/         # Custom hooks
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Database models
│   │   └── utils/         # Utility functions
│   └── package.json
├── docker-compose.yml     # Docker orchestration
└── README.md
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the port in the `.env` file
   - Kill the process using the port

2. **Database connection failed**
   - Ensure PostgreSQL is running
   - Check database credentials in `.env`

3. **Build errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility

### Logs

- **Frontend logs**: Check browser console
- **Backend logs**: Check `server/logs/` directory
- **Docker logs**: `docker-compose logs [service-name]`

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section
2. Review the logs
3. Create an issue in the repository

## 🔄 Updates

To update the application:

1. **Pull latest changes**
   ```bash
   git pull origin main
   ```

2. **Rebuild containers**
   ```bash
   docker-compose down
   docker-compose up -d --build
   ```

## 📝 License

This project is licensed under the MIT License. 