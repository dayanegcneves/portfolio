import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build`         -> site normal em /dist (para Vercel, Netlify, GitHub Pages)
// `npm run build:single`  -> um único index.html com tudo embutido
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  build: mode === 'single' ? { assetsInlineLimit: 100000000, outDir: 'dist-single' } : {},
}));
