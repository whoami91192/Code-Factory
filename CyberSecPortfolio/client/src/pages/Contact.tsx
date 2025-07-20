import { useState, useRef, useEffect } from 'react'
import { Mail, MapPin, Shield, CheckCircle, Clock } from 'lucide-react'

// Declare grecaptcha for TypeScript
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  // Load reCAPTCHA v3 script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    return () => {
      const existingScript = document.head.querySelector('script[src*="recaptcha/api.js"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  const executeRecaptcha = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (typeof window.grecaptcha === 'undefined') {
        reject(new Error('Security verification failed'))
        return
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, {
          action: 'contact_submit'
        }).then((token: string) => {
          resolve(token)
        }).catch((error: any) => {
          reject(error)
        })
      })
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsSubmitting(true)
    
    try {
      // Execute reCAPTCHA v3 silently
      const token = await executeRecaptcha()
      setCaptchaToken(token)
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captchaToken: token
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setCaptchaToken(null)
        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000)
      } else {
        alert('Failed to send message. Please try again.')
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        alert('Network error. Please check your connection and try again.')
      } else if (error.message.includes('HTTP error')) {
        alert('Server error. Please try again later.')
      } else if (error.message.includes('Security verification failed')) {
        alert('Security verification failed. Please refresh the page and try again.')
      } else {
        alert('Failed to send message. Please try again later.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'gianniskatsibris@gmail.com',
      description: 'Send me an email anytime'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Remote / Worldwide',
      description: 'Available for remote work globally'
    }
  ]

  return (
    <div className="min-h-screen bg-background liquid-metal-glow">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-16 contact-hero">
          <h1 className="text-4xl lg:text-6xl font-cyber font-bold mb-6">
            Get In <span className="text-cyber-green">Touch</span>
          </h1>
          <p className="text-xl text-white/90 drop-shadow max-w-3xl mx-auto">
            Ready to secure your systems? Let's discuss your cybersecurity needs 
            and how I can help protect your digital assets.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-3xl font-cyber font-bold mb-6">
              Contact <span className="text-cyber-green">Information</span>
            </h2>
            
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div key={info.title} className="cyber-card">
                  <div className="flex items-start space-x-4">
                    <info.icon className="h-8 w-8 text-cyber-green mt-1 glow-text" />
                    <div>
                      <h3 className="text-lg font-bold mb-1 text-white drop-shadow">{info.title}</h3>
                      <p className="text-cyber-green font-mono mb-1">{info.value}</p>
                      <p className="text-sm text-white/90 drop-shadow">{info.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Services Offered */}
            <div className="cyber-card">
              <h3 className="text-xl font-bold mb-4 text-white drop-shadow">Services Offered</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-cyber-green glow-text" />
                  <span className="text-sm text-white/90 drop-shadow">Penetration Testing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-cyber-green glow-text" />
                  <span className="text-sm text-white/90 drop-shadow">Security Audits</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-cyber-green glow-text" />
                  <span className="text-sm text-white/90 drop-shadow">Incident Response</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-cyber-green glow-text" />
                  <span className="text-sm text-white/90 drop-shadow">Security Consulting</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-cyber-green glow-text" />
                  <span className="text-sm text-white/90 drop-shadow">Security Tool Development</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-cyber font-bold mb-6">
              Send <span className="text-cyber-green">Message</span>
            </h2>
            
            {isSubmitted ? (
              <div className="cyber-card text-center py-12">
                <CheckCircle className="h-16 w-16 mx-auto mb-4 text-cyber-green glow-text" />
                <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
                <p className="text-white/90 drop-shadow mb-4">
                  Thank you for your message. I'll get back to you within 24 hours.
                </p>
                <div className="bg-cyber-green/10 border border-cyber-green/30 rounded-lg p-4 mt-4">
                  <p className="text-cyber-green text-sm">
                    📧 A confirmation email has been sent to your inbox with details of your message.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="cyber-card space-y-6 contact-form">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white drop-shadow mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-green placeholder-gray-600"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white drop-shadow mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-green placeholder-gray-600"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-white drop-shadow mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-ring-cyber-green placeholder-gray-600"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white drop-shadow mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-green resize-none placeholder-gray-600"
                    placeholder="Tell me about your security needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cyber-button-magnetic target-lock w-full"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-20">
          <div className="cyber-card-magnetic text-center target-lock">
            <Clock className="h-12 w-12 mx-auto mb-4 text-cyber-primary glow-text" />
            <h3 className="text-lg font-bold mb-2 text-white drop-shadow">Response Time</h3>
            <p className="text-white drop-shadow mb-4">
              I typically respond to all inquiries within 24 hours during business days.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-white/90 drop-shadow">Email</p>
                <p className="text-lg font-bold text-white drop-shadow">Within 24 hours</p>
              </div>
              <div>
                <p className="text-sm text-white/90 drop-shadow">Chat</p>
                <p className="text-lg font-bold text-white drop-shadow">Within 2 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact 