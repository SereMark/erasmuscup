/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '480px',
      ...require('tailwindcss/defaultTheme').screens,
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        'brand-gradient-start': '#7b1b33',
        'brand-gradient-end': '#d4af37'
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ]
}