import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3005,
    proxy: {
      '/api': {
        target: 'http://192.168.1.4:8005',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
