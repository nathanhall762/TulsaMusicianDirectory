// import { defineConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: {
    noExternal: ['styled-components', '@emotion/*'],
  },
  test: {
    environment: 'jsdom',
  },
});
