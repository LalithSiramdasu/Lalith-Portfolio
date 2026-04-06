import path from 'node:path';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { prepareBackendBlogStage, cleanupBackendBlogStage } from './prepare-backend-blog-stage.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const backendBlogsAppRoot = path.join(projectRoot, 'apps', 'backend-blogs');
const backendBlogsSourceRoot = path.join(backendBlogsAppRoot, 'source');
const backendBlogsCacheRoot = path.join(backendBlogsAppRoot, '.astro');
const backendBlogsNodeModulesRoot = path.join(backendBlogsAppRoot, 'node_modules');
const astroExecutable = path.join(
    projectRoot,
    'node_modules',
    '.bin',
    process.platform === 'win32' ? 'astro.cmd' : 'astro'
);

prepareBackendBlogStage();

const astroArgs = ['dev', '--host', '127.0.0.1', '--port', '4321'];
const astroProcess =
    process.platform === 'win32'
        ? spawn('cmd.exe', ['/c', astroExecutable, ...astroArgs], {
            cwd: backendBlogsAppRoot,
            env: {
                ...process.env,
                ASTRO_TELEMETRY_DISABLED: '1',
                BACKEND_BLOGS_APP_ROOT: backendBlogsAppRoot,
                BACKEND_BLOGS_SOURCE_ROOT: backendBlogsSourceRoot,
            },
            stdio: 'inherit'
        })
        : spawn(astroExecutable, astroArgs, {
            cwd: backendBlogsAppRoot,
            env: {
                ...process.env,
                ASTRO_TELEMETRY_DISABLED: '1',
                BACKEND_BLOGS_APP_ROOT: backendBlogsAppRoot,
                BACKEND_BLOGS_SOURCE_ROOT: backendBlogsSourceRoot,
            },
            stdio: 'inherit'
        });

let cleanedUp = false;

const removePath = (targetPath) => {
    if (fs.existsSync(targetPath)) {
        fs.rmSync(targetPath, { recursive: true, force: true });
    }
};

const cleanup = () => {
    if (cleanedUp) {
        return;
    }

    cleanedUp = true;
    cleanupBackendBlogStage();
    removePath(backendBlogsCacheRoot);
    removePath(backendBlogsNodeModulesRoot);
};

const forwardSignal = (signal) => {
    astroProcess.kill(signal);
};

process.on('SIGINT', () => forwardSignal('SIGINT'));
process.on('SIGTERM', () => forwardSignal('SIGTERM'));

astroProcess.on('exit', (code, signal) => {
    cleanup();

    if (signal) {
        process.kill(process.pid, signal);
        return;
    }

    process.exit(code ?? 0);
});
