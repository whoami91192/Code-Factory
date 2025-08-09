import { Outlet } from 'react-router-dom'
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
      <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 liquid-metal-glow safe-area-top">
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
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 liquid-metal-glow safe-area-bottom">
        <div className="container py-6 sm:py-8 px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center space-x-2 text-center">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-cyber-green" />
              <span className="text-xs sm:text-sm text-muted-foreground glitch-text" data-text={`© ${new Date().getFullYear()} John Katsimpris. Securing the digital frontier.`}>
                © {new Date().getFullYear()} John Katsimpris. Securing the digital frontier.
              </span>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4 flex-wrap justify-center">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-muted-foreground hover:text-cyber-green transition-colors magnetic-attraction touch-target"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ioannis-katsimpris-2a45991ba/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-muted-foreground hover:text-cyber-green transition-colors magnetic-attraction touch-target"
              >
                LinkedIn
              </a>
              <a
                href="mailto:gianniskatsibris@gmail.com"
                className="text-xs sm:text-sm text-muted-foreground hover:text-cyber-green transition-colors magnetic-attraction touch-target"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout 