import { useEffect, useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

const RecaptchaTest = () => {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [status, setStatus] = useState('Loading...')

  useEffect(() => {
    const checkRecaptcha = () => {
      console.log('=== RECAPTCHA TEST ===')
      console.log('executeRecaptcha available:', !!executeRecaptcha)
      console.log('window.location.hostname:', window.location.hostname)
      
      // Check if reCAPTCHA script is loaded
      const recaptchaScript = document.querySelector('script[src*="recaptcha"]')
      console.log('reCAPTCHA script found:', !!recaptchaScript)
      
      if (recaptchaScript) {
        console.log('reCAPTCHA script src:', recaptchaScript.getAttribute('src'))
      }
      
      // Check for any reCAPTCHA related errors in console
      const originalError = console.error
      console.error = (...args) => {
        if (args[0] && typeof args[0] === 'string' && args[0].includes('recaptcha')) {
          console.log('reCAPTCHA Error detected:', args)
        }
        originalError.apply(console, args)
      }
      
      if (executeRecaptcha) {
        setStatus('✅ reCAPTCHA is ready')
      } else {
        setStatus('❌ reCAPTCHA not available')
      }
    }

    // Check immediately
    checkRecaptcha()
    
    // Check again after a delay
    const timer = setTimeout(checkRecaptcha, 2000)
    
    return () => clearTimeout(timer)
  }, [executeRecaptcha])

  const testRecaptcha = async () => {
    if (!executeRecaptcha) {
      alert('reCAPTCHA not available')
      return
    }

    try {
      const token = await executeRecaptcha('test')
      alert(`reCAPTCHA token received: ${token ? 'YES' : 'NO'}`)
    } catch (error) {
      alert(`reCAPTCHA error: ${error}`)
    }
  }

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: '#333', 
      color: '#fff', 
      padding: '10px', 
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999
    }}>
      <div>reCAPTCHA Status: {status}</div>
      <button 
        onClick={testRecaptcha}
        style={{ 
          marginTop: '5px', 
          padding: '5px 10px', 
          background: '#007bff', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '3px',
          cursor: 'pointer'
        }}
      >
        Test reCAPTCHA
      </button>
    </div>
  )
}

export default RecaptchaTest 