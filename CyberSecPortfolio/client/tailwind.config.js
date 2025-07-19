/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        md: "2rem",
        lg: "2.5rem",
        xl: "3rem",
        "2xl": "4rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
        "3xl": "1600px",
      },
    },
    extend: {
      screens: {
        // Standard breakpoints
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px',
        '3xl': '1600px',
        '4xl': '1920px',
        
        // Mobile devices - iPhone series (Portrait)
        'mobile-s': '320px',      // iPhone SE (1st gen), iPhone 5/5S/5C
        'mobile-m': '375px',      // iPhone 6/7/8, iPhone X/XS, iPhone 12/13/14 mini
        'mobile-l': '390px',      // iPhone 12/13/14, iPhone 15
        'mobile-xl': '414px',     // iPhone 6/7/8 Plus, iPhone XR, iPhone 11
        'mobile-2xl': '428px',    // iPhone 14 Plus, iPhone 15 Plus
        
        // Mobile devices - iPhone series (Landscape)
        'mobile-s-land': '568px', // iPhone SE (1st gen), iPhone 5/5S/5C landscape
        'mobile-m-land': '667px', // iPhone 6/7/8 landscape
        'mobile-l-land': '844px', // iPhone 12/13/14 landscape
        'mobile-xl-land': '896px', // iPhone XR, iPhone 11 landscape
        'mobile-2xl-land': '926px', // iPhone 14 Plus, iPhone 15 Plus landscape
        
        // Mobile devices - Android series (Portrait)
        'android-s': '360px',     // Samsung Galaxy S8, S9, S10e
        'android-m': '384px',     // Google Pixel 4, 5
        'android-s23': '393px',   // Samsung Galaxy S23
        'android-l': '412px',     // Samsung Galaxy S10, S20, S21
        'android-xl': '450px',    // Samsung Galaxy Note series
        'android-2xl': '480px',   // Samsung Galaxy S22 Ultra, Note 20 Ultra
        
        // Mobile devices - Android series (Landscape)
        'android-s-land': '640px', // Samsung Galaxy S8, S9, S10e landscape
        'android-m-land': '720px', // Google Pixel 4, 5 landscape
        'android-l-land': '800px', // Samsung Galaxy S10, S20, S21 landscape
        'android-xl-land': '900px', // Samsung Galaxy Note series landscape
        
        // Small tablets (Portrait)
        'tablet-s': '600px',      // Samsung Galaxy Tab A, iPad mini (portrait)
        'tablet-m': '768px',      // iPad (portrait), iPad Air
        'tablet-l': '810px',      // iPad (landscape)
        'tablet-xl': '834px',     // iPad Pro 10.5", iPad Air (landscape)
        
        // Small tablets (Landscape)
        'tablet-s-land': '800px', // Samsung Galaxy Tab A landscape
        'tablet-m-land': '1024px', // iPad (landscape), iPad Air landscape
        'tablet-l-land': '1080px', // iPad landscape
        'tablet-xl-land': '1112px', // iPad Pro 10.5" landscape
        
        // Large tablets (Portrait)
        'tablet-2xl': '900px',    // Samsung Galaxy Tab S series
        'tablet-3xl': '1024px',   // iPad Pro 11", iPad Pro 12.9" (portrait)
        'tablet-4xl': '1080px',   // iPad Pro 12.9" (landscape)
        
        // Large tablets (Landscape)
        'tablet-2xl-land': '1200px', // Samsung Galaxy Tab S series landscape
        'tablet-3xl-land': '1366px', // iPad Pro 11" landscape
        'tablet-4xl-land': '1440px', // iPad Pro 12.9" landscape
        
        // Foldable devices
        'fold-s': '280px',        // Samsung Galaxy Z Flip (folded)
        'fold-m': '717px',        // Samsung Galaxy Z Fold (folded)
        'fold-l': '1768px',       // Samsung Galaxy Z Fold (unfolded)
        
        // Laptop and Desktop
        'laptop': '1024px',
        'laptop-l': '1280px',
        'laptop-xl': '1440px',
        'desktop': '1536px',
        'desktop-l': '1920px',
        'desktop-xl': '2560px',   // 2K displays
        'desktop-2xl': '3840px',  // 4K displays
        
        // High DPI displays
        'retina': '1920px',       // Retina displays
        '4k': '3840px',           // 4K displays
        '8k': '7680px',           // 8K displays (future-proofing)
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // 2025 Cybersecurity theme colors
        cyber: {
          primary: "#0080FF",
          secondary: "#00E676",
          accent: "#9C27B0",
          warning: "#FFB300",
          danger: "#FF1744",
          success: "#00C853",
          dark: "#0F1419",
          darker: "#070A0C",
          light: "#1A1F26",
          lighter: "#252A32",
          card: "#141A20",
          terminal: "#070A0C",
        },
        purple: {
          primary: "#6A0DAD",
          secondary: "#8B2FD9",
          accent: "#A85AFF",
          dark: "#4A0A7A",
          darker: "#2A0645",
          light: "#C084FF",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 5px #0080FF, 0 0 10px #0080FF, 0 0 15px #0080FF" },
          "50%": { boxShadow: "0 0 10px #0080FF, 0 0 20px #0080FF, 0 0 30px #0080FF" },
        },
        "matrix": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "typing": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "blink": {
          "0%, 50%": { opacity: 1 },
          "51%, 100%": { opacity: 0 },
        },
        "skillBarFill": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.5s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
        "matrix": "matrix 3s linear infinite",
        "typing": "typing 3s steps(40, end)",
        "blink": "blink 1s infinite",
        "skillBarFill": "skillBarFill 1.5s ease-out forwards",
      },
      fontFamily: {
        mono: ["Fira Code", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
        cyber: ["Orbitron", "monospace"],
      },
      spacing: {
        // Mobile-specific spacing
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
        // Touch-friendly spacing
        'touch': '44px', // Minimum touch target size
        'touch-lg': '48px',
        'touch-xl': '56px',
      },
      fontSize: {
        // Mobile-optimized font sizes
        'xs-mobile': ['0.75rem', { lineHeight: '1rem' }],
        'sm-mobile': ['0.875rem', { lineHeight: '1.25rem' }],
        'base-mobile': ['1rem', { lineHeight: '1.5rem' }],
        'lg-mobile': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl-mobile': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl-mobile': ['1.5rem', { lineHeight: '2rem' }],
        '3xl-mobile': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl-mobile': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl-mobile': ['3rem', { lineHeight: '1' }],
        '6xl-mobile': ['3.75rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 