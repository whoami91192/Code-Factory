import React, { useState, useEffect } from 'react';
import { Smartphone, Wifi, WifiOff, Shield, Download, Upload, Eye, Lock, Unlock, Battery, Signal, Settings } from 'lucide-react';

interface SecurityScan {
  id: string;
  type: 'network' | 'app' | 'device' | 'data';
  name: string;
  status: 'scanning' | 'completed' | 'failed';
  result: 'secure' | 'warning' | 'danger';
  details: string;
  timestamp: Date;
}

interface NetworkInfo {
  ssid: string;
  security: 'open' | 'wep' | 'wpa' | 'wpa2' | 'wpa3';
  signal: number;
  encryption: string;
  isSecure: boolean;
}

const PWAFeatures: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [scans, setScans] = useState<SecurityScan[]>([]);
  const [currentScan, setCurrentScan] = useState<string | null>(null);
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
    ssid: 'Demo Network',
    security: 'wpa2',
    signal: 85,
    encryption: 'AES-CCMP',
    isSecure: true
  });
  const [batteryLevel, setBatteryLevel] = useState(75);
  const [isInstalled, setIsInstalled] = useState(false);
  const [offlineData, setOfflineData] = useState([
    { id: '1', title: 'Security Checklist', content: 'Basic security practices for mobile devices' },
    { id: '2', title: 'Emergency Contacts', content: 'IT Security: +1-555-0123\nIncident Response: +1-555-0456' },
    { id: '3', title: 'Quick Security Tips', content: 'Keep your device updated, use strong passwords, enable biometric authentication' }
  ]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const startSecurityScan = (type: SecurityScan['type']) => {
    const scan: SecurityScan = {
      id: Date.now().toString(),
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Security Scan`,
      status: 'scanning',
      result: 'secure',
      details: 'Scanning in progress...',
      timestamp: new Date()
    };

    setScans(prev => [scan, ...prev]);
    setCurrentScan(scan.id);

    // Simulate scan process
    setTimeout(() => {
      const results = {
        network: { result: 'secure' as const, details: 'Network security configuration is optimal' },
        app: { result: 'warning' as const, details: '2 apps require permission review' },
        device: { result: 'secure' as const, details: 'Device security settings are properly configured' },
        data: { result: 'danger' as const, details: '3 files found with potential security risks' }
      };

      setScans(prev => prev.map(s => 
        s.id === scan.id 
          ? { ...s, status: 'completed', result: results[type].result, details: results[type].details }
          : s
      ));
      setCurrentScan(null);
    }, 3000 + Math.random() * 2000);
  };

  const installPWA = () => {
    // Simulate PWA installation
    setIsInstalled(true);
    setTimeout(() => {
      alert('PWA installed successfully! You can now access this app offline.');
    }, 1000);
  };

  const getSecurityIcon = (security: string) => {
    switch (security) {
      case 'wpa3': return <Shield className="h-4 w-4 text-cyber-secondary" />;
      case 'wpa2': return <Shield className="h-4 w-4 text-cyber-primary" />;
      case 'wpa': return <Shield className="h-4 w-4 text-cyber-warning" />;
      case 'wep': return <Shield className="h-4 w-4 text-cyber-danger" />;
      case 'open': return <Unlock className="h-4 w-4 text-cyber-danger" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getScanIcon = (result: string) => {
    switch (result) {
      case 'secure': return <Shield className="h-4 w-4 text-cyber-secondary" />;
      case 'warning': return <Eye className="h-4 w-4 text-cyber-warning" />;
      case 'danger': return <Lock className="h-4 w-4 text-cyber-danger" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="cyber-card-glow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-cyber font-bold text-cyber-primary">
          <Smartphone className="inline-block mr-2 h-6 w-6" />
          Mobile Security & PWA Features
        </h2>
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 ${isOnline ? 'text-cyber-secondary' : 'text-cyber-danger'}`}>
            {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
            <span className="text-sm">{isOnline ? 'Online' : 'Offline'}</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Mobile Security Scanner */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-cyber-secondary">Security Scanner</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => startSecurityScan('network')}
              disabled={currentScan !== null}
              className="cyber-card p-4 text-center hover:bg-cyber-light transition-colors disabled:opacity-50"
            >
              <Wifi className="h-8 w-8 mx-auto mb-2 text-cyber-primary" />
              <div className="text-sm font-medium">Network Scan</div>
            </button>
            
            <button
              onClick={() => startSecurityScan('app')}
              disabled={currentScan !== null}
              className="cyber-card p-4 text-center hover:bg-cyber-light transition-colors disabled:opacity-50"
            >
              <Smartphone className="h-8 w-8 mx-auto mb-2 text-cyber-accent" />
              <div className="text-sm font-medium">App Security</div>
            </button>
            
            <button
              onClick={() => startSecurityScan('device')}
              disabled={currentScan !== null}
              className="cyber-card p-4 text-center hover:bg-cyber-light transition-colors disabled:opacity-50"
            >
              <Shield className="h-8 w-8 mx-auto mb-2 text-cyber-secondary" />
              <div className="text-sm font-medium">Device Check</div>
            </button>
            
            <button
              onClick={() => startSecurityScan('data')}
              disabled={currentScan !== null}
              className="cyber-card p-4 text-center hover:bg-cyber-light transition-colors disabled:opacity-50"
            >
              <Eye className="h-8 w-8 mx-auto mb-2 text-cyber-warning" />
              <div className="text-sm font-medium">Data Analysis</div>
            </button>
          </div>

          {/* Scan Results */}
          <div className="space-y-3">
            <h4 className="font-bold text-cyber-secondary">Recent Scans</h4>
            {scans.slice(0, 5).map((scan) => (
              <div key={scan.id} className="cyber-card p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getScanIcon(scan.result)}
                    <span className="font-medium">{scan.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    scan.result === 'secure' ? 'bg-cyber-secondary/20 text-cyber-secondary' :
                    scan.result === 'warning' ? 'bg-cyber-warning/20 text-cyber-warning' :
                    'bg-cyber-danger/20 text-cyber-danger'
                  }`}>
                    {scan.result.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{scan.details}</p>
                <div className="text-xs text-cyber-primary mt-2">
                  {scan.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Network & Device Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-cyber-secondary">Device Status</h3>
          
          {/* Network Information */}
          <div className="cyber-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold">Network Security</h4>
              {getSecurityIcon(networkInfo.security)}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>SSID:</span>
                <span className="font-mono">{networkInfo.ssid}</span>
              </div>
              <div className="flex justify-between">
                <span>Security:</span>
                <span className="font-mono">{networkInfo.security.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span>Encryption:</span>
                <span className="font-mono">{networkInfo.encryption}</span>
              </div>
              <div className="flex justify-between">
                <span>Signal:</span>
                <div className="flex items-center space-x-2">
                  <Signal className="h-4 w-4" />
                  <span>{networkInfo.signal}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Device Status */}
          <div className="cyber-card p-4">
            <h4 className="font-bold mb-3">Device Health</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Battery Level</span>
                <div className="flex items-center space-x-2">
                  <Battery className="h-4 w-4" />
                  <span className="text-sm">{batteryLevel}%</span>
                </div>
              </div>
              <div className="w-full bg-cyber-light rounded-full h-2">
                <div 
                  className="bg-cyber-secondary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${batteryLevel}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Connection</span>
                <span className={`text-sm ${isOnline ? 'text-cyber-secondary' : 'text-cyber-danger'}`}>
                  {isOnline ? 'Secure' : 'Unsafe'}
                </span>
              </div>
            </div>
          </div>

          {/* PWA Installation */}
          <div className="cyber-card p-4">
            <h4 className="font-bold mb-3">PWA Features</h4>
            <div className="space-y-3">
              <button
                onClick={installPWA}
                disabled={isInstalled}
                className="w-full cyber-button disabled:opacity-50"
              >
                <Download className="h-4 w-4 mr-2" />
                {isInstalled ? 'Installed' : 'Install App'}
              </button>
              <div className="text-xs text-muted-foreground">
                Install this app for offline access and better performance
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offline Content */}
      {!isOnline && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4 text-cyber-secondary">Offline Content</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {offlineData.map((item) => (
              <div key={item.id} className="cyber-card p-4">
                <h4 className="font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Tips */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4 text-cyber-secondary">Mobile Security Tips</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="cyber-card p-4">
            <Lock className="h-6 w-6 mb-2 text-cyber-secondary" />
            <h4 className="font-bold mb-2">Enable Biometrics</h4>
            <p className="text-sm text-muted-foreground">Use fingerprint or face recognition for device access</p>
          </div>
          <div className="cyber-card p-4">
            <Shield className="h-6 w-6 mb-2 text-cyber-primary" />
            <h4 className="font-bold mb-2">Keep Updated</h4>
            <p className="text-sm text-muted-foreground">Regularly update your device OS and apps</p>
          </div>
          <div className="cyber-card p-4">
            <Wifi className="h-6 w-6 mb-2 text-cyber-warning" />
            <h4 className="font-bold mb-2">Use VPN</h4>
            <p className="text-sm text-muted-foreground">Connect to VPN on public networks</p>
          </div>
          <div className="cyber-card p-4">
            <Eye className="h-6 w-6 mb-2 text-cyber-accent" />
            <h4 className="font-bold mb-2">App Permissions</h4>
            <p className="text-sm text-muted-foreground">Review and limit app permissions regularly</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAFeatures; 