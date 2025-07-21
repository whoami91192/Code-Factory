import { useCallback, useEffect, useState } from 'react'

declare global {
  interface Window {
    grecaptcha: any
  }
}

export const useRecaptcha = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
  
  // Debug logging
  console.log('reCAPTCHA Hook - Environment check:', {
    siteKey: siteKey ? `${siteKey.substring(0, 10)}...` : 'NOT FOUND',
    envVars: Object.keys(import.meta.env).filter(key => key.includes('RECAPTCHA'))
  })

  useEffect(() => {
    const checkRecaptchaLoaded = () => {
      if (window.grecaptcha && window.grecaptcha.ready) {
        window.grecaptcha.ready(() => {
          setIsLoaded(true)
          setIsLoading(false)
        })
      } else {
        // If not loaded yet, check again after a short delay
        setTimeout(checkRecaptchaLoaded, 100)
      }
    }

    checkRecaptchaLoaded()
  }, [])

  const executeRecaptcha = useCallback(
    async (action: string = 'submit'): Promise<string | null> => {
      if (!isLoaded || !window.grecaptcha || !siteKey) {
        console.warn('reCAPTCHA not loaded or site key missing')
        return null
      }

      try {
        return new Promise((resolve) => {
          window.grecaptcha.ready(() => {
            window.grecaptcha
              .execute(siteKey, { action })
              .then((token: string) => {
                console.log('reCAPTCHA token generated for action:', action)
                resolve(token)
              })
              .catch((error: any) => {
                console.error('reCAPTCHA execution failed:', error)
                resolve(null)
              })
          })
        })
      } catch (error) {
        console.error('Error executing reCAPTCHA:', error)
        return null
      }
    },
    [isLoaded, siteKey]
  )

  return {
    isLoaded,
    isLoading,
    executeRecaptcha,
    siteKey
  }
} 