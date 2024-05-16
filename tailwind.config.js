/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-dark": "url('./src/app/images/bg-desktop-dark.jpg)",
        "hero-light": "url('./src/app/images/bg-desktop-light.jpg)",
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
