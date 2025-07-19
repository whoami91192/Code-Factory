# 🔒 Cyber Security Engineer Portfolio

A modern, full-stack portfolio web application showcasing cybersecurity expertise with interactive tools, projects, and a secure admin panel.

![Cyber Security Portfolio](https://img.shields.io/badge/Security-OWASP%20Compliant-green)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.0.0-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.0-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

## 🚀 Features

### Public Portfolio
- **Animated Hero Section** - Cyber-themed landing page with terminal-style animations
- **About Me** - Professional timeline, certifications, and skills showcase
- **Projects Gallery** - Interactive project cards with GitHub integration
- **Interactive Security Tools** - Live demos of cybersecurity utilities
- **Contact Form** - Secure contact submission with email notifications
- **Dark/Light Mode** - Theme toggle with cyber security styling

### Admin Panel (JWT Protected)
- **Secure Authentication** - JWT-based login with bcrypt password hashing
- **Content Management** - Add/edit projects, tools, and certifications
- **Contact Management** - View and manage contact form submissions
- **Audit Logging** - Track all admin activities and login attempts

### Security Features
- **OWASP Top 10 Compliant** - Input sanitization, XSS protection, CSRF tokens
- **Rate Limiting** - API protection against brute force attacks
- **CSP Headers** - Content Security Policy implementation
- **Helmet.js** - Security middleware for Express
- **Audit Logging** - Comprehensive activity tracking

### Interactive Tools
- **Whois Lookup** - Domain information retrieval
- **Subdomain Scanner** - DNS enumeration tool
- **Port Scanner** - Network port discovery
- **Hash Generator** - Cryptographic hash functions
- **Base64 Encoder/Decoder** - Data encoding utilities

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **ShadCN/UI** - Beautiful component library
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **Zustand** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Socket.io** - Real-time communication
- **Winston** - Structured logging

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy (production)
- **ESLint** - Code linting
- **Jest** - Testing framework

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- Docker & Docker Compose
- PostgreSQL (if running locally)

### Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cyber-security-portfolio.git
   cd cyber-security-portfolio
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
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

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

2. **Set up database**
   ```bash
   # Start PostgreSQL
   docker-compose up postgres -d
   
   # Run migrations
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

Create a `.env` file in the root directory:

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

# Server
PORT=5000
NODE_ENV=development
```

## 📁 Project Structure

```
cyber-security-portfolio/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── hooks/         # Custom hooks
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript types
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Database models
│   │   ├── utils/         # Utility functions
│   │   ├── config/        # Configuration files
│   │   └── database/      # Database schema and migrations
│   └── package.json
├── docker-compose.yml     # Docker orchestration
├── .env.example          # Environment variables template
└── README.md
```

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

### E2E Tests
```bash
npm run test:e2e
```

## 🚀 Deployment

### Production with Docker

1. **Build and deploy**
   ```bash
   docker-compose -f docker-compose.yml --profile production up -d
   ```

2. **Set up SSL certificates**
   ```bash
   # Add your SSL certificates to nginx/ssl/
   # Update nginx configuration
   ```

3. **Configure domain**
   - Update DNS records
   - Configure reverse proxy
   - Set up monitoring

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

3. **Set up database**
   ```bash
   # Run migrations
   npm run migrate
   ```

## 🔒 Security Considerations

- **Input Validation** - All user inputs are sanitized and validated
- **Rate Limiting** - API endpoints are protected against abuse
- **CORS Configuration** - Proper cross-origin resource sharing
- **Content Security Policy** - XSS protection headers
- **SQL Injection Prevention** - Parameterized queries
- **Password Security** - bcrypt hashing with salt
- **JWT Security** - Secure token handling
- **Audit Logging** - Comprehensive activity tracking

## 📸 Screenshots

### Home Page
![Home Page](screenshots/home.png)

### Interactive Tools
![Tools Page](screenshots/tools.png)

### Admin Panel
![Admin Panel](screenshots/admin.png)

### Dark Mode
![Dark Mode](screenshots/dark-mode.png)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [ShadCN/UI](https://ui.shadcn.com/) for beautiful components
- [TailwindCSS](https://tailwindcss.com/) for utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) for animations
- [OWASP](https://owasp.org/) for security guidelines

## 📞 Contact

- **Email**: contact@cybersec.com
- **LinkedIn**: [Your LinkedIn]
- **GitHub**: [Your GitHub]

---

**⚠️ Disclaimer**: This portfolio is for educational and demonstration purposes. The security tools included are for legitimate security testing only. Always ensure you have proper authorization before testing any systems. 