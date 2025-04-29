/**
 * CSP plugin for Vite
 */
export default function viteCSPPlugin() {
  // Define CSP content once to ensure consistency
  const cspContent = "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline'; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' data: https://fonts.googleapis.com https://fonts.gstatic.com; " +
    "img-src 'self' data: https: blob:; " +
    "connect-src 'self' https://fonts.googleapis.com; " +
    "manifest-src 'self'; " +
    "worker-src 'self' blob:;";

  return {
    name: 'vite-csp-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Set CSP headers for all responses
        res.setHeader('Content-Security-Policy', cspContent);
        
        // Set correct MIME type for JavaScript files
        if (req.url.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript');
        }
        
        next();
      });
    },
    
    transformIndexHtml(html) {
      // Inject CSP meta tag if not already present
      if (!html.includes('<meta http-equiv="Content-Security-Policy"')) {
        return html.replace(
          '<head>',
          `<head>\n    <meta http-equiv="Content-Security-Policy" content="${cspContent}">`
        );
      }
      return html;
    }
  };
}