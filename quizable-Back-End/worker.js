import { NativeConnection, Worker } from '@temporalio/worker';
import * as activities from './activities/checkAnswer.js';

import { fileURLToPath } from 'url';
import path from 'path';

// ✅ Recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  // Step 1: Connect to Temporal server
  const connection = await NativeConnection.connect({
    address: 'localhost:7233',
  });

  try {
    // Step 2: Create worker
    const worker = await Worker.create({
      connection,
      namespace: 'default',
      taskQueue: 'quizable-task-queue',
      // ✅ Use absolute path to workflows
      workflowsPath: path.resolve(__dirname, './workflows/start.js'),
      activities,
    });

    console.log({
      message: 'Worker started successfully',
      taskQueue: 'quizable-task-queue',
    });

    await worker.run();
  } finally {
    // Cleanup
    await connection.close();
  }
}

run().catch((error) => {
  console.error('Error starting worker:', error);
  process.exit(1);
});
