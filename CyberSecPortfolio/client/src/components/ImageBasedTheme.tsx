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
  Palette
} from 'lucide-react'

const ImageBasedTheme = () => {
  const themeColors = [
    { name: 'Pure Black Background', hex: '#000000', class: 'bg-cyber-dark' },
    { name: 'Deep Purple Primary', hex: '#6A0DAD', class: 'bg-purple-primary' },
    { name: 'Bright Green Text', hex: '#00FF00', class: 'bg-cyber-green' },
    { name: 'Dark Black Cards', hex: '#0D0D0D', class: 'bg-cyber-light' },
    { name: 'Very Dark Black', hex: '#000000', class: 'bg-cyber-darker' },
  ]

  const securityElements = [
    {
      title: 'Hooded Figure',
      description: 'Anonymous cybersecurity professional',
      icon: Users,
      color: 'text-purple-primary'
    },
    {
      title: 'Binary Code',
      description: 'Digital security patterns',
      icon: Binary,
      color: 'text-cyber-green'
    },
    {
      title: 'Lock Symbol',
      description: 'Security and encryption',
      icon: Lock,
      color: 'text-purple-primary'
    },
    {
      title: 'Shield Protection',
      description: 'Defensive security measures',
      icon: Shield,
      color: 'text-purple-primary'
    }
  ]

  const designFeatures = [
    {
      title: 'High Contrast',
      description: 'Bright green text on pure black for maximum readability',
      feature: 'Excellent visibility and professional appearance'
    },
    {
      title: 'Minimalist Design',
      description: 'Clean lines and geometric patterns',
      feature: 'Modern cybersecurity aesthetic'
    },
    {
      title: 'Bright Accents',
      description: 'Bright green for important elements',
      feature: 'Clear hierarchy and focus points'
    },
    {
      title: 'Purple Dominance',
      description: 'Deep purple as primary brand color',
      feature: 'Strong Purple Team identity'
    }
  ]

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-cyber font-bold mb-4">
          <span className="text-cyber-green">PURPLE</span> <span className="text-purple-primary">TEAM</span>
        </h2>
        <div className="w-32 h-1 bg-cyber-green mx-auto mb-4"></div>
        <p className="text-xl text-cyber-green/80 max-w-3xl mx-auto">
          Professional cybersecurity theme inspired by Purple Team methodology. 
          Pure black background with deep purple accents and bright green text for maximum readability.
        </p>
      </div>

      {/* Theme Colors */}
      <div className="cyber-card">
        <h3 className="text-2xl font-cyber font-bold mb-6 flex items-center">
          <Palette className="h-6 w-6 mr-3 text-purple-primary" />
          <span className="text-cyber-green">Theme Color Palette</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {themeColors.map((color) => (
            <div key={color.name} className="space-y-3">
              <div className={`w-full h-20 rounded-lg ${color.class} border border-purple-primary/30 flex items-center justify-center`}>
                <span className="text-xs font-mono text-cyber-green bg-black/20 px-2 py-1 rounded">
                  {color.hex}
                </span>
              </div>
              <div>
                <h4 className="font-medium text-sm text-cyber-green">{color.name}</h4>
                <p className="text-xs text-cyber-green/60 font-mono">{color.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Elements */}
      <div className="cyber-card">
        <h3 className="text-2xl font-cyber font-bold mb-6 flex items-center">
          <Shield className="h-6 w-6 mr-3 text-purple-primary" />
          <span className="text-cyber-green">Security Elements</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityElements.map((element) => (
            <div key={element.title} className="flex items-center space-x-4 p-4 bg-cyber-dark rounded-lg border border-purple-primary/20">
              <div className={`p-3 rounded-lg bg-purple-primary/10 ${element.color}`}>
                <element.icon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-medium text-cyber-green">{element.title}</h4>
                <p className="text-sm text-cyber-green/70">{element.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Design Features */}
      <div className="cyber-card">
        <h3 className="text-2xl font-cyber font-bold mb-6 flex items-center">
          <Eye className="h-6 w-6 mr-3 text-purple-primary" />
          <span className="text-cyber-green">Design Features</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {designFeatures.map((feature) => (
            <div key={feature.title} className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-primary rounded-full"></div>
                <h4 className="font-medium text-cyber-green">{feature.title}</h4>
              </div>
              <p className="text-sm text-cyber-green/70">{feature.description}</p>
              <div className="p-3 bg-cyber-dark rounded border border-purple-primary/20">
                <p className="text-xs text-purple-primary font-mono">{feature.feature}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="cyber-card">
        <h3 className="text-2xl font-cyber font-bold mb-6 flex items-center">
          <Code className="h-6 w-6 mr-3 text-purple-primary" />
          <span className="text-cyber-green">Interactive Theme Demo</span>
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-medium text-cyber-green">Buttons & Controls</h4>
            <div className="space-y-3">
              <button className="cyber-button w-full">
                <span className="text-cyber-green">Primary Button</span>
              </button>
              <button className="cyber-button-outline w-full">
                <span className="text-cyber-green">Outline Button</span>
              </button>
              <button className="bg-purple-primary text-cyber-green px-6 py-3 rounded-lg font-cyber font-bold transition-all duration-300 hover:shadow-lg hover:shadow-purple-primary/50 w-full">
                Solid Purple Button
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-cyber-green">Form Elements</h4>
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Enter text..." 
                className="cyber-input w-full"
              />
              <textarea 
                placeholder="Enter description..." 
                className="cyber-textarea w-full h-20"
              />
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 text-purple-primary bg-cyber-dark border-purple-primary rounded focus:ring-purple-primary" />
                <span className="text-sm text-cyber-green">Purple Team Option</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purple Team Methodology */}
      <div className="cyber-card">
        <h3 className="text-2xl font-cyber font-bold mb-6 flex items-center">
          <Target className="h-6 w-6 mr-3 text-purple-primary" />
          <span className="text-cyber-green">Purple Team Methodology</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-red-500/20 border border-red-500 rounded-full flex items-center justify-center mx-auto">
              <Shield className="h-8 w-8 text-red-500" />
            </div>
            <h4 className="font-bold text-cyber-green">Red Team</h4>
            <p className="text-sm text-cyber-green/70">
              Offensive security testing and attack simulation
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-blue-500/20 border border-blue-500 rounded-full flex items-center justify-center mx-auto">
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
            <h4 className="font-bold text-cyber-green">Blue Team</h4>
            <p className="text-sm text-cyber-green/70">
              Defensive security and incident response
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-purple-primary/20 border border-purple-primary rounded-full flex items-center justify-center mx-auto">
              <Shield className="h-8 w-8 text-purple-primary" />
            </div>
            <h4 className="font-bold text-cyber-green">Purple Team</h4>
            <p className="text-sm text-cyber-green/70">
              Collaborative security testing and improvement
            </p>
          </div>
        </div>

        <div className="p-6 bg-purple-primary/10 border border-purple-primary/30 rounded-lg">
          <p className="text-sm text-center text-cyber-green">
            <strong className="text-purple-primary">Purple Team</strong> methodology combines offensive and defensive security practices 
            to create a comprehensive security testing approach. This theme reflects the 
            collaborative and sophisticated nature of modern cybersecurity with its deep purple 
            color representing the fusion of Red and Blue Team approaches.
          </p>
        </div>
      </div>

      {/* Theme Comparison */}
      <div className="cyber-card">
        <h3 className="text-2xl font-cyber font-bold mb-6 flex items-center">
          <Monitor className="h-6 w-6 mr-3 text-purple-primary" />
          <span className="text-cyber-green">Theme Comparison</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-cyber-green">Before (Previous Theme)</h4>
            <div className="p-4 bg-cyan-900/20 border border-cyan-500/30 rounded-lg">
              <p className="text-sm text-cyan-300">
                • Bright cyan/green colors<br/>
                • Very dark backgrounds<br/>
                • High contrast neon effects<br/>
                • More aggressive cyberpunk style
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-cyber-green">After (Pure Black Theme)</h4>
            <div className="p-4 bg-purple-primary/20 border border-purple-primary/30 rounded-lg">
              <p className="text-sm text-purple-primary">
                • Deep purple (#6A0DAD) primary color<br/>
                • Pure black (#000000) background<br/>
                • Bright green (#00FF00) text for clarity<br/>
                • Professional, sophisticated appearance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageBasedTheme 