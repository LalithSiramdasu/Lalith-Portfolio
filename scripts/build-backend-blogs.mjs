import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { prepareBackendBlogStage, cleanupBackendBlogStage } from './prepare-backend-blog-stage.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const backendBlogsAppRoot = path.join(projectRoot, 'apps', 'backend-blogs');
const backendBlogsCacheRoot = path.join(backendBlogsAppRoot, '.astro');
const backendBlogsNodeModulesRoot = path.join(backendBlogsAppRoot, 'node_modules');

const generatedDistRoot = path.join(projectRoot, '.backend-blogs-dist');
const finalDistRoot = path.join(projectRoot, 'dist');
const astroExecutable = path.join(
    projectRoot,
    'node_modules',
    '.bin',
    process.platform === 'win32' ? 'astro.cmd' : 'astro'
);
const shouldMergeIntoDist = process.argv.includes('--merge-dist');

const removePath = (targetPath) => {
    if (fs.existsSync(targetPath)) {
        fs.rmSync(targetPath, { recursive: true, force: true });
    }
};

const copyPath = (sourcePath, destinationPath) => {
    if (!fs.existsSync(sourcePath)) {
        return;
    }

    fs.cpSync(sourcePath, destinationPath, { recursive: true });
};

const commandEnv = {
    ...process.env,
    ASTRO_TELEMETRY_DISABLED: '1',
    BACKEND_BLOGS_APP_ROOT: backendBlogsAppRoot,
    BACKEND_BLOGS_SOURCE_ROOT: path.join(backendBlogsAppRoot, 'source'),
};

try {
    prepareBackendBlogStage();
    removePath(generatedDistRoot);

    if (process.platform === 'win32') {
        execFileSync('cmd.exe', ['/c', astroExecutable, 'build'], {
            cwd: backendBlogsAppRoot,
            env: commandEnv,
            stdio: 'inherit'
        });
    } else {
        execFileSync(astroExecutable, ['build'], {
            cwd: backendBlogsAppRoot,
            env: commandEnv,
            stdio: 'inherit'
        });
    }

    if (shouldMergeIntoDist) {
        removePath(path.join(finalDistRoot, 'backend-blogs'));
        removePath(path.join(finalDistRoot, '_astro'));

        copyPath(path.join(generatedDistRoot, 'backend-blogs'), path.join(finalDistRoot, 'backend-blogs'));
        copyPath(path.join(generatedDistRoot, '_astro'), path.join(finalDistRoot, '_astro'));

        console.log('Merged Astro backend blogs into dist.');
    } else {
        console.log('Validated Astro backend blog build.');
    }
} finally {
    cleanupBackendBlogStage();
    removePath(backendBlogsCacheRoot);
    removePath(backendBlogsNodeModulesRoot);
    removePath(generatedDistRoot);
}
