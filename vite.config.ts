import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

dotenv.config();

const folder = process.env.VITE_DIST_BUILD || 'static-site'; // ✅ fallback padrão

export default defineConfig({
  base: './', // ✅ mantém caminhos relativos
  build: {
    outDir: path.resolve(__dirname, `dist/${folder}`),
    emptyOutDir: true,
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: { icon: false },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@root': path.resolve(__dirname, './'),
    },
  },
});
