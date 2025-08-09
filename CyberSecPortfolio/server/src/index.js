import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import compression from 'compression'
import { createServer } from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import crypto from 'crypto'

// Load environment variables
dotenv.config()

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})

const PORT = process.env.PORT || 5000

// Generate nonce for CSP
const generateNonce = () => {
  return crypto.randomBytes(16).toString('base64')
}

// Security middleware with enhanced CSP and HSTS
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'strict-dynamic'",
        "'nonce-REPLACE_WITH_NONCE'",
        "https://fonts.googleapis.com",
        "https://fonts.gstatic.com",
        "https://www.google.com",
        "https://www.gstatic.com",
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com",
        "https://va.vercel-scripts.com"
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://fonts.googleapis.com"
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com"
      ],
      imgSrc: [
        "'self'",
        "data:",
        "https://www.google-analytics.com",
        "https://www.googletagmanager.com"
      ],
      connectSrc: [
        "'self'",
        "https://www.google.com",
        "https://www.google-analytics.com",
        "https://www.googletagmanager.com",
        "https://va.vercel-scripts.com",
        "https://vitals.vercel-insights.com"
      ],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
      baseUri: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
      requireTrustedTypesFor: ["'script'"]
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: { policy: "same-origin" },
  crossOriginResourcePolicy: { policy: "same-origin" },
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  permissionsPolicy: {
    features: {
      camera: [],
      microphone: [],
      geolocation: [],
      payment: []
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}))

// Additional security headers
app.use((req, res, next) => {
  // HSTS header (already included in helmet but adding for extra security)
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  
  // X-Frame-Options header
  res.setHeader('X-Frame-Options', 'DENY')
  
  // X-Content-Type-Options header
  res.setHeader('X-Content-Type-Options', 'nosniff')
  
  // X-XSS-Protection header
  res.setHeader('X-XSS-Protection', '1; mode=block')
  
  // Referrer-Policy header
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Permissions-Policy header
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()')
  
  next()
})

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api/', limiter)

// CORS configuration - Restrictive for production
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? ['https://www.jksecurestack.com', 'https://jksecurestack.com']
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400 // 24 hours
}))

// Body parsing middleware
app.use(compression())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// Email configuration
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

// Basic API routes
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Cyber Security Portfolio API is working!',
    version: '1.0.0',
    features: ['Security Dashboard', 'Interactive Tools', 'Admin Panel']
  })
})

// Contact form email endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: 'gianniskatsibris@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00ff41; border-bottom: 2px solid #00ff41; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background: #1a1a1a; color: #ffffff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #2a2a2a; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="text-align: center; color: #888; font-size: 12px;">
            <p>This message was sent from your Cyber Security Portfolio contact form.</p>
            <p>Timestamp: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    }

    // Send email
    await transporter.sendMail(mailOptions)

    res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    })

  } catch (error) {
    console.error('Email sending error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.'
    })
  }
})

// WebSocket connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    success: false,
    message: 'Something went wrong!' 
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found' 
  })
})

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Cyber Security Portfolio Server running on port ${PORT}`)
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🔗 Health check: http://localhost:${PORT}/health`)
  console.log(`🔗 API test: http://localhost:${PORT}/api/test`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully')
  server.close(() => {
    console.log('Process terminated')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully')
  server.close(() => {
    console.log('Process terminated')
    process.exit(0)
  })
})

export default app 