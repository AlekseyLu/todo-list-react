/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-bg": "url('./src/app/images/bg-desktop-dark.jpg)",
      },
      backgroundPosition: {
        "bottom-4": "center top 1rem",
      },
      keyframes: {
        bubble: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  darkMode: "selector",
  plugins: [],
};
