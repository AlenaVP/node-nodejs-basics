import { Worker } from 'worker_threads';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workerPath = path.resolve(__dirname, 'worker.js');

const performCalculations = async () => {
    const numCores = os.cpus().length;
    const workers = [];

    for (let i = 0; i < numCores; i++) {
        workers.push(new Promise((resolve) => {
            const worker = new Worker(workerPath);
            const numberToCalc = 10 + i;

            worker.postMessage(numberToCalc);

            worker.on('message', (result) => {
                resolve({ status: 'resolved', data: result });
            });

            worker.on('error', (err) => {
                resolve({ status: 'error', data: null });
            });

            worker.on('exit', (code) => {
                if (code !== 0) {
                    resolve({ status: 'error', data: null });
                }
            });
        }));
    }

    // Wait for all workers to finish
    const resultArray = await Promise.all(workers);

    console.log(resultArray);
};

await performCalculations();
