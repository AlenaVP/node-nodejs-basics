import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
    const fileStream = createReadStream(filePath);
    const hash = createHash('sha256');
    fileStream.pipe(hash);
    hash.setEncoding('hex');
    hash.on('finish', () => {
        console.log(`SHA256 hash: ${hash.read()}`);
    });
    fileStream.on('error', (err) => {
        console.error(`Error reading file: ${err.message}`);
    });
};

await calculateHash();
