import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import terser from '@rollup/plugin-terser';
//import { dependencies } from './package.json';

function renderChunks(deps) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router-dom', 'react-dom'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: true,
    rollupOptions: {
      input: {
        main: 'src/main.jsx',
        index: 'index.html'
      },
      output: {
        
        format: 'es',
        manualChunks: {
          react: ['react'],
          reactdom: ['react-dom'],
          vendor: ['ethers'],
          moment: ['moment'],
          emulticall: ['ethers-multicall'],
          node: ['node-sass'],
          sass: ['sass'],
          wallet: ['use-wallet2']
        },
      },
    },
  },
  plugins: [react(),],
  })

  
