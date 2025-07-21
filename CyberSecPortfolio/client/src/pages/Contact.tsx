import { useState } from 'react'
import { Mail, MapPin, Shield, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { useRecaptcha } from '../hooks/useRecaptcha'
import RecaptchaStatus from '../components/RecaptchaStatus'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  
  const { executeRecaptcha, isLoaded: recaptchaLoaded } = useRecaptcha()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clear previous messages
    setErrorMessage('')
    setSubmitMessage('')
    
    // Simple validation
    if (!formData.name.trim()) {
      setErrorMessage('Name is required')
      return
    }
    if (!formData.email.trim()) {
      setErrorMessage('Email is required')
      return
    }
    if (!formData.subject.trim()) {
      setErrorMessage('Subject is required')
      return
    }
    if (!formData.message.trim()) {
      setErrorMessage('Message is required')
      return
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      console.log('📤 Sending message...')
      console.log('📝 Form data:', formData)
      
      // Execute reCAPTCHA v3
      let captchaToken = null
      if (recaptchaLoaded && executeRecaptcha) {
        console.log('🔒 Executing reCAPTCHA v3...')
        captchaToken = await executeRecaptcha('contact_form')
        if (!captchaToken) {
          setErrorMessage('Security verification failed. Please try again.')
          return
        }
        console.log('✅ reCAPTCHA token obtained')
      }
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captchaToken
        })
      })

      console.log('📊 Response status:', response.status)
      
      const result = await response.json()
      console.log('📄 Response:', result)

      if (response.ok && result.success) {
        setIsSubmitted(true)
        setSubmitMessage(result.message || 'Message sent successfully!')
        setFormData({ name: '', email: '', subject: '', message: '' })
        
        // Reset success message after 10 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          setSubmitMessage('')
        }, 10000)
      } else {
        setErrorMessage(result.message || 'Failed to send message. Please try again.')
      }
      
    } catch (error) {
      console.error('❌ Error:', error)
      setErrorMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errorMessage) {
      setErrorMessage('')
    }
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

        {/* reCAPTCHA Status */}
        <div className="mb-8">
          <RecaptchaStatus />
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
                <h3 className="text-xl font-bold mb-2 text-white">Message Sent Successfully!</h3>
                <p className="text-white/90 drop-shadow mb-4">
                  {submitMessage}
                </p>
                <div className="bg-cyber-green/10 border border-cyber-green/30 rounded-lg p-4 mt-4">
                  <p className="text-cyber-green text-sm">
                    📧 A confirmation email has been sent to your inbox. I will review your message and get back to you soon.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsSubmitted(false)
                    setSubmitMessage('')
                  }}
                  className="mt-4 px-6 py-2 bg-cyber-green/20 text-cyber-green border border-cyber-green/30 rounded-md hover:bg-cyber-green/30 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="cyber-card space-y-6 contact-form">
                {errorMessage && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <p className="text-red-400 text-sm">{errorMessage}</p>
                  </div>
                )}

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
                    className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-green placeholder-gray-600 text-white"
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
                    className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-green placeholder-gray-600 text-white"
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
                    className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-green placeholder-gray-600 text-white"
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
                    className="w-full p-3 bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-green resize-none placeholder-gray-600 text-white"
                    placeholder="Tell me about your security needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !recaptchaLoaded}
                  className="cyber-button-magnetic target-lock w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : !recaptchaLoaded ? 'Loading Security...' : 'Send Message'}
                </button>
                
                <div className="text-xs text-white/60 text-center space-y-1">
                  <p>Your message will be sent directly to my email. I typically respond within 24 hours.</p>
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="h-3 w-3 text-cyber-green" />
                    <span>Protected by reCAPTCHA v3</span>
                    <span className={`inline-block w-2 h-2 rounded-full ${recaptchaLoaded ? 'bg-cyber-green' : 'bg-yellow-500'}`}></span>
                  </div>
                </div>
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