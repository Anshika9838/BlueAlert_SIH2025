import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'YOUR-CLOUDFLARE-TUNNEL-URL' with the exact URL 
// provided by Cloudflare (e.g., 'dividend-fat-richmond-individual.trycloudflare.com')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 1. Add your Cloudflare Tunnel hostname to allowedHosts
    allowedHosts: [
      'localhost', // Keep for local development
      '127.0.0.1', // Keep for local development
      'preceding-intensive-already-ebony.trycloudflare.com' // <--- **Crucial Fix**
    ],
    
    // 2. Set host to '0.0.0.0' to ensure the server is accessible 
    //    from the external network (where the tunnel is running)
    host: '0.0.0.0', 
  },
})