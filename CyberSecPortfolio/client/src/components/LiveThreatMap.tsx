import { useEffect, useRef, useState } from 'react'
import { Globe } from 'lucide-react'

interface Attack {
  id: number
  source: { x: number; y: number; country: string }
  target: { x: number; y: number; country: string }
  severity: 'low' | 'medium' | 'high' | 'critical'
  type: string
  timestamp: Date
}

const LiveThreatMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [attacks, setAttacks] = useState<Attack[]>([])
  const [stats, setStats] = useState({
    totalAttacks: 0,
    highSeverity: 0,
    mostAttackedCountry: 'United States',
    lastHour: 0
  })

  // Generate random attack data
  const generateAttack = (): Attack => {
    const countries = [
      'United States', 'China', 'Russia', 'Germany', 'United Kingdom',
      'France', 'Japan', 'South Korea', 'India', 'Brazil', 'Canada',
      'Australia', 'Italy', 'Spain', 'Netherlands', 'Sweden', 'Norway'
    ]
    
    const attackTypes = [
      'DDoS Attack', 'Malware Infection', 'Phishing Attempt', 'SQL Injection',
      'XSS Attack', 'Ransomware', 'Data Breach', 'APT Attack'
    ]

    const severities: ('low' | 'medium' | 'high' | 'critical')[] = ['low', 'medium', 'high', 'critical']
    
    return {
      id: Date.now() + Math.random(),
      source: {
        x: Math.random() * 800,
        y: Math.random() * 400,
        country: countries[Math.floor(Math.random() * countries.length)]
      },
      target: {
        x: Math.random() * 800,
        y: Math.random() * 400,
        country: countries[Math.floor(Math.random() * countries.length)]
      },
      severity: severities[Math.floor(Math.random() * severities.length)],
      type: attackTypes[Math.floor(Math.random() * attackTypes.length)],
      timestamp: new Date()
    }
  }

  // Draw attack on canvas
  const drawAttack = (ctx: CanvasRenderingContext2D, attack: Attack) => {
    const severityColors = {
      low: '#00ff00',
      medium: '#ffff00', 
      high: '#ff6600',
      critical: '#ff0000'
    }

    const color = severityColors[attack.severity]
    
    // Draw source point
    ctx.beginPath()
    ctx.arc(attack.source.x, attack.source.y, 4, 0, 2 * Math.PI)
    ctx.fillStyle = '#ff0000'
    ctx.fill()
    
    // Draw target point
    ctx.beginPath()
    ctx.arc(attack.target.x, attack.target.y, 4, 0, 2 * Math.PI)
    ctx.fillStyle = '#00ff00'
    ctx.fill()
    
    // Draw connection line
    ctx.beginPath()
    ctx.moveTo(attack.source.x, attack.source.y)
    ctx.lineTo(attack.target.x, attack.target.y)
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.stroke()
    ctx.setLineDash([])
  }

  // Animate canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 400

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid background
    ctx.strokeStyle = '#1a1a1a'
    ctx.lineWidth = 1
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Draw all attacks
    attacks.forEach(attack => drawAttack(ctx, attack))
  }, [attacks])

  // Generate new attacks periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newAttack = generateAttack()
      setAttacks(prev => {
        const updated = [...prev, newAttack].slice(-20) // Keep last 20 attacks
        return updated
      })
      
      setStats(prev => ({
        ...prev,
        totalAttacks: prev.totalAttacks + 1,
        lastHour: prev.lastHour + 1,
        highSeverity: prev.highSeverity + (newAttack.severity === 'high' || newAttack.severity === 'critical' ? 1 : 0)
      }))
    }, 2000) // New attack every 2 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="cyber-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-cyber font-bold text-white drop-shadow flex items-center">
          <Globe className="mr-2 h-5 w-5 text-cyber-green" />
          Live <span className="text-cyber-green">Threat Map</span>
        </h3>
        <div className="flex items-center space-x-4 text-sm">
          <span className="text-cyber-green">Live</span>
          <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative bg-black/50 rounded-lg p-4 border border-cyber-green/30">
        <canvas
          ref={canvasRef}
          className="w-full h-96 rounded"
          style={{ background: 'radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)' }}
        />
        
        {/* Legend */}
        <div className="absolute top-4 right-4 bg-black/80 p-3 rounded border border-cyber-green/30">
          <h4 className="text-sm font-bold text-white mb-2">Legend</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-white">Source</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-white">Target</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-white">Low Severity</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-white">Medium Severity</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
              <span className="text-white">High Severity</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-white">Critical Severity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="cyber-card-magnetic text-center">
          <div className="text-2xl font-bold text-cyber-green">{stats.totalAttacks}</div>
          <div className="text-xs text-white/70">Total Attacks</div>
        </div>
        <div className="cyber-card-magnetic text-center">
          <div className="text-2xl font-bold text-cyber-red">{stats.highSeverity}</div>
          <div className="text-xs text-white/70">High Severity</div>
        </div>
        <div className="cyber-card-magnetic text-center">
          <div className="text-2xl font-bold text-cyber-blue">{stats.lastHour}</div>
          <div className="text-xs text-white/70">Last Hour</div>
        </div>
        <div className="cyber-card-magnetic text-center">
          <div className="text-lg font-bold text-cyber-yellow">{stats.mostAttackedCountry}</div>
          <div className="text-xs text-white/70">Most Attacked</div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-cyber-green/20">
        <p className="text-xs text-white/60 text-center">
          Simulated threat data for demonstration purposes. 
          Based on patterns from <a 
            href="https://cybermap.kaspersky.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-cyber-green hover:text-cyber-blue transition-colors"
          >
            Kaspersky Cyberthreat Live Map
          </a>
        </p>
      </div>
    </div>
  )
}

export default LiveThreatMap 