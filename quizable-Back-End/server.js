import express from 'express';
import cors from 'cors';
import { client } from './client/temporalClient.js';
import bcrypt from 'bcrypt';
import { uuid4 } from '@temporalio/workflow';
import auth from './middleware/authMiddleware.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Token endpoint
app.get("/api/token", async (req, res) => {
    const hashedId = await bcrypt.hash(process.env.FRONT_END_PRIVATE_KEY, 10);
    res.status(200).json({ access_token: hashedId });
});

// Start quiz workflow
app.post("/api/start", auth, async (req, res) => {
    const { topic } = req.body;

    const handle = await client.workflow.start("startGameWorkflow", {
        args: [topic],
        taskQueue: "quizable-task-queue",
        workflowId: uuid4(),
    });

    res.status(200).send({ message: "Workflow started", workflowId: handle.workflowId });
});

// Get current question
app.post("/question/:workflowId", auth, async (req, res) => {
    try {
        const { workflowId } = req.params;
        const handle = client.workflow.getHandle(workflowId);

        const currentQuestion = await handle.query("getCurrentQuestion");
        const quizStatus = await handle.query("getQuizStatus");
        console.log(currentQuestion, quizStatus);
        res.status(200).json({ currentQuestion, quizStatus });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get question" });
    }
});

// Submit answer
app.post("/answers/:workflowId", auth, async (req, res) => {
    try {
        const { workflowId } = req.params;
        const { answer, questionId } = req.body;

        const handle = client.workflow.getHandle(workflowId);

        // Send answer to workflow
        await handle.signal("answer", { answer, questionId });

        // Small delay to ensure workflow state updated
        await new Promise(resolve => setTimeout(resolve, 100));

        const currentQuestion = await handle.query("getCurrentQuestion");
        const quizStatus = await handle.query("getQuizStatus");
        console.log(currentQuestion, quizStatus);
        res.status(200).json({ message: "Answer processed", currentQuestion, quizStatus });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to process answer" });
    }
});

// Get quiz history only
app.get("/history/:workflowId", auth, async (req, res) => {
    try {
        const { workflowId } = req.params;
        const handle = client.workflow.getHandle(workflowId);

        const quizStatus = await handle.query("getQuizStatus");

        // ✅ Only return the history array
        const history = quizStatus.history || [];

        res.status(200).json({ history });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get quiz history" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
