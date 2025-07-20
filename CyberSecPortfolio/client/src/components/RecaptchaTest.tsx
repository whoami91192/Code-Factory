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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
        reject(new Error('reCAPTCHA not loaded'))
        return
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, {
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
    setLoading(true)
    setError(null)
    setToken(null)

    try {
      const newToken = await executeRecaptcha()
      setToken(newToken)
      console.log('reCAPTCHA token generated:', newToken)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      console.error('reCAPTCHA error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-muted rounded-lg border border-border">
      <h3 className="text-lg font-bold mb-4 text-white">reCAPTCHA v3 Test</h3>
      
      <button
        onClick={testRecaptcha}
        disabled={loading}
        className="cyber-button-magnetic mb-4"
      >
        {loading ? 'Generating Token...' : 'Test reCAPTCHA'}
      </button>

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded text-red-400">
          <strong>Error:</strong> {error}
        </div>
      )}

      {token && (
        <div className="mb-4 p-3 bg-cyber-green/20 border border-cyber-green/30 rounded">
          <strong className="text-cyber-green">Token Generated Successfully!</strong>
          <div className="mt-2 text-xs text-white/70 break-all">
            {token.substring(0, 50)}...
          </div>
        </div>
      )}

      <div className="text-sm text-white/70">
        <p>This test verifies that reCAPTCHA v3 is working correctly.</p>
        <p>Site Key: {import.meta.env.VITE_RECAPTCHA_SITE_KEY ? '✅ Loaded' : '❌ Missing'}</p>
      </div>
    </div>
  )
}

export default RecaptchaTest 