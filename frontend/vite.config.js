import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {},
    global: "window",
  },
  resolve: {
    alias: {
      "readable-stream": "vite-compatible-readable-stream",
      stream: "vite-compatible-readable-stream",
      process: "process/browser",
    },
  },
});
