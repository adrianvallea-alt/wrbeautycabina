import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/wrbeautycabina/', // ⚠️ cámbialo por el nombre exacto de tu repositorio
})