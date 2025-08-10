import { Link } from 'react-router-dom'
import { Shield, Zap, Code, Target, ArrowRight, Users, Award } from 'lucide-react'
import { useEffect, Suspense, lazy } from 'react'
import { getDeviceCapabilities, getPerformanceFlags } from '../utils/mobile-performance'
import MobileOptimizedLazyLoader from '../components/MobileOptimizedLazyLoader'

// Lazy load heavy components with mobile optimization
const SecurityDashboard = lazy(() => import('../components/SecurityDashboard'))
const InteractiveTerminal = lazy(() => import('../components/InteractiveTerminal'))
const NewsTable = lazy(() => import('../components/NewsTable'))

// Loading component for lazy-loaded components
const ComponentLoader = () => (
  <div className="flex items-center justify-center h-32">
    <div className="text-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyber-green mx-auto mb-2"></div>
      <p className="text-muted-foreground text-sm">Loading...</p>
    </div>
  </div>
)

const MobileOptimizedHome = () => {
  const capabilities = getDeviceCapabilities()
  const performanceFlags = getPerformanceFlags()

  // Ensure page starts at the top when component mounts
  useEffect(() => {
    // Immediate scroll to top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    })
    
    // Additional scroll after a small delay to ensure all components are loaded
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      })
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  const features = [
    {
      icon: Shield,
      title: 'Penetration Testing',
      description: 'Comprehensive security assessments and vulnerability analysis',
      color: 'text-cyber-green'
    },
    {
      icon: Zap,
      title: 'Incident Response',
      description: 'Rapid threat detection and incident handling capabilities',
      color: 'text-cyber-red'
    },
    {
      icon: Code,
      title: 'Security Automation',
      description: 'Custom tools and scripts for security operations',
      color: 'text-cyber-blue'
    },
    {
      icon: Target,
      title: 'Threat Intelligence',
      description: 'Advanced threat hunting and intelligence gathering',
      color: 'text-cyber-yellow'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Mobile optimized */}
      <section className="relative overflow-hidden py-8 md:py-16 lg:py-24 hero-section">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            {/* Hero Content */}
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-3 md:space-y-4">
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-cyber font-bold">
                  <span className="text-cyber-green">Systems</span> and
                  <br />
                  <span className="text-cyber-blue">Cloud Engineer</span>
                  <br />
                  <span className="text-cyber-yellow text-xl md:text-2xl lg:text-4xl">John Katsimpris</span>
                </h1>
                <p className="text-base md:text-xl text-white/90 drop-shadow max-w-lg mx-auto">
                  Building fortress-like cloud environments and deploying intelligent security systems 
                  to protect organizations from evolving cyber threats.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Link 
                  to="/tools" 
                  className={`cyber-button touch-target transition-all duration-200 ${
                    performanceFlags.enableComplexAnimations ? 'cyber-button-magnetic target-lock' : ''
                  }`}
                >
                  Explore Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link 
                  to="/projects" 
                  className={`cyber-button touch-target transition-all duration-200 ${
                    performanceFlags.enableComplexAnimations ? 'cyber-button-magnetic target-lock' : ''
                  }`}
                >
                  View Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Mobile optimized */}
      <section className="py-12 md:py-16 bg-cyber-card/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-cyber-green mb-4">
              Core Capabilities
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Specialized cybersecurity services designed to protect your digital assets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`cyber-card p-6 text-center transition-all duration-200 ${
                  performanceFlags.enableComplexAnimations ? 'hover:scale-105' : ''
                }`}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-lg bg-cyber-card flex items-center justify-center ${feature.color}`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-cyber-green mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Dashboard - Mobile optimized */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-cyber-green mb-4">
              Live Security Dashboard
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real-time monitoring and threat intelligence
            </p>
          </div>

          <MobileOptimizedLazyLoader
            component={() => import('../components/SecurityDashboard')}
            fallback={<ComponentLoader />}
            mobileFallback={
              <div className="bg-cyber-card rounded-lg p-8 text-center">
                <div className="w-20 h-20 bg-cyber-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-10 w-10 text-cyber-green" />
                </div>
                <h3 className="text-xl font-semibold text-cyber-green mb-2">Security Status</h3>
                <p className="text-muted-foreground mb-4">
                  All systems operational and secure
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-cyber-dark p-3 rounded">
                    <div className="text-cyber-green font-semibold">Threats</div>
                    <div className="text-2xl font-bold">0</div>
                  </div>
                  <div className="bg-cyber-dark p-3 rounded">
                    <div className="text-cyber-green font-semibold">Status</div>
                    <div className="text-2xl font-bold text-cyber-green">✓</div>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </section>

      {/* Interactive Terminal - Mobile optimized */}
      <section className="py-12 md:py-16 bg-cyber-card/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-cyber-green mb-4">
              Interactive Terminal
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience cybersecurity tools in action
            </p>
          </div>

          <MobileOptimizedLazyLoader
            component={() => import('../components/InteractiveTerminal')}
            fallback={<ComponentLoader />}
            mobileFallback={
              <div className="bg-cyber-dark rounded-lg p-6 border border-cyber-green/20">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="font-mono text-sm text-cyber-green">
                  <div>$ <span className="text-cyber-green">whoami</span></div>
                  <div className="text-cyber-blue">john@jksecurestack:~$</div>
                  <div>$ <span className="text-cyber-green">status</span></div>
                  <div className="text-cyber-green">✓ All systems operational</div>
                  <div>$ <span className="text-cyber-green">threats</span></div>
                  <div className="text-cyber-green">✓ No active threats detected</div>
                  <div>$ <span className="text-cyber-green">_</span></div>
                </div>
              </div>
            }
          />
        </div>
      </section>

      {/* News Section - Mobile optimized */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-cyber-green mb-4">
              Latest Cybersecurity News
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest threats and security developments
            </p>
          </div>

          <MobileOptimizedLazyLoader
            component={() => import('../components/NewsTable')}
            fallback={<ComponentLoader />}
            mobileFallback={
              <div className="bg-cyber-card rounded-lg p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyber-green/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-cyber-green text-2xl">📰</span>
                  </div>
                  <h3 className="text-lg font-semibold text-cyber-green mb-2">Latest Updates</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Stay informed about cybersecurity developments
                  </p>
                  <Link 
                    to="/tools" 
                    className="cyber-button touch-target text-sm"
                  >
                    View All News
                  </Link>
                </div>
              </div>
            }
          />
        </div>
      </section>

      {/* CTA Section - Mobile optimized */}
      <section className="py-12 md:py-16 bg-cyber-card/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-cyber-green mb-4">
              Ready to Secure Your Digital Assets?
            </h2>
            <p className="text-muted-foreground mb-8">
              Let's work together to build a robust cybersecurity strategy that protects your organization
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className={`cyber-button touch-target transition-all duration-200 ${
                  performanceFlags.enableComplexAnimations ? 'cyber-button-magnetic target-lock' : ''
                }`}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                to="/about" 
                className="cyber-button-outline touch-target transition-all duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MobileOptimizedHome
