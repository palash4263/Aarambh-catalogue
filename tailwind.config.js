/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        // Small-phone breakpoint: lets 2-up layouts start above ~iPhone SE width
        xs: "420px",
      },
      colors: {
        festive: {
          coral: "#E65D5D",
          coralLight: "#FDEAEA",
          gold: "#DAA520",
          goldLight: "#FEF9E7",
          cream: "#FAF8F5",
          dark: "#2A2A2A",
          muted: "#71717A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
