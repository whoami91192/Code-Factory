import { Link } from 'react-router-dom'
import { Shield, Zap, Code, Target, ArrowRight, Users, Award } from 'lucide-react'
import { useEffect, Suspense, lazy } from 'react'

// Lazy load heavy components
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

const Home = () => {
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
    <div className="min-h-screen bg-background liquid-metal-glow">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-cyber font-bold">
                  <span className="text-cyber-green">Systems</span> and
                  <br />
                  <span className="text-cyber-blue">Cloud Engineer</span>
                  <br />
                  <span className="text-cyber-yellow text-2xl lg:text-4xl">John Katsimpris</span>
                </h1>
                <p className="text-xl text-white/90 drop-shadow max-w-lg">
                  Building fortress-like cloud environments and deploying intelligent security systems 
                  to protect organizations from evolving cyber threats.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/tools" className="cyber-button-magnetic target-lock">
                  Explore Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link to="/projects" className="cyber-button-magnetic target-lock">
                  View Projects
                </Link>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="terminal-bg rounded-lg p-8 border border-cyber-green/30">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-cyber-red rounded-full"></div>
                    <div className="w-3 h-3 bg-cyber-yellow rounded-full"></div>
                    <div className="w-3 h-3 bg-cyber-green rounded-full"></div>
                  </div>
                  <span className="text-cyber-green font-mono text-sm">cyber-sec@terminal:~$</span>
                </div>
                <div className="space-y-2 text-cyber-green font-mono text-sm">
                  <div>Welcome to CyberSec Portfolio v2.0</div>
                  <div>Loading security modules...</div>
                  <div className="text-cyber-yellow">✓ Threat detection active</div>
                  <div className="text-cyber-yellow">✓ Firewall configured</div>
                  <div className="text-cyber-yellow">✓ Encryption enabled</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-cyber-card/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-cyber-green mb-4">
              Security Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive cybersecurity solutions tailored to protect your digital assets
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="cyber-card p-6 text-center hover:scale-105 transition-transform duration-300">
                <feature.icon className={`h-12 w-12 mx-auto mb-4 ${feature.color}`} />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-cyber-green mb-4">
              Interactive Security Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience our cutting-edge security tools and dashboards
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Security Dashboard */}
            <div className="cyber-card p-6">
              <h3 className="text-2xl font-bold text-cyber-green mb-4">Security Dashboard</h3>
              <Suspense fallback={<ComponentLoader />}>
                <SecurityDashboard />
              </Suspense>
            </div>

            {/* Interactive Terminal */}
            <div className="cyber-card p-6">
              <h3 className="text-2xl font-bold text-cyber-green mb-4">Interactive Terminal</h3>
              <Suspense fallback={<ComponentLoader />}>
                <InteractiveTerminal />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-cyber-card/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-cyber-green mb-4">
              Latest Security News
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest cybersecurity threats and trends
            </p>
          </div>

          <Suspense fallback={<ComponentLoader />}>
            <NewsTable />
          </Suspense>
        </div>
      </section>
    </div>
  )
}

export default Home 