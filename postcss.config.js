export default {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {
        flexbox: 'no-2009',
        grid: 'autoplace',
      },
      ...(process.env.NODE_ENV === 'production'
        ? {
            cssnano: {
              preset: [
                'default',
                {
                  discardComments: {
                    removeAll: true,
                  },
                  colormin: false,
                },
              ],
            },
          }
        : {}),
    },
  };