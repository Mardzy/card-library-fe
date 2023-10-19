/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    globals: true,
    include: ["./tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    setupFiles: ["./tests/config/setup.ts"],
  },
  resolve: {
    alias: {
      api: resolve(__dirname, "./src/api"),
      components: resolve(__dirname, "./src/components"),
      config: resolve(__dirname, "./src/config"),
      services: resolve(__dirname, "./src/api"),
      testSetup: resolve(__dirname, "./tests/config/setup"),
      utils: resolve(__dirname, "./src/utils"),
      views: resolve(__dirname, "./src/views"),
    },
  },
});
