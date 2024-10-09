import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sourceFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
const destFilePath = path.join(__dirname, 'files', 'archive.gz');

const compress = async () => {
    const fileReadStream = createReadStream(sourceFilePath);
    const fileWriteStream = createWriteStream(destFilePath);
    const gzip = createGzip();
    fileReadStream.pipe(gzip).pipe(fileWriteStream);

    fileWriteStream.on('finish', () => {
        console.log(`File successfully compressed to ${destFilePath}`);
    });
    fileReadStream.on('error', (err) => {
        console.error(`Error reading file: ${err.message}`);
    });
    fileWriteStream.on('error', (err) => {
        console.error(`Error writing file: ${err.message}`);
    });
};

await compress();
