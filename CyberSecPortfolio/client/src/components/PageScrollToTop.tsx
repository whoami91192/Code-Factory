import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const PageScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to top when pathname changes (new page loads)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use 'instant' for immediate scroll without animation
    })
  }, [pathname])

  return null // This component doesn't render anything
}

export default PageScrollToTop 