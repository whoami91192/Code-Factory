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
        algorithms: ['gzip'],
        exclude: [/\.(br)$ /, /\.(gz)$/],
      }),
      // Brotli compression for even better compression
      compression({
        algorithms: ['brotliCompress'],
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
      // Optimize chunk splitting for better caching and mobile performance
      rollupOptions: {
        output: {
          manualChunks: {
            // Core React libraries - critical for initial load
            'react-vendor': ['react', 'react-dom'],
            // Routing - load when needed
            'router': ['react-router-dom'],
            // UI components - load when needed
            'ui-components': [
              '@radix-ui/react-dialog', 
              '@radix-ui/react-dropdown-menu', 
              '@radix-ui/react-icons', 
              '@radix-ui/react-label', 
              '@radix-ui/react-slot', 
              '@radix-ui/react-toast'
            ],
            // 3D and visualization - heavy, load on demand
            'visualization': ['three', 'd3'],
            // Utilities - small, can be inlined
            'utils': ['clsx', 'class-variance-authority', 'tailwind-merge'],
            // Icons - load when needed
            'icons': ['lucide-react'],
            // Heavy components - separate chunks for lazy loading
            'heavy-components': [
              './src/components/NetworkTopology3D',
              './src/components/LiveThreatMap',
              './src/components/MalwareAnalysisChart',
              './src/components/SecurityDashboard',
              './src/components/InteractiveTerminal'
            ],
            // Security and utils - critical for functionality
            'security-utils': [
              './src/utils/security.js',
              './src/utils/gtm.js',
              './src/utils/structured-data.js'
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
            if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
              return `fonts/[name]-[hash].${ext}`;
            }
            return `assets/[name]-[hash].${ext}`;
          },
        },
      },
      // Optimize build performance and reduce bundle size
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
          pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug', 'console.warn'] : [],
          passes: 2,
          // Remove unused code
          unused: true,
          // Remove dead code
          dead_code: true,
        },
        mangle: {
          toplevel: true,
          // Mangle property names for better compression
          properties: {
            regex: /^_/,
          },
        },
        format: {
          comments: false,
        },
      },
      // Optimize for mobile performance
      target: 'es2015', // Better compatibility for mobile browsers
      // Reduce chunk size warnings threshold for mobile
      chunkSizeWarningLimit: 1000,
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Optimize assets
      assetsInlineLimit: 4096, // 4kb
    },
    // Optimize CSS for mobile
    css: {
      devSourcemap: mode === 'development'
    },
    // Optimize for mobile performance
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom'
      ],
      exclude: [
        'three',
        'd3'
      ],
      // Force pre-bundling for better performance
      force: true
    },
    // Mobile-specific optimizations
    define: {
      __DEV__: mode === 'development',
      __PROD__: mode === 'production'
    },
    // Optimize for mobile performance
    esbuild: {
      // Remove console.logs in production
      drop: mode === 'production' ? ['console', 'debugger'] : [],
      // Optimize for mobile
      target: 'es2015',
      // Remove unused code
      treeShaking: true,
    }
  }
}) 