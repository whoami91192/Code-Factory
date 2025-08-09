import { useState, useEffect } from 'react'
import { 
  Shield, 
  Activity, 
  AlertTriangle, 
  Wifi, 
  Server, 
  Clock,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle
} from 'lucide-react'

interface SecurityMetric {
  id: string
  name: string
  value: number
  unit: string
  status: 'good' | 'warning' | 'critical'
  trend: 'up' | 'down' | 'stable'
  icon: any
}

interface ThreatAlert {
  id: string
  type: 'info' | 'warning' | 'critical'
  message: string
  timestamp: string
  source: string
}

const SecurityDashboard = () => {
  const [metrics, setMetrics] = useState<SecurityMetric[]>([
    {
      id: 'uptime',
      name: 'System Uptime',
      value: 99.8,
      unit: '%',
      status: 'good',
      trend: 'stable',
      icon: Clock
    },
    {
      id: 'threats',
      name: 'Active Threats',
      value: 3,
      unit: '',
      status: 'warning',
      trend: 'up',
      icon: AlertTriangle
    },
    {
      id: 'connections',
      name: 'Active Connections',
      value: 127,
      unit: '',
      status: 'good',
      trend: 'up',
      icon: Wifi
    },
    {
      id: 'cpu',
      name: 'CPU Usage',
      value: 45,
      unit: '%',
      status: 'good',
      trend: 'down',
      icon: Activity
    },
    {
      id: 'memory',
      name: 'Memory Usage',
      value: 78,
      unit: '%',
      status: 'warning',
      trend: 'up',
      icon: Server
    },
    {
      id: 'security',
      name: 'Security Score',
      value: 92,
      unit: '/100',
      status: 'good',
      trend: 'up',
      icon: Shield
    }
  ])

  const [alerts, setAlerts] = useState<ThreatAlert[]>([
    {
      id: '1',
      type: 'warning',
      message: 'Multiple failed login attempts detected',
      timestamp: '2 minutes ago',
      source: '192.168.1.100'
    },
    {
      id: '2',
      type: 'info',
      message: 'System backup completed successfully',
      timestamp: '15 minutes ago',
      source: 'Backup System'
    },
    {
      id: '3',
      type: 'critical',
      message: 'Suspicious network activity detected',
      timestamp: '1 hour ago',
      source: 'Network Monitor'
    }
  ])

  const [isConnected, setIsConnected] = useState(true)

  // Simulate real-time updates with throttling
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.id === 'uptime' 
          ? Math.max(99.5, metric.value + (Math.random() - 0.5) * 0.05) // Reduced change
          : metric.id === 'connections'
          ? Math.max(100, Math.min(200, metric.value + (Math.random() - 0.5) * 5)) // Reduced change
          : metric.id === 'cpu'
          ? Math.max(20, Math.min(80, metric.value + (Math.random() - 0.5) * 2)) // Reduced change
          : metric.id === 'memory'
          ? Math.max(60, Math.min(90, metric.value + (Math.random() - 0.5) * 1.5)) // Reduced change
          : metric.value
      })))
    }, 5000) // Increased from 3000ms to 5000ms for better performance

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-cyber-green'
      case 'warning': return 'text-cyber-yellow'
      case 'critical': return 'text-cyber-red'
      default: return 'text-muted-foreground'
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'info': return 'border-cyber-blue/30 bg-cyber-blue/10'
      case 'warning': return 'border-cyber-yellow/30 bg-cyber-yellow/10'
      case 'critical': return 'border-cyber-red/30 bg-cyber-red/10'
      default: return 'border-muted'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'info': return <CheckCircle className="h-4 w-4 text-cyber-blue" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-cyber-yellow" />
      case 'critical': return <XCircle className="h-4 w-4 text-cyber-red" />
      default: return <CheckCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-cyber font-bold">
          Security <span className="text-cyber-green">Dashboard</span>
        </h2>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-cyber-green' : 'bg-cyber-red'}`} />
          <span className="text-sm text-white/90 drop-shadow">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div key={metric.id} className="cyber-card-magnetic text-center target-lock">
            <div className="flex items-center justify-center mb-4">
              <metric.icon className="h-10 w-10 text-white glow-text drop-shadow-lg" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-bold text-white drop-shadow">{metric.name}</p>
              <p className="text-3xl font-extrabold text-cyber-primary drop-shadow">
                {metric.value.toFixed(metric.id === 'uptime' ? 1 : 0)}{metric.unit}
              </p>
              {/* Progress bar for percentage metrics */}
              {(metric.id === 'cpu' || metric.id === 'memory' || metric.id === 'security') && (
                <div className="w-full bg-cyber-light rounded-full h-3 border border-cyber-primary/40 mt-2">
                  <div 
                    className="h-3 rounded-full bg-cyber-primary neon-blue transition-all duration-500 shadow-lg"
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Alerts Section */}
      <div className="cyber-card">
        <h3 className="text-lg font-bold mb-4">Recent Alerts</h3>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-4 rounded-md border ${getAlertColor(alert.type)}`}
            >
              <div className="flex items-start space-x-3">
                <div className="glow-text">{getAlertIcon(alert.type)}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white drop-shadow">{alert.message}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-white/90 drop-shadow">{alert.timestamp}</span>
                    <span className="text-xs text-white/90 drop-shadow">Source: {alert.source}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Network Activity Graph */}
      <div className="cyber-card">
        <h3 className="text-lg font-bold mb-4">Network Activity</h3>
        <div className="h-32 bg-gray-900 rounded-md p-4 border border-cyber-primary">
          <div className="flex items-end justify-between h-full space-x-1">
            {Array.from({ length: 24 }, (_, i) => (
              <div
                key={i}
                className="flex-1 bg-cyber-green rounded-t transition-all duration-300 hover:bg-cyber-secondary"
                style={{ 
                  height: `${Math.random() * 60 + 20}%`,
                  animationDelay: `${i * 100}ms`,
                  minHeight: '4px'
                }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-white/90 drop-shadow mt-2">
            <span>00:00</span>
            <span>12:00</span>
            <span>24:00</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecurityDashboard 