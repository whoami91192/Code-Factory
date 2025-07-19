import { useState, useEffect, useRef } from 'react'
import { 
  Smartphone, 
  QrCode, 
  Scan, 
  Network, 
  Shield, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  Wifi,
  Lock,
  Unlock,
  Eye,
  Zap,
  Settings,
  Home,
  BarChart3,
  Camera,
  FileText,
  Database,
  Globe,
  Key,
  Fingerprint,
  Smartphone as PhoneIcon
} from 'lucide-react'

interface NetworkDevice {
  id: string
  name: string
  mac: string
  ip: string
  type: 'router' | 'phone' | 'laptop' | 'iot' | 'unknown'
  security: 'open' | 'wep' | 'wpa' | 'wpa2' | 'wpa3'
  signal: number
  connected: boolean
  threats: string[]
}

interface SecurityCheck {
  id: string
  title: string
  description: string
  category: 'network' | 'device' | 'app' | 'data'
  status: 'pass' | 'fail' | 'warning' | 'pending'
  priority: 'low' | 'medium' | 'high' | 'critical'
  recommendation: string
}

interface AppScan {
  id: string
  name: string
  package: string
  version: string
  permissions: string[]
  risks: string[]
  score: number
  status: 'safe' | 'warning' | 'dangerous'
}

const MobileSecurityApp = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'scanner' | 'network' | 'checklist' | 'apps' | 'settings'>('home')
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<string>('')
  const [networkDevices, setNetworkDevices] = useState<NetworkDevice[]>([])
  const [securityChecks, setSecurityChecks] = useState<SecurityCheck[]>([])
  const [appScans, setAppScans] = useState<AppScan[]>([])
  const [deviceStatus, setDeviceStatus] = useState({
    battery: 78,
    storage: 64,
    memory: 45,
    temperature: 32,
    lastScan: new Date(Date.now() - 3600000)
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Generate sample network devices
  const generateNetworkDevices = (): NetworkDevice[] => [
    {
      id: 'router-1',
      name: 'Home Router',
      mac: 'AA:BB:CC:DD:EE:FF',
      ip: '192.168.1.1',
      type: 'router',
      security: 'wpa2',
      signal: 95,
      connected: true,
      threats: []
    },
    {
      id: 'phone-1',
      name: 'iPhone 13',
      mac: '11:22:33:44:55:66',
      ip: '192.168.1.100',
      type: 'phone',
      security: 'wpa2',
      signal: 85,
      connected: true,
      threats: []
    },
    {
      id: 'laptop-1',
      name: 'MacBook Pro',
      mac: 'AA:11:BB:22:CC:33',
      ip: '192.168.1.101',
      type: 'laptop',
      security: 'wpa2',
      signal: 90,
      connected: true,
      threats: []
    },
    {
      id: 'iot-1',
      name: 'Smart TV',
      mac: 'DD:44:EE:55:FF:66',
      ip: '192.168.1.102',
      type: 'iot',
      security: 'wpa2',
      signal: 70,
      connected: true,
      threats: ['Weak password', 'Outdated firmware']
    },
    {
      id: 'unknown-1',
      name: 'Unknown Device',
      mac: '77:88:99:AA:BB:CC',
      ip: '192.168.1.103',
      type: 'unknown',
      security: 'open',
      signal: 60,
      connected: false,
      threats: ['Unsecured connection', 'Unknown device']
    }
  ]

  // Generate security checks
  const generateSecurityChecks = (): SecurityCheck[] => [
    {
      id: 'wifi-security',
      title: 'WiFi Security',
      description: 'Check if connected to a secure WiFi network',
      category: 'network',
      status: 'pass',
      priority: 'high',
      recommendation: 'Connected to WPA2 secured network'
    },
    {
      id: 'device-encryption',
      title: 'Device Encryption',
      description: 'Verify device storage is encrypted',
      category: 'device',
      status: 'pass',
      priority: 'critical',
      recommendation: 'Device encryption is enabled'
    },
    {
      id: 'app-permissions',
      title: 'App Permissions',
      description: 'Review app permissions for security',
      category: 'app',
      status: 'warning',
      priority: 'medium',
      recommendation: '3 apps have excessive permissions'
    },
    {
      id: 'vpn-status',
      title: 'VPN Status',
      description: 'Check if VPN is active for privacy',
      category: 'network',
      status: 'fail',
      priority: 'high',
      recommendation: 'Enable VPN for secure browsing'
    },
    {
      id: 'biometric-auth',
      title: 'Biometric Authentication',
      description: 'Verify biometric authentication is enabled',
      category: 'device',
      status: 'pass',
      priority: 'high',
      recommendation: 'Face ID is enabled'
    },
    {
      id: 'auto-updates',
      title: 'Auto Updates',
      description: 'Check if automatic updates are enabled',
      category: 'device',
      status: 'warning',
      priority: 'medium',
      recommendation: 'Enable automatic security updates'
    }
  ]

  // Generate app scans
  const generateAppScans = (): AppScan[] => [
    {
      id: 'app-1',
      name: 'Facebook',
      package: 'com.facebook.katana',
      version: '398.0.0.28.119',
      permissions: ['Camera', 'Location', 'Contacts', 'Microphone'],
      risks: ['Data collection', 'Third-party tracking'],
      score: 65,
      status: 'warning'
    },
    {
      id: 'app-2',
      name: 'WhatsApp',
      package: 'com.whatsapp',
      version: '2.23.24.78',
      permissions: ['Camera', 'Location', 'Contacts', 'Microphone', 'Storage'],
      risks: ['End-to-end encryption', 'Meta ownership'],
      score: 85,
      status: 'safe'
    },
    {
      id: 'app-3',
      name: 'TikTok',
      package: 'com.zhiliaoapp.musically',
      version: '32.5.3',
      permissions: ['Camera', 'Location', 'Contacts', 'Microphone', 'Storage', 'Phone'],
      risks: ['Data collection', 'Chinese ownership', 'Privacy concerns'],
      score: 35,
      status: 'dangerous'
    },
    {
      id: 'app-4',
      name: 'Signal',
      package: 'org.thoughtcrime.securesms',
      version: '6.35.0',
      permissions: ['Camera', 'Microphone', 'Storage'],
      risks: [],
      score: 95,
      status: 'safe'
    }
  ]

  useEffect(() => {
    setNetworkDevices(generateNetworkDevices())
    setSecurityChecks(generateSecurityChecks())
    setAppScans(generateAppScans())
  }, [])

  const startScan = () => {
    setIsScanning(true)
    setScanResult('')
    
    // Simulate scanning process
    setTimeout(() => {
      const results = [
        'QR Code detected: WiFi network "SecureNet"',
        'QR Code detected: URL https://example.com',
        'QR Code detected: Contact information',
        'QR Code detected: Malicious URL detected!',
        'QR Code detected: App download link'
      ]
      setScanResult(results[Math.floor(Math.random() * results.length)])
      setIsScanning(false)
    }, 2000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Simulate file analysis
      setTimeout(() => {
        setScanResult(`File analyzed: ${file.name} - No threats detected`)
      }, 1500)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-4 w-4 text-cyber-green" />
      case 'fail': return <XCircle className="h-4 w-4 text-cyber-red" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-cyber-yellow" />
      case 'pending': return <Eye className="h-4 w-4 text-muted-foreground" />
      default: return <Eye className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-cyber-green'
      case 'medium': return 'text-cyber-yellow'
      case 'high': return 'text-cyber-orange'
      case 'critical': return 'text-cyber-red'
      default: return 'text-muted-foreground'
    }
  }

  const getAppStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-cyber-green'
      case 'warning': return 'text-cyber-yellow'
      case 'dangerous': return 'text-cyber-red'
      default: return 'text-muted-foreground'
    }
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'router': return <Wifi className="h-4 w-4" />
      case 'phone': return <PhoneIcon className="h-4 w-4" />
      case 'laptop': return <BarChart3 className="h-4 w-4" />
      case 'iot': return <Zap className="h-4 w-4" />
      case 'unknown': return <Eye className="h-4 w-4" />
      default: return <Network className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-cyber font-bold mb-4">
          Mobile <span className="text-cyber-green">Security</span> App
        </h2>
        <p className="text-muted-foreground">
          Comprehensive mobile security suite with scanning, monitoring, and protection features
        </p>
      </div>

      {/* Mobile Device Frame */}
      <div className="max-w-sm mx-auto">
        <div className="cyber-card p-4">
          {/* Device Status Bar */}
          <div className="flex justify-between items-center mb-4 text-sm">
            <div className="flex items-center space-x-2">
              <span>9:41</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-6 h-3 border border-cyber-green rounded-sm">
                <div 
                  className="h-full bg-cyber-green rounded-sm"
                  style={{ width: `${deviceStatus.battery}%` }}
                />
              </div>
              <span>{deviceStatus.battery}%</span>
            </div>
          </div>

          {/* App Content */}
          <div className="space-y-4">
            {activeTab === 'home' && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyber-green/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="h-8 w-8 text-cyber-green" />
                  </div>
                  <h3 className="font-bold">Security Status</h3>
                  <p className="text-sm text-muted-foreground">Device is protected</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="cyber-card p-3 text-center">
                    <div className="text-lg font-bold text-cyber-green">85%</div>
                    <div className="text-xs text-muted-foreground">Security Score</div>
                  </div>
                  <div className="cyber-card p-3 text-center">
                    <div className="text-lg font-bold text-cyber-yellow">3</div>
                    <div className="text-xs text-muted-foreground">Warnings</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Storage</span>
                    <span>{deviceStatus.storage}% used</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-cyber-green h-2 rounded-full"
                      style={{ width: `${deviceStatus.storage}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Memory</span>
                    <span>{deviceStatus.memory}% used</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-cyber-yellow h-2 rounded-full"
                      style={{ width: `${deviceStatus.memory}%` }}
                    />
                  </div>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  Last scan: {deviceStatus.lastScan.toLocaleTimeString()}
                </div>
              </div>
            )}

            {activeTab === 'scanner' && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyber-green/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <QrCode className="h-8 w-8 text-cyber-green" />
                  </div>
                  <h3 className="font-bold">QR Scanner</h3>
                  <p className="text-sm text-muted-foreground">Scan QR codes safely</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={startScan}
                    disabled={isScanning}
                    className="cyber-button w-full flex items-center justify-center space-x-2"
                  >
                    {isScanning ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyber-green"></div>
                        <span>Scanning...</span>
                      </>
                    ) : (
                      <>
                        <Scan className="h-4 w-4" />
                        <span>Scan QR Code</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="cyber-button w-full flex items-center justify-center space-x-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Scan File</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {scanResult && (
                    <div className="cyber-card p-3">
                      <div className="text-sm font-medium mb-1">Scan Result:</div>
                      <div className="text-xs text-muted-foreground">{scanResult}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'network' && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyber-green/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Network className="h-8 w-8 text-cyber-green" />
                  </div>
                  <h3 className="font-bold">Network Analysis</h3>
                  <p className="text-sm text-muted-foreground">Monitor network devices</p>
                </div>

                <div className="space-y-3">
                  {networkDevices.map((device) => (
                    <div
                      key={device.id}
                      className={`p-3 rounded-md border ${
                        device.connected ? 'border-cyber-green/30' : 'border-muted'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getDeviceIcon(device.type)}
                          <div>
                            <div className="font-medium text-sm">{device.name}</div>
                            <div className="text-xs text-muted-foreground">{device.ip}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-cyber-green">{device.signal}%</div>
                          <div className="text-xs text-muted-foreground">{device.security}</div>
                        </div>
                      </div>
                      
                      {device.threats.length > 0 && (
                        <div className="text-xs text-cyber-red">
                          Threats: {device.threats.join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'checklist' && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyber-green/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="h-8 w-8 text-cyber-green" />
                  </div>
                  <h3 className="font-bold">Security Checklist</h3>
                  <p className="text-sm text-muted-foreground">Verify security settings</p>
                </div>

                <div className="space-y-3">
                  {securityChecks.map((check) => (
                    <div
                      key={check.id}
                      className="p-3 rounded-md border border-muted"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(check.status)}
                          <div>
                            <div className="font-medium text-sm">{check.title}</div>
                            <div className="text-xs text-muted-foreground">{check.description}</div>
                          </div>
                        </div>
                        <span className={`text-xs ${getPriorityColor(check.priority)}`}>
                          {check.priority}
                        </span>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        {check.recommendation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'apps' && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyber-green/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Database className="h-8 w-8 text-cyber-green" />
                  </div>
                  <h3 className="font-bold">App Security</h3>
                  <p className="text-sm text-muted-foreground">Analyze installed apps</p>
                </div>

                <div className="space-y-3">
                  {appScans.map((app) => (
                    <div
                      key={app.id}
                      className="p-3 rounded-md border border-muted"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-medium text-sm">{app.name}</div>
                          <div className="text-xs text-muted-foreground">{app.package}</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-bold ${getAppStatusColor(app.status)}`}>
                            {app.score}/100
                          </div>
                          <div className={`text-xs ${getAppStatusColor(app.status)}`}>
                            {app.status}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground mb-2">
                        Permissions: {app.permissions.join(', ')}
                      </div>
                      
                      {app.risks.length > 0 && (
                        <div className="text-xs text-cyber-red">
                          Risks: {app.risks.join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyber-green/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Settings className="h-8 w-8 text-cyber-green" />
                  </div>
                  <h3 className="font-bold">Settings</h3>
                  <p className="text-sm text-muted-foreground">Configure security options</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-md border border-muted">
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4" />
                      <span className="text-sm">Auto Lock</span>
                    </div>
                    <div className="w-8 h-4 bg-cyber-green rounded-full"></div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-md border border-muted">
                    <div className="flex items-center space-x-2">
                      <Fingerprint className="h-4 w-4" />
                      <span className="text-sm">Biometric Auth</span>
                    </div>
                    <div className="w-8 h-4 bg-cyber-green rounded-full"></div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-md border border-muted">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4" />
                      <span className="text-sm">VPN</span>
                    </div>
                    <div className="w-8 h-4 bg-muted rounded-full"></div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-md border border-muted">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm">App Permissions</span>
                    </div>
                    <div className="w-8 h-4 bg-cyber-yellow rounded-full"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation */}
          <div className="flex justify-around mt-6 pt-4 border-t border-muted">
            <button
              onClick={() => setActiveTab('home')}
              className={`p-2 rounded-md transition-colors ${
                activeTab === 'home' ? 'text-cyber-green' : 'text-muted-foreground'
              }`}
            >
              <Home className="h-5 w-5" />
            </button>
            <button
              onClick={() => setActiveTab('scanner')}
              className={`p-2 rounded-md transition-colors ${
                activeTab === 'scanner' ? 'text-cyber-green' : 'text-muted-foreground'
              }`}
            >
              <Camera className="h-5 w-5" />
            </button>
            <button
              onClick={() => setActiveTab('network')}
              className={`p-2 rounded-md transition-colors ${
                activeTab === 'network' ? 'text-cyber-green' : 'text-muted-foreground'
              }`}
            >
              <Network className="h-5 w-5" />
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`p-2 rounded-md transition-colors ${
                activeTab === 'checklist' ? 'text-cyber-green' : 'text-muted-foreground'
              }`}
            >
              <CheckCircle className="h-5 w-5" />
            </button>
            <button
              onClick={() => setActiveTab('apps')}
              className={`p-2 rounded-md transition-colors ${
                activeTab === 'apps' ? 'text-cyber-green' : 'text-muted-foreground'
              }`}
            >
              <Database className="h-5 w-5" />
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`p-2 rounded-md transition-colors ${
                activeTab === 'settings' ? 'text-cyber-green' : 'text-muted-foreground'
              }`}
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Feature Description */}
      <div className="cyber-card">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <Smartphone className="h-5 w-5 mr-2 text-cyber-green" />
          Mobile Security Features
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium flex items-center">
              <QrCode className="h-4 w-4 mr-2" />
              QR Code Scanner
            </h4>
            <p className="text-sm text-muted-foreground">
              Safely scan QR codes and detect potential threats before opening links or connecting to networks.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium flex items-center">
              <Network className="h-4 w-4 mr-2" />
              Network Analyzer
            </h4>
            <p className="text-sm text-muted-foreground">
              Monitor connected devices, detect unauthorized access, and analyze network security.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Security Checklist
            </h4>
            <p className="text-sm text-muted-foreground">
              Comprehensive security audit with recommendations for device and app security.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileSecurityApp 