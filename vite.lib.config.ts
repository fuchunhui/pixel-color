import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/pixel-color/' : '/',
  plugins: [
    vue()
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.ts'),
      name: 'pixel',
      formats: ['es', 'cjs', 'umd', 'iife'],
      fileName: (format: string) => `pixel.${format}.js`
    }
  }
});
