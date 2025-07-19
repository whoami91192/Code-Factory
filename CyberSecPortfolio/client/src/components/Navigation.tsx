import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const Navigation = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/tools', label: 'Tools' },
    { path: '/ransomware-calculator', label: 'Ransomware Calculator' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="flex items-center">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 magnetic-attraction target-lock ${
              location.pathname === item.path
                ? 'text-cyber-green holographic-text'
                : 'text-muted-foreground hover:text-cyber-green'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden cyber-button p-2 sm:p-3"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background/95 backdrop-blur border-b md:hidden z-50">
          <div className="container py-4 px-4">
            <div className="flex flex-col space-y-3 sm:space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-3 sm:py-2 text-sm font-medium transition-all duration-300 magnetic-attraction target-lock rounded-lg ${
                    location.pathname === item.path
                      ? 'text-cyber-green holographic-text bg-cyber-card/50'
                      : 'text-muted-foreground hover:text-cyber-green hover:bg-cyber-card/30'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation 