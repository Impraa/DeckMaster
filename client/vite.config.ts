import { defineConfig } from 'vite'
import { fileURLToPath, URL } from "node:url";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@context": fileURLToPath(new URL("./src/context", import.meta.url)),
      "@services": fileURLToPath(new URL("./src/services", import.meta.url)),
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@layout": fileURLToPath(new URL("./src/layout", import.meta.url)),
      "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
