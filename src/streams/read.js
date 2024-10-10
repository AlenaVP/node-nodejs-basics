import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {
    const fileReadStream = createReadStream(filePath);

    fileReadStream.pipe(process.stdout);

    fileReadStream.on('end', () => {
        console.log();
    });

    fileReadStream.on('error', (err) => {
        console.error(`Error reading file: ${err.message}`);
    });
};

await read();
