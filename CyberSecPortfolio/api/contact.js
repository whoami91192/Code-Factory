const nodemailer = require('nodemailer')
const axios = require('axios')

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

    let score = 1.0 // Default score for development mode
    let recaptchaVerified = true

    // Only verify reCAPTCHA if token is provided (production mode)
    if (captchaToken) {
      console.log('Verifying reCAPTCHA token...')
      try {
        const recaptchaResponse = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
          params: {
            secret: '6LcLUIkrAAAAAOkvPDPXJ22e2cPOGIxKb96jBdz1',
            response: captchaToken,
            remoteip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
          }
        })

        const recaptchaResult = recaptchaResponse.data
        console.log('reCAPTCHA verification result:', recaptchaResult)

        if (!recaptchaResult.success) {
          console.log('reCAPTCHA verification failed:', recaptchaResult['error-codes'])
          return res.status(400).json({
            success: false,
            message: 'Security verification failed. Please try again.'
          })
        }

        // Check reCAPTCHA v3 score (0.0 = bot, 1.0 = human)
        score = recaptchaResult.score || 0
        console.log('reCAPTCHA score:', score)

        // Use a threshold of 0.5 (you can adjust this based on your needs)
        if (score < 0.5) {
          console.log('Score below threshold:', score)
          return res.status(400).json({
            success: false,
            message: 'Security verification failed. Please try again.'
          })
        }

        console.log('reCAPTCHA verification successful with score:', score)
      } catch (error) {
        console.error('Error during reCAPTCHA verification:', error)
        return res.status(400).json({
          success: false,
          message: 'Security verification failed. Please try again.'
        })
      }
    } else {
      console.log('No reCAPTCHA token provided - development mode')
      recaptchaVerified = false
    }

    // Check if environment variables are set
    console.log('Checking environment variables...')
    console.log('SMTP_USER exists:', !!process.env.SMTP_USER)
    console.log('SMTP_PASS exists:', !!process.env.SMTP_PASS)
    console.log('SMTP_FROM exists:', !!process.env.SMTP_FROM)

    const hasEmailConfig = process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_FROM

    if (hasEmailConfig) {
      console.log('Email configuration found, sending emails...')
      
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
              <p style="margin: 5px 0;">✅ reCAPTCHA v3 verification: ${recaptchaVerified ? `PASSED (Score: ${score.toFixed(2)})` : 'SKIPPED (Development Mode)'}</p>
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
              
              <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
                <p style="margin: 0; color: #888888; font-size: 14px; text-align: center;">
                  Best regards,<br>
                  <strong>Ioannis Katsimpris</strong><br>
                  Cyber Security Professional<br>
                  <a href="mailto:gianniskatsibris@gmail.com" style="color: #667eea;">gianniskatsibris@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
        `
      }

      console.log('Sending admin email...')
      await transporter.sendMail(adminMailOptions)
      console.log('Admin email sent successfully')

      console.log('Sending user confirmation email...')
      await transporter.sendMail(userMailOptions)
      console.log('User confirmation email sent successfully')

      console.log('All emails sent successfully')
    } else {
      console.log('No email configuration found, logging contact data instead...')
      
      // Log the contact form data for manual review
      const contactData = {
        timestamp: new Date().toISOString(),
        name,
        email,
        subject,
        message,
        recaptchaVerified,
        score,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        userAgent: req.headers['user-agent']
      }
      
      console.log('=== CONTACT FORM DATA ===')
      console.log(JSON.stringify(contactData, null, 2))
      console.log('=== END CONTACT FORM DATA ===')
    }

    res.status(200).json({ 
      success: true, 
      message: hasEmailConfig 
        ? 'Message sent successfully! Check your email for confirmation.' 
        : 'Message received successfully! I will get back to you soon.'
    })

  } catch (error) {
    console.error('Error in contact API:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.',
      error: error.message 
    })
  }
} 