import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/Invitatie_online/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate'
    })
  ]
})





/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/Invitatie_online/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Nuntă Vlad & Denisa',
        short_name: 'Nuntă V&D',
        description: 'Aplicația oficială pentru nunta noastră',
        theme_color: '#E1306C',
        background_color: '#FAFAFA',
        display: 'standalone',
        scope: '/Invitatie_online/',
        start_url: '/Invitatie_online/',
      }
    })
  ]
})
*/



/*
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
*/
