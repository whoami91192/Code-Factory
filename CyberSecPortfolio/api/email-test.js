export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    console.log('=== EMAIL TEST STARTED ===')
    
    // Check environment variables
    const envCheck = {
      SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
      SMTP_PORT: process.env.SMTP_PORT || '587',
      SMTP_USER: process.env.SMTP_USER ? 'SET' : 'NOT SET',
      SMTP_PASS: process.env.SMTP_PASS ? 'SET' : 'NOT SET',
      SMTP_FROM: process.env.SMTP_FROM ? 'SET' : 'NOT SET'
    }
    
    console.log('Environment check:', envCheck)
    
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.SMTP_FROM) {
      return res.status(500).json({
        success: false,
        message: 'Missing SMTP configuration',
        envCheck
      })
    }

    // Import nodemailer
    const nodemailer = await import('nodemailer')
    
    // Create transporter
    const transporter = nodemailer.default.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    console.log('Transporter created')

    // Verify connection
    const verifyResult = await transporter.verify()
    console.log('Connection verified:', verifyResult)

    // Send test email
    const testEmail = {
      from: process.env.SMTP_FROM,
      to: 'gianniskatsibris@gmail.com',
      subject: '🧪 Email Test - Cyber Security Portfolio',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">🧪 Email Test</h2>
          <p>This is a test email to verify that the SMTP configuration is working correctly.</p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Configuration Details:</h3>
            <p><strong>SMTP Host:</strong> ${process.env.SMTP_HOST}</p>
            <p><strong>SMTP Port:</strong> ${process.env.SMTP_PORT}</p>
            <p><strong>From Email:</strong> ${process.env.SMTP_FROM}</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          </div>
          <p>If you receive this email, the SMTP configuration is working correctly!</p>
        </div>
      `
    }

    console.log('Sending test email...')
    const sendResult = await transporter.sendMail(testEmail)
    console.log('Email sent successfully:', sendResult)

    res.status(200).json({
      success: true,
      message: 'Test email sent successfully',
      messageId: sendResult.messageId,
      envCheck,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Email test failed:', error)
    res.status(500).json({
      success: false,
      message: 'Email test failed',
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
} 