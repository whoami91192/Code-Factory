import { useState, Suspense, lazy } from 'react'

// Lazy load heavy components
const SecurityDashboard = lazy(() => import('../components/SecurityDashboard'))
const InteractiveTerminal = lazy(() => import('../components/InteractiveTerminal'))
const AdvancedSecurityTools = lazy(() => import('../components/AdvancedSecurityTools'))
const NetworkTopology3D = lazy(() => import('../components/NetworkTopology3D'))
const LiveThreatMap = lazy(() => import('../components/LiveThreatMap'))
const MalwareAnalysisChart = lazy(() => import('../components/MalwareAnalysisChart'))
const SecurityChallenges = lazy(() => import('../components/SecurityChallenges'))
const MobileSecurityApp = lazy(() => import('../components/MobileSecurityApp'))
const VirtualSOC = lazy(() => import('../components/VirtualSOC'))
const SecurityEscapeRoom = lazy(() => import('../components/SecurityEscapeRoom'))
const AISecurityAssistant = lazy(() => import('../components/AISecurityAssistant'))
const PWAFeatures = lazy(() => import('../components/PWAFeatures'))

// Loading component for lazy-loaded tools
const ToolLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyber-green mx-auto mb-2"></div>
      <p className="text-muted-foreground text-sm">Loading tool...</p>
    </div>
  </div>
)

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
        return (
          <Suspense fallback={<ToolLoader />}>
            <SecurityDashboard />
          </Suspense>
        )
      case 'terminal':
        return (
          <Suspense fallback={<ToolLoader />}>
            <InteractiveTerminal />
          </Suspense>
        )
      case 'tools':
        return (
          <Suspense fallback={<ToolLoader />}>
            <AdvancedSecurityTools />
          </Suspense>
        )
      case 'network3d':
        return (
          <Suspense fallback={<ToolLoader />}>
            <NetworkTopology3D />
          </Suspense>
        )
      case 'attackmap':
        return (
          <Suspense fallback={<ToolLoader />}>
            <LiveThreatMap />
          </Suspense>
        )
      case 'malware':
        return (
          <Suspense fallback={<ToolLoader />}>
            <MalwareAnalysisChart />
          </Suspense>
        )
      case 'challenges':
        return (
          <Suspense fallback={<ToolLoader />}>
            <SecurityChallenges />
          </Suspense>
        )
      case 'mobile':
        return (
          <Suspense fallback={<ToolLoader />}>
            <MobileSecurityApp />
          </Suspense>
        )
      case 'virtualsoc':
        return (
          <Suspense fallback={<ToolLoader />}>
            <VirtualSOC />
          </Suspense>
        )
      case 'escaperoom':
        return (
          <Suspense fallback={<ToolLoader />}>
            <SecurityEscapeRoom />
          </Suspense>
        )
      case 'aiassistant':
        return (
          <Suspense fallback={<ToolLoader />}>
            <AISecurityAssistant />
          </Suspense>
        )
      case 'pwa':
        return (
          <Suspense fallback={<ToolLoader />}>
            <PWAFeatures />
          </Suspense>
        )
      default:
        return (
          <Suspense fallback={<ToolLoader />}>
            <SecurityDashboard />
          </Suspense>
        )
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cyber-green mb-4">Security Tools</h1>
        <p className="text-muted-foreground">
          Explore our comprehensive suite of cybersecurity tools and interactive features.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-cyber-green text-cyber-dark shadow-lg'
                : 'bg-cyber-card text-muted-foreground hover:bg-cyber-light hover:text-cyber-green'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-cyber-card rounded-lg p-6 min-h-[600px]">
        {renderContent()}
      </div>
    </div>
  )
}

export default Tools

