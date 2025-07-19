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
    const { name, email, subject, message } = req.body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
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
} 