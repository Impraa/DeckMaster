import { defineConfig } from 'vite'
import { fileURLToPath, URL } from "node:url";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
