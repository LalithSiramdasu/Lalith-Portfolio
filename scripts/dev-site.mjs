import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const spawnNpm = (args) =>
    process.platform === 'win32'
        ? spawn('cmd.exe', ['/c', 'npm.cmd', ...args], {
            cwd: projectRoot,
            env: {
                ...process.env,
                ASTRO_TELEMETRY_DISABLED: '1'
            },
            stdio: 'inherit'
        })
        : spawn('npm', args, {
            cwd: projectRoot,
            env: {
                ...process.env,
                ASTRO_TELEMETRY_DISABLED: '1'
            },
            stdio: 'inherit'
        });

const astroProcess = spawnNpm(['run', 'dev:backend-blogs']);
const viteProcess = spawnNpm(['run', 'dev:app', '--', '--host', '127.0.0.1', '--port', '5173']);

let shuttingDown = false;

const stopChildren = (signal = 'SIGTERM') => {
    if (shuttingDown) {
        return;
    }

    shuttingDown = true;
    astroProcess.kill(signal);
    viteProcess.kill(signal);
};

process.on('SIGINT', () => stopChildren('SIGINT'));
process.on('SIGTERM', () => stopChildren('SIGTERM'));

const exitFromChild = (code, signal) => {
    stopChildren(signal ?? 'SIGTERM');

    if (signal) {
        process.kill(process.pid, signal);
        return;
    }

    process.exit(code ?? 0);
};

astroProcess.on('exit', exitFromChild);
viteProcess.on('exit', exitFromChild);
