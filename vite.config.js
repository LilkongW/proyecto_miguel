import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/proyecto_miguel/', // 👈 Esto es clave para que funcione en GitHub Pages
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
});
