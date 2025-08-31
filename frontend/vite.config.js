import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Ensure the frontend runs on port 5173
    open: true, // Automatically open the browser
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // Prioritize TypeScript files
  },
});
