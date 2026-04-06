import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const removablePaths = [
    '.astro',
    '.backend-blogs-dist',
    'apps/backend-blogs/.astro',
    'apps/backend-blogs/.generated-public',
    'apps/backend-blogs/node_modules',
    'apps/backend-blogs/public',
    'apps/backend-blogs/src/content/backendArticles',
    'public/backend-blogs',
    'public/_astro',
    'preview-server.out.log',
    'preview-server.err.log'
];

for (const relativePath of removablePaths) {
    const absolutePath = path.resolve(projectRoot, relativePath);

    if (!absolutePath.startsWith(projectRoot)) {
        throw new Error(`Refusing to remove path outside project: ${absolutePath}`);
    }

    if (fs.existsSync(absolutePath)) {
        fs.rmSync(absolutePath, { recursive: true, force: true });
        console.log(`Removed ${relativePath}`);
    }
}
