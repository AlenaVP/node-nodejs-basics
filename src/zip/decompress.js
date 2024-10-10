import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createGunzip } from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sourceFilePath = path.join(__dirname, 'files', 'archive.gz');
const destFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');

const decompress = async () => {
    const fileReadStream = createReadStream(sourceFilePath);
    const fileWriteStream = createWriteStream(destFilePath);
    const gzip = createGunzip();
    fileReadStream.pipe(gzip).pipe(fileWriteStream);

    fileWriteStream.on('finish', () => {
        console.log(`File successfully decompressed to ${destFilePath}`);
    });
    fileReadStream.on('error', (err) => {
        console.error(`Error reading file: ${err.message}`);
    });
    fileWriteStream.on('error', (err) => {
        console.error(`Error writing file: ${err.message}`);
    });
};

await decompress();
