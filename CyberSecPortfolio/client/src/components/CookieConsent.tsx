import { useState, useEffect } from 'react'
import { Shield, X, Check, AlertTriangle } from 'lucide-react'

interface CookieConsentProps {
  onAccept: () => void
  onDecline: () => void
}

const CookieConsent = ({ onAccept, onDecline }: CookieConsentProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieConsent')
    if (!cookieChoice) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setIsVisible(false)
    onAccept()
  }

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setIsVisible(false)
    window.location.href = '/cookie-required'
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="cyber-card max-w-2xl w-full relative">
        {/* Close button */}
        <button
          onClick={handleDecline}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          disabled
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="h-8 w-8 text-cyber-green" />
          <h2 className="text-2xl font-cyber font-bold text-white">
            Cookie <span className="text-cyber-green">Consent</span>
          </h2>
        </div>

        {/* Warning Icon */}
        <div className="flex items-center space-x-2 mb-4 p-3 bg-cyber-red/10 rounded-md border border-cyber-red/20">
          <AlertTriangle className="h-5 w-5 text-cyber-red" />
          <span className="text-cyber-red font-medium">Required Action</span>
        </div>

        {/* Content */}
        <div className="space-y-4 text-white/90 drop-shadow">
          <p>
            This website uses cookies to enhance your experience and ensure proper functionality. 
            Cookies are essential for the website's operation and security features.
          </p>
          
          <div className="space-y-2">
            <h3 className="font-bold text-white">What cookies we use:</h3>
            <ul className="space-y-1 text-sm">
              <li>• <strong>Essential cookies:</strong> For basic website functionality</li>
              <li>• <strong>Security cookies:</strong> For protection against attacks and unauthorized access</li>
              <li>• <strong>Preference cookies:</strong> For storing your settings and preferences</li>
              <li>• <strong>Analytics cookies:</strong> For improving website performance</li>
            </ul>
          </div>

          <p className="text-sm text-white/70">
            You cannot proceed to use the website without accepting cookies. 
            These cookies are necessary for security and functionality purposes.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={handleAccept}
            className="cyber-button flex-1 flex items-center justify-center space-x-2"
          >
            <Check className="h-4 w-4" />
            <span>Accept All Cookies</span>
          </button>
          
          <button
            onClick={handleDecline}
            className="cyber-button variant-outline flex-1"
          >
            Decline - Exit
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-cyber-primary/20">
          <p className="text-xs text-white/60 text-center">
            By clicking "Accept", you agree to the use of cookies in accordance with our policy.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent 