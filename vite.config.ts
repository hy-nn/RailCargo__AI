import { screenGraphPlugin } from "@animaapp/vite-plugin-screen-graph";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  define: {
    "process.env.GEMINI_API_KEY": JSON.stringify(process.env.GEMINI_API_KEY || ""),
  },
  plugins: [react(), mode === "development" && screenGraphPlugin()],
  publicDir: "./static",
  base: "./",
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: true,
  },
}));
