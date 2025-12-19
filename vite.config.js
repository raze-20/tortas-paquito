import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    open: true,
    host: true, // Exposes the server to the network (accessible from phone)
  },
  build: {
    outDir: 'build', // Maintain 'build' folder output to match CRA behavior roughly
  },
});
