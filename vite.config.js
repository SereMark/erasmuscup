/**
 * Vite Configuration
 */
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import viteCSPPlugin from './vite-csp-plugin';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');
  const isProd = mode === 'production';
  
  return {
    // Core plugins
    plugins: [
      // React with fast refresh for development
      react({ fastRefresh: true }),
      
      // Content Security Policy management
      viteCSPPlugin({ isProd }),
      
      // Progressive Web App configuration
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png', 'offline.html'],
        
        // Service worker configuration
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
          cleanupOutdatedCaches: true,
          maximumFileSizeToCacheInBytes: 4194304, // 4 MB
          navigationPreload: true,
          runtimeCaching: [
            // Google Fonts stylesheets caching
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 180, // 6 months
                },
                cacheableResponse: { statuses: [0, 200] }
              },
            },
            // Google Fonts webfonts caching
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 180, // 6 months
                },
                cacheableResponse: { statuses: [0, 200] }
              },
            },
            // Offline page caching
            {
              urlPattern: ({ url }) => url.origin === self.location.origin,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'html-cache',
                networkTimeoutSeconds: 10,
                plugins: [
                  {
                    handlerDidError: async () => 
                      caches.match('/offline.html')
                  }
                ]
              }
            }
          ],
        },
        
        // App manifest for PWA
        manifest: {
          name: 'Erasmus House Cup 2025',
          short_name: 'House Cup',
          description: 'The official digital hub of the Erasmus House Cup 2025',
          theme_color: '#9146ff',
          background_color: '#121214',
          display: 'standalone',
          orientation: 'portrait',
          icons: [
            {
              src: '/assets/icons/favicon-16x16.png',
              sizes: '16x16',
              type: 'image/png'
            },
            {
              src: '/assets/icons/favicon-32x32.png',
              sizes: '32x32',
              type: 'image/png'
            },
            {
              src: '/assets/icons/apple-touch-icon.png',
              sizes: '180x180',
              type: 'image/png'
            },
            {
              src: '/assets/icons/pwa-icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        }
      })
    ],
    
    // Path resolution and aliases
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@data': path.resolve(__dirname, './src/data'),
        'react': path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom')
      },
    },
    
    // Build configuration
    build: {
      outDir: 'dist',
      minify: isProd ? 'terser' : false,
      sourcemap: !isProd,
      terserOptions: isProd ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
        }
      } : undefined,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: ['framer-motion', 'recharts'],
            utils: ['gsap', 'react-intersection-observer'],
          },
        },
      },
    },
    
    // Development server configuration
    server: {
      port: parseInt(env.PORT || '3000', 10),
      open: true,
      cors: true,
      strictPort: false,
      
      // Hot Module Replacement optimized for WebSocket stability
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: parseInt(env.HMR_PORT || env.PORT || '3000', 10),
        clientPort: parseInt(env.CLIENT_PORT || env.PORT || '3000', 10),
        timeout: 60000,
        overlay: true,
        path: '/',
        server: null, // Use the existing server
      },
      
      // File system handling
      watch: {
        usePolling: false, // Only enable for network filesystems
      },
      fs: {
        strict: false, // Allow serving files outside the project root
      },
    },
    
    // Dependency optimization
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'framer-motion',
        'recharts',
        'gsap',
        'react-intersection-observer',
        'react-helmet-async',
        '@vitejs/plugin-react'
      ],
      esbuildOptions: {
        platform: 'browser',
        define: {
          global: 'globalThis'
        }
      },
    },
    
    // esbuild configuration
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
  };
});