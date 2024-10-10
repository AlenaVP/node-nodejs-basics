import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptPath = path.resolve(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
    const child = spawn('node', [scriptPath, ...args]);
    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);

    child.stderr.on('data', (data) => {
        console.error(`Child stderr: ${data}`);
      });

      child.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
      });

};

// Put your arguments in function call to test this functionality
spawnChildProcess( ['arg1', 'arg2', 'arg3']);
