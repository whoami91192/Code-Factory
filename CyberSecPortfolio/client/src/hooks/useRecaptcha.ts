import { useState, useEffect, useCallback } from 'react'

// Declare grecaptcha for TypeScript
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

interface UseRecaptchaOptions {
  siteKey?: string;
  action?: string;
  timeout?: number;
}

export const useRecaptcha = (options: UseRecaptchaOptions = {}) => {
  const {
    siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY,
    action = 'default_action',
    timeout = 10000
  } = options

  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize reCAPTCHA
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.head.querySelector('script[src*="recaptcha/api.js"]')
    if (existingScript) {
      setIsLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    script.defer = true
    
    script.onload = () => {
      setIsLoaded(true)
      setError(null)
    }
    
    script.onerror = () => {
      setError('Failed to load reCAPTCHA script')
      console.error('Failed to load reCAPTCHA script')
    }
    
    document.head.appendChild(script)

    return () => {
      // Don't remove script on cleanup to avoid conflicts
    }
  }, [siteKey])

  // Execute reCAPTCHA
  const execute = useCallback(async (customAction?: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      setIsLoading(true)
      setError(null)

      const actionToUse = customAction || action

      // Wait for reCAPTCHA to be available
      const waitForRecaptcha = () => {
        if (typeof window.grecaptcha !== 'undefined' && window.grecaptcha.ready) {
          window.grecaptcha.ready(() => {
            window.grecaptcha.execute(siteKey, {
              action: actionToUse
            }).then((token: string) => {
              setIsLoading(false)
              resolve(token)
            }).catch((error: any) => {
              console.error('reCAPTCHA execution error:', error)
              const errorMessage = 'Security verification failed'
              setError(errorMessage)
              setIsLoading(false)
              reject(new Error(errorMessage))
            })
          })
        } else {
          // Retry after a short delay
          setTimeout(waitForRecaptcha, 100)
        }
      }

      // Start waiting for reCAPTCHA
      waitForRecaptcha()

      // Timeout
      setTimeout(() => {
        const timeoutMessage = 'Security verification timeout'
        setError(timeoutMessage)
        setIsLoading(false)
        reject(new Error(timeoutMessage))
      }, timeout)
    })
  }, [siteKey, action, timeout])

  return {
    execute,
    isLoaded,
    isLoading,
    error,
    resetError: () => setError(null)
  }
} 