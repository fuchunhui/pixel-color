import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/pixel-color/' : '/',
  plugins: [
    vue(),
    copy({
      targets: [
        {src: 'lib/index.html', dest: 'dist'}
      ],
      hook: 'writeBundle'
    })
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
