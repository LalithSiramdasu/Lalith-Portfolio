import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { backendBlogsSourceRoot, listBackendArticleSlugs } from '../apps/backend-blogs/src/lib/backendArticleSource.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

export const generatedPublicRoot = path.join(projectRoot, 'apps', 'backend-blogs', '.generated-public');
export const generatedPublicBlogRoot = path.join(generatedPublicRoot, 'backend-blogs');

const resetDirectory = (targetPath) => {
    fs.rmSync(targetPath, { recursive: true, force: true });
    fs.mkdirSync(targetPath, { recursive: true });
};

const copyDirectoryIfPresent = (sourcePath, destinationPath) => {
    if (!fs.existsSync(sourcePath)) {
        return;
    }

    fs.cpSync(sourcePath, destinationPath, { recursive: true });
};

export const prepareBackendBlogStage = () => {
    resetDirectory(generatedPublicRoot);

    copyDirectoryIfPresent(
        path.join(backendBlogsSourceRoot, 'assets', 'favicon_io'),
        path.join(generatedPublicBlogRoot, 'assets', 'favicon_io')
    );

    for (const slug of listBackendArticleSlugs()) {
        copyDirectoryIfPresent(
            path.join(backendBlogsSourceRoot, slug, 'images'),
            path.join(generatedPublicBlogRoot, slug, 'images')
        );
    }
};

export const cleanupBackendBlogStage = () => {
    fs.rmSync(generatedPublicRoot, { recursive: true, force: true });
};

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === __filename;

if (isDirectRun) {
    prepareBackendBlogStage();
    console.log('Prepared temporary Astro public assets for backend blogs.');
}
