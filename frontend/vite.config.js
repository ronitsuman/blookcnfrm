// import { defineConfig,loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'


// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),
//     tailwindcss(),
//   ],
// })

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // Load only variables with VITE_ prefix (recommended)
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    // Safely expose only the variables you need
    define: {
      'process.env': {
        // Explicitly list only the variables your app needs
        VITE_API_URL: JSON.stringify(env.VITE_API_URL),
        VITE_GOOGLE_MAPS_API_KEY: JSON.stringify(env.VITE_GOOGLE_MAPS_API_KEY),
        
        // If migrating from CRA and need REACT_APP_ variables:
        REACT_APP_API_URL: JSON.stringify(env.VITE_API_URL),
        REACT_APP_GOOGLE_MAPS_API_KEY: JSON.stringify(env.VITE_GOOGLE_MAPS_API_KEY),
      }
    },
    server: {
      port: 3000,
      open: true,
    },
    optimizeDeps:{
      include: [
        'qrcode.react']
    }
  };
});