/**
 * Custom Content Security Policy (CSP) plugin for Vite
 * 
 * This plugin adds CSP headers to development server responses
 * and injects a CSP meta tag into the HTML for production builds.
 */

// Define CSP content once to ensure consistency
const CSP_POLICY = [
  // Default fallback
  "default-src 'self'",
  
  // Scripts - allow inline for dev tools
  "script-src 'self' 'unsafe-inline'",
  
  // Styles - allow Google Fonts
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  
  // Fonts - allow Google Fonts
  "font-src 'self' data: https://fonts.googleapis.com https://fonts.gstatic.com",
  
  // Images - allow data URIs and HTTPS
  "img-src 'self' data: https: blob:",
  
  // Connect - allow Google Fonts
  "connect-src 'self' https://fonts.googleapis.com",
  
  // Manifests
  "manifest-src 'self'",
  
  // Workers
  "worker-src 'self' blob:"
].join("; ");

export default function viteCSPPlugin() {
  return {
    name: 'vite-csp-plugin',
    
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Set CSP headers for all responses
        res.setHeader('Content-Security-Policy', CSP_POLICY);
        
        // Set correct MIME type for JavaScript files
        if (req.url.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript');
        }
        
        // Add other security headers
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        
        next();
      });
    },
    
    transformIndexHtml(html) {
      // Inject CSP meta tag if not already present
      if (!html.includes('<meta http-equiv="Content-Security-Policy"')) {
        return html.replace(
          '<head>',
          `<head>\n    <meta http-equiv="Content-Security-Policy" content="${CSP_POLICY}">`
        );
      }
      return html;
    }
  };
}