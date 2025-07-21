import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const PageScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Scroll to top when pathname changes (new page loads)
    // Also clear any hash fragments that might cause unwanted scrolling
    if (!hash) {
      // Immediate scroll to top
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Use 'instant' for immediate scroll without animation
      })
      
      // Additional scroll after a small delay to ensure all components are loaded
      const timer = setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        })
      }, 200)
      
      // Also try to remove any hash from URL without triggering navigation
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      }
      
      return () => clearTimeout(timer)
    }
  }, [pathname, hash])

  return null // This component doesn't render anything
}

export default PageScrollToTop 