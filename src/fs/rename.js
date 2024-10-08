import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const sourceFile = path.join(__dirname, 'files', 'wrongFilename.txt');
    const destFile = path.join(__dirname, 'files', 'properFilename.md');

    try {
        await fs.access(sourceFile);

        try {
            await fs.access(destFile);
            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }

        await fs.rename(sourceFile, destFile);
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await rename();
