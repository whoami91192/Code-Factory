import React, { useState, useEffect, useRef } from 'react';
import { Hand, Move, RotateCw, ZoomIn, MousePointer, Fingerprint } from 'lucide-react';

const GestureBasedNavigation: React.FC = () => {
  const [gestureType, setGestureType] = useState<string | null>(null);
  const [gestureData, setGestureData] = useState({
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    velocity: 0
  });
  const [isTracking, setIsTracking] = useState(false);
  const [gestureHistory, setGestureHistory] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let startX = 0;
    let startY = 0;
    let startTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      startTime = Date.now();
      setIsTracking(true);
      setGestureType('touch-start');
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const time = Date.now() - startTime;
        const velocity = distance / time;

        setGestureData({
          x: touch.clientX,
          y: touch.clientY,
          scale: 1,
          rotation: 0,
          velocity
        });

        // Determine gesture type based on movement
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX > 50) {
            setGestureType('swipe-right');
            addToHistory('Swipe Right');
          } else if (deltaX < -50) {
            setGestureType('swipe-left');
            addToHistory('Swipe Left');
          }
        } else {
          if (deltaY > 50) {
            setGestureType('swipe-down');
            addToHistory('Swipe Down');
          } else if (deltaY < -50) {
            setGestureType('swipe-up');
            addToHistory('Swipe Up');
          }
        }
      } else if (e.touches.length === 2) {
        // Pinch gesture
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        
        setGestureType('pinch');
        setGestureData(prev => ({
          ...prev,
          scale: distance / 100
        }));
        addToHistory('Pinch Gesture');
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      setIsTracking(false);
      setGestureType('touch-end');
      
      // Add tap gesture if no significant movement
      if (gestureData.velocity < 0.1) {
        setGestureType('tap');
        addToHistory('Tap Gesture');
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      startX = e.clientX;
      startY = e.clientY;
      startTime = Date.now();
      setIsTracking(true);
      setGestureType('mouse-down');
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isTracking) {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const time = Date.now() - startTime;
        const velocity = distance / time;

        setGestureData({
          x: e.clientX,
          y: e.clientY,
          scale: 1,
          rotation: 0,
          velocity
        });

        if (distance > 50) {
          setGestureType('drag');
          addToHistory('Drag Gesture');
        }
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      setIsTracking(false);
      setGestureType('mouse-up');
      
      if (gestureData.velocity < 0.1) {
        setGestureType('click');
        addToHistory('Click Gesture');
      }
    };

    // Add event listeners
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isTracking, gestureData.velocity]);

  const addToHistory = (gesture: string) => {
    setGestureHistory(prev => [gesture, ...prev.slice(0, 9)]);
  };

  const clearHistory = () => {
    setGestureHistory([]);
  };

  return (
    <div className="cyber-card-glow p-6 relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{ zIndex: 0 }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-cyber font-bold text-cyber-primary">
            <Hand className="inline-block mr-2 h-6 w-6" />
            Gesture-Based Navigation
          </h2>
          <div className="text-sm text-cyber-secondary">
            Touch & Motion Controls
          </div>
        </div>

        {/* Gesture Display */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="cyber-card p-6">
            <h3 className="text-lg font-bold mb-4 text-cyber-secondary">Current Gesture</h3>
            <div className="text-center">
              <div className="text-4xl font-cyber font-bold mb-4 text-cyber-primary">
                {gestureType ? gestureType.toUpperCase() : 'NO GESTURE'}
              </div>
              <div className="text-sm text-muted-foreground">
                {isTracking ? 'Tracking Active' : 'Ready for Input'}
              </div>
            </div>
          </div>

          <div className="cyber-card p-6">
            <h3 className="text-lg font-bold mb-4 text-cyber-secondary">Gesture Data</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>X Position:</span>
                <span className="font-mono text-cyber-secondary">{Math.round(gestureData.x)}px</span>
              </div>
              <div className="flex justify-between">
                <span>Y Position:</span>
                <span className="font-mono text-cyber-primary">{Math.round(gestureData.y)}px</span>
              </div>
              <div className="flex justify-between">
                <span>Scale:</span>
                <span className="font-mono text-cyber-warning">{gestureData.scale.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Velocity:</span>
                <span className="font-mono text-cyber-accent">{gestureData.velocity.toFixed(2)} px/ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gesture Types */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4 text-cyber-secondary">Supported Gestures</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="cyber-card p-4 text-center">
                             <Fingerprint className="h-12 w-12 mx-auto mb-3 text-cyber-secondary" />
              <div className="font-bold">Tap/Click</div>
              <div className="text-sm text-muted-foreground">Single touch/click</div>
            </div>
            <div className="cyber-card p-4 text-center">
              <Move className="h-12 w-12 mx-auto mb-3 text-cyber-primary" />
              <div className="font-bold">Swipe</div>
              <div className="text-sm text-muted-foreground">Directional swipe</div>
            </div>
            <div className="cyber-card p-4 text-center">
              <ZoomIn className="h-12 w-12 mx-auto mb-3 text-cyber-warning" />
              <div className="font-bold">Pinch</div>
              <div className="text-sm text-muted-foreground">Two-finger pinch</div>
            </div>
            <div className="cyber-card p-4 text-center">
              <RotateCw className="h-12 w-12 mx-auto mb-3 text-cyber-accent" />
              <div className="font-bold">Rotate</div>
              <div className="text-sm text-muted-foreground">Rotation gesture</div>
            </div>
          </div>
        </div>

        {/* Gesture History */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-cyber-secondary">Gesture History</h3>
            <button
              onClick={clearHistory}
              className="cyber-button text-sm"
            >
              Clear History
            </button>
          </div>
          <div className="cyber-card p-4">
            <div className="space-y-2">
              {gestureHistory.length > 0 ? (
                gestureHistory.map((gesture, index) => (
                  <div key={index} className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-cyber-primary rounded-full" />
                    <span className="font-mono">{gesture}</span>
                    <span className="text-muted-foreground text-xs">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground">
                  No gestures recorded yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Gesture Controls */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="cyber-card p-4">
            <h4 className="font-bold mb-4 text-cyber-primary">Gesture Settings</h4>
            <div className="space-y-4">
              <div>
                <label className="text-sm">Sensitivity</label>
                <div className="w-full bg-cyber-light rounded-full h-2 mt-2">
                  <div className="bg-cyber-secondary h-2 rounded-full w-3/4" />
                </div>
              </div>
              <div>
                <label className="text-sm">Response Time</label>
                <div className="w-full bg-cyber-light rounded-full h-2 mt-2">
                  <div className="bg-cyber-primary h-2 rounded-full w-2/3" />
                </div>
              </div>
            </div>
          </div>

          <div className="cyber-card p-4">
            <h4 className="font-bold mb-4 text-cyber-primary">Active Features</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-cyber-secondary rounded-full animate-pulse" />
                <span className="text-sm">Touch Tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-cyber-primary rounded-full animate-pulse" />
                <span className="text-sm">Mouse Tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-cyber-warning rounded-full animate-pulse" />
                <span className="text-sm">Gesture Recognition</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-cyber-accent rounded-full animate-pulse" />
                <span className="text-sm">History Logging</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Gesture Area */}
        <div className="text-center">
          <h3 className="text-lg font-bold mb-4 text-cyber-secondary">Interactive Area</h3>
          <div className="cyber-card p-8">
            <div className="text-center">
              <MousePointer className="h-16 w-16 mx-auto mb-4 text-cyber-primary animate-pulse" />
              <div className="text-xl font-bold mb-2">Gesture Zone</div>
              <div className="text-sm text-muted-foreground mb-4">
                Touch, click, or drag in this area to test gestures
              </div>
              <div className="text-xs text-cyber-secondary">
                {isTracking ? 'GESTURE DETECTED' : 'WAITING FOR INPUT'}
              </div>
            </div>
          </div>
        </div>

        {/* Gesture Instructions */}
        <div className="mt-8">
          <div className="cyber-card p-4">
            <h4 className="font-bold mb-2 text-cyber-secondary">Gesture Instructions</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-bold text-cyber-primary mb-2">Touch Gestures</h5>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Tap: Single touch</li>
                  <li>• Swipe: Directional movement</li>
                  <li>• Pinch: Two-finger scale</li>
                  <li>• Rotate: Two-finger rotation</li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-cyber-primary mb-2">Mouse Gestures</h5>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Click: Single click</li>
                  <li>• Drag: Click and move</li>
                  <li>• Double-click: Rapid clicks</li>
                  <li>• Right-click: Context menu</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestureBasedNavigation; 