import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Mobile PWA Demo',
        short_name: 'PWA-Demo',
        start_url: '/',
        display: 'standalone',
        theme_color: '#0b84ff',
        background_color: '#ffffff'
      }
    })
  ]
});