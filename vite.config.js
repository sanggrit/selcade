import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Cloudflare Pages sets CF_PAGES=1 — always serve from root there.
  // GitHub Actions sets VITE_BASE_URL=/selcade/ for GitHub Pages sub-path.
  base: process.env.CF_PAGES ? '/' : (process.env.VITE_BASE_URL ?? '/'),
})
