module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      xs: "480px",
      ...require("tailwindcss/defaultTheme").screens,
    },
    extend: {
      fontFamily: {
        sans: ["Inter var", "Inter", "sans-serif"],
        display: ["Inter var", "Inter", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      colors: {
        brand: {
          50: "#f9f5ff",
          100: "#f0e6ff",
          200: "#e2d1ff",
          300: "#c9a0ff",
          400: "#ac73ff",
          500: "#9146ff",
          600: "#7e21fd",
          700: "#6b15e6",
          800: "#5a14bc",
          900: "#4b1597",
          950: "#2c0b67",
        },
        accent: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#d4af37",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
          950: "#422006",
        },
        dark: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
        shimmer: "shimmer 2s linear infinite",
        "spin-slow": "spin 6s linear infinite",
        gradient: "gradient 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        glass: "linear-gradient(to right bottom,rgba(255,255,255,0.05),rgba(255,255,255,0.02))",
        "glow-radial": "radial-gradient(circle at center,var(--tw-gradient-stops))",
      },
      boxShadow: {
        "glow-sm": "0 0 10px rgba(145,70,255,0.2)",
        "glow-md": "0 0 20px rgba(145,70,255,0.3)",
        glass: "0 8px 32px 0 rgba(31,38,135,0.37)",
        "inner-light": "inset 0 1px 0 0 rgba(255,255,255,0.05)",
      },
      backdropBlur: {
        xs: "2px",
      },
      scale: {
        102: "1.02",
      },
      aspectRatio: {
        card: "5 / 7",
        video: "16 / 9",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      height: {
        "screen-small": "100svh",
        "dynamic-screen": "calc(var(--vh, 1vh) * 100)",
      },
      minHeight: {
        "screen-small": "100svh",
        "dynamic-screen": "calc(var(--vh, 1vh) * 100)",
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    function ({ addUtilities, theme, addBase }) {
      addBase({
        ':root': {
          '--vh': '1vh',
        },
      });
      
      const newUtilities = {
        ".text-shadow-sm": {
          "text-shadow": "0 1px 2px rgba(0,0,0,0.3)",
        },
        ".text-shadow-md": {
          "text-shadow": "0 4px 8px rgba(0,0,0,0.12),0 2px 4px rgba(0,0,0,0.08)",
        },
        ".text-glow": {
          "text-shadow": `0 0 10px ${theme("colors.brand.400")},0 0 20px ${theme("colors.brand.500")}`,
        },
        ".bg-glass": {
          background: "rgba(255,255,255,0.05)",
          "backdrop-filter": "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          "box-shadow": "0 8px 32px rgba(0,0,0,0.2)",
        },
        ".preserve-3d": {
          "transform-style": "preserve-3d",
        },
        ".perspective": {
          perspective: "1000px",
        },
        ".scrollbar-thin": {
          "scrollbar-width": "thin",
        },
        ".scrollbar-thin::-webkit-scrollbar": {
          width: "6px",
          height: "6px",
        },
        ".scrollbar-thin::-webkit-scrollbar-track": {
          backgroundColor: "rgba(0,0,0,0.1)",
        },
        ".scrollbar-thin::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: "9999px",
        },
        ".scrollbar-thin::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "rgba(255,255,255,0.15)",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};