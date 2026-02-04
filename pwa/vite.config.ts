import {defineConfig} from 'vite';
import {resolve} from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    base: './',
    build: {
        outDir: 'dist',
        sourcemap: true,
        minify: 'terser',
        cssCodeSplit: true,
        cssMinify: true,
        rollupOptions: {
            input: [
                resolve(__dirname, './index.html'),
                // resolve(__dirname, './src/Style/index.css'),
            ],
            output: {
                entryFileNames: "[name].js",
                chunkFileNames: '[name].js',
                assetFileNames: `[name].[ext]`
            }
        }
    },
    plugins: [
        tailwindcss()
    ],
});
