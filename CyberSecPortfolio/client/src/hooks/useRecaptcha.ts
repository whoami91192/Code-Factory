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
    // Check if reCAPTCHA is already loaded
    if (window.grecaptcha && window.grecaptcha.ready) {
      window.grecaptcha.ready(() => {
        setIsLoaded(true)
        setError(null)
      })
      return
    }

    // Wait for script to load
    const checkRecaptcha = () => {
      if (window.grecaptcha && window.grecaptcha.ready) {
        window.grecaptcha.ready(() => {
          setIsLoaded(true)
          setError(null)
        })
      } else {
        // Keep checking every 100ms for up to 10 seconds
        const startTime = Date.now()
        const interval = setInterval(() => {
          if (window.grecaptcha && window.grecaptcha.ready) {
            clearInterval(interval)
            window.grecaptcha.ready(() => {
              setIsLoaded(true)
              setError(null)
            })
          } else if (Date.now() - startTime > 10000) {
            // Timeout after 10 seconds
            clearInterval(interval)
            setError('reCAPTCHA failed to load')
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