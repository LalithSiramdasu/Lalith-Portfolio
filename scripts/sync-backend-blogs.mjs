import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const defaultSourceRoot = 'C:\\Users\\HP\\Desktop\\Blogs\\Backend';
const sourceRoot = path.resolve(process.env.BACKEND_BLOGS_SOURCE ?? defaultSourceRoot);
const outputRoot = path.join(projectRoot, 'public', 'backend-blogs');

const slugifyBackendFolderName = (folderName) => {
    const slug = folderName
        .normalize('NFKD')
        .replace(/[^\x00-\x7F]/g, '')
        .toLowerCase()
        .replace(/&/g, ' and ')
        .replace(/\./g, ' ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    return `topic-${slug}`;
};

const assertDirectoryExists = (directoryPath, description) => {
    if (!fs.existsSync(directoryPath) || !fs.statSync(directoryPath).isDirectory()) {
        throw new Error(`${description} not found: ${directoryPath}`);
    }
};

assertDirectoryExists(sourceRoot, 'Backend blog source directory');

const assetsSource = path.join(sourceRoot, 'assets');
assertDirectoryExists(assetsSource, 'Backend blog assets directory');

fs.rmSync(outputRoot, { recursive: true, force: true });
fs.mkdirSync(outputRoot, { recursive: true });

fs.cpSync(assetsSource, path.join(outputRoot, 'assets'), { recursive: true });

const topicDirectories = fs
    .readdirSync(sourceRoot, { withFileTypes: true })
    .filter((entry) => {
        if (!entry.isDirectory() || entry.name === 'assets') {
            return false;
        }

        if (!/^\d/.test(entry.name)) {
            return false;
        }

        return fs.existsSync(path.join(sourceRoot, entry.name, 'index.html'));
    })
    .sort((left, right) => left.name.localeCompare(right.name, undefined, { numeric: true }));

for (const topicDirectory of topicDirectories) {
    const sourceDirectory = path.join(sourceRoot, topicDirectory.name);
    const destinationDirectory = path.join(outputRoot, slugifyBackendFolderName(topicDirectory.name));

    fs.cpSync(sourceDirectory, destinationDirectory, { recursive: true });
}

console.log(`Synced ${topicDirectories.length} backend blog topics into ${outputRoot}`);
