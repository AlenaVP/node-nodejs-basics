import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {
    const fileWriteStream = createWriteStream(filePath);

    process.stdin.pipe(fileWriteStream);

    fileWriteStream.on('finish', () => {
        console.log(`Data successfully written to ${filePath}`);
    });

    fileWriteStream.on('error', (err) => {
        console.error(`Error writing to file: ${err.message}`);
    });

    process.stdin.on('error', (err) => {
        console.error(`Error reading from stdin: ${err.message}`);
    });
};

await write();
