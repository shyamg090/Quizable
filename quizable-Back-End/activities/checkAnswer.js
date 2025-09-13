import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ✅ Recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if the user's answer matches the correct answer
async function checkAnswer(question, userAnswer) {
    const correctAnswer = question.correctAnswer || question.correct?.toUpperCase()?.trim();

    let normalizedUserAnswer = userAnswer;
    if (typeof userAnswer === 'string') {
        normalizedUserAnswer = userAnswer.toUpperCase().trim();
    }

    const isCorrect = normalizedUserAnswer === correctAnswer;
    return isCorrect;
}

// Load questions from JSON
async function loadQuestions(topic) {
    try {
        const questionsPath = path.join(__dirname, '../data/questions.json');
        const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

        const topicData = questionsData.find(item => item[topic.toLowerCase()]);
        if (!topicData) {
            throw new Error(`Topic "${topic}" not found in questions data`);
        }

        const questions = topicData[topic.toLowerCase()].questions;
        if (!questions || questions.length === 0) {
            throw new Error(`No questions found for topic "${topic}"`);
        }

        return questions.map((q, idx) => ({
            id: q.id || `Q${idx + 1}`,
            difficulty: q.difficulty,
            question: q.question,
            options: q.options.map((opt, idx) => ({
                id: opt.id || getOptionId(idx), // Generate A, B, C, D if not present
                text: opt.text,
            })),
            correctAnswer: q.correctAnswer, // keep internally for validation
        }));
    } catch (error) {
        console.error('Error loading questions:', error);
        throw error;
    }
}

// Generate option letters
function getOptionId(index) {
    return String.fromCharCode(65 + index); // A, B, C, D
}

export { checkAnswer, loadQuestions };
