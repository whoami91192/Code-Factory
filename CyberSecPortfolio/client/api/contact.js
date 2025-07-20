import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://code-factory-651d.vercel.app')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed' 
    })
  }

  try {
    const { name, email, subject, message, captchaToken } = req.body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }

    // Validate reCAPTCHA token
    if (!captchaToken) {
      return res.status(400).json({
        success: false,
        message: 'Security verification is required'
      })
    }

    // Verify reCAPTCHA v3 token with Google
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: '6LcLUIkrAAAAAOkvPDPXJ22e2cPOGIxKb96jBdz1',
        response: captchaToken,
        remoteip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
      })
    })

    const recaptchaResult = await recaptchaResponse.json()

    if (!recaptchaResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Security verification failed. Please try again.'
      })
    }

    // Check reCAPTCHA v3 score (0.0 = bot, 1.0 = human)
    const score = recaptchaResult.score || 0

    // Use a threshold of 0.5 (you can adjust this based on your needs)
    if (score < 0.5) {
      return res.status(400).json({
        success: false,
        message: 'Security verification failed. Please try again.'
      })
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    // Email to admin
    const adminMailOptions = {
      from: process.env.SMTP_FROM,
      to: 'gianniskatsibris@gmail.com',
      subject: `🔐 New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #0f1419; color: #ffffff; border-radius: 10px; overflow: hidden;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #0080FF 0%, #9C27B0 100%); padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: bold; color: #ffffff;">🔐 Cyber Security Portfolio</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">New Contact Form Submission</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px; background: #1a1f2e;">
            <div style="background: #2a2f3e; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #0080FF;">
              <h2 style="margin: 0 0 15px 0; color: #0080FF; font-size: 18px;">📧 Message Details</h2>
              <p style="margin: 5px 0; color: #ffffff;"><strong>From:</strong> ${name} (${email})</p>
              <p style="margin: 5px 0; color: #ffffff;"><strong>Subject:</strong> ${subject}</p>
              <p style="margin: 15px 0 5px 0; color: #ffffff;"><strong>Message:</strong></p>
              <div style="background: #1a1f2e; padding: 15px; border-radius: 5px; border: 1px solid #374151; white-space: pre-wrap; color: #e5e7eb;">${message}</div>
            </div>
            
            <div style="background: #2a2f3e; padding: 20px; border-radius: 8px; border-left: 4px solid #00ff88;">
              <h2 style="margin: 0 0 15px 0; color: #00ff88; font-size: 18px;">🔍 Security Information</h2>
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
          
          <!-- Footer -->
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

    // Email to user (confirmation)
    const userMailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: `✅ Message Received - Cyber Security Portfolio`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #0f1419; color: #ffffff; border-radius: 10px; overflow: hidden;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #0080FF 0%, #9C27B0 100%); padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: bold; color: #ffffff;">🔐 Cyber Security Portfolio</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Message Confirmation</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px; background: #1a1f2e;">
            <div style="background: #2a2f3e; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #00ff88;">
              <h2 style="margin: 0 0 15px 0; color: #00ff88; font-size: 18px;">✅ Message Received Successfully!</h2>
              <p style="margin: 0 0 15px 0; color: #ffffff;">Dear ${name},</p>
              <p style="margin: 0 0 15px 0; color: #ffffff;">Thank you for reaching out to me. I have received your message and will get back to you within 24 hours.</p>
            </div>
            
            <div style="background: #2a2f3e; padding: 20px; border-radius: 8px; border-left: 4px solid #0080FF;">
              <h2 style="margin: 0 0 15px 0; color: #0080FF; font-size: 18px;">📧 Your Message Details</h2>
              <p style="margin: 5px 0; color: #ffffff;"><strong>Subject:</strong> ${subject}</p>
              <p style="margin: 15px 0 5px 0; color: #ffffff;"><strong>Message:</strong></p>
              <div style="background: #1a1f2e; padding: 15px; border-radius: 5px; border: 1px solid #374151; white-space: pre-wrap; color: #e5e7eb;">${message}</div>
            </div>
            
            <div style="background: #2a2f3e; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #ff6b35;">
              <h2 style="margin: 0 0 15px 0; color: #ff6b35; font-size: 18px;">⏰ What's Next?</h2>
              <ul style="margin: 0; padding-left: 20px; color: #ffffff;">
                <li>I'll review your message within 24 hours</li>
                <li>You'll receive a detailed response via email</li>
                <li>If urgent, I may reach out sooner</li>
                <li>Feel free to follow up if needed</li>
              </ul>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="text-align: center; color: #888; font-size: 11px; border-top: 1px solid #333; padding-top: 15px;">
            <p style="margin: 5px 0;">🔐 This is an automated confirmation from your Cyber Security Portfolio</p>
            <p style="margin: 5px 0;">⏰ Sent: ${new Date().toLocaleString('en-US', { 
              timeZone: 'Europe/Athens',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}</p>
          </div>
        </div>
      `
    }

    // Send emails
    await transporter.sendMail(adminMailOptions)
    await transporter.sendMail(userMailOptions)

    res.status(200).json({
      success: true,
      message: 'Message sent successfully!'
    })

  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    })
  }
} 