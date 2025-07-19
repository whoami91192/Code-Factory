import { Link } from 'react-router-dom'
import { Shield, Zap, Code, Target, ArrowRight, Users, Award } from 'lucide-react'
import { useEffect } from 'react'
import SecurityDashboard from '../components/SecurityDashboard'
import InteractiveTerminal from '../components/InteractiveTerminal'
import NewsTable from '../components/NewsTable'

const Home = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                  <span className="text-cyber-green">Cyber</span> Security
                  <br />
                  <span className="text-cyber-blue">Engineer</span>
                </h1>
                <p className="text-xl text-white/90 drop-shadow max-w-lg">
                  Securing digital assets through advanced threat detection, 
                  penetration testing, and security automation.
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
                <div className="space-y-2 font-mono text-sm">
                  <div className="text-cyber-green">$ whoami</div>
                  <div className="text-white">cyber-security-engineer</div>
                  <div className="text-cyber-green">$ ./security_scan.sh</div>
                  <div className="text-white">[+] Scanning network...</div>
                  <div className="text-cyber-yellow">[!] Found 3 potential vulnerabilities</div>
                  <div className="text-cyber-green">$ ./exploit_framework.py</div>
                  <div className="text-white">[*] Loading modules...</div>
                  <div className="text-cyber-blue">[+] Framework ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-cyber font-bold mb-4">
              Latest <span className="text-cyber-green">Security</span> News
            </h2>
            <p className="text-xl text-white/90 drop-shadow max-w-2xl mx-auto">
              Stay updated with the latest cybersecurity threats and vulnerabilities
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <NewsTable />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-cyber font-bold mb-4">
              Security <span className="text-cyber-green">Expertise</span>
            </h2>
            <p className="text-xl text-white/90 drop-shadow max-w-2xl mx-auto">
              Comprehensive cybersecurity services with cutting-edge tools and methodologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="cyber-card-magnetic text-center target-lock"
              >
                <feature.icon className={`h-12 w-12 mx-auto mb-4 ${feature.color} glow-text`} />
                <h3 className="text-xl font-bold mb-2 text-white drop-shadow-lg">{feature.title}</h3>
                <p className="text-white/90 font-medium drop-shadow">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Dashboard Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-cyber font-bold mb-4">
              Live <span className="text-cyber-green">Security</span> Dashboard
            </h2>
            <p className="text-xl text-white/90 drop-shadow max-w-2xl mx-auto">
              Real-time monitoring and security metrics from my infrastructure
            </p>
          </div>
          <SecurityDashboard />
        </div>
      </section>

      {/* Interactive Terminal Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-cyber font-bold mb-4">
              Interactive <span className="text-cyber-green">Terminal</span>
            </h2>
            <p className="text-xl text-white/90 drop-shadow max-w-2xl mx-auto">
              Experience a real cybersecurity terminal with professional commands and tools
            </p>
          </div>
          <InteractiveTerminal />
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="cyber-card-magnetic text-center target-lock">
              <Shield className="h-12 w-12 mx-auto mb-4 text-cyber-green glow-text" />
              <div className="text-3xl font-bold mb-2 text-white drop-shadow">100+</div>
              <div className="text-sm text-white/90 drop-shadow">Security Audits</div>
            </div>
            <div className="cyber-card-magnetic text-center target-lock">
              <Code className="h-12 w-12 mx-auto mb-4 text-cyber-blue glow-text" />
              <div className="text-3xl font-bold mb-2 text-white drop-shadow">50+</div>
              <div className="text-sm text-white/90 drop-shadow">Projects Completed</div>
            </div>
            <div className="cyber-card-magnetic text-center target-lock">
              <Users className="h-12 w-12 mx-auto mb-4 text-cyber-yellow glow-text" />
              <div className="text-3xl font-bold mb-2 text-white drop-shadow">100+</div>
              <div className="text-sm text-white/90 drop-shadow">Clients Protected</div>
            </div>
            <div className="cyber-card-magnetic text-center target-lock">
              <Award className="h-12 w-12 mx-auto mb-4 text-cyber-red glow-text" />
              <div className="text-3xl font-bold mb-2 text-white drop-shadow">+30</div>
              <div className="text-sm text-white/90 drop-shadow">Certifications</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-cyber font-bold mb-4">
              Ready to <span className="text-cyber-green">Secure</span> Your Systems?
            </h2>
            <p className="text-xl text-white/90 drop-shadow mb-8 max-w-2xl mx-auto">
              Let's discuss how I can help protect your digital assets and infrastructure
            </p>
            <Link to="/contact" className="cyber-button-magnetic target-lock">
              Get In Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 