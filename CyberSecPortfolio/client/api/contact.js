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
    const transporter = nodemailer.createTransport({
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
            <p style="margin: 5px 0;">🔐 This message was sent from John Katsimpris Cyber Security Portfolio</p>
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

    // Send email to you
    await transporter.sendMail(mailOptions)

    // Send confirmation email to the user
    const confirmationMailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: `🔒 Thank you for contacting Cyber Security Portfolio`,
      html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #333333; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); padding: 30px; text-align: center;">
            <h1 style="margin: 0; color: #00ff41; font-size: 28px; text-shadow: 0 0 10px #00ff41;">🔒 Cyber Security Portfolio</h1>
            <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px;">Professional Security Solutions</p>
          </div>

          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #0a0a0a; margin-bottom: 20px; font-size: 24px;">Thank you for reaching out!</h2>
            
            <p style="color: #555555; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
              Dear <strong>${name}</strong>,
            </p>
            
            <p style="color: #555555; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
              Thank you for contacting me regarding your cybersecurity needs. I have received your message and will review it carefully.
            </p>

            <!-- Message Summary -->
            <div style="background: #f8f9fa; border-left: 4px solid #00ff41; padding: 20px; margin: 25px 0; border-radius: 4px;">
              <h3 style="color: #0a0a0a; margin: 0 0 15px 0; font-size: 18px;">📋 Your Message Summary:</h3>
              <p style="color: #555555; margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
              <p style="color: #555555; margin: 5px 0;"><strong>Message:</strong></p>
              <div style="background: #ffffff; padding: 15px; border-radius: 4px; border: 1px solid #e0e0e0; margin-top: 10px; color: #333333; font-style: italic;">
                "${message}"
              </div>
            </div>

            <p style="color: #555555; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
              I typically respond to all inquiries within <strong>24 hours</strong> during business days. For urgent security matters, please include "URGENT" in your subject line.
            </p>

            <!-- Services Reminder -->
            <div style="background: #f0f8ff; border: 1px solid #d1ecf1; border-radius: 6px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #0a0a0a; margin: 0 0 15px 0; font-size: 18px;">🛡️ My Services Include:</h3>
              <ul style="color: #555555; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>Penetration Testing & Security Audits</li>
                <li>Incident Response & Forensics</li>
                <li>Security Consulting & Strategy</li>
                <li>Security Tool Development</li>
                <li>Compliance & Risk Assessment</li>
              </ul>
            </div>

            <p style="color: #555555; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
              In the meantime, feel free to explore my portfolio to learn more about my expertise and previous projects.
            </p>

            <!-- Call to Action -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://code-factory-651d.vercel.app" style="background: linear-gradient(135deg, #00ff41 0%, #00cc33 100%); color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; box-shadow: 0 4px 15px rgba(0, 255, 65, 0.3);">
                🚀 Visit My Portfolio
              </a>
            </div>

            <p style="color: #555555; line-height: 1.6; margin-bottom: 20px; font-size: 16px;">
              Best regards,<br>
              <strong>John Katsimpris</strong><br>
              <span style="color: #00ff41;">Cyber Security Engineer</span>
            </p>
          </div>

          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
            <p style="color: #888888; margin: 5px 0; font-size: 14px;">
              🔐 This is an automated confirmation email from John Katsimpris Cyber Security Portfolio contact form.
            </p>
            <p style="color: #888888; margin: 5px 0; font-size: 12px;">
              Timestamp: ${new Date().toLocaleString('en-US', { 
                timeZone: 'Europe/Athens',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </p>
          </div>
        </div>
      `
    }

    // Send confirmation email to user
    await transporter.sendMail(confirmationMailOptions)

    res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    })

  } catch (error) {
    console.error('Email sending error:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    })
    res.status(500).json({
      success: false,
      message: `Failed to send email: ${error.message}`,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  }
} 