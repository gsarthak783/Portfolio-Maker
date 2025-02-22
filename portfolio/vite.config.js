import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure correct asset resolution
  server: {
    strictPort: true
  },
  build: {
    outDir: "dist"
  }
});