import { useState } from 'react'
import SecurityDashboard from '../components/SecurityDashboard'
import InteractiveTerminal from '../components/InteractiveTerminal'
import AdvancedSecurityTools from '../components/AdvancedSecurityTools'
import NetworkTopology3D from '../components/NetworkTopology3D'
import LiveThreatMap from '../components/LiveThreatMap'
import MalwareAnalysisChart from '../components/MalwareAnalysisChart'
import SecurityChallenges from '../components/SecurityChallenges'
import MobileSecurityApp from '../components/MobileSecurityApp'
import VirtualSOC from '../components/VirtualSOC'
import SecurityEscapeRoom from '../components/SecurityEscapeRoom'
import AISecurityAssistant from '../components/AISecurityAssistant'
import PWAFeatures from '../components/PWAFeatures'


const Tools = () => {
  const [activeTab, setActiveTab] = useState('dashboard')

  const tabs = [
    { id: 'dashboard', name: 'Security Dashboard', icon: '📊' },
    { id: 'terminal', name: 'Interactive Terminal', icon: '💻' },
    { id: 'tools', name: 'Security Tools', icon: '🔧' },
    { id: 'network3d', name: '3D Network Map', icon: '🌐' },
    { id: 'attackmap', name: 'Global Attack Map', icon: '🗺️' },
    { id: 'malware', name: 'Malware Analysis', icon: '🦠' },
    { id: 'challenges', name: 'Security Challenges', icon: '🎯' },
    { id: 'mobile', name: 'Mobile Security', icon: '📱' },
    { id: 'virtualsoc', name: 'Virtual SOC', icon: '🏢' },
    { id: 'escaperoom', name: 'Escape Room', icon: '🚪' },
    { id: 'aiassistant', name: 'AI Assistant', icon: '🤖' },
    { id: 'pwa', name: 'PWA Features', icon: '📱' },

  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <SecurityDashboard />
      case 'terminal':
        return <InteractiveTerminal />
      case 'tools':
        return <AdvancedSecurityTools />
      case 'network3d':
        return <NetworkTopology3D />
      case 'attackmap':
        return <LiveThreatMap />
      case 'malware':
        return <MalwareAnalysisChart />
      case 'challenges':
        return <SecurityChallenges />
      case 'mobile':
        return <MobileSecurityApp />
      case 'virtualsoc':
        return <VirtualSOC />
      case 'escaperoom':
        return <SecurityEscapeRoom />
      case 'aiassistant':
        return <AISecurityAssistant />
      case 'pwa':
        return <PWAFeatures />

      default:
        return <SecurityDashboard />
    }
  }

  return (
    <div className="min-h-screen py-20 liquid-metal-glow">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-cyber font-bold mb-6">
            Security <span className="text-cyber-secondary">Tools</span>
          </h1>
          <p className="text-xl text-white/90 drop-shadow max-w-3xl mx-auto">
            Explore our comprehensive suite of cybersecurity tools, interactive simulations, 
            and learning resources designed to enhance your security expertise.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 magnetic-attraction target-lock ${
                  activeTab === tab.id
                    ? 'bg-cyber-primary text-background shadow-lg'
                    : 'bg-cyber-card text-white/90 hover:text-white hover:bg-cyber-light border border-cyber-primary/40 drop-shadow'
                }`}
              >
                <span className="mr-2 glow-text">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default Tools 