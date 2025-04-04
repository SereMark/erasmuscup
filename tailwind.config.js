module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0e1622",
        secondary: "#1b2735",
        accent: "#10B981",
        "accent-dark": "#059669"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      backgroundSize: {
        "200": "200%"
      },
      keyframes: {
        gradientBackground: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" }
        }
      },
      animation: {
        gradientBackground: "gradientBackground 8s ease infinite"
      }
    }
  },
  plugins: []
};