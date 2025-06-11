import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/proyecto_miguel/', 
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
});
