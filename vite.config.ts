import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  base: "/todo-list-react/",
});
