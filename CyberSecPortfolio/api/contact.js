import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  // Enable CORS for all origins in development
  const allowedOrigins = [
    'https://code-factory-651d.vercel.app',
    'http://localhost:3000',
    'http://localhost:4173'
  ]
  
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Max-Age', '86400')

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Handle GET requests for testing
  if (req.method === 'GET') {
    return res.status(200).json({ 
      success: true,
      message: 'Contact API is working',
      timestamp: new Date().toISOString()
    })
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed. Use POST for sending messages.' 
    })
  }

  try {
    // Log the request for debugging
    console.log('Contact API called:', {
      method: req.method,
      headers: req.headers,
      body: req.body,
      url: req.url
    })

    const { name, email, subject, message } = req.body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log('Validation failed:', { name, email, subject, message })
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
        received: { name: !!name, email: !!email, subject: !!subject, message: !!message }
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      })
    }

    // Check if environment variables are set
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.SMTP_FROM) {
      console.error('Missing environment variables:', {
        SMTP_USER: !!process.env.SMTP_USER,
        SMTP_PASS: !!process.env.SMTP_PASS,
        SMTP_FROM: !!process.env.SMTP_FROM
      })
      return res.status(500).json({
        success: false,
        message: 'Email configuration is missing. Please contact administrator.'
      })
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    // Email content with cyber security theme
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: 'gianniskatsibris@gmail.com',
      subject: `🔒 Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: 'Courier New', monospace; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #00ff41; border: 2px solid #00ff41; padding: 20px;">
          <div style="text-align: center; border-bottom: 2px solid #00ff41; padding-bottom: 15px; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #00ff41; text-shadow: 0 0 10px #00ff41;">🚨 NEW CONTACT FORM SUBMISSION 🚨</h2>
            <p style="margin: 5px 0; font-size: 12px; color: #888;">Cyber Security Portfolio Alert</p>
          </div>
          
          <div style="background: #1a1a1a; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #00ff41;">
            <div style="margin-bottom: 15px;">
              <strong style="color: #00ff41;">👤 SENDER:</strong> ${name}
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #00ff41;">📧 EMAIL:</strong> ${email}
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #00ff41;">📋 SUBJECT:</strong> ${subject}
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #00ff41;">💬 MESSAGE:</strong>
            </div>
            <div style="background: #2a2a2a; padding: 15px; border-radius: 3px; border: 1px solid #333; white-space: pre-wrap; color: #ffffff;">
${message}
            </div>
          </div>
          
          <div style="text-align: center; color: #888; font-size: 11px; border-top: 1px solid #333; padding-top: 15px;">
            <p style="margin: 5px 0;">🔐 This message was sent from your Cyber Security Portfolio</p>
            <p style="margin: 5px 0;">⏰ Timestamp: ${new Date().toLocaleString('en-US', { 
              timeZone: 'Europe/Athens',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}</p>
            <p style="margin: 5px 0;">🌐 IP: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}</p>
          </div>
        </div>
      `
    }

    // Send email
    console.log('Attempting to send email...')
    const result = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', result.messageId)

    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      messageId: result.messageId
    })

  } catch (error) {
    console.error('Email sending error:', error)
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send email. Please try again later.'
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please check credentials.'
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Email server connection failed. Please try again later.'
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = 'Email request timed out. Please try again later.'
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
} 