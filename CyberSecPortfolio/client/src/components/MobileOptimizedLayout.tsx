import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import FloatingNavigation from './FloatingNavigation'
import ScrollToTop from './ScrollToTop'
import PageScrollToTop from './PageScrollToTop'
import { Shield, Zap } from 'lucide-react'
import { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import { getDeviceCapabilities, getPerformanceFlags, throttle, debounce } from '../utils/mobile-performance'

const MobileOptimizedLayout = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()
  
  const capabilities = getDeviceCapabilities()
  const performanceFlags = getPerformanceFlags()

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)

    // Only add mouse tracking on desktop devices
    if (!capabilities.isMobile && !capabilities.isTablet) {
      // Throttled mouse move handler for better performance
      const handleMouseMove = throttle((e: MouseEvent) => {
        if (!isReducedMotion && performanceFlags.enableComplexAnimations) {
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
      }, 16) // 60fps throttle

      // Use passive event listener for better performance
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }
    }
  }, [isReducedMotion, capabilities, performanceFlags])

  // Memoize heavy visual effects - only render on desktop
  const visualEffects = useMemo(() => {
    if (isReducedMotion || !performanceFlags.enableHeavyEffects) return null

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
        
        {/* Matrix Background Effect - Reduced opacity and only on desktop */}
        <div className="fixed inset-0 matrix-bg opacity-2 pointer-events-none hidden md:block" />
        
        {/* Magnetic Cursor - Only if not reduced motion and on desktop */}
        {!isReducedMotion && performanceFlags.enableComplexAnimations && (
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
  }, [isReducedMotion, mousePosition, performanceFlags])

  // Mobile-optimized background
  const mobileBackground = useMemo(() => {
    if (capabilities.isMobile || capabilities.isTablet) {
      return (
        <div className="mobile-optimized-bg">
          {/* Simple gradient background for mobile */}
          <div className="fixed inset-0 bg-gradient-to-br from-cyber-dark via-cyber-light to-cyber-darker opacity-90" />
          {/* Minimal matrix effect for mobile */}
          <div className="fixed inset-0 matrix-bg-mobile opacity-10 pointer-events-none" />
        </div>
      )
    }
    return null
  }, [capabilities])

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Conditional Visual Effects */}
      {visualEffects}
      {mobileBackground}
      
      {/* Header with Navigation */}
      <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 liquid-metal-glow safe-area-top">
        <div className="container flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-cyber-green" />
              <div className="absolute inset-0 bg-cyber-green/20 rounded-full blur-sm animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyber-green to-cyber-blue bg-clip-text text-transparent">
                JK Secure Stack
              </h1>
              <p className="text-xs text-muted-foreground">Cybersecurity Portfolio</p>
            </div>
          </div>

          {/* Navigation */}
          <Navigation />

          {/* Theme Toggle - Simplified for mobile */}
          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center space-x-1">
              <Zap className="h-4 w-4 text-cyber-warning" />
              <span className="text-xs text-muted-foreground">v2.0</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative">
        <Outlet />
      </main>

      {/* Floating Navigation - Mobile optimized */}
      <FloatingNavigation />

      {/* Scroll to Top - Mobile optimized */}
      <ScrollToTop />

      {/* Page Scroll to Top */}
      <PageScrollToTop />
    </div>
  )
}

export default MobileOptimizedLayout
