import { useState } from 'react'
import { useRecaptcha } from '../hooks/useRecaptcha'

const RecaptchaTest = () => {
  const [token, setToken] = useState<string | null>(null)

  // Use reCAPTCHA hook
  const { execute, isLoaded, isLoading, error, resetError } = useRecaptcha({
    action: 'test_action'
  })

  const testRecaptcha = async () => {
    resetError()
    setToken(null)

    try {
      const newToken = await execute()
      setToken(newToken)
      console.log('reCAPTCHA token generated:', newToken)
    } catch (err) {
      console.error('reCAPTCHA error:', err)
    }
  }

  return (
    <div className="p-6 bg-muted rounded-lg border border-border">
      <h3 className="text-lg font-bold mb-4 text-white">reCAPTCHA v3 Test</h3>
      
      <button
        onClick={testRecaptcha}
        disabled={isLoading}
        className="cyber-button-magnetic mb-4"
      >
        {isLoading ? 'Generating Token...' : 'Test reCAPTCHA'}
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