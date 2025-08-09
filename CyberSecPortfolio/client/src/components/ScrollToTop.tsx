import { ChevronUp } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Throttled scroll handler for better performance
  const toggleVisibility = useCallback(() => {
    if (timeoutRef.current) return // Skip if already scheduled

    timeoutRef.current = setTimeout(() => {
      const shouldShow = window.pageYOffset > 300
      setIsVisible(shouldShow)
      timeoutRef.current = undefined
    }, 100) // Throttle to 100ms
  }, [])

  // Set the scroll event listener with throttling
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [toggleVisibility])

  // Optimized scroll to top handler
  const scrollToTop = useCallback(() => {
    // Use instant scroll for better performance
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    })
  }, [])

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top-button"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </>
  )
}

export default ScrollToTop 