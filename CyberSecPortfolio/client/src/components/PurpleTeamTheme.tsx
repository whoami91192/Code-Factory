import { 
  Palette, 
  Sparkles, 
  Shield, 
  Zap, 
  Eye, 
  Lock,
  Unlock,
  Network,
  Code,
  Database,
  Globe,
  Smartphone
} from 'lucide-react'

const PurpleTeamTheme = () => {
  const colorPalette = [
    { name: 'Primary Purple', hex: '#6A0DAD', class: 'bg-purple-primary' },
    { name: 'Secondary Purple', hex: '#8B2FD9', class: 'bg-purple-secondary' },
    { name: 'Purple Accent', hex: '#A85AFF', class: 'bg-purple-accent' },
    { name: 'Dark Purple', hex: '#4A0A7A', class: 'bg-purple-dark' },
    { name: 'Darker Purple', hex: '#2A0645', class: 'bg-purple-darker' },
    { name: 'Light Purple', hex: '#C084FF', class: 'bg-purple-light' },
  ]

  const supportingColors = [
    { name: 'Emerald Green', hex: '#10B981', class: 'bg-cyber-green' },
    { name: 'Amber', hex: '#F59E0B', class: 'bg-cyber-yellow' },
    { name: 'Red', hex: '#EF4444', class: 'bg-cyber-red' },
    { name: 'Blue', hex: '#3B82F6', class: 'bg-cyber-blue' },
    { name: 'Orange', hex: '#F97316', class: 'bg-cyber-orange' },
  ]

  const designElements = [
    {
      title: 'Gradient Backgrounds',
      description: 'Smooth purple gradients for depth and visual appeal',
      icon: Palette,
      gradient: 'bg-gradient-to-r from-purple-primary via-purple-secondary to-purple-accent'
    },
    {
      title: 'Glow Effects',
      description: 'Purple glow effects for interactive elements',
      icon: Sparkles,
      gradient: 'bg-purple-primary glow-purple'
    },
    {
      title: 'Glass Morphism',
      description: 'Frosted glass effect with purple tints',
      icon: Eye,
      gradient: 'bg-purple-primary/20 backdrop-blur-md border border-purple-primary/30'
    },
    {
      title: 'Neon Borders',
      description: 'Luminous purple borders for cards and components',
      icon: Shield,
      gradient: 'border-2 border-purple-primary shadow-lg shadow-purple-primary/50'
    }
  ]

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-cyber font-bold mb-4">
          Purple <span className="text-purple-primary">Team</span> Theme
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Professional cybersecurity aesthetic with sophisticated purple color palette, 
          inspired by Purple Team methodology and advanced security practices.
        </p>
      </div>

      {/* Color Palette */}
      <div className="cyber-card">
        <h3 className="text-2xl font-cyber font-bold mb-6 flex items-center">
          <Palette className="h-6 w-6 mr-3 text-purple-primary" />
          Purple Team Color Palette
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {colorPalette.map((color) => (
            <div key={color.name} className="space-y-3">
              <div className={`w-full h-20 rounded-lg ${color.class} border border-purple-primary/30`} />
              <div>
                <h4 className="font-medium text-sm">{color.name}</h4>
                <p className="text-xs text-muted-foreground font-mono">{color.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supporting Colors */}
      <div className="cyber-card">
        <h3 className="text-2xl font-cyber font-bold mb-6 flex items-center">
          <Zap className="h-6 w-6 mr-3 text-purple-primary" />
          Supporting Colors
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {supportingColors.map((color) => (
            <div key={color.name} className="space-y-2">
              <div className={`w-full h-16 rounded-lg ${color.class} border border-purple-primary/30`} />
              <div>
                <h4 className="font-medium text-xs">{color.name}</h4>
                <p className="text-xs text-muted-foreground font-mono">{color.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Design Elements */}
      <div className="cyber-card">
        <h3 className="text-2xl font-cyber font-bold mb-6 flex items-center">
          <Sparkles className="h-6 w-6 mr-3 text-purple-primary" />
          Design Elements
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {designElements.map((element) => (
            <div key={element.title} className="space-y-4">
              <div className="flex items-center space-x-3">
                <element.icon className="h-5 w-5 text-purple-primary" />
                <h4 className="font-medium">{element.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground">{element.description}</p>
              <div className={`w-full h-16 rounded-lg ${element.gradient} flex items-center justify-center`}>
                <span className="text-xs font-mono text-white">Preview</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Theme Features */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="cyber-card">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-6 w-6 text-purple-primary" />
            <h3 className="text-lg font-bold">Professional Aesthetic</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Sophisticated purple theme that conveys expertise and professionalism 
            in cybersecurity, perfect for Purple Team methodology.
          </p>
        </div>

        <div className="cyber-card">
          <div className="flex items-center space-x-3 mb-4">
            <Eye className="h-6 w-6 text-purple-primary" />
            <h3 className="text-lg font-bold">Enhanced Readability</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Optimized contrast ratios and carefully chosen colors ensure 
            excellent readability across all devices and lighting conditions.
          </p>
        </div>

        <div className="cyber-card">
          <div className="flex items-center space-x-3 mb-4">
            <Code className="h-6 w-6 text-purple-primary" />
            <h3 className="text-lg font-bold">Modern Design</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Contemporary design elements with glass morphism, gradients, 
            and subtle animations for a cutting-edge user experience.
          </p>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="cyber-card">
        <h3 className="text-2xl font-cyber font-bold mb-6 flex items-center">
          <Network className="h-6 w-6 mr-3 text-purple-primary" />
          Interactive Theme Demo
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium">Buttons</h4>
            <div className="space-y-3">
              <button className="cyber-button w-full">
                Primary Button
              </button>
              <button className="cyber-button-outline w-full">
                Outline Button
              </button>
              <button className="bg-gradient-to-r from-purple-primary to-purple-secondary text-white px-6 py-3 rounded-lg font-cyber font-bold transition-all duration-300 hover:shadow-lg hover:shadow-purple-primary/50">
                Gradient Button
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Form Elements</h4>
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
                <span className="text-sm">Purple Team Option</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purple Team Methodology */}
      <div className="cyber-card">
        <h3 className="text-2xl font-cyber font-bold mb-6 flex items-center">
          <Lock className="h-6 w-6 mr-3 text-purple-primary" />
          Purple Team Methodology
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-red-500/20 border border-red-500 rounded-full flex items-center justify-center mx-auto">
              <Shield className="h-8 w-8 text-red-500" />
            </div>
            <h4 className="font-bold">Red Team</h4>
            <p className="text-sm text-muted-foreground">
              Offensive security testing and attack simulation
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-blue-500/20 border border-blue-500 rounded-full flex items-center justify-center mx-auto">
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
            <h4 className="font-bold">Blue Team</h4>
            <p className="text-sm text-muted-foreground">
              Defensive security and incident response
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-purple-primary/20 border border-purple-primary rounded-full flex items-center justify-center mx-auto">
              <Shield className="h-8 w-8 text-purple-primary" />
            </div>
            <h4 className="font-bold">Purple Team</h4>
            <p className="text-sm text-muted-foreground">
              Collaborative security testing and improvement
            </p>
          </div>
        </div>

        <div className="mt-8 p-4 bg-purple-primary/10 border border-purple-primary/30 rounded-lg">
          <p className="text-sm text-center">
            <strong>Purple Team</strong> methodology combines offensive and defensive security practices 
            to create a comprehensive security testing approach. This theme reflects the 
            collaborative and sophisticated nature of modern cybersecurity.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PurpleTeamTheme 