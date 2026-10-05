import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Caminhos relativos permitem publicar o build em qualquer subpasta do site da SMS.
  base: './',
  plugins: [react(), tailwindcss()],
})
