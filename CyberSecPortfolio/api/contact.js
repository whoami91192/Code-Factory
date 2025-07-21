export default async function handler(req, res) {
  console.log('=== CONTACT API CALLED ===')
  console.log('Method:', req.method)
  console.log('Headers:', req.headers)
  console.log('Body:', req.body)
  
  // Simple rate limiting - store in memory (not ideal for production)
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  const now = Date.now()
  const rateLimitWindow = 5 * 60 * 1000 // 5 minutes
  const maxRequests = 3 // Max 3 requests per 5 minutes
  
  // Get existing requests for this IP
  if (!global.rateLimitStore) {
    global.rateLimitStore = new Map()
  }
  
  const clientRequests = global.rateLimitStore.get(clientIP) || []
  const recentRequests = clientRequests.filter(time => now - time < rateLimitWindow)
  
  if (recentRequests.length >= maxRequests) {
    console.log('Rate limit exceeded for IP:', clientIP)
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please wait a few minutes before trying again.'
    })
  }
  
  // Add current request
  recentRequests.push(now)
  global.rateLimitStore.set(clientIP, recentRequests)

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
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email)
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      })
    }
    
    // Validate message length
    if (message.length < 5) {
      console.log('Message too short:', message.length)
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 5 characters long'
      })
    }
    
    if (message.length > 2000) {
      console.log('Message too long:', message.length)
      return res.status(400).json({
        success: false,
        message: 'Message must be less than 2000 characters'
      })
    }
    
    // Validate name length
    if (name.length < 2 || name.length > 100) {
      console.log('Invalid name length:', name.length)
      return res.status(400).json({
        success: false,
        message: 'Name must be between 2 and 100 characters'
      })
    }
    
    // Validate subject length
    if (subject.length < 5 || subject.length > 200) {
      console.log('Invalid subject length:', subject.length)
      return res.status(400).json({
        success: false,
        message: 'Subject must be between 5 and 200 characters'
      })
    }

    let score = 1.0 // Default score for development mode
    let recaptchaVerified = true

    // Only verify reCAPTCHA if token is provided (production mode)
    if (captchaToken) {
      console.log('Verifying reCAPTCHA token...')
      
      // Skip reCAPTCHA verification if in debug mode
      if (process.env.SKIP_RECAPTCHA === 'true') {
        console.log('Skipping reCAPTCHA verification (debug mode)')
        score = 1.0
        recaptchaVerified = true
              } else {
          try {
            // Use environment variable for secret key
            const secretKey = process.env.RECAPTCHA_SECRET_KEY || '6LcLUIkrAAAAAOkvPDPXJ22e2cPOGIxKb96jBdz1'
            console.log('Using reCAPTCHA secret key:', secretKey ? `${secretKey.substring(0, 10)}...` : 'NOT FOUND')
            
            const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: new URLSearchParams({
                secret: secretKey,
                response: captchaToken,
                remoteip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
              })
            })

          const recaptchaResult = await recaptchaResponse.json()
          console.log('reCAPTCHA verification result:', recaptchaResult)

          if (!recaptchaResult.success) {
            console.log('reCAPTCHA verification failed:', recaptchaResult['error-codes'])
            
            // Check if it's a browser-error (common with domain mismatches)
            if (recaptchaResult['error-codes'] && recaptchaResult['error-codes'].includes('browser-error')) {
              console.log('Browser error detected - possibly domain mismatch. Proceeding with caution...')
              // For now, allow browser-error to pass but with a fallback score
              score = 0.4 // Assign a medium score for browser errors
              recaptchaVerified = true
              console.log('Assigned fallback score:', score)
              
              // Create a fallback result object
              const fallbackResult = {
                success: true,
                score: score,
                action: 'contact_form',
                challenge_ts: new Date().toISOString(),
                hostname: req.headers.host || 'unknown'
              }
              
              // Override the recaptchaResult for the rest of the processing
              Object.assign(recaptchaResult, fallbackResult)
              console.log('Using fallback reCAPTCHA result:', fallbackResult)
            } else {
              return res.status(400).json({
                success: false,
                message: 'Security verification failed. Please try again.'
              })
            }
          }

          // Check reCAPTCHA v3 score (0.0 = bot, 1.0 = human)
          score = recaptchaResult.score || score || 0
          console.log('reCAPTCHA score:', score)
          console.log('reCAPTCHA action:', recaptchaResult.action)
          console.log('reCAPTCHA challenge_ts:', recaptchaResult.challenge_ts)
          console.log('reCAPTCHA hostname:', recaptchaResult.hostname)

          // Check if action matches expected action
          const expectedAction = 'contact_form'
          if (recaptchaResult.action && recaptchaResult.action !== expectedAction) {
            console.log('Action mismatch. Expected:', expectedAction, 'Got:', recaptchaResult.action)
            return res.status(400).json({
              success: false,
              message: 'Security verification failed. Invalid action.'
            })
          }

          // Use a lower threshold for initial testing (0.3) then increase to 0.5
          const threshold = 0.3
          if (score < threshold) {
            console.log('Score below threshold:', score, 'Required:', threshold)
            console.log('Full reCAPTCHA result for debugging:', JSON.stringify(recaptchaResult, null, 2))
            return res.status(400).json({
              success: false,
              message: `Security verification failed. Score: ${score}, Required: ${threshold}. Please try again.`
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
      }
    } else {
      console.log('No reCAPTCHA token provided - development mode')
      recaptchaVerified = false
    }

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

    // Try to send emails if SMTP configuration is available
    let emailSent = false
    try {
      console.log('Checking email configuration...')
      console.log('SMTP_USER exists:', !!process.env.SMTP_USER)
      console.log('SMTP_PASS exists:', !!process.env.SMTP_PASS)
      console.log('SMTP_FROM exists:', !!process.env.SMTP_FROM)

      if (process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_FROM) {
        console.log('Email configuration found, sending emails...')
        
        // Import nodemailer dynamically
        const nodemailer = await import('nodemailer')
        
        // Create transporter with better error handling
        const transporter = nodemailer.default.createTransport({
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

        console.log('Transporter created successfully')

        // Verify connection configuration
        await transporter.verify()
        console.log('SMTP connection verified successfully')

        // Email content for admin
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

        // Email content for user confirmation
        const userMailOptions = {
          from: process.env.SMTP_FROM,
          to: email,
          subject: `✅ Message Received - Ioannis Katsimpris | Cyber Security Portfolio`,
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f5f5; padding: 20px;">
              <!-- Header with gradient -->
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                <div style="font-size: 24px; margin-bottom: 5px;">🔒</div>
                <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Ioannis Katsimpris</h1>
                <p style="margin: 5px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">Cyber Security Professional</p>
              </div>
              
              <!-- Main content -->
              <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 20px; font-weight: 600;">Thank you for your message!</h2>
                
                <p style="margin: 0 0 20px 0; color: #555555; font-size: 16px; line-height: 1.6;">
                  Dear <strong>${name}</strong>,
                </p>
                
                <p style="margin: 0 0 20px 0; color: #555555; font-size: 16px; line-height: 1.6;">
                  Thank you for reaching out to me through my Cyber Security Portfolio. I have successfully received your message and I appreciate you taking the time to contact me.
                </p>
                
                <!-- Message Details Section -->
                <div style="background: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 25px 0; border-radius: 4px;">
                  <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <span style="font-size: 18px; margin-right: 8px;">📋</span>
                    <h3 style="margin: 0; color: #333333; font-size: 18px; font-weight: 600;">Message Details:</h3>
                  </div>
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
                
                <!-- What to Expect Next Section -->
                <div style="background: #e8f4fd; border: 1px solid #bee5eb; border-radius: 6px; padding: 20px; margin: 25px 0;">
                  <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <span style="font-size: 18px; margin-right: 8px;">⏰</span>
                    <h4 style="margin: 0; color: #0c5460; font-size: 16px; font-weight: 600;">What to expect next:</h4>
                  </div>
                  <ul style="margin: 0; padding-left: 20px; color: #0c5460;">
                    <li style="margin: 5px 0;">Detailed response to your inquiry</li>
                    <li style="margin: 5px 0;">Additional information if requested</li>
                    <li style="margin: 5px 0;">Follow-up questions if needed</li>
                  </ul>
                </div>
                
                <p style="margin: 0 0 20px 0; color: #555555; font-size: 16px; line-height: 1.6;">
                  In the meantime, feel free to explore my portfolio to learn more about my expertise in cyber security, penetration testing, and security consulting.
                </p>
                
                <!-- Call to Action Button -->
                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://code-factory-gamma.vercel.app" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: 600; font-size: 16px; box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);">
                    🌐 Visit My Portfolio
                  </a>
                </div>
              </div>
              
              <!-- Footer -->
              <div style="background: #ffffff; margin-top: 20px; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center;">
                <div style="margin-bottom: 20px;">
                  <h3 style="margin: 0 0 5px 0; color: #333333; font-size: 18px; font-weight: 600;">Ioannis Katsimpris</h3>
                  <p style="margin: 0; color: #666666; font-size: 14px;">Cyber Security Professional & Penetration Tester</p>
                </div>
                
                <div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin: 20px 0; flex-wrap: wrap;">
                  <div style="display: flex; align-items: center; color: #666666; font-size: 12px;">
                    <span style="font-size: 16px; margin-right: 5px;">🔒</span>
                    <span>Specializing in Security Audits</span>
                  </div>
                  <div style="width: 1px; height: 20px; background: #ddd;"></div>
                  <div style="display: flex; align-items: center; color: #666666; font-size: 12px;">
                    <span style="font-size: 16px; margin-right: 5px;">🛡️</span>
                    <span>Penetration Testing</span>
                  </div>
                  <div style="width: 1px; height: 20px; background: #ddd;"></div>
                  <div style="display: flex; align-items: center; color: #666666; font-size: 12px;">
                    <span style="font-size: 16px; margin-right: 5px;">🔍</span>
                    <span>Incident Response</span>
                  </div>
                </div>
                
                <div style="border-top: 1px solid #e0e0e0; padding-top: 20px;">
                  <p style="margin: 0; color: #888888; font-size: 12px; line-height: 1.4;">
                    This is an automated confirmation email. Please do not reply to this message.<br>
                    If you have any questions, please use the contact form on my website.
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

        emailSent = true
        console.log('All emails sent successfully')
      } else {
        console.log('No email configuration found')
      }
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      emailSent = false
    }

    // Try to send notification via webhook as backup
    try {
      if (process.env.WEBHOOK_URL) {
        await fetch(process.env.WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: `🔒 New Contact Form Submission\n\n👤 **Name:** ${name}\n📧 **Email:** ${email}\n📋 **Subject:** ${subject}\n💬 **Message:** ${message}\n✅ **reCAPTCHA:** ${recaptchaVerified ? `PASSED (Score: ${score.toFixed(2)})` : 'SKIPPED'}\n📧 **Email Sent:** ${emailSent ? 'YES' : 'NO'}\n⏰ **Time:** ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Athens' })}\n🌐 **IP:** ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`
          })
        })
        console.log('Webhook notification sent')
      }
    } catch (webhookError) {
      console.log('Webhook notification failed:', webhookError.message)
    }

    res.status(200).json({ 
      success: true, 
      message: emailSent 
        ? 'Message sent successfully! Check your email for confirmation.' 
        : 'Message received successfully! I will get back to you within 24 hours.'
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