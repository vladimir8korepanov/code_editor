import express, { json } from 'express';
import { exec } from 'child_process';
import util from 'util';
import cors from 'cors';
import { file } from 'tmp-promise';
import fs from 'fs/promises';

const app = express();
const port = 5000;
const execPromise = util.promisify(exec);

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(json());

const runFromTempFile = async (code, extension, command) => {
  const { path: tempFilePath, cleanup } = await file({ postfix: extension });
  await fs.writeFile(tempFilePath, code);

  try {
    const { stdout, stderr } = await execPromise(`${command} "${tempFilePath}"`);
    if (stderr) {
      return { error: stderr };
    }
    return { output: stdout };
  } finally {
    await cleanup();
  }
};

app.post('/api/execute', async (req, res) => {
  const { language, code } = req.body;

  try {
    switch (language) {
      case 'python': {
        const result = await runFromTempFile(code, '.py', 'python');
        return res.json({ status: result.error ? 'error' : 'success', ...result });
      }
      case 'javascript': {
        const result = await runFromTempFile(code, '.js', 'node');
        return res.json({ status: result.error ? 'error' : 'success', ...result });
      }
      default:
        return res.json({ status: 'error', error: 'Unsupported language' });
    }
  } catch (error) {
    return res.json({ status: 'error', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});