/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0f",
        panel: "#12131a",
        muted: "#9aa0b2",
        line: "rgba(255,255,255,0.08)",
        accent: "#7c5cff",
        accent2: "#22d3ee",
        accent3: "#f472b6",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(124,92,255,0.15)",
        card: "0 20px 60px rgba(0,0,0,0.4)",
        cardLight: "0 20px 60px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
