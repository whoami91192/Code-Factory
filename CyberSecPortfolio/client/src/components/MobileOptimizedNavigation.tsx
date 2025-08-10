import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState, useCallback, useRef, useEffect } from 'react'
import { getDeviceCapabilities, getPerformanceFlags, debounce } from '../utils/mobile-performance'

const MobileOptimizedNavigation = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  const capabilities = getDeviceCapabilities()
  const performanceFlags = getPerformanceFlags()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/tools', label: 'Tools' },
    { path: '/ransomware-calculator', label: 'Ransomware Calculator' },
    { path: '/contact', label: 'Contact' },
  ]

  // Optimized menu toggle with debouncing
  const handleMenuToggle = useCallback(() => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setIsOpen(!isOpen)
    
    // Reset animation flag after transition
    setTimeout(() => setIsAnimating(false), 300)
  }, [isOpen, isAnimating])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    // Use passive listener for better performance
    document.addEventListener('mousedown', handleClickOutside, { passive: true })
    document.addEventListener('touchstart', handleClickOutside, { passive: true })
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Optimized navigation item click
  const handleNavClick = useCallback(() => {
    if (capabilities.isMobile) {
      // Add small delay for mobile to ensure smooth transition
      setTimeout(() => setIsOpen(false), 100)
    } else {
      setIsOpen(false)
    }
  }, [capabilities.isMobile])

  return (
    <nav className="flex items-center">
      {/* Desktop Navigation - Simplified for mobile */}
      <div className="hidden md:flex items-center space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
              performanceFlags.enableComplexAnimations ? 'magnetic-attraction target-lock' : ''
            } ${
              location.pathname === item.path
                ? 'text-cyber-green'
                : 'text-muted-foreground hover:text-cyber-green'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button - Optimized for touch */}
      <button
        ref={buttonRef}
        className="md:hidden cyber-button p-2 sm:p-3 touch-target transition-transform duration-200 active:scale-95"
        onClick={handleMenuToggle}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        disabled={isAnimating}
      >
        {isOpen ? (
          <X className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200" />
        ) : (
          <Menu className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200" />
        )}
      </button>

      {/* Mobile Navigation - Performance optimized */}
      {isOpen && (
        <div 
          ref={menuRef}
          className="absolute top-16 left-0 right-0 bg-background/95 backdrop-blur border-b md:hidden z-50 safe-area-top"
          style={{
            transform: 'translateY(0)',
            opacity: 1,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div className="container py-4 px-4">
            <div className="flex flex-col space-y-3 sm:space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-3 sm:py-2 text-sm font-medium transition-all duration-200 rounded-lg touch-target ${
                    performanceFlags.enableComplexAnimations ? 'hover:scale-105' : ''
                  } ${
                    location.pathname === item.path
                      ? 'text-cyber-green bg-cyber-card/50 border border-cyber-green/20'
                      : 'text-muted-foreground hover:text-cyber-green hover:bg-cyber-card/30'
                  }`}
                  onClick={handleNavClick}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyber-green rounded-r-full" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default MobileOptimizedNavigation
