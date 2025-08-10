import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { getDeviceCapabilities, getPerformanceFlags } from '../utils/mobile-performance'
import { Network, Shield, AlertTriangle, CheckCircle, XCircle, Eye, Zap } from 'lucide-react'

// Lazy load the heavy 3D component
const NetworkTopology3D = lazy(() => import('./NetworkTopology3D'))

interface NetworkNode {
  id: string
  name: string
  type: 'router' | 'server' | 'workstation' | 'firewall' | 'ids'
  status: 'secure' | 'warning' | 'compromised' | 'offline'
  ip: string
  services: string[]
  threats: number
}

// Simplified 2D fallback for mobile
const NetworkTopology2D = () => {
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null)

  const networkData: NetworkNode[] = [
    {
      id: 'router-1',
      name: 'Main Router',
      type: 'router',
      status: 'secure',
      ip: '192.168.1.1',
      services: ['DHCP', 'DNS', 'NAT'],
      threats: 0
    },
    {
      id: 'firewall-1',
      name: 'Perimeter Firewall',
      type: 'firewall',
      status: 'secure',
      ip: '192.168.1.10',
      services: ['IPS', 'VPN', 'Load Balancer'],
      threats: 0
    },
    {
      id: 'ids-1',
      name: 'Intrusion Detection',
      type: 'ids',
      status: 'warning',
      ip: '192.168.1.20',
      services: ['IDS', 'Log Analysis'],
      threats: 3
    },
    {
      id: 'server-1',
      name: 'Web Server',
      type: 'server',
      status: 'secure',
      ip: '192.168.1.100',
      services: ['HTTP', 'HTTPS', 'SSH'],
      threats: 0
    },
    {
      id: 'server-2',
      name: 'Database Server',
      type: 'server',
      status: 'compromised',
      ip: '192.168.1.101',
      services: ['MySQL', 'PostgreSQL'],
      threats: 5
    },
    {
      id: 'workstation-1',
      name: 'Admin Workstation',
      type: 'workstation',
      status: 'secure',
      ip: '192.168.1.200',
      services: ['RDP', 'SSH'],
      threats: 0
    },
    {
      id: 'workstation-2',
      name: 'User Workstation',
      type: 'workstation',
      status: 'offline',
      ip: '192.168.1.201',
      services: ['RDP'],
      threats: 0
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'secure': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'compromised': return <XCircle className="w-4 h-4 text-red-500" />
      case 'offline': return <XCircle className="w-4 h-4 text-gray-500" />
      default: return <CheckCircle className="w-4 h-4 text-green-500" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'router': return <Network className="w-4 h-4" />
      case 'firewall': return <Shield className="w-4 h-4" />
      case 'ids': return <Eye className="w-4 h-4" />
      case 'server': return <Zap className="w-4 h-4" />
      case 'workstation': return <Zap className="w-4 h-4" />
      default: return <Network className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secure': return 'border-green-500 bg-green-50'
      case 'warning': return 'border-yellow-500 bg-yellow-50'
      case 'compromised': return 'border-red-500 bg-red-50'
      case 'offline': return 'border-gray-500 bg-gray-50'
      default: return 'border-green-500 bg-green-50'
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Network Topology Overview</h2>
        <p className="text-muted-foreground">Simplified 2D view for mobile devices</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {networkData.map((node) => (
          <div
            key={node.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${getStatusColor(node.status)} ${
              selectedNode?.id === node.id ? 'ring-2 ring-cyber-green ring-opacity-50' : ''
            }`}
            onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getTypeIcon(node.type)}
                <span className="font-semibold text-sm">{node.name}</span>
              </div>
              {getStatusIcon(node.status)}
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">IP:</span>
                <span className="font-mono">{node.ip}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Threats:</span>
                <span className={node.threats > 0 ? 'text-red-600 font-semibold' : 'text-green-600'}>
                  {node.threats}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground text-xs">Services:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {node.services.map((service, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-background rounded text-xs border"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedNode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{selectedNode.name}</h3>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-muted-foreground">Type:</span>
                <span className="ml-2 capitalize">{selectedNode.type}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <span className="ml-2 capitalize">{selectedNode.status}</span>
              </div>
              <div>
                <span className="text-muted-foreground">IP Address:</span>
                <span className="ml-2 font-mono">{selectedNode.ip}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Active Threats:</span>
                <span className={`ml-2 ${selectedNode.threats > 0 ? 'text-red-600 font-semibold' : 'text-green-600'}`}>
                  {selectedNode.threats}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Services:</span>
                <div className="mt-2 space-y-1">
                  {selectedNode.services.map((service, index) => (
                    <div key={index} className="px-3 py-2 bg-muted rounded text-sm">
                      {service}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Main component that decides which version to render
const MobileOptimizedNetworkTopology3D = () => {
  const { performanceFlags } = getPerformanceFlags()

  // Show 2D version on mobile or when heavy effects are disabled
  if (!performanceFlags.enableHeavyEffects) {
    return <NetworkTopology2D />
  }

  // Show 3D version on desktop with heavy effects enabled
  return (
    <Suspense fallback={
      <div className="w-full h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-green mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading 3D Network Topology...</p>
        </div>
      </div>
    }>
      <NetworkTopology3D />
    </Suspense>
  )
}

export default MobileOptimizedNetworkTopology3D
