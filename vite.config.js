import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // base: '/' for local / Firebase / Vercel / Netlify
  // base: '/selcade/' is injected automatically by the GitHub Actions deploy workflow
  // via the VITE_BASE_URL env variable — do not hard-code it here
  base: process.env.VITE_BASE_URL ?? '/',
})
