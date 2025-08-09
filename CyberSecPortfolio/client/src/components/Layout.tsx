import { Outlet, Link } from 'react-router-dom'
import Navigation from './Navigation'
import FloatingNavigation from './FloatingNavigation'
import ScrollToTop from './ScrollToTop'
import PageScrollToTop from './PageScrollToTop'
import { Shield, Zap } from 'lucide-react'
import { useEffect, useState, useMemo, useCallback, useRef } from 'react'

const Layout = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)

    // Throttled mouse move handler for better performance
    const handleMouseMove = (e: MouseEvent) => {
      if (!isReducedMotion) {
        // Store position in ref to avoid excessive state updates
        mousePositionRef.current = { x: e.clientX, y: e.clientY }
        
        // Use requestAnimationFrame for smooth updates
        if (!animationFrameRef.current) {
          animationFrameRef.current = requestAnimationFrame(() => {
            setMousePosition(mousePositionRef.current)
            animationFrameRef.current = undefined
          })
        }
      }
    }

    if (!isReducedMotion) {
      // Use passive event listener for better performance
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }
    }
  }, [isReducedMotion])

  // Memoize heavy visual effects
  const visualEffects = useMemo(() => {
    if (isReducedMotion) return null

    return (
      <>
        {/* Liquid Metal Global Background - Only on desktop */}
        <div className="liquid-metal-bg hidden md:block" />
        <svg className="liquid-metal-svg hidden md:block" width="100%" height="100%" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="liquid" x="0" y="0">
              <feTurbulence id="turb" baseFrequency="0.008 0.012" numOctaves="2" seed="2" type="fractalNoise" result="turb"/>
              <feDisplacementMap in2="turb" in="SourceGraphic" scale="60" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>
          <ellipse cx="960" cy="540" rx="900" ry="400" fill="url(#paint0_radial)" filter="url(#liquid)" opacity="0.18" />
          <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(960 540) scale(900 400)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0080FF" stopOpacity="0.25" />
            <stop offset="0.5" stopColor="#9C27B0" stopOpacity="0.12" />
            <stop offset="1" stopColor="#0F1419" stopOpacity="0.01" />
          </radialGradient>
        </svg>
        <div className="liquid-metal-overlay hidden md:block" />
        
        {/* Global Holographic Glitch Effect - Only on desktop */}
        <div className="global-glitch hidden md:block" />
        
        {/* Matrix Background Effect - Reduced opacity */}
        <div className="fixed inset-0 matrix-bg opacity-2 pointer-events-none" />
        
        {/* Magnetic Cursor - Only if not reduced motion */}
        {!isReducedMotion && (
          <div 
            className="magnetic-cursor hidden md:block"
            style={{
              left: mousePosition.x - 10,
              top: mousePosition.y - 10,
            }}
          />
        )}
      </>
    )
  }, [isReducedMotion, mousePosition])

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Conditional Visual Effects */}
      {visualEffects}
      
      {/* Header with Navigation */}
      <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 liquid-metal-glow">
        <div className="container flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-cyber-green" />
            <span className="text-lg sm:text-xl font-cyber font-bold text-cyber-green holographic-text">
              CyberSec Portfolio
            </span>
          </div>

          {/* Regular Navigation */}
          <Navigation />
        </div>
      </header>

      {/* Floating Navigation (appears when scrolled) */}
      <FloatingNavigation />

      {/* Page Scroll to Top - Auto scroll on page change */}
      <PageScrollToTop />

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-cyber-card/50 border-t border-cyber-green/20 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-cyber-green" />
                <span className="text-lg font-cyber font-bold text-cyber-green">
                  CyberSec Portfolio
                </span>
              </div>
              <p className="text-white/80 text-sm">
                Professional cybersecurity services and consulting for modern organizations.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-cyber-green font-bold">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-white/80 hover:text-cyber-green transition-colors text-sm">About</Link></li>
                <li><Link to="/projects" className="text-white/80 hover:text-cyber-green transition-colors text-sm">Projects</Link></li>
                <li><Link to="/tools" className="text-white/80 hover:text-cyber-green transition-colors text-sm">Tools</Link></li>
                <li><Link to="/contact" className="text-white/80 hover:text-cyber-green transition-colors text-sm">Contact</Link></li>
              </ul>
            </div>

            {/* External Resources */}
            <div className="space-y-4">
              <h3 className="text-cyber-green font-bold">External Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://owasp.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-cyber-green transition-colors text-sm"
                  >
                    OWASP Foundation
                  </a>
                </li>
                <li>
                  <a 
                    href="https://nvd.nist.gov" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-cyber-green transition-colors text-sm"
                  >
                    NIST NVD
                  </a>
                </li>
                <li>
                  <a 
                    href="https://cve.mitre.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-cyber-green transition-colors text-sm"
                  >
                    CVE Database
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.sans.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-cyber-green transition-colors text-sm"
                  >
                    SANS Institute
                  </a>
                </li>
              </ul>
            </div>

            {/* Security Standards */}
            <div className="space-y-4">
              <h3 className="text-cyber-green font-bold">Security Standards</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://www.iso.org/isoiec-27001-information-security.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-cyber-green transition-colors text-sm"
                  >
                    ISO 27001
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.pcisecuritystandards.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-cyber-green transition-colors text-sm"
                  >
                    PCI DSS
                  </a>
                </li>
                <li>
                  <a 
                    href="https://gdpr.eu" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-cyber-green transition-colors text-sm"
                  >
                    GDPR
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.nist.gov/cyberframework" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-cyber-green transition-colors text-sm"
                  >
                    NIST Framework
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-cyber-green/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © 2024 John Katsimpris. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/terms" className="text-white/60 hover:text-cyber-green transition-colors text-sm">
                Terms of Service
              </Link>
              <span className="text-white/40">|</span>
              <Link to="/contact" className="text-white/60 hover:text-cyber-green transition-colors text-sm">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  )
}

export default Layout 