import { useState } from 'react'
import { 
  Zap, 
  Workflow, 
  Shield, 
  Database, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Play,
  Pause,
  RotateCcw,
  Settings,
  BarChart3,
  Users,
  Globe,
  Lock,
  Key,
  Eye,
  Activity
} from 'lucide-react'

interface WorkflowTemplate {
  id: string
  name: string
  description: string
  category: string
  status: 'active' | 'paused' | 'error' | 'draft'
  lastRun: string
  successRate: number
  executionTime: number
  triggers: string[]
  actions: string[]
  securityLevel: 'low' | 'medium' | 'high' | 'critical'
}

const N8nWorkflows = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'templates' | 'monitoring' | 'security'>('overview')
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null)

  const workflowTemplates: WorkflowTemplate[] = [
    {
      id: 'sec-incident-response',
      name: 'Security Incident Response',
      description: 'Automated incident detection, classification, and initial response workflow',
      category: 'Incident Response',
      status: 'active',
      lastRun: '2 minutes ago',
      successRate: 98.5,
      executionTime: 45,
      triggers: ['SIEM Alert', 'Email Alert', 'API Call'],
      actions: ['Create Ticket', 'Send Notifications', 'Block IP', 'Update Status'],
      securityLevel: 'critical'
    },
    {
      id: 'threat-intel-feed',
      name: 'Threat Intelligence Feed',
      description: 'Automated collection and processing of threat intelligence from multiple sources',
      category: 'Intelligence',
      status: 'active',
      lastRun: '15 minutes ago',
      successRate: 99.2,
      executionTime: 120,
      triggers: ['Scheduled', 'Manual Trigger', 'API Update'],
      actions: ['Update Database', 'Send Alerts', 'Generate Reports', 'Update Firewall Rules'],
      securityLevel: 'high'
    },
    {
      id: 'vulnerability-scan',
      name: 'Vulnerability Assessment',
      description: 'Automated vulnerability scanning and reporting workflow',
      category: 'Assessment',
      status: 'active',
      lastRun: '1 hour ago',
      successRate: 96.8,
      executionTime: 300,
      triggers: ['Scheduled', 'Manual Trigger', 'CI/CD Pipeline'],
      actions: ['Run Scans', 'Generate Reports', 'Create Tickets', 'Send Notifications'],
      securityLevel: 'high'
    },
    {
      id: 'compliance-check',
      name: 'Compliance Monitoring',
      description: 'Automated compliance checks and reporting for various standards',
      category: 'Compliance',
      status: 'paused',
      lastRun: '1 day ago',
      successRate: 94.3,
      executionTime: 180,
      triggers: ['Scheduled', 'Manual Trigger', 'Policy Change'],
      actions: ['Run Checks', 'Generate Reports', 'Send Alerts', 'Update Dashboard'],
      securityLevel: 'medium'
    },
    {
      id: 'backup-verification',
      name: 'Backup Verification',
      description: 'Automated backup verification and integrity checking',
      category: 'Backup',
      status: 'active',
      lastRun: '6 hours ago',
      successRate: 99.8,
      executionTime: 90,
      triggers: ['Scheduled', 'Backup Complete', 'Manual Trigger'],
      actions: ['Verify Integrity', 'Send Reports', 'Update Status', 'Alert on Failure'],
      securityLevel: 'medium'
    },
    {
      id: 'user-access-review',
      name: 'User Access Review',
      description: 'Automated user access review and privilege management',
      category: 'Access Control',
      status: 'active',
      lastRun: '12 hours ago',
      successRate: 97.1,
      executionTime: 60,
      triggers: ['Scheduled', 'User Change', 'Manual Trigger'],
      actions: ['Review Access', 'Generate Reports', 'Send Notifications', 'Update Permissions'],
      securityLevel: 'high'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400'
      case 'paused': return 'text-yellow-400'
      case 'error': return 'text-red-400'
      case 'draft': return 'text-gray-400'
      default: return 'text-gray-400'
    }
  }

  const getSecurityLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'high': return 'text-orange-400'
      case 'critical': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getSecurityLevelIcon = (level: string) => {
    switch (level) {
      case 'low': return <Shield className="h-4 w-4 text-green-400" />
      case 'medium': return <Shield className="h-4 w-4 text-yellow-400" />
      case 'high': return <Shield className="h-4 w-4 text-orange-400" />
      case 'critical': return <Shield className="h-4 w-4 text-red-400" />
      default: return <Shield className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-cyber-primary/20 rounded-full mr-4">
            <Workflow className="h-8 w-8 text-cyber-primary" />
          </div>
          <h2 className="text-3xl font-cyber font-bold text-cyber-primary">
            n8n Workflow Automation
          </h2>
        </div>
        <p className="text-lg text-white/80 max-w-3xl mx-auto">
          Streamline your cybersecurity operations with our comprehensive n8n workflow automation services. 
          From incident response to compliance monitoring, we provide enterprise-grade automation solutions.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'overview'
              ? 'bg-cyber-primary text-background'
              : 'bg-cyber-card text-white/90 hover:text-white hover:bg-cyber-light border border-cyber-primary/40'
          }`}
        >
          <BarChart3 className="h-4 w-4 inline mr-2" />
          Overview
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'templates'
              ? 'bg-cyber-primary text-background'
              : 'bg-cyber-card text-white/90 hover:text-white hover:bg-cyber-light border border-cyber-primary/40'
          }`}
        >
          <Workflow className="h-4 w-4 inline mr-2" />
          Workflow Templates
        </button>
        <button
          onClick={() => setActiveTab('monitoring')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'monitoring'
              ? 'bg-cyber-primary text-background'
              : 'bg-cyber-card text-white/90 hover:text-white hover:bg-cyber-light border border-cyber-primary/40'
          }`}
        >
          <Activity className="h-4 w-4 inline mr-2" />
          Monitoring
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'security'
              ? 'bg-cyber-primary text-background'
              : 'bg-cyber-card text-white/90 hover:text-white hover:bg-cyber-light border border-cyber-primary/40'
          }`}
        >
          <Lock className="h-4 w-4 inline mr-2" />
          Security Features
        </button>
      </div>

      {/* Content */}
      <div className="animate-fade-in">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Statistics Cards */}
            <div className="cyber-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-cyber-green">Active Workflows</h3>
                <Play className="h-6 w-6 text-cyber-green" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">24</div>
              <p className="text-sm text-white/70">Currently running automation workflows</p>
            </div>

            <div className="cyber-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-cyber-blue">Success Rate</h3>
                <TrendingUp className="h-6 w-6 text-cyber-blue" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">98.7%</div>
              <p className="text-sm text-white/70">Average workflow execution success</p>
            </div>

            <div className="cyber-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-cyber-purple">Time Saved</h3>
                <Clock className="h-6 w-6 text-cyber-purple" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">156h</div>
              <p className="text-sm text-white/70">Monthly time saved through automation</p>
            </div>

            {/* Services Overview */}
            <div className="cyber-card p-6 md:col-span-2 lg:col-span-3">
              <h3 className="text-xl font-semibold mb-4 text-cyber-primary">Our n8n Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Zap className="h-5 w-5 text-cyber-yellow mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Custom Workflow Development</h4>
                    <p className="text-sm text-white/70">Tailored automation solutions for your specific security needs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-cyber-green mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Security-First Design</h4>
                    <p className="text-sm text-white/70">Built with security best practices and compliance in mind</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Database className="h-5 w-5 text-cyber-blue mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Integration Services</h4>
                    <p className="text-sm text-white/70">Connect with your existing security tools and platforms</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-cyber-purple mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Training & Support</h4>
                    <p className="text-sm text-white/70">Comprehensive training and ongoing technical support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-cyber-primary mb-2">Pre-built Workflow Templates</h3>
              <p className="text-white/70">Ready-to-deploy automation workflows for common cybersecurity tasks</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {workflowTemplates.map((workflow) => (
                <div 
                  key={workflow.id}
                  className={`cyber-card p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedWorkflow === workflow.id ? 'ring-2 ring-cyber-primary' : ''
                  }`}
                  onClick={() => setSelectedWorkflow(selectedWorkflow === workflow.id ? null : workflow.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">{workflow.name}</h4>
                      <p className="text-sm text-white/70 mb-3">{workflow.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getSecurityLevelIcon(workflow.securityLevel)}
                      <span className={`text-xs font-medium ${getSecurityLevelColor(workflow.securityLevel)}`}>
                        {workflow.securityLevel.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-xs text-white/50">Status</span>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          workflow.status === 'active' ? 'bg-green-400' :
                          workflow.status === 'paused' ? 'bg-yellow-400' :
                          workflow.status === 'error' ? 'bg-red-400' : 'bg-gray-400'
                        }`} />
                        <span className={`text-sm font-medium ${getStatusColor(workflow.status)}`}>
                          {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-white/50">Success Rate</span>
                      <div className="text-sm font-medium text-white">{workflow.successRate}%</div>
                    </div>
                    <div>
                      <span className="text-xs text-white/50">Last Run</span>
                      <div className="text-sm font-medium text-white">{workflow.lastRun}</div>
                    </div>
                    <div>
                      <span className="text-xs text-white/50">Exec Time</span>
                      <div className="text-sm font-medium text-white">{workflow.executionTime}s</div>
                    </div>
                  </div>

                  {selectedWorkflow === workflow.id && (
                    <div className="border-t border-cyber-primary/30 pt-4 space-y-3">
                      <div>
                        <span className="text-xs text-white/50">Triggers</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {workflow.triggers.map((trigger, index) => (
                            <span key={index} className="px-2 py-1 bg-cyber-primary/20 text-cyber-primary text-xs rounded">
                              {trigger}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-white/50">Actions</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {workflow.actions.map((action, index) => (
                            <span key={index} className="px-2 py-1 bg-cyber-green/20 text-cyber-green text-xs rounded">
                              {action}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'monitoring' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-cyber-primary mb-2">Workflow Monitoring Dashboard</h3>
              <p className="text-white/70">Real-time monitoring and analytics for all your automation workflows</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Real-time Activity */}
              <div className="cyber-card p-6">
                <h4 className="text-lg font-semibold text-cyber-green mb-4 flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Real-time Activity
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-cyber-dark rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm text-white">Security Incident Response</span>
                    </div>
                    <span className="text-xs text-white/70">Running</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-cyber-dark rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span className="text-sm text-white">Threat Intel Feed</span>
                    </div>
                    <span className="text-xs text-white/70">Completed</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-cyber-dark rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                      <span className="text-sm text-white">Vulnerability Scan</span>
                    </div>
                    <span className="text-xs text-white/70">Queued</span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="cyber-card p-6">
                <h4 className="text-lg font-semibold text-cyber-blue mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Performance Metrics
                </h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/70">CPU Usage</span>
                      <span className="text-white">23%</span>
                    </div>
                    <div className="w-full bg-cyber-dark rounded-full h-2">
                      <div className="bg-cyber-blue h-2 rounded-full" style={{ width: '23%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/70">Memory Usage</span>
                      <span className="text-white">67%</span>
                    </div>
                    <div className="w-full bg-cyber-dark rounded-full h-2">
                      <div className="bg-cyber-green h-2 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/70">Queue Size</span>
                      <span className="text-white">5</span>
                    </div>
                    <div className="w-full bg-cyber-dark rounded-full h-2">
                      <div className="bg-cyber-yellow h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Control Panel */}
            <div className="cyber-card p-6">
              <h4 className="text-lg font-semibold text-cyber-purple mb-4 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Control Panel
              </h4>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-cyber-green text-cyber-dark rounded-lg font-medium hover:bg-cyber-green/80 transition-colors flex items-center">
                  <Play className="h-4 w-4 mr-2" />
                  Start All
                </button>
                <button className="px-4 py-2 bg-cyber-yellow text-cyber-dark rounded-lg font-medium hover:bg-cyber-yellow/80 transition-colors flex items-center">
                  <Pause className="h-4 w-4 mr-2" />
                  Pause All
                </button>
                <button className="px-4 py-2 bg-cyber-blue text-white rounded-lg font-medium hover:bg-cyber-blue/80 transition-colors flex items-center">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Restart All
                </button>
                <button className="px-4 py-2 bg-cyber-purple text-white rounded-lg font-medium hover:bg-cyber-purple/80 transition-colors flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-cyber-primary mb-2">Security Features & Compliance</h3>
              <p className="text-white/70">Enterprise-grade security features built into every workflow</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Security Features */}
              <div className="cyber-card p-6">
                <h4 className="text-lg font-semibold text-cyber-green mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Features
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-cyber-green" />
                    <span className="text-sm text-white">End-to-end encryption for all data</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-cyber-green" />
                    <span className="text-sm text-white">Role-based access control (RBAC)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-cyber-green" />
                    <span className="text-sm text-white">Audit logging and monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-cyber-green" />
                    <span className="text-sm text-white">API rate limiting and throttling</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-cyber-green" />
                    <span className="text-sm text-white">Secure credential management</span>
                  </div>
                </div>
              </div>

              {/* Compliance Standards */}
              <div className="cyber-card p-6">
                <h4 className="text-lg font-semibold text-cyber-blue mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Compliance Standards
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-cyber-blue" />
                    <span className="text-sm text-white">ISO 27001 Information Security</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-cyber-blue" />
                    <span className="text-sm text-white">SOC 2 Type II Compliance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-cyber-blue" />
                    <span className="text-sm text-white">GDPR Data Protection</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-cyber-blue" />
                    <span className="text-sm text-white">HIPAA Healthcare Compliance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-cyber-blue" />
                    <span className="text-sm text-white">PCI DSS Payment Security</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Integration Security */}
            <div className="cyber-card p-6">
              <h4 className="text-lg font-semibold text-cyber-purple mb-4 flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Integration Security
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-cyber-dark rounded-lg">
                  <Lock className="h-8 w-8 text-cyber-green mx-auto mb-2" />
                  <h5 className="font-medium text-white mb-1">OAuth 2.0</h5>
                  <p className="text-xs text-white/70">Secure authentication for third-party integrations</p>
                </div>
                <div className="text-center p-4 bg-cyber-dark rounded-lg">
                  <Key className="h-8 w-8 text-cyber-blue mx-auto mb-2" />
                  <h5 className="font-medium text-white mb-1">API Keys</h5>
                  <p className="text-xs text-white/70">Encrypted API key management and rotation</p>
                </div>
                <div className="text-center p-4 bg-cyber-dark rounded-lg">
                  <Eye className="h-8 w-8 text-cyber-purple mx-auto mb-2" />
                  <h5 className="font-medium text-white mb-1">Access Logs</h5>
                  <p className="text-xs text-white/70">Comprehensive access and activity logging</p>
                </div>
              </div>
            </div>

            {/* Security Alerts */}
            <div className="cyber-card p-6">
              <h4 className="text-lg font-semibold text-cyber-yellow mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Security Alerts & Notifications
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-cyber-dark rounded">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-4 w-4 text-cyber-yellow" />
                    <span className="text-sm text-white">Unusual API access pattern detected</span>
                  </div>
                  <span className="text-xs text-white/70">2 min ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-cyber-dark rounded">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-cyber-green" />
                    <span className="text-sm text-white">Security scan completed successfully</span>
                  </div>
                  <span className="text-xs text-white/70">15 min ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-cyber-dark rounded">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-4 w-4 text-cyber-orange" />
                    <span className="text-sm text-white">Workflow execution time exceeded threshold</span>
                  </div>
                  <span className="text-xs text-white/70">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default N8nWorkflows
