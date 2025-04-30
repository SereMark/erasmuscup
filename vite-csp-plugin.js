/**
 * Content Security Policy (CSP) Plugin for Vite
 * 
 * Adds and manages security policies for both development and production environments:
 * - Injects CSP headers into server responses
 * - Updates CSP meta tags in HTML
 * - Applies different policies based on environment
 */

// Development CSP: More permissive for local development tooling
const DEV_CSP_POLICY = [
  // Core directives
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.googleapis.com https://fonts.gstatic.com",
  
  // Media and connection directives
  "img-src 'self' data: blob: https: https://cdn.jsdelivr.net",
  "connect-src 'self' ws://localhost:* wss://localhost:* ws: wss: https://fonts.googleapis.com https://cdn.jsdelivr.net",
  
  // Additional resource types
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "frame-src 'self'"
].join("; ");

// Production CSP: Stricter for security in deployed environments
const PROD_CSP_POLICY = [
  // Core directives - more restrictive
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.googleapis.com https://fonts.gstatic.com",
  
  // Media and connection directives - limited to required sources
  "img-src 'self' data: blob: https://cdn.jsdelivr.net",
  "connect-src 'self' https://fonts.googleapis.com https://cdn.jsdelivr.net",
  
  // Additional resource types
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  
  // Security enhancements
  "upgrade-insecure-requests"
].join("; ");

/**
 * Creates a Vite plugin that manages CSP for both development and production
 * @param {Object} options Plugin configuration options
 * @param {boolean} options.isProd Whether running in production mode
 * @returns {Object} Vite plugin object
 */
export default function viteCSPPlugin({ isProd = false } = {}) {
  const CSP_POLICY = isProd ? PROD_CSP_POLICY : DEV_CSP_POLICY;
  
  return {
    name: 'vite-csp-plugin',
    
    // Add CSP headers to development server responses
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Security headers
        res.setHeader('Content-Security-Policy', CSP_POLICY);
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');
        
        // Development-specific headers
        if (!isProd) {
          res.setHeader('Cache-Control', 'no-store, max-age=0');
        }
        
        // Production-specific headers
        if (isProd) {
          res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
        }
        
        // Fix for JavaScript MIME types
        if (req.url?.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript');
        }
        
        next();
      });
    },
    
    // Update HTML with correct CSP meta tag
    transformIndexHtml(html) {
      // Replace existing CSP meta tag or add new one
      const cspMetaPattern = /<meta\s+http-equiv=["']Content-Security-Policy["'][^>]*>/i;
      const cspMetaTag = `<meta http-equiv="Content-Security-Policy" content="${CSP_POLICY}">`;
      
      if (cspMetaPattern.test(html)) {
        return html.replace(cspMetaPattern, cspMetaTag);
      } else {
        return html.replace('<head>', `<head>\n    ${cspMetaTag}`);
      }
    }
  };
}