import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { generateCspPlugin } from 'vite-plugin-node-csp';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    plugins: [
      react({ fastRefresh: !isProd }),

      // PWA & service-worker only in production
      isProd &&
        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: [
            'favicon.ico',
            'robots.txt',
            'apple-touch-icon.png',
            'assets/icons/android-chrome-192x192.png',
            'assets/icons/android-chrome-512x512.png'
          ],
          manifest: {
            name: 'Erasmus House Cup 2025',
            short_name: 'ErasmusCup',
            description:
              'Official website for the Erasmus House Cup 2025—a competition of house pride, weekly events, and challenges.',
            theme_color: '#9146ff',
            background_color: '#0a0b0e',
            display: 'standalone',
            icons: [
              {
                src: '/assets/icons/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png'
              },
              {
                src: '/assets/icons/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable'
              }
            ]
          },
          workbox: {
            navigationPreload: false,
            runtimeCaching: [
              // Google-Fonts stylesheet → Stale-While-Revalidate
              {
                urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*$/i,
                handler: 'StaleWhileRevalidate',
                options: {
                  cacheName: 'google-fonts-stylesheets',
                  expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 60 * 60 * 24 * 365
                  },
                  cacheableResponse: { statuses: [0, 200] }
                }
              },
              // Google-Fonts files → CacheFirst
              {
                urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*$/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'gstatic-fonts-files',
                  expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 60 * 60 * 24 * 365
                  },
                  cacheableResponse: { statuses: [0, 200] }
                }
              },
              // Images
              {
                urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'images-cache',
                  expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 60 * 60 * 24 * 30
                  }
                }
              },
              // JS / CSS bundles
              {
                urlPattern: /\.(?:js|css)$/i,
                handler: 'StaleWhileRevalidate',
                options: {
                  cacheName: 'static-resources',
                  expiration: {
                    maxEntries: 30,
                    maxAgeSeconds: 60 * 60 * 24 * 7
                  }
                }
              }
            ]
          },
          devOptions: { enabled: false }
        }),

      // Content-Security-Policy – prod only
      isProd &&
        generateCspPlugin({
          policy: {
            'default-src': ["'self'"],
            'script-src': ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
            'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
            'font-src': ["'self'", 'https://fonts.gstatic.com'],
            'img-src': ["'self'", 'data:', 'blob:', 'https://cdn.jsdelivr.net'],
            'connect-src': [
              "'self'",
              'ws:',
              'wss:',
              'https://fonts.googleapis.com',
              'https://fonts.gstatic.com'
            ],
            'frame-src': ["'none'"],
            'object-src': ["'none'"]
          }
        })
    ].filter(Boolean),

    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@components': resolve(__dirname, './src/components'),
        '@pages': resolve(__dirname, './src/pages'),
        '@assets': resolve(__dirname, './src/assets'),
        '@data': resolve(__dirname, './src/data'),
        '@hooks': resolve(__dirname, './src/hooks'),
        '@utils': resolve(__dirname, './src/utils')
      }
    },

    build: {
      target: 'es2015',
      outDir: 'dist',
      assetsDir: 'assets',
      minify: isProd ? 'esbuild' : false,
      sourcemap: !isProd,
      reportCompressedSize: isProd,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-ui': ['framer-motion', 'gsap', 'recharts'],
            'vendor-three': ['three']
          }
        }
      }
    },

    server: {
      port: 3000,
      strictPort: false,
      open: true,
      cors: true,
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 3000,
        overlay: true
      }
    },

    preview: {
      port: 5000,
      strictPort: false,
      open: true
    },

    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' }
    }
  };
});