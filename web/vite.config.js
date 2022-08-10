import path from 'path';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import autoPreprocess from 'svelte-preprocess';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svelte({
            preprocess: autoPreprocess(),
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import './styles/mixin';
                    @import './styles/variable';
                `,
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
});
