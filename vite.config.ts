import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "/login/oauth/access_token": {
        target: "https://github.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  base: command === "serve" ? "/" : "/bytebase/",
}));
