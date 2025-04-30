export default {
    plugins: {
      // Include any Tailwind directives at the top of the CSS file
      'tailwindcss/nesting': {},
      
      // Process Tailwind CSS directives
      tailwindcss: {},
      
      // Autoprefixer to add vendor prefixes
      autoprefixer: {
        flexbox: 'no-2009', // Don't add old flexbox prefixes
        grid: 'autoplace', // Enable grid prefixes for IE
      },
      
      // Minify CSS in production
      ...(process.env.NODE_ENV === 'production'
        ? {
            cssnano: {
              preset: [
                'default',
                {
                  discardComments: { removeAll: true },
                  colormin: true, // Minify colors
                  convertValues: true, // Convert values when it's safe
                  reduceIdents: false, // Don't minify identifiers (can break CSS animations)
                  reduceInitial: true, // Optimize initial values
                  svgo: false, // Don't optimize SVGs in CSS
                  normalizeWhitespace: true, // Remove whitespace
                  minifySelectors: true, // Minify selectors
                  mergeLonghand: true, // Merge longhand properties
                },
              ],
            },
          }
        : {}),
    },
  };