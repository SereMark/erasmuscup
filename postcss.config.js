/**
 * PostCSS Configuration
 * Handles CSS processing, optimization, and browser compatibility
 */

// Detect production environment across different contexts
const isProd = 
  (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') ||
  (typeof import.meta !== 'undefined' && import.meta.env?.PROD === true);

export default {
  plugins: {
    // Process Tailwind and CSS nesting
    'tailwindcss/nesting': {},
    'tailwindcss': {},
    
    // Cross-browser compatibility
    'autoprefixer': {
      flexbox: 'no-2009',
      grid: 'autoplace',
      overrideBrowserslist: [
        '>= 1%',
        'last 2 versions',
        'not dead',
        'Chrome >= 60',
        'Firefox >= 60',
        'Safari >= 12',
        'iOS >= 12'
      ]
    },
    
    // Production-only optimizations
    ...(isProd ? {
      'cssnano': {
        preset: [
          'default',
          {
            // Content optimizations
            discardComments: { removeAll: true },
            normalizeWhitespace: true,
            
            // Value optimizations
            colormin: true,
            minifyFontValues: true,
            
            // Property optimizations
            mergeLonghand: true,
            reduceIdents: true,
            
            // Disabled optimizations (potential issues)
            autoprefixer: false,    // Already handled separately
            mergeRules: false,      // Preserves specificity
            zindex: false           // Preserves stacking context
          },
        ],
      },
    } : {}),
  },
};