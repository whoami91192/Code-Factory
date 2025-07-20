import { useState, useEffect } from 'react'

// Declare grecaptcha for TypeScript
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const RecaptchaTest = () => {
  const [token, setToken] = useState<string | null>(null)
  const [score, setScore] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Load reCAPTCHA v3 script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js?render=6LcLUIkrAAAAAAEhbhqGdyii6YPy93ghOu1B0N0E'
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  const executeRecaptcha = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (typeof window.grecaptcha === 'undefined') {
        reject(new Error('reCAPTCHA not loaded'))
        return
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha.execute('6LcLUIkrAAAAAAEhbhqGdyii6YPy93ghOu1B0N0E', {
          action: 'test_action'
        }).then((token: string) => {
          resolve(token)
        }).catch((error: any) => {
          reject(error)
        })
      })
    })
  }

  const testRecaptcha = async () => {
    setIsLoading(true)
    setError(null)
    setToken(null)
    setScore(null)

    try {
      console.log('Testing reCAPTCHA v3...')
      const token = await executeRecaptcha()
      setToken(token)
      console.log('reCAPTCHA token received:', token.substring(0, 20) + '...')

      // Verify the token with our API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          subject: 'reCAPTCHA Test',
          message: 'This is a test message for reCAPTCHA v3 verification.',
          captchaToken: token
        })
      })

      const result = await response.json()
      console.log('API response:', result)

      if (result.success) {
        // Extract score from the response (you might need to modify the API to return this)
        setScore(0.9) // Placeholder - you can modify the API to return the actual score
      } else {
        setError(result.message || 'Verification failed')
      }
    } catch (error) {
      console.error('reCAPTCHA test error:', error)
      setError(error.message || 'Test failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-8 bg-background rounded-lg border border-cyber-primary">
      <h2 className="text-2xl font-bold mb-4 text-cyber-green">reCAPTCHA v3 Test</h2>
      
      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-2">Site Key: 6LcLUIkrAAAAAAEhbhqGdyii6YPy93ghOu1B0N0E</p>
        <p className="text-sm text-muted-foreground">Type: reCAPTCHA v3 (Invisible)</p>
        <p className="text-sm text-muted-foreground">Action: test_action</p>
      </div>

      <div className="flex justify-center mb-4">
        <button
          onClick={testRecaptcha}
          disabled={isLoading}
          className="cyber-button-magnetic target-lock"
        >
          {isLoading ? 'Testing...' : 'Test reCAPTCHA v3'}
        </button>
      </div>

      {token && (
        <div className="bg-cyber-green/10 border border-cyber-green/30 rounded-lg p-4 mb-4">
          <p className="text-cyber-green text-sm">✅ reCAPTCHA v3 executed successfully!</p>
          <p className="text-xs text-muted-foreground mt-1">Token: {token.substring(0, 30)}...</p>
          {score && (
            <p className="text-xs text-muted-foreground mt-1">Score: {score.toFixed(2)} (0.0 = bot, 1.0 = human)</p>
          )}
        </div>
      )}

      {error && (
        <div className="bg-cyber-danger/10 border border-cyber-danger/30 rounded-lg p-4 mb-4">
          <p className="text-cyber-danger text-sm">❌ {error}</p>
        </div>
      )}

      <div className="text-xs text-muted-foreground">
        <p>reCAPTCHA v3 runs invisibly in the background.</p>
        <p>Check the browser console for detailed logs.</p>
      </div>
    </div>
  )
}

export default RecaptchaTest 