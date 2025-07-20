const nodemailer = require('nodemailer')

export default async function handler(req, res) {
  console.log('=== CONTACT API CALLED ===')
  console.log('Method:', req.method)
  console.log('Headers:', req.headers)
  console.log('Body:', req.body)

  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request')
    return res.status(200).end()
  }

  // Handle GET requests for testing
  if (req.method === 'GET') {
    console.log('Handling GET request')
    return res.status(200).json({ 
      success: true,
      message: 'Contact API is working',
      timestamp: new Date().toISOString()
    })
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method)
    return res.status(405).json({ 
      success: false,
      message: `Method ${req.method} not allowed. Use POST for sending messages.`
    })
  }

  try {
    console.log('Processing POST request...')
    const { name, email, subject, message, captchaToken } = req.body

    console.log('Extracted data:', { name, email, subject, message, hasCaptchaToken: !!captchaToken })

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log('Missing required fields')
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
        received: { name: !!name, email: !!email, subject: !!subject, message: !!message }
      })
    }

    // Validate reCAPTCHA token
    if (!captchaToken) {
      console.log('Missing reCAPTCHA token')
      return res.status(400).json({
        success: false,
        message: 'reCAPTCHA verification is required'
      })
    }

    // Verify reCAPTCHA token with Google
    console.log('Verifying reCAPTCHA token...')
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY || '6LcLUIkrAAAAAOkvPDPXJ22e2cPOGIxKb96jBdz1',
        response: captchaToken,
        remoteip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
      })
    })

    const recaptchaResult = await recaptchaResponse.json()
    // Security verification completed

    if (!recaptchaResult.success) {
      console.log('reCAPTCHA verification failed:', recaptchaResult['error-codes'])
      return res.status(400).json({
        success: false,
        message: 'Security verification failed. Please try again.'
      })
    }

    // Check reCAPTCHA v3 score (0.0 = bot, 1.0 = human)
    const score = recaptchaResult.score || 0
    // Score verification completed

    // Use a threshold of 0.5 (you can adjust this based on your needs)
    if (score < 0.5) {
      // Score below threshold
      return res.status(400).json({
        success: false,
        message: 'Security verification failed. Please try again.'
      })
    }

    // Security verification successful

    // Check if environment variables are set
    console.log('Checking environment variables...')
    console.log('SMTP_USER exists:', !!process.env.SMTP_USER)
    console.log('SMTP_PASS exists:', !!process.env.SMTP_PASS)
    console.log('SMTP_FROM exists:', !!process.env.SMTP_FROM)

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.SMTP_FROM) {
      console.error('Missing environment variables:', {
        SMTP_USER: !!process.env.SMTP_USER,
        SMTP_PASS: !!process.env.SMTP_PASS,
        SMTP_FROM: !!process.env.SMTP_FROM
      })
      return res.status(500).json({
        success: false,
        message: 'Email configuration is missing. Please contact administrator.',
        debug: {
          SMTP_USER: !!process.env.SMTP_USER,
          SMTP_PASS: !!process.env.SMTP_PASS,
          SMTP_FROM: !!process.env.SMTP_FROM
        }
      })
    }

    console.log('Environment variables OK, creating transporter...')

    // Create transporter
    const transporter = nodemailer.createTransport({
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

    console.log('Transporter created, setting up email...')

    // Email content with cyber security theme for admin
    const adminMailOptions = {
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
            <p style="margin: 5px 0;">✅ reCAPTCHA v3 verification: PASSED (Score: ${score.toFixed(2)})</p>
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

    // Professional confirmation email for user
    const userMailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: `✅ Message Received - Ioannis Katsimpris | Cyber Security Portfolio`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #333333; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">🔒 Ioannis Katsimpris</h1>
            <p style="margin: 5px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">Cyber Security Professional</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 20px; font-weight: 600;">Thank you for your message!</h2>
            
            <p style="margin: 0 0 20px 0; color: #555555; font-size: 16px; line-height: 1.6;">
              Dear <strong>${name}</strong>,
            </p>
            
            <p style="margin: 0 0 20px 0; color: #555555; font-size: 16px; line-height: 1.6;">
              Thank you for reaching out to me through my Cyber Security Portfolio. I have successfully received your message and I appreciate you taking the time to contact me.
            </p>
            
            <div style="background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 25px 0; border-radius: 4px;">
              <h3 style="margin: 0 0 10px 0; color: #333333; font-size: 18px; font-weight: 600;">📋 Message Details:</h3>
              <p style="margin: 5px 0; color: #555555;"><strong>Subject:</strong> ${subject}</p>
              <p style="margin: 5px 0; color: #555555;"><strong>Date:</strong> ${new Date().toLocaleString('en-US', { 
                timeZone: 'Europe/Athens',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
            
            <p style="margin: 0 0 20px 0; color: #555555; font-size: 16px; line-height: 1.6;">
              I will review your message carefully and get back to you as soon as possible, typically within 24-48 hours. If your inquiry is urgent, please don't hesitate to reach out through alternative channels.
            </p>
            
            <div style="background: #e8f4fd; border: 1px solid #bee5eb; border-radius: 6px; padding: 20px; margin: 25px 0;">
              <h4 style="margin: 0 0 10px 0; color: #0c5460; font-size: 16px; font-weight: 600;">⏰ What to expect next:</h4>
              <ul style="margin: 0; padding-left: 20px; color: #0c5460;">
                <li style="margin: 5px 0;">Detailed response to your inquiry</li>
                <li style="margin: 5px 0;">Additional information if requested</li>
                <li style="margin: 5px 0;">Follow-up questions if needed</li>
              </ul>
            </div>
            
            <p style="margin: 0 0 20px 0; color: #555555; font-size: 16px; line-height: 1.6;">
              In the meantime, feel free to explore my portfolio to learn more about my expertise in cyber security, penetration testing, and security consulting.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://code-factory-gamma.vercel.app" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: 600; font-size: 16px;">🌐 Visit My Portfolio</a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0 0 10px 0; color: #666666; font-size: 14px;">
              <strong>Ioannis Katsimpris</strong><br>
              Cyber Security Professional & Penetration Tester
            </p>
            <p style="margin: 0 0 15px 0; color: #888888; font-size: 12px;">
              🔐 Specializing in Security Audits | 🛡️ Penetration Testing | 🔍 Incident Response
            </p>
            <div style="border-top: 1px solid #e0e0e0; padding-top: 15px;">
              <p style="margin: 0; color: #999999; font-size: 11px;">
                This is an automated confirmation email. Please do not reply to this message.<br>
                If you have any questions, please use the contact form on my website.
              </p>
            </div>
          </div>
        </div>
      `
    }

    console.log('Email options set, attempting to send...')

    // Send admin notification email
    console.log('Sending admin notification...')
    const adminResult = await transporter.sendMail(adminMailOptions)
    console.log('Admin email sent successfully:', adminResult.messageId)

    // Send user confirmation email
    console.log('Sending user confirmation...')
    const userResult = await transporter.sendMail(userMailOptions)
    console.log('User email sent successfully:', userResult.messageId)

    res.status(200).json({
      success: true,
      message: 'Emails sent successfully',
      adminMessageId: adminResult.messageId,
      userMessageId: userResult.messageId,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('=== EMAIL SENDING ERROR ===')
    console.error('Error type:', error.constructor.name)
    console.error('Error message:', error.message)
    console.error('Error code:', error.code)
    console.error('Error stack:', error.stack)
    console.error('Full error object:', error)
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send email. Please try again later.'
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please check credentials.'
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Email server connection failed. Please try again later.'
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = 'Email request timed out. Please try again later.'
    } else if (error.message.includes('nodemailer')) {
      errorMessage = 'Email service configuration error.'
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      errorCode: error.code,
      timestamp: new Date().toISOString()
    })
  }
} 