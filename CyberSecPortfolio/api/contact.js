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

    // Try to send email using a simple webhook approach
    try {
      // Send notification to admin via webhook (you can set this up later)
      if (process.env.WEBHOOK_URL) {
        await fetch(process.env.WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: `🔒 New Contact Form Submission\n\n👤 **Name:** ${name}\n📧 **Email:** ${email}\n📋 **Subject:** ${subject}\n💬 **Message:** ${message}\n✅ **reCAPTCHA:** ${recaptchaVerified ? `PASSED (Score: ${score.toFixed(2)})` : 'SKIPPED'}\n⏰ **Time:** ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Athens' })}\n🌐 **IP:** ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`
          })
        })
        console.log('Webhook notification sent')
      }
    } catch (webhookError) {
      console.log('Webhook notification failed:', webhookError.message)
    }

    res.status(200).json({ 
      success: true, 
      message: 'Message received successfully! I will get back to you within 24 hours.'
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