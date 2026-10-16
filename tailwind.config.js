/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#101B2B",
          slate: "#1D2D40",
          ivory: "#F7F6F2",
          teal: "#19B6A4",
          "teal-hover": "#15A392",
          gold: "#C8A96B",
          "cool-gray": "#AAB5C2",
          charcoal: "#1D2D40",
          emerald: "#19B6A4",
          "emerald-dark": "#15A392",
          "emerald-light": "rgba(25, 182, 164, 0.15)",
          border: "#DDE3E8",
          "border-dark": "#34465A",
          surface: "#F7F6F2",
          white: "#FFFFFF",
        },
        midnight: "#101B2B",
        deepslate: "#1D2D40",
        ivory: "#F7F6F2",
        teal: {
          brand: "#19B6A4",
          hover: "#15A392",
          muted: "rgba(25, 182, 164, 0.15)",
        },
        gold: {
          brand: "#C8A96B",
          muted: "rgba(200, 169, 107, 0.15)",
        },
        coolgray: "#AAB5C2",
        lightborder: "#DDE3E8",
        darkborder: "#34465A",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(16, 27, 43, 0.08), 0 1px 2px -1px rgba(16, 27, 43, 0.05)",
        card: "0 4px 20px -2px rgba(16, 27, 43, 0.12), 0 2px 6px -1px rgba(16, 27, 43, 0.06)",
        elevated: "0 12px 32px -4px rgba(16, 27, 43, 0.2), 0 4px 12px -2px rgba(16, 27, 43, 0.1)",
        glow: "0 0 20px -2px rgba(25, 182, 164, 0.35)",
        "gold-glow": "0 0 20px -2px rgba(200, 169, 107, 0.3)",
      },
      borderRadius: {
        DEFAULT: "0.375rem",
        md: "0.5rem",
        lg: "0.625rem",
        xl: "0.75rem",
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
};
