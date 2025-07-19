import React, { useEffect, useRef, useState } from 'react';
import { Code, Eye, Zap } from 'lucide-react';

const MatrixDigitalRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()_+-=[]{}|;:,.<>?";
    const matrixArray = matrix.split("");

    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      if (!isActive) return;

      ctx.fillStyle = 'rgba(15, 20, 25, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive]);

  return (
    <div className="cyber-card-glow p-6 relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-cyber font-bold text-cyber-secondary">
            <Code className="inline-block mr-2 h-6 w-6" />
            Matrix Digital Rain
          </h2>
          <button
            onClick={() => setIsActive(!isActive)}
            className="cyber-button text-sm"
          >
            {isActive ? 'Stop' : 'Start'} Matrix
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Matrix Stats */}
          <div className="cyber-card p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Eye className="h-5 w-5 text-cyber-secondary" />
              <span className="font-bold">Matrix Status</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Active Streams:</span>
                <span className="text-cyber-secondary font-mono">∞</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Data Flow:</span>
                <span className="text-cyber-primary font-mono">1.21 GB/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Encryption:</span>
                <span className="text-cyber-warning font-mono">AES-256</span>
              </div>
            </div>
          </div>

          {/* Digital Rain Control */}
          <div className="cyber-card p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Zap className="h-5 w-5 text-cyber-primary" />
              <span className="font-bold">Rain Control</span>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm">Intensity</label>
                <div className="w-full bg-cyber-light rounded-full h-2 mt-1">
                  <div className="bg-cyber-secondary h-2 rounded-full w-3/4" />
                </div>
              </div>
              <div>
                <label className="text-sm">Speed</label>
                <div className="w-full bg-cyber-light rounded-full h-2 mt-1">
                  <div className="bg-cyber-primary h-2 rounded-full w-2/3" />
                </div>
              </div>
            </div>
          </div>

          {/* Matrix Info */}
          <div className="cyber-card p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Code className="h-5 w-5 text-cyber-warning" />
              <span className="font-bold">Matrix Info</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Characters:</span>
                <span className="font-mono">A-Z, 0-9, @#$%</span>
              </div>
              <div className="flex justify-between">
                <span>Font Size:</span>
                <span className="font-mono">14px</span>
              </div>
              <div className="flex justify-between">
                <span>Columns:</span>
                <span className="font-mono">Dynamic</span>
              </div>
            </div>
          </div>
        </div>

        {/* Matrix Terminal */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4 text-cyber-secondary">Matrix Terminal</h3>
          <div className="cyber-card p-4 font-mono text-sm">
            <div className="text-cyber-secondary">
              <div>Welcome to the Matrix...</div>
              <div>System: ONLINE</div>
              <div>Security: ACTIVE</div>
              <div>Encryption: ENABLED</div>
              <div className="text-cyber-primary mt-2">
                &gt; Access granted to digital realm
              </div>
              <div className="text-cyber-warning">
                &gt; Monitoring data streams...
              </div>
              <div className="text-cyber-secondary">
                &gt; Matrix rain effect: {isActive ? 'ACTIVE' : 'STOPPED'}
              </div>
            </div>
          </div>
        </div>

        {/* Matrix Effects */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="cyber-card p-4">
            <h4 className="font-bold mb-3 text-cyber-primary">Glitch Effect</h4>
            <div className="space-y-2">
              <div className="h-2 bg-cyber-light rounded">
                <div className="h-2 bg-cyber-secondary rounded animate-pulse" style={{ width: '60%' }} />
              </div>
              <div className="h-2 bg-cyber-light rounded">
                <div className="h-2 bg-cyber-primary rounded animate-pulse" style={{ width: '80%' }} />
              </div>
              <div className="h-2 bg-cyber-light rounded">
                <div className="h-2 bg-cyber-warning rounded animate-pulse" style={{ width: '40%' }} />
              </div>
            </div>
          </div>

          <div className="cyber-card p-4">
            <h4 className="font-bold mb-3 text-cyber-primary">Data Stream</h4>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Stream 1:</span>
                <span className="text-cyber-secondary">ACTIVE</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Stream 2:</span>
                <span className="text-cyber-primary">ACTIVE</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Stream 3:</span>
                <span className="text-cyber-warning">ACTIVE</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Stream 4:</span>
                <span className="text-cyber-danger">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrixDigitalRain; 