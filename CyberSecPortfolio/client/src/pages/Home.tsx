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
                  <span className="text-cyber-green">Cybersecurity Engineer</span> and
                  <br />
                  <span className="text-cyber-blue">Security Services</span>
                  <br />
                  <span className="text-cyber-yellow text-2xl lg:text-4xl">John Katsimpris</span>
                </h1>
                <p className="text-xl text-white/90 drop-shadow max-w-lg">
                  Building fortress-like cloud environments and deploying intelligent security systems 
                  to protect organizations from evolving cyber threats. With over a decade of experience 
                  in cybersecurity, I specialize in penetration testing, incident response, and security 
                  architecture design. My expertise in security tools and automation helps organizations 
                  build robust defense mechanisms against modern cyber attacks. Using advanced security 
                  tools and automation techniques, I deliver comprehensive security solutions that 
                  protect your digital assets and ensure business continuity.
                </p>
                <p className="text-lg text-white/80 drop-shadow max-w-lg">
                  My expertise spans across cloud security, network defense, application security, and 
                  threat intelligence. I help organizations build resilient security postures through 
                  comprehensive assessments, automated security tools, and strategic security consulting.
                  Explore my <Link to="/projects" className="text-cyber-green hover:text-cyber-blue transition-colors">security projects</Link> and 
                  <Link to="/tools" className="text-cyber-green hover:text-cyber-blue transition-colors"> interactive tools</Link> to see my work in action.
                  My security tools and automation expertise enables organizations to implement efficient 
                  and effective security controls that adapt to evolving threat landscapes.
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
                <Link to="/about" className="cyber-button-magnetic target-lock">
                  About Me
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
                  <div className="text-cyber-blue">✓ Security tools loaded</div>
                  <div className="text-cyber-blue">✓ Monitoring systems online</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-cyber-card/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-cyber-green mb-4">
                About My Security Expertise
              </h2>
              <p className="text-lg text-white/90 leading-relaxed">
                As a dedicated cybersecurity professional, I focus on protecting digital assets through 
                comprehensive security assessments, threat modeling, and incident response strategies. 
                My approach combines technical expertise with strategic thinking to deliver robust 
                security solutions that align with industry best practices and compliance standards.
                I utilize advanced security tools and automation techniques to enhance threat detection 
                and response capabilities for organizations of all sizes.
              </p>
              <p className="text-lg text-white/90 leading-relaxed">
                I specialize in cloud security architecture, penetration testing, and security automation. 
                My experience includes working with AWS, Azure, and Google Cloud platforms, implementing 
                zero-trust security models, and developing custom security tools for threat detection 
                and response. I've helped organizations of all sizes strengthen their security posture 
                and protect against evolving cyber threats through comprehensive security assessments 
                and strategic security consulting.
              </p>
              <p className="text-lg text-white/90 leading-relaxed">
                My expertise covers a wide range of security domains including network security, 
                application security, cloud security, and incident response. I stay current with 
                the latest security trends, tools, and methodologies to provide cutting-edge 
                solutions for modern security challenges. My security tools and automation expertise 
                enables organizations to implement efficient and effective security controls.
              </p>
              <p className="text-lg text-white/90 leading-relaxed">
                With a focus on practical security implementation, I help organizations develop 
                comprehensive security strategies that align with their business objectives. My 
                approach combines technical expertise with strategic thinking to deliver robust 
                security solutions that protect against both current and emerging threats.
              </p>
              <p className="text-lg text-white/90 leading-relaxed">
                My security tools and automation expertise extends beyond traditional security 
                practices, incorporating cutting-edge technologies and methodologies to provide 
                comprehensive protection. I work closely with organizations to understand their 
                unique security challenges and develop tailored solutions that address their 
                specific needs and requirements.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/about" className="text-cyber-green hover:text-cyber-blue transition-colors">
                  Learn More About Me →
                </Link>
                <Link to="/contact" className="text-cyber-green hover:text-cyber-blue transition-colors">
                  Get In Touch →
                </Link>
              </div>
            </div>
            <div className="cyber-card p-8">
              <h3 className="text-2xl font-bold text-cyber-green mb-6">Core Competencies</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-cyber-green rounded-full"></div>
                  <span className="text-white/90">Penetration Testing & Vulnerability Assessment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-cyber-green rounded-full"></div>
                  <span className="text-white/90">Cloud Security Architecture</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-cyber-green rounded-full"></div>
                  <span className="text-white/90">Incident Response & Threat Hunting</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-cyber-green rounded-full"></div>
                  <span className="text-white/90">Security Automation & Tool Development</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-cyber-green rounded-full"></div>
                  <span className="text-white/90">Compliance & Risk Management</span>
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
              Security Services & Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive cybersecurity solutions and security tools tailored to protect your digital assets and 
              strengthen your organization's security posture against evolving threats. Our services 
              are designed to identify vulnerabilities, mitigate risks, and build resilient security 
              frameworks for modern organizations using advanced security tools and automation. 
              Each service is backed by years of experience and proven methodologies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="cyber-card p-6 text-center hover:scale-105 transition-transform duration-300">
                <feature.icon className={`h-12 w-12 mx-auto mb-4 ${feature.color}`} />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
                <p className="text-sm text-white/70 mt-2">
                  Advanced {feature.title.toLowerCase()} using cutting-edge security tools and automation techniques.
                </p>
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
              Interactive Security Tools & Automation
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience our cutting-edge security tools and dashboards designed to provide 
              real-time insights into security threats and system vulnerabilities. Our security tools 
              and automation capabilities help organizations streamline their security operations 
              and enhance their overall security posture. Interactive security tools provide hands-on 
              experience with real-world security scenarios and threat detection techniques.
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
              Latest Security News & Threat Intelligence
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest cybersecurity threats, vulnerabilities, and industry trends 
              to keep your organization informed and prepared. Our security tools and threat intelligence 
              capabilities help organizations stay ahead of emerging threats and security challenges. 
              Regular updates on security tools, automation techniques, and industry best practices 
              ensure your security strategy remains current and effective.
            </p>
          </div>

          <Suspense fallback={<ComponentLoader />}>
            <NewsTable />
          </Suspense>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-cyber-green mb-6">
              Ready to Secure Your Digital Assets with Advanced Security Tools?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Let's work together to build a robust security framework that protects your organization 
              from cyber threats. Contact me to discuss your security needs and explore how we can 
              strengthen your cybersecurity posture using advanced security tools and automation 
              techniques. Our comprehensive security services and tools are designed to meet the 
              unique challenges of modern organizations. From initial security assessments to ongoing 
              threat monitoring, I provide end-to-end security solutions that keep your digital assets 
              protected.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="cyber-button-magnetic target-lock">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/tools" className="cyber-button-magnetic target-lock">
                Explore Security Tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 