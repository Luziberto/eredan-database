import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { fileURLToPath, URL } from "url"
import eslintPlugin from "vite-plugin-eslint"

export default defineConfig({
  base: "/",
  plugins: [vue(), eslintPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("index.html", import.meta.url)),
        error: fileURLToPath(new URL("404.html", import.meta.url)),
      },
    },
  },
  server: {
    port: 3000
  }
})
