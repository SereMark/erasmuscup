import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import viteCSPPlugin from './vite-csp-plugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  
  return {
    plugins: [
      react(),
      viteCSPPlugin(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
          cleanupOutdatedCaches: true,
          maximumFileSizeToCacheInBytes: 4194304, // 4 MB
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                },
              },
            },
          ],
        },
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
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@data': path.resolve(__dirname, './src/data'),
        '@assets': path.resolve(__dirname, './public/assets'),
      },
    },
    
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
    
    server: {
      port: 3000,
      open: true,
      cors: true,
    },
    
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'framer-motion',
        'recharts',
        'gsap',
        'react-intersection-observer',
        'react-helmet-async'
      ],
    },
    
    // Performance config
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
  };
});