import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const buildBackendBlogsScript = path.join(projectRoot, 'scripts', 'build-backend-blogs.mjs');

const runCommand = (command, args, extraEnv = {}) => {
    const env = {
        ...process.env,
        ASTRO_TELEMETRY_DISABLED: '1',
        ...extraEnv,
    };

    if (process.platform === 'win32') {
        const shouldUseCmdShim = command.toLowerCase().endsWith('.cmd');

        execFileSync(shouldUseCmdShim ? 'cmd.exe' : command, shouldUseCmdShim ? ['/c', command, ...args] : args, {
            cwd: projectRoot,
            env,
            stdio: 'inherit'
        });
        return;
    }

    execFileSync(command, args, {
        cwd: projectRoot,
        env,
        stdio: 'inherit'
    });
};

runCommand('npm.cmd', ['run', 'build:app']);
runCommand(process.execPath, [buildBackendBlogsScript, '--merge-dist']);
