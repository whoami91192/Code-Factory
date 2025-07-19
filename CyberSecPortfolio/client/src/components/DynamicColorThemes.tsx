import React, { useState, useEffect } from 'react';
import { Palette, Zap, Eye, Shield, Target, Moon, Sun, Monitor } from 'lucide-react';

const DynamicColorThemes: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState('cyber');
  const [isMorphing, setIsMorphing] = useState(false);
  const [colorIntensity, setColorIntensity] = useState(50);

  const themes = {
    cyber: {
      name: 'Cyberpunk',
      primary: '#0080FF',
      secondary: '#00E676',
      warning: '#FFB300',
      accent: '#9C27B0',
      danger: '#FF1744',
      icon: Zap
    },
    neon: {
      name: 'Neon',
      primary: '#FF00FF',
      secondary: '#00FFFF',
      warning: '#FFFF00',
      accent: '#00FF00',
      danger: '#FF0080',
      icon: Eye
    },
    matrix: {
      name: 'Matrix',
      primary: '#00FF00',
      secondary: '#00CC00',
      warning: '#FFFF00',
      accent: '#00FFFF',
      danger: '#FF0000',
      icon: Shield
    },
    sunset: {
      name: 'Sunset',
      primary: '#FF6B35',
      secondary: '#F7931E',
      warning: '#FFD23F',
      accent: '#FF6B9D',
      danger: '#FF1744',
      icon: Sun
    },
    ocean: {
      name: 'Ocean',
      primary: '#0066CC',
      secondary: '#00CCFF',
      warning: '#FFB300',
      accent: '#0099CC',
      danger: '#FF1744',
      icon: Target
    },
    dark: {
      name: 'Dark',
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
      warning: '#FFB300',
      accent: '#9C27B0',
      danger: '#FF1744',
      icon: Moon
    }
  };

  const currentThemeData = themes[currentTheme as keyof typeof themes];

  useEffect(() => {
    // Apply theme colors to CSS variables
    const root = document.documentElement;
    root.style.setProperty('--cyber-primary', currentThemeData.primary);
    root.style.setProperty('--cyber-secondary', currentThemeData.secondary);
    root.style.setProperty('--cyber-warning', currentThemeData.warning);
    root.style.setProperty('--cyber-accent', currentThemeData.accent);
    root.style.setProperty('--cyber-danger', currentThemeData.danger);
  }, [currentTheme, currentThemeData]);

  const triggerMorphing = () => {
    setIsMorphing(true);
    setTimeout(() => setIsMorphing(false), 2000);
  };

  const getRandomTheme = () => {
    const themeKeys = Object.keys(themes);
    const randomKey = themeKeys[Math.floor(Math.random() * themeKeys.length)];
    setCurrentTheme(randomKey);
  };

  return (
    <div className="cyber-card-glow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-cyber font-bold text-cyber-primary">
          <Palette className="inline-block mr-2 h-6 w-6" />
          Dynamic Color Themes
        </h2>
        <div className="text-sm text-cyber-secondary">
          Adaptive Color System
        </div>
      </div>

      {/* Theme Selector Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {Object.entries(themes).map(([key, theme]) => {
          const IconComponent = theme.icon;
          const isActive = currentTheme === key;
          
          return (
            <button
              key={key}
              onClick={() => setCurrentTheme(key)}
              className={`cyber-card p-6 text-center transition-all duration-500 ${
                isActive ? 'scale-105 ring-2 ring-cyber-primary' : 'hover:scale-105'
              }`}
              style={{
                background: isActive 
                  ? `linear-gradient(45deg, ${theme.primary}20, ${theme.secondary}20)` 
                  : undefined,
                borderColor: isActive ? theme.primary : undefined
              }}
            >
              <IconComponent 
                className={`h-12 w-12 mx-auto mb-3 transition-all duration-500 ${
                  isActive ? 'animate-pulse' : ''
                }`}
                style={{ color: theme.primary }}
              />
              <div className="font-bold mb-2">{theme.name}</div>
              <div className="text-sm text-muted-foreground">
                {isActive ? 'Active Theme' : 'Click to Apply'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Color Palette Display */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-cyber-secondary">Current Color Palette</h3>
        <div className="cyber-card p-6">
          <div className="grid md:grid-cols-5 gap-4">
            {Object.entries({
              Primary: currentThemeData.primary,
              Secondary: currentThemeData.secondary,
              Warning: currentThemeData.warning,
              Accent: currentThemeData.accent,
              Danger: currentThemeData.danger
            }).map(([name, color]) => (
              <div key={name} className="text-center">
                <div 
                  className="w-16 h-16 mx-auto mb-2 rounded-lg border-2 border-cyber-light"
                  style={{ backgroundColor: color }}
                />
                <div className="text-sm font-bold">{name}</div>
                <div className="text-xs font-mono text-muted-foreground">{color}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Theme Controls */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="cyber-card p-4">
          <h4 className="font-bold mb-4 text-cyber-primary">Theme Controls</h4>
          <div className="space-y-4">
            <button
              onClick={getRandomTheme}
              className="cyber-button w-full"
            >
              <Monitor className="inline-block mr-2 h-4 w-4" />
              Random Theme
            </button>
            <button
              onClick={triggerMorphing}
              className="cyber-button w-full"
            >
              <Zap className="inline-block mr-2 h-4 w-4" />
              Color Morph
            </button>
          </div>
        </div>

        <div className="cyber-card p-4">
          <h4 className="font-bold mb-4 text-cyber-primary">Color Intensity</h4>
          <div className="space-y-4">
            <div>
              <label className="text-sm">Intensity Level</label>
              <input
                type="range"
                min="0"
                max="100"
                value={colorIntensity}
                onChange={(e) => setColorIntensity(Number(e.target.value))}
                className="w-full mt-2"
              />
              <div className="text-xs text-muted-foreground mt-1">
                {colorIntensity}% intensity
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Color Demo */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 text-cyber-secondary">Dynamic Color Demo</h3>
        <div className="cyber-card p-6">
          <div 
            className={`text-4xl font-cyber font-bold text-center transition-all duration-1000 ${
              isMorphing ? 'animate-pulse' : ''
            }`}
            style={{
              background: isMorphing 
                ? `linear-gradient(45deg, ${currentThemeData.primary}, ${currentThemeData.secondary}, ${currentThemeData.accent})`
                : `linear-gradient(45deg, ${currentThemeData.primary}, ${currentThemeData.secondary})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: isMorphing ? 'blur(0.5px)' : 'blur(0px)'
            }}
          >
            DYNAMIC THEME
          </div>
          <div className="text-center mt-4">
            <div className="text-sm text-muted-foreground">
              {isMorphing ? 'MORPHING COLORS' : 'Theme Applied'}
            </div>
          </div>
        </div>
      </div>

      {/* Color Morphing Effects */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="cyber-card p-4 text-center">
          <div 
            className="w-20 h-20 mx-auto mb-4 rounded-full animate-pulse"
            style={{
              background: `conic-gradient(from 0deg, ${currentThemeData.primary}, ${currentThemeData.secondary}, ${currentThemeData.accent}, ${currentThemeData.primary})`
            }}
          />
          <div className="font-bold">Rotating Colors</div>
          <div className="text-sm text-muted-foreground">Dynamic gradient rotation</div>
        </div>

        <div className="cyber-card p-4 text-center">
          <div 
            className="w-20 h-20 mx-auto mb-4 rounded-lg animate-pulse"
            style={{
              background: `linear-gradient(45deg, ${currentThemeData.primary}${Math.floor(colorIntensity * 2.55)}, ${currentThemeData.secondary}${Math.floor(colorIntensity * 2.55)})`
            }}
          />
          <div className="font-bold">Intensity Control</div>
          <div className="text-sm text-muted-foreground">Adjustable opacity</div>
        </div>

        <div className="cyber-card p-4 text-center">
          <div 
            className="w-20 h-20 mx-auto mb-4 rounded-lg animate-pulse"
            style={{
              background: `radial-gradient(circle, ${currentThemeData.accent}, ${currentThemeData.primary})`
            }}
          />
          <div className="font-bold">Radial Gradient</div>
          <div className="text-sm text-muted-foreground">Circular color flow</div>
        </div>
      </div>

      {/* Theme Information */}
      <div className="cyber-card p-6">
        <h4 className="font-bold mb-4 text-cyber-primary">Theme Information</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-bold mb-2 text-cyber-secondary">Current Theme</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Name:</span>
                <span className="font-mono">{currentThemeData.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Primary:</span>
                <span className="font-mono">{currentThemeData.primary}</span>
              </div>
              <div className="flex justify-between">
                <span>Secondary:</span>
                <span className="font-mono">{currentThemeData.secondary}</span>
              </div>
            </div>
          </div>
          <div>
            <h5 className="font-bold mb-2 text-cyber-secondary">Theme Stats</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Themes:</span>
                <span className="font-mono">{Object.keys(themes).length}</span>
              </div>
              <div className="flex justify-between">
                <span>Intensity:</span>
                <span className="font-mono">{colorIntensity}%</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className={`font-mono ${isMorphing ? 'text-cyber-warning' : 'text-cyber-secondary'}`}>
                  {isMorphing ? 'MORPHING' : 'STABLE'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-Theme Cycling */}
      <div className="text-center">
        <div className="cyber-card p-4">
          <h4 className="font-bold mb-2 text-cyber-secondary">Auto-Theme Cycling</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Themes automatically cycle every 10 seconds for dynamic experience
          </p>
          <div className="flex justify-center space-x-4">
            <button className="cyber-button text-sm">
              <Sun className="inline-block mr-1 h-4 w-4" />
              Enable Auto
            </button>
            <button className="cyber-button text-sm">
              <Moon className="inline-block mr-1 h-4 w-4" />
              Disable Auto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicColorThemes; 