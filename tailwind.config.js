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
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
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
        house: {
          theHoo: {
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
          },
          brewCrew: {
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
          },
          redStorm: {
            50: "#fff1f2",
            100: "#ffe4e6",
            200: "#fecdd3",
            300: "#fda4af",
            400: "#fb7185",
            500: "#e11d48",
            600: "#be123c",
            700: "#9f1239",
            800: "#881337",
            900: "#4c0519",
          },
          deepJungle: {
            50: "#ecfdf5",
            100: "#d1fae5",
            200: "#a7f3d0",
            300: "#6ee7b7",
            400: "#34d399",
            500: "#10b981",
            600: "#059669",
            700: "#047857",
            800: "#065f46",
            900: "#064e3b",
          },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
        shimmer: "shimmer 2s linear infinite",
        "bounce-slow": "bounce 3s infinite",
        "spin-slow": "spin 6s linear infinite",
        glow: "glow 4s ease-in-out infinite",
        gradient: "gradient 8s linear infinite",
        "delay-1000": "delay-1000 1s forwards",
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
        glow: {
          "0%,100%": { opacity: "0.8" },
          "50%": { opacity: "0.4" },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "delay-1000": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%,var(--tw-gradient-stops))",
        glass: "linear-gradient(to right bottom,rgba(255,255,255,0.05),rgba(255,255,255,0.02))",
        "glow-radial": "radial-gradient(circle at center,var(--tw-gradient-stops))",
        "glass-gradient": "linear-gradient(to right bottom,rgba(255,255,255,0.1),rgba(255,255,255,0.05))",
        "gradient-theHoo":
          "linear-gradient(to right, var(--color-house-theHoo-500), var(--color-house-theHoo-700))",
        "gradient-brewCrew":
          "linear-gradient(to right, var(--color-house-brewCrew-500), var(--color-house-brewCrew-700))",
        "gradient-redStorm":
          "linear-gradient(to right, var(--color-house-redStorm-500), var(--color-house-redStorm-700))",
        "gradient-deepJungle":
          "linear-gradient(to right, var(--color-house-deepJungle-500), var(--color-house-deepJungle-700))",
      },
      boxShadow: {
        "glow-sm": "0 0 10px rgba(145,70,255,0.2)",
        "glow-md": "0 0 20px rgba(145,70,255,0.3)",
        "glow-lg": "0 0 30px rgba(145,70,255,0.4)",
        neon: "0 0 5px theme(colors.brand.400),0 0 20px theme(colors.brand.500)",
        glass: "0 8px 32px 0 rgba(31,38,135,0.37)",
        "inner-light": "inset 0 1px 0 0 rgba(255,255,255,0.05)",
      },
      backdropBlur: {
        xs: "2px",
      },
      scale: {
        102: "1.02",
        103: "1.03",
        105: "1.05",
      },
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
      },
      aspectRatio: {
        card: "5 / 7",
        video: "16 / 9",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    function ({ addUtilities, theme }) {
      const newUtilities = {
        ".text-shadow": {
          "text-shadow": "0 2px 4px rgba(0,0,0,0.1)",
        },
        ".text-shadow-md": {
          "text-shadow": "0 4px 8px rgba(0,0,0,0.12),0 2px 4px rgba(0,0,0,0.08)",
        },
        ".text-shadow-lg": {
          "text-shadow": "0 15px 30px rgba(0,0,0,0.11),0 5px 15px rgba(0,0,0,0.08)",
        },
        ".text-shadow-none": {
          "text-shadow": "none",
        },
        ".text-glow": {
          "text-shadow": `0 0 10px ${theme("colors.brand.400")},0 0 20px ${theme(
            "colors.brand.500"
          )}`,
        },
        ".bg-glass": {
          background: "rgba(255,255,255,0.05)",
          "backdrop-filter": "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          "box-shadow": "0 8px 32px rgba(0,0,0,0.2)",
        },
        ".bg-glass-dark": {
          background: "rgba(0,0,0,0.4)",
          "backdrop-filter": "blur(10px)",
          border: "1px solid rgba(255,255,255,0.05)",
          "box-shadow": "0 8px 32px rgba(0,0,0,0.3)",
        },
        ".backdrop-saturate": {
          "backdrop-filter": "saturate(180%) blur(10px)",
        },
        ".mask-image-radial": {
          "mask-image": "radial-gradient(circle at center,black 50%,transparent 80%)",
        },
        ".rotate-y-180": {
          transform: "rotateY(180deg)",
        },
        ".preserve-3d": {
          "transform-style": "preserve-3d",
        },
        ".perspective": {
          perspective: "1000px",
        },
        ".backdrop-invert": {
          "backdrop-filter": "invert(100%)",
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
        ".glass-card": {
          background: "rgba(255, 255, 255, 0.05)",
          "backdrop-filter": "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          "box-shadow": "0 8px 32px rgba(0, 0, 0, 0.2)",
          position: "relative",
          overflow: "hidden",
          "border-radius": "1rem",
        },
        ".house-theHoo": {
          background: "var(--gradient-house-theHoo)",
          color: "var(--color-house-theHoo-400)",
        },
        ".house-brewCrew": {
          background: "var(--gradient-house-brewCrew)",
          color: "var(--color-house-brewCrew-400)",
        },
        ".house-redStorm": {
          background: "var(--gradient-house-redStorm)",
          color: "var(--color-house-redStorm-400)",
        },
        ".house-deepJungle": {
          background: "var(--gradient-house-deepJungle)",
          color: "var(--color-house-deepJungle-400)",
        },
        ".gradient-theHoo": {
          background: "var(--gradient-house-theHoo)",
        },
        ".gradient-brewCrew": {
          background: "var(--gradient-house-brewCrew)",
        },
        ".gradient-redStorm": {
          background: "var(--gradient-house-redStorm)",
        },
        ".gradient-deepJungle": {
          background: "var(--gradient-house-deepJungle)",
        },
        ".bg-house-theHoo": {
          backgroundColor: "var(--color-house-theHoo-500)",
        },
        ".bg-house-brewCrew": {
          backgroundColor: "var(--color-house-brewCrew-500)",
        },
        ".bg-house-redStorm": {
          backgroundColor: "var(--color-house-redStorm-500)",
        },
        ".bg-house-deepJungle": {
          backgroundColor: "var(--color-house-deepJungle-500)",
        },
        ".text-house-theHoo": {
          color: "var(--color-house-theHoo-400)",
        },
        ".text-house-brewCrew": {
          color: "var(--color-house-brewCrew-400)",
        },
        ".text-house-redStorm": {
          color: "var(--color-house-redStorm-400)",
        },
        ".text-house-deepJungle": {
          color: "var(--color-house-deepJungle-400)",
        },
        ".border-house-theHoo": {
          borderColor: "var(--color-house-theHoo-500)",
        },
        ".border-house-brewCrew": {
          borderColor: "var(--color-house-brewCrew-500)",
        },
        ".border-house-redStorm": {
          borderColor: "var(--color-house-redStorm-500)",
        },
        ".border-house-deepJungle": {
          borderColor: "var(--color-house-deepJungle-500)",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};