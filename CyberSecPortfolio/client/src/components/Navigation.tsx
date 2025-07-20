import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Shield } from 'lucide-react'
import { useState, useEffect } from 'react'

const Navigation = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Calculate scroll progress
      const progress = Math.min((currentScrollY / (documentHeight - windowHeight)) * 100, 100)
      setScrollProgress(progress)
      
      // Show floating nav when scrolled down enough
      setIsScrolled(currentScrollY > 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/tools', label: 'Tools' },
    { path: '/ransomware-calculator', label: 'Ransomware Calculator' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <>
      {/* Floating Navigation Bar */}
      <div 
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <nav className="bg-background/90 backdrop-blur-xl border border-cyber-primary/30 rounded-2xl shadow-2xl liquid-metal-glow floating-nav-container px-6 py-3">
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <div className="flex items-center space-x-2 mr-4">
              <Shield className="h-5 w-5 text-cyber-green" />
              <span className="text-sm font-cyber font-bold text-cyber-green holographic-text">
                CyberSec
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 text-xs font-medium transition-all duration-300 magnetic-attraction target-lock rounded-lg ${
                    location.pathname === item.path
                      ? 'text-cyber-green holographic-text bg-cyber-card/50 border border-cyber-green/30'
                      : 'text-muted-foreground hover:text-cyber-green hover:bg-cyber-card/30'
                  }`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyber-green rounded-full animate-pulse" />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden cyber-button p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
          <div className="bg-background/95 backdrop-blur-xl border border-cyber-primary/30 rounded-xl shadow-2xl liquid-metal-glow p-4 min-w-[200px]">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-3 text-sm font-medium transition-all duration-300 magnetic-attraction target-lock rounded-lg ${
                    location.pathname === item.path
                      ? 'text-cyber-green holographic-text bg-cyber-card/50 border border-cyber-green/30'
                      : 'text-muted-foreground hover:text-cyber-green hover:bg-cyber-card/30'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-cyber-darker z-40">
        <div 
          className="h-full scroll-progress-bar transition-all duration-300 ease-out"
          style={{
            width: `${scrollProgress}%`
          }}
        />
      </div>
    </>
  )
}

export default Navigation 