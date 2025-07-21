import { useCallback, useEffect, useState } from 'react'

// Extend Window interface to include grecaptcha
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

const RECAPTCHA_SITE_KEY = '6LcLUIkrAAAAEHbhqGdvIi6YPy93ghOu1BO0N0E'

interface UseRecaptchaReturn {
  executeRecaptcha: (action: string) => Promise<string | null>
  isLoaded: boolean
  error: string | null
}

export const useRecaptcha = (): UseRecaptchaReturn => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('🔍 useRecaptcha: Initializing...')
    
    // Check if reCAPTCHA is already loaded
    if (window.grecaptcha && window.grecaptcha.ready) {
      console.log('✅ reCAPTCHA already loaded')
      window.grecaptcha.ready(() => {
        console.log('✅ reCAPTCHA ready callback fired')
        setIsLoaded(true)
        setError(null)
      })
      return
    }

    console.log('⏳ Waiting for reCAPTCHA to load...')
    
    // Wait for script to load
    const checkRecaptcha = () => {
      if (window.grecaptcha && window.grecaptcha.ready) {
        console.log('✅ reCAPTCHA detected, calling ready...')
        window.grecaptcha.ready(() => {
          console.log('✅ reCAPTCHA ready callback completed')
          setIsLoaded(true)
          setError(null)
        })
      } else {
        // Keep checking every 100ms for up to 15 seconds
        const startTime = Date.now()
        const interval = setInterval(() => {
          console.log('⏳ Checking for reCAPTCHA...', Date.now() - startTime, 'ms')
          if (window.grecaptcha && window.grecaptcha.ready) {
            clearInterval(interval)
            console.log('✅ reCAPTCHA finally loaded!')
            window.grecaptcha.ready(() => {
              console.log('✅ reCAPTCHA ready callback completed (delayed)')
              setIsLoaded(true)
              setError(null)
            })
          } else if (Date.now() - startTime > 15000) {
            // Timeout after 15 seconds
            clearInterval(interval)
            console.error('❌ reCAPTCHA failed to load after 15 seconds')
            setError('reCAPTCHA failed to load - please refresh the page')
          }
        }, 100)
      }
    }

    checkRecaptcha()
  }, [])

  const executeRecaptcha = useCallback(
    async (action: string): Promise<string | null> => {
      if (!isLoaded || !window.grecaptcha) {
        setError('reCAPTCHA not loaded')
        return null
      }

      try {
        setError(null)
        const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action })
        return token
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to execute reCAPTCHA'
        setError(errorMessage)
        console.error('reCAPTCHA execution error:', err)
        return null
      }
    },
    [isLoaded]
  )

  return {
    executeRecaptcha,
    isLoaded,
    error
  }
} 