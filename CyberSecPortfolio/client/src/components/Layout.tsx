import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import ScrollToTop from './ScrollToTop'
import { Shield, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'

const Layout = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Liquid Metal Global Background */}
      <div className="liquid-metal-bg" />
      <svg className="liquid-metal-svg" width="100%" height="100%" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      <div className="liquid-metal-overlay" />
      
      {/* Global Holographic Glitch Effect */}
      <div className="global-glitch" />
      
      {/* Matrix Background Effect */}
      <div className="fixed inset-0 matrix-bg opacity-5 pointer-events-none" />
      
      {/* Magnetic Cursor */}
      <div 
        className="magnetic-cursor"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
        }}
      />
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 liquid-metal-glow">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-cyber-green" />
            <span className="text-xl font-cyber font-bold text-cyber-green holographic-text">
              CyberSec Portfolio
            </span>
          </div>

          {/* Navigation */}
          <Navigation />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 liquid-metal-glow">
        <div className="container py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-cyber-green" />
                      <span className="text-sm text-muted-foreground glitch-text" data-text="© 2024 John Katsimpris. Securing the digital frontier.">
          © 2024 John Katsimpris. Securing the digital frontier.
        </span>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-cyber-green transition-colors magnetic-attraction"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ioannis-katsimpris-2a45991ba/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-cyber-green transition-colors magnetic-attraction"
              >
                LinkedIn
              </a>
              <a
                href="mailto:gianniskatsibris@gmail.com"
                className="text-sm text-muted-foreground hover:text-cyber-green transition-colors magnetic-attraction"
              >
                Contact
              </a>
              <a
                href="/terms"
                className="text-sm text-muted-foreground hover:text-cyber-green transition-colors magnetic-attraction"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout 