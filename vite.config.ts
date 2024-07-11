import { crx } from "@crxjs/vite-plugin"
import manifest from "./manifest.json"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [crx({ manifest }), react()],
})
