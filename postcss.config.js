/**
 * PostCSS configuration
 * - Sets up TailwindCSS with nesting
 * - Configures autoprefixer for cross-browser compatibility
 * - Adds cssnano for production builds to minify CSS
 */

export default {
  plugins: {
    // Enable CSS nesting for better organization
    'tailwindcss/nesting': {},
    
    // Process Tailwind directives
    tailwindcss: {},
    
    // Add vendor prefixes automatically
    autoprefixer: {
      flexbox: 'no-2009', // Don't add old 2009 spec flexbox prefixes
      grid: 'autoplace',  // Add prefixes for CSS Grid where needed
    },
    
    // Only use cssnano in production to minimize CSS
    ...(process.env.NODE_ENV === 'production'
      ? {
          cssnano: {
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true, // Remove all comments
                },
                colormin: false,   // Keep color formats to maintain compatibility
                mergeLonghand: true, // Merge longhand properties
                reduceIdents: false, // Don't change identifiers for animations
              },
            ],
          },
        }
      : {}),
  },
};