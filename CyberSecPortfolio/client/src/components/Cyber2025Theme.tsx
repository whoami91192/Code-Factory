import { 
  Shield, 
  Lock, 
  Code, 
  Eye, 
  Zap, 
  Target,
  Users,
  Binary,
  Key,
  Network,
  Monitor,
  AlertTriangle,
  Palette,
  Cpu,
  Database,
  Globe,
  Smartphone,
  Cloud,
  Server,
  Activity
} from 'lucide-react'

const Cyber2025Theme = () => {
  const themeColors = [
    { name: 'Cyber Blue Primary', hex: '#0080FF', class: 'bg-cyber-primary' },
    { name: 'Cyber Green Secondary', hex: '#00E676', class: 'bg-cyber-secondary' },
    { name: 'Purple Accent', hex: '#9C27B0', class: 'bg-cyber-accent' },
    { name: 'Warning Yellow', hex: '#FFB300', class: 'bg-cyber-warning' },
    { name: 'Danger Red', hex: '#FF1744', class: 'bg-cyber-danger' },
    { name: 'Success Green', hex: '#00C853', class: 'bg-cyber-success' },
  ]

  const backgroundColors = [
    { name: 'Deep Navy Black', hex: '#0F1419', class: 'bg-cyber-dark' },
    { name: 'Very Dark Navy', hex: '#070A0C', class: 'bg-cyber-darker' },
    { name: 'Lighter Navy', hex: '#1A1F26', class: 'bg-cyber-light' },
    { name: 'Card Background', hex: '#141A20', class: 'bg-cyber-card' },
  ]

  const cybersecurityElements = [
    {
      title: 'Network Security',
      description: 'Advanced network protection and monitoring',
      icon: Network,
      color: 'text-cyber-primary',
      gradient: 'cyber-gradient'
    },
    {
      title: 'Threat Intelligence',
      description: 'Real-time threat detection and analysis',
      icon: Shield,
      color: 'text-cyber-secondary',
      gradient: 'cyber-gradient-secondary'
    },
    {
      title: 'Penetration Testing',
      description: 'Comprehensive security assessment',
      icon: Target,
      color: 'text-cyber-accent',
      gradient: 'cyber-gradient-accent'
    },
    {
      title: 'Incident Response',
      description: 'Rapid security incident handling',
      icon: AlertTriangle,
      color: 'text-cyber-warning',
      gradient: 'cyber-gradient-accent'
    }
  ]

  const designFeatures = [
    {
      title: 'Glass Morphism',
      description: 'Modern frosted glass effects with blur',
      feature: 'Sophisticated depth and transparency'
    },
    {
      title: 'Neon Glow Effects',
      description: 'Dynamic lighting and glow animations',
      feature: 'Eye-catching interactive elements'
    },
    {
      title: 'Gradient Backgrounds',
      description: 'Smooth color transitions and depth',
      feature: 'Professional visual hierarchy'
    },
    {
      title: 'Micro-interactions',
      description: 'Subtle animations and hover effects',
      feature: 'Enhanced user experience'
    }
  ]

  const techStack = [
    {
      title: 'Frontend',
      technologies: ['React 18', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
      icon: Code,
      color: 'text-cyber-primary'
    },
    {
      title: 'Backend',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'Redis'],
      icon: Server,
      color: 'text-cyber-secondary'
    },
    {
      title: 'Security',
      technologies: ['JWT Auth', 'OWASP', 'Helmet.js', 'Rate Limiting'],
      icon: Lock,
      color: 'text-cyber-accent'
    },
    {
      title: 'DevOps',
      technologies: ['Docker', 'Kubernetes', 'CI/CD', 'Monitoring'],
      icon: Cloud,
      color: 'text-cyber-success'
    }
  ]

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl lg:text-6xl font-cyber font-bold mb-6">
          <span className="text-cyber-primary">CYBER</span>
          <span className="text-cyber-secondary">SECURITY</span>
          <br />
          <span className="text-cyber-accent">2025</span>
        </h2>
        <div className="w-48 h-1 cyber-gradient mx-auto mb-6 rounded-full"></div>
        <p className="text-xl text-foreground/80 max-w-4xl mx-auto">
          Cutting-edge cybersecurity portfolio with 2025 design trends. 
          Modern blue and green color scheme with glass morphism, neon effects, 
          and professional aesthetics that reflect the future of cybersecurity.
        </p>
      </div>

      {/* Theme Colors */}
      <div className="cyber-card-glow">
        <h3 className="text-2xl font-cyber font-bold mb-8 flex items-center">
          <Palette className="h-6 w-6 mr-3 text-cyber-primary" />
          <span className="text-foreground">2025 Color Palette</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {themeColors.map((color) => (
            <div key={color.name} className="space-y-3">
              <div className={`w-full h-20 rounded-xl ${color.class} border border-cyber-primary/30 flex items-center justify-center neon-blue`}>
                <span className="text-xs font-mono text-white bg-black/20 px-2 py-1 rounded">
                  {color.hex}
                </span>
              </div>
              <div>
                <h4 className="font-medium text-sm text-foreground">{color.name}</h4>
                <p className="text-xs text-foreground/60 font-mono">{color.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Colors */}
      <div className="cyber-card">
        <h3 className="text-2xl font-cyber font-bold mb-6 flex items-center">
          <Monitor className="h-6 w-6 mr-3 text-cyber-primary" />
          <span className="text-foreground">Background Colors</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {backgroundColors.map((color) => (
            <div key={color.name} className="space-y-3">
              <div className={`w-full h-16 rounded-lg ${color.class} border border-cyber-primary/30 flex items-center justify-center`}>
                <span className="text-xs font-mono text-cyber-primary bg-black/20 px-2 py-1 rounded">
                  {color.hex}
                </span>
              </div>
              <div>
                <h4 className="font-medium text-sm text-foreground">{color.name}</h4>
                <p className="text-xs text-foreground/60 font-mono">{color.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cybersecurity Elements */}
      <div className="cyber-card-glow">
        <h3 className="text-2xl font-cyber font-bold mb-8 flex items-center">
          <Shield className="h-6 w-6 mr-3 text-cyber-primary" />
          <span className="text-foreground">Cybersecurity Domains</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cybersecurityElements.map((element) => (
            <div key={element.title} className="glass-card p-6 rounded-xl border border-cyber-primary/20">
              <div className="flex items-center space-x-4 mb-4">
                <div className={`p-3 rounded-lg bg-cyber-primary/10 ${element.color}`}>
                  <element.icon className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground">{element.title}</h4>
                  <p className="text-sm text-foreground/70">{element.description}</p>
                </div>
              </div>
              <div className={`w-full h-2 rounded-full ${element.gradient}`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Design Features */}
      <div className="cyber-card">
        <h3 className="text-2xl font-cyber font-bold mb-6 flex items-center">
          <Eye className="h-6 w-6 mr-3 text-cyber-primary" />
          <span className="text-foreground">2025 Design Features</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {designFeatures.map((feature) => (
            <div key={feature.title} className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-cyber-primary rounded-full neon-blue"></div>
                <h4 className="font-medium text-foreground">{feature.title}</h4>
              </div>
              <p className="text-sm text-foreground/70">{feature.description}</p>
              <div className="p-4 bg-cyber-light rounded-lg border border-cyber-primary/20">
                <p className="text-xs text-cyber-primary font-mono">{feature.feature}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="cyber-card-glow">
        <h3 className="text-2xl font-cyber font-bold mb-8 flex items-center">
          <Code className="h-6 w-6 mr-3 text-cyber-primary" />
          <span className="text-foreground">Interactive Theme Demo</span>
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h4 className="font-medium text-foreground">Buttons & Controls</h4>
            <div className="space-y-4">
              <button className="cyber-button w-full">
                <span className="text-cyber-dark">Primary Button</span>
              </button>
              <button className="cyber-button-outline w-full">
                <span className="text-cyber-primary">Outline Button</span>
              </button>
              <button className="cyber-gradient text-white px-6 py-3 rounded-lg font-cyber font-bold transition-all duration-300 hover:shadow-lg hover:neon-blue w-full">
                Gradient Button
              </button>
              <button className="bg-cyber-secondary text-cyber-dark px-6 py-3 rounded-lg font-cyber font-bold transition-all duration-300 hover:shadow-lg hover:neon-green w-full">
                Success Button
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-medium text-foreground">Form Elements</h4>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Enter text..." 
                className="cyber-input w-full"
              />
              <textarea 
                placeholder="Enter description..." 
                className="cyber-textarea w-full h-20"
              />
              <div className="flex items-center space-x-3">
                <input type="checkbox" className="w-4 h-4 text-cyber-primary bg-cyber-light border-cyber-primary rounded focus:ring-cyber-primary" />
                <span className="text-sm text-foreground">Security Option</span>
              </div>
              <div className="flex items-center space-x-3">
                <input type="radio" className="w-4 h-4 text-cyber-secondary bg-cyber-light border-cyber-secondary rounded focus:ring-cyber-secondary" />
                <span className="text-sm text-foreground">Advanced Mode</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="cyber-card">
        <h3 className="text-2xl font-cyber font-bold mb-8 flex items-center">
          <Cpu className="h-6 w-6 mr-3 text-cyber-primary" />
          <span className="text-foreground">Technology Stack</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((stack) => (
            <div key={stack.title} className="glass-card p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-4">
                <stack.icon className={`h-6 w-6 ${stack.color}`} />
                <h4 className="font-bold text-foreground">{stack.title}</h4>
              </div>
              <div className="space-y-2">
                {stack.technologies.map((tech) => (
                  <div key={tech} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyber-primary rounded-full"></div>
                    <span className="text-sm text-foreground/80">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Metrics */}
      <div className="cyber-card-glow">
        <h3 className="text-2xl font-cyber font-bold mb-8 flex items-center">
          <Activity className="h-6 w-6 mr-3 text-cyber-primary" />
          <span className="text-foreground">Security Metrics Dashboard</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-cyber-success mb-2">99.9%</div>
            <div className="text-sm text-foreground/70">Uptime</div>
          </div>
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-cyber-primary mb-2">24/7</div>
            <div className="text-sm text-foreground/70">Monitoring</div>
          </div>
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-cyber-secondary mb-2">0</div>
            <div className="text-sm text-foreground/70">Security Breaches</div>
          </div>
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-cyber-accent mb-2">1000+</div>
            <div className="text-sm text-foreground/70">Threats Blocked</div>
          </div>
        </div>
      </div>

      {/* Theme Comparison */}
      <div className="cyber-card">
        <h3 className="text-2xl font-cyber font-bold mb-6 flex items-center">
          <Globe className="h-6 w-6 mr-3 text-cyber-primary" />
          <span className="text-foreground">2025 vs Traditional Themes</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Traditional (2020-2024)</h4>
            <div className="p-4 bg-cyber-light rounded-lg border border-cyber-primary/20">
              <p className="text-sm text-foreground/70">
                • Dark grey backgrounds<br/>
                • Bright neon colors<br/>
                • Simple borders<br/>
                • Basic hover effects<br/>
                • Limited glass effects
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-foreground">2025 Modern Theme</h4>
            <div className="p-4 bg-cyber-primary/10 rounded-lg border border-cyber-primary/30">
              <p className="text-sm text-cyber-primary">
                • Deep navy backgrounds<br/>
                • Sophisticated color palette<br/>
                • Glass morphism effects<br/>
                • Advanced animations<br/>
                • Professional aesthetics
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cyber2025Theme 