import { defineConfig } from 'astro/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const astroRoot = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(astroRoot, '..', '..');
const astroPrerenderEntrypoint = path.resolve(
    projectRoot,
    'node_modules',
    'astro',
    'dist',
    'entrypoints',
    'prerender.js'
);

export default defineConfig({
    output: 'static',
    compressHTML: true,
    outDir: path.resolve(astroRoot, '..', '..', '.backend-blogs-dist'),
    publicDir: path.resolve(astroRoot, '.generated-public'),
    scopedStyleStrategy: 'where',
    vite: {
        plugins: [
            {
                name: 'backend-blogs-fix-prerender-entry',
                configEnvironment(name) {
                    if (name !== 'prerender') {
                        return;
                    }

                    return {
                        resolve: {
                            alias: {
                                'astro/entrypoints/prerender': astroPrerenderEntrypoint,
                            },
                        },
                        build: {
                            rollupOptions: {
                                input: astroPrerenderEntrypoint,
                            },
                        },
                    };
                },
            },
        ],
    },
    build: {
        format: 'directory',
        inlineStylesheets: 'auto'
    }
});
