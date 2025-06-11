import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,       // ← Escucha en la IP local (0.0.0.0)
    port: 5173,       // ← O el puerto que desees
  },
});
