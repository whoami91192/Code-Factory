import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { compression } from 'vite-plugin-compression2'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      react(),
      // Gzip compression for better performance
      compression({
        algorithm: 'gzip',
        exclude: [/\.(br)$ /, /\.(gz)$/],
      }),
      // Brotli compression for even better compression
      compression({
        algorithm: 'brotliCompress',
        exclude: [/\.(br)$ /, /\.(gz)$/],
      }),
      // Bundle analyzer for optimization insights
      visualizer({
        filename: 'dist/stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: 'dist',
      // Enable source maps for debugging
      sourcemap: mode === 'development',
      // Optimize chunk splitting for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            // Core React libraries
            'react-vendor': ['react', 'react-dom'],
            // Routing
            'router': ['react-router-dom'],
            // UI components
            'ui-components': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-icons', '@radix-ui/react-label', '@radix-ui/react-slot', '@radix-ui/react-toast'],
            // 3D and visualization
            'visualization': ['three', 'd3'],
            // Utilities
            'utils': ['clsx', 'class-variance-authority', 'tailwind-merge'],
            // Icons
            'icons': ['lucide-react'],
            // Heavy components - separate chunks
            'heavy-components': [
              './src/components/NetworkTopology3D',
              './src/components/LiveThreatMap',
              './src/components/MalwareAnalysisChart',
              './src/components/SecurityDashboard',
              './src/components/InteractiveTerminal'
            ],
          },
          // Optimize file names for better caching
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
            return `js/[name]-[hash].js`;
          },
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/\.(css)$/.test(assetInfo.name)) {
              return `css/[name]-[hash].${ext}`;
            }
            if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
              return `images/[name]-[hash].${ext}`;
            }
            return `assets/[name]-[hash].${ext}`;
          },
        },
      },
      // Optimize build performance
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
          pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug'] : [],
        },
        mangle: {
          safari10: true,
        },
      },
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Optimize assets
      assetsInlineLimit: 4096, // 4kb
      // Enable tree shaking
      target: 'esnext',
    },
    preview: {
      port: 3000,
      host: true,
    },
    define: {
      'process.env.VITE_RECAPTCHA_SITE_KEY': JSON.stringify(env.VITE_RECAPTCHA_SITE_KEY),
    },
    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@radix-ui/react-dialog',
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-icons',
        '@radix-ui/react-label',
        '@radix-ui/react-slot',
        '@radix-ui/react-toast',
        'clsx',
        'class-variance-authority',
        'tailwind-merge',
        'lucide-react',
      ],
      exclude: [
        // Exclude heavy components from pre-bundling
        './src/components/NetworkTopology3D',
        './src/components/LiveThreatMap',
        './src/components/MalwareAnalysisChart',
      ],
    },
    // Performance optimizations
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
  }
}) 