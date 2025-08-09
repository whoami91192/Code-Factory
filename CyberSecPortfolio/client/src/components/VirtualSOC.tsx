import React, { useState, useEffect } from 'react';
import { Monitor, Shield, AlertTriangle, Activity, Users, Globe, Zap, Eye } from 'lucide-react';

interface SecurityEvent {
  id: string;
  type: 'threat' | 'alert' | 'info' | 'success';
  message: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
}

interface NetworkNode {
  id: string;
  name: string;
  type: 'server' | 'workstation' | 'router' | 'firewall';
  status: 'online' | 'offline' | 'compromised';
  x: number;
  y: number;
  connections: string[];
}

const VirtualSOC: React.FC = () => {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [networkNodes, setNetworkNodes] = useState<NetworkNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());
  const [activeThreats, setActiveThreats] = useState(0);
  const [resolvedThreats, setResolvedThreats] = useState(0);

  // Generate mock security events with throttling
  useEffect(() => {
    const eventTypes = [
      { type: 'threat', message: 'Suspicious login attempt detected', severity: 'high' as const },
      { type: 'alert', message: 'Unusual network traffic pattern', severity: 'medium' as const },
      { type: 'info', message: 'System backup completed successfully', severity: 'low' as const },
      { type: 'success', message: 'Threat neutralized successfully', severity: 'low' as const },
    ];

    const sources = ['192.168.1.100', '10.0.0.50', '172.16.0.25', 'External Network'];

    const generateEvent = (): SecurityEvent => {
      const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      return {
        id: Math.random().toString(36).substr(2, 9),
        type: randomEvent.type as 'threat' | 'alert' | 'info' | 'success',
        message: randomEvent.message,
        timestamp: new Date(),
        severity: randomEvent.severity,
        source: sources[Math.floor(Math.random() * sources.length)],
      };
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.8) { // Reduced from 0.7 to 0.8 for less frequent events
        const newEvent = generateEvent();
        setEvents(prev => [newEvent, ...prev.slice(0, 8)]); // Reduced from 9 to 8
        
        if (newEvent.type === 'threat') {
          setActiveThreats(prev => prev + 1);
        } else if (newEvent.type === 'success') {
          setResolvedThreats(prev => prev + 1);
          setActiveThreats(prev => Math.max(0, prev - 1));
        }
      }
    }, 3000); // Increased from 2000ms to 3000ms for better performance

    return () => clearInterval(interval);
  }, []);

  // Generate network topology
  useEffect(() => {
    const nodes: NetworkNode[] = [
      { id: 'firewall-1', name: 'Main Firewall', type: 'firewall', status: 'online', x: 50, y: 20, connections: ['router-1'] },
      { id: 'router-1', name: 'Core Router', type: 'router', status: 'online', x: 50, y: 40, connections: ['firewall-1', 'server-1', 'server-2'] },
      { id: 'server-1', name: 'Web Server', type: 'server', status: 'online', x: 30, y: 60, connections: ['router-1'] },
      { id: 'server-2', name: 'Database Server', type: 'server', status: 'compromised', x: 70, y: 60, connections: ['router-1'] },
      { id: 'workstation-1', name: 'Admin PC', type: 'workstation', status: 'online', x: 20, y: 80, connections: ['server-1'] },
      { id: 'workstation-2', name: 'User PC', type: 'workstation', status: 'offline', x: 80, y: 80, connections: ['server-2'] },
    ];
    setNetworkNodes(nodes);
  }, []);

  // Update time
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-cyber-danger';
      case 'high': return 'text-cyber-warning';
      case 'medium': return 'text-cyber-accent';
      case 'low': return 'text-cyber-secondary';
      default: return 'text-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-cyber-secondary';
      case 'offline': return 'text-cyber-danger';
      case 'compromised': return 'text-cyber-warning';
      default: return 'text-foreground';
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'firewall': return <Shield className="h-4 w-4" />;
      case 'router': return <Globe className="h-4 w-4" />;
      case 'server': return <Monitor className="h-4 w-4" />;
      case 'workstation': return <Users className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="cyber-card-glow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-cyber font-bold text-cyber-primary">
          <Eye className="inline-block mr-2 h-6 w-6" />
          Virtual Security Operations Center
        </h2>
        <div className="text-sm font-mono text-cyber-secondary">
          {time.toLocaleTimeString()}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Network Topology */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-bold mb-4 text-cyber-secondary">Network Topology</h3>
          <div className="relative h-64 bg-cyber-darker rounded-lg border border-cyber-primary/20 overflow-hidden">
            {/* Network connections */}
            <svg className="absolute inset-0 w-full h-full">
              {networkNodes.map(node => 
                node.connections.map(connectionId => {
                  const targetNode = networkNodes.find(n => n.id === connectionId);
                  if (!targetNode) return null;
                  return (
                    <line
                      key={`${node.id}-${connectionId}`}
                      x1={`${node.x}%`}
                      y1={`${node.y}%`}
                      x2={`${targetNode.x}%`}
                      y2={`${targetNode.y}%`}
                      stroke={node.status === 'compromised' || targetNode.status === 'compromised' ? '#FF1744' : '#00E676'}
                      strokeWidth="2"
                      strokeDasharray={node.status === 'compromised' || targetNode.status === 'compromised' ? "5,5" : "none"}
                    />
                  );
                })
              )}
            </svg>
            
            {/* Network nodes */}
            {networkNodes.map(node => (
              <div
                key={node.id}
                className={`absolute cursor-pointer transition-all duration-300 hover:scale-110 ${
                  selectedNode === node.id ? 'ring-2 ring-cyber-primary' : ''
                }`}
                style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
              >
                <div className={`p-2 rounded-lg border-2 ${
                  node.status === 'online' ? 'border-cyber-secondary bg-cyber-secondary/10' :
                  node.status === 'offline' ? 'border-cyber-danger bg-cyber-danger/10' :
                  'border-cyber-warning bg-cyber-warning/10'
                }`}>
                  <div className={`${getStatusColor(node.status)}`}>
                    {getNodeIcon(node.type)}
                  </div>
                </div>
                <div className="text-xs text-center mt-1 font-mono">
                  {node.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Metrics */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-cyber-secondary">Security Metrics</h3>
          
          <div className="cyber-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Active Threats</span>
              <AlertTriangle className="h-4 w-4 text-cyber-warning" />
            </div>
            <div className="text-2xl font-bold text-cyber-warning">{activeThreats}</div>
          </div>

          <div className="cyber-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Resolved Threats</span>
              <Shield className="h-4 w-4 text-cyber-secondary" />
            </div>
            <div className="text-2xl font-bold text-cyber-secondary">{resolvedThreats}</div>
          </div>

          <div className="cyber-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Network Health</span>
              <Activity className="h-4 w-4 text-cyber-primary" />
            </div>
            <div className="text-2xl font-bold text-cyber-primary">
              {Math.round((networkNodes.filter(n => n.status === 'online').length / networkNodes.length) * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* Security Events Feed */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4 text-cyber-secondary">Security Events Feed</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {events.map(event => (
            <div key={event.id} className="cyber-card p-3 flex items-center space-x-3">
              <div className={`p-1 rounded ${getSeverityColor(event.severity)}`}>
                {event.type === 'threat' && <AlertTriangle className="h-4 w-4" />}
                {event.type === 'alert' && <Activity className="h-4 w-4" />}
                {event.type === 'info' && <Eye className="h-4 w-4" />}
                {event.type === 'success' && <Shield className="h-4 w-4" />}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{event.message}</div>
                <div className="text-xs text-muted-foreground">
                  {event.source} • {event.timestamp.toLocaleTimeString()}
                </div>
              </div>
              <div className={`text-xs font-bold ${getSeverityColor(event.severity)}`}>
                {event.severity.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Node Details */}
      {selectedNode && (
        <div className="mt-6 cyber-card p-4">
          <h3 className="text-lg font-bold mb-3 text-cyber-primary">Node Details</h3>
          {(() => {
            const node = networkNodes.find(n => n.id === selectedNode);
            if (!node) return null;
            return (
              <div className="space-y-2">
                <div><strong>Name:</strong> {node.name}</div>
                <div><strong>Type:</strong> {node.type}</div>
                <div><strong>Status:</strong> 
                  <span className={`ml-2 ${getStatusColor(node.status)}`}>
                    {node.status}
                  </span>
                </div>
                <div><strong>Connections:</strong> {node.connections.length}</div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default VirtualSOC; 