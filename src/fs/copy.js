import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const sourceDir = path.join(__dirname, 'files');
    const destDir = path.join(__dirname, 'files_copy');

    try {
        await fs.access(sourceDir);
        try {
            await fs.access(destDir);
            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }

        await fs.mkdir(destDir);
        const files = await fs.readdir(sourceDir);

        for (const file of files) {
            const sourceFile = path.join(sourceDir, file);
            const destFile = path.join(destDir, file);
            await fs.copyFile(sourceFile, destFile);
        }
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await copy();
