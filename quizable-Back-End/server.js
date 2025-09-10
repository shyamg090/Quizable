import express from 'express';
import { client } from './client/temporalClient.js';
import bcrypt from 'bcrypt';
import { uuid4 } from '@temporalio/workflow';
import auth from './middleware/authMiddleware.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get("/api/token", async (req, res) => {
    const hashedId = bcrypt.hash(process.env.FRONT_END_PRIVATE_KEY, 10);
    res.status(200).send({ access_token: hashedId });
});

app.post("/start", auth, async (req, res) => {
    const { topic } = req.body;

    const handle = await client.workflow.start("startGameWorkflow", {
        args: [topic],
        taskQueue: "quizable-task-queue",
        workflowId: uuid4(), // Unique workflow ID
    });

    res.status(200).send({ message: "Workflow started", workflowId: handle.workflowId });

    await new Promise(() => { }); // keep alive important 
});

app.get("/question/:workflowId", auth, async (req, res) => {
    try {
        const { workflowId } = req.params;
        const getHandle = client.workflow.getHandle(workflowId);

        const currentQuestion = await getHandle.query("getCurrentQuestion");
        const quizStatus = await getHandle.query("getQuizStatus");

        res.status(200).send({
            workflowId,
            currentQuestion,
            quizStatus
        });
    } catch (error) {
        console.error('Error getting current question:', error);
        res.status(500).send({ error: "Failed to get current question" });
    }
});

app.get("/status/:workflowId", auth, async (req, res) => {
    try {
        const { workflowId } = req.params;
        const getHandle = client.workflow.getHandle(workflowId);

        const quizStatus = await getHandle.query("getQuizStatus");

        res.status(200).send({
            workflowId,
            status: quizStatus
        });
    } catch (error) {
        console.error('Error getting quiz status:', error);
        res.status(500).send({ error: "Failed to get quiz status" });
    }
});

app.post("/answers/:workflowId", auth, async (req, res) => {
    try {
        const { workflowId } = req.params;
        const { answer, questionId } = req.body;

        const getHandle = client.workflow.getHandle(workflowId);

        // Send the answer to the workflow
        await getHandle.signal("answer", { answer, questionId });

        // Give the workflow a moment to process
        await new Promise(resolve => setTimeout(resolve, 100));

        // Get the updated state
        const currentQuestion = await getHandle.query("getCurrentQuestion");
        const quizStatus = await getHandle.query("getQuizStatus");
        const chatHistory = await getHandle.query("getChatHistory");

        console.log('User answered:', answer, 'for question:', questionId);
        console.log('Quiz status:', quizStatus);

        res.status(200).send({
            message: "Answer processed",
            currentQuestion,
            quizStatus,
            chatHistory,
            workflowId: workflowId
        });
    } catch (error) {
        console.error('Error processing answer:', error);
        res.status(500).send({ error: "Failed to process answer" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});