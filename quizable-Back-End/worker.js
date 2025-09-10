import { NativeConnection, Worker } from '@temporalio/worker';
import * as activities from './activities/checkAnswer.js';

import { fileURLToPath } from 'url';
import path from 'path';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
    // Step 1: Establish a connection with Temporal server.
    //
    // Worker code uses `@temporalio/worker.NativeConnection`.
    // (But in your application code it's `@temporalio/client.Connection`.)
    const connection = await NativeConnection.connect({
        address: 'localhost:7233',
    });

    try {
        // Step 2: Register Workflows and Activities with the Worker.
        const worker = await Worker.create({
            connection,
            namespace: 'default',
            taskQueue: 'quizable-task-queue',
            // Workflows are registered using a path as they run in a separate JS context.
            workflowsPath: path.join(__dirname, './workflows/start.js'),
            activities: activities,
        });

        console.log({ message: 'Worker started successfully', taskQueue: 'quizable-task-queue' });

        await worker.run();
    } finally {
        // Close the connection once the worker has stopped
        await connection.close();
    }
}

run().catch(error => {
    console.log('Error starting worker:', error);
    process.exit(1);
});