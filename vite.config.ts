// vite.config.ts

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // ⬅️ ADD THIS LINE: Tells Vite to prefix asset URLs with the repository name
  base: "/rms/", 
  plugins: [react()],
})