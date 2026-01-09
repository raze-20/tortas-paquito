import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    host: true, // Exposes the server to the network (accessible from phone)
  },
  build: {
    outDir: 'build', // Maintain 'build' folder output to match CRA behavior roughly
  },
});
