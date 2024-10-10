import { Transform } from 'stream';

const transform = async () => {
    const reverseTransform = new Transform({
        transform(chunk, _, callback) {
            const reversedChunk = chunk.toString().split('').reverse().join('');
            callback(null, reversedChunk);
        }
    });
    process.stdin.pipe(reverseTransform).pipe(process.stdout);

    reverseTransform.on('error', (err) => {
        console.error(`Error transforming data: ${err.message}`);
    });

    process.stdin.on('error', (err) => {
        console.error(`Error reading from stdin: ${err.message}`);
    });

    process.stdout.on('error', (err) => {
        console.error(`Error writing to stdout: ${err.message}`);
    });
};

await transform();
