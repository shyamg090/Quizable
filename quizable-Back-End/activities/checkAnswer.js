import * as fs from 'fs';
import * as path from 'path';

async function checkAnswer(question, userAnswer) {
    // Check if the user's answer matches the correct answer
    const correctAnswer = question.correctAnswer;
    
    // Normalize the answer (handle both letter options like "A" and option IDs)
    let normalizedUserAnswer = userAnswer;
    if (typeof userAnswer === 'string') {
        normalizedUserAnswer = userAnswer.toUpperCase().trim();
    }
    
    // Compare with correct answer
    const isCorrect = normalizedUserAnswer === correctAnswer;
    
    return isCorrect;
}

async function loadQuestions(topic) {
    try {
        const questionsPath = path.join(__dirname, '../data/questions.json');
        const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
        
        // Find the topic data
        const topicData = questionsData.find(item => item[topic.toLowerCase()]);
        
        if (!topicData) {
            throw new Error(`Topic "${topic}" not found in questions data`);
        }
        
        const questions = topicData[topic.toLowerCase()].questions;
        
        if (!questions || questions.length === 0) {
            throw new Error(`No questions found for topic "${topic}"`);
        }
        
        // Return questions without revealing correct answers in logs
        return questions.map(q => ({
            id: q.id,
            difficulty: q.difficulty,
            question: q.question,
            options: q.options.map(opt => ({
                id: opt.id || getOptionId(q.options.indexOf(opt)), // Generate A, B, C, D if not present
                text: opt.text
            })),
            correctAnswer: q.correctAnswer // Keep this for internal validation only
        }));
        
    } catch (error) {
        console.error('Error loading questions:', error);
        throw error;
    }
}

function getOptionId(index) {
    return String.fromCharCode(65 + index); // Convert 0->A, 1->B, 2->C, 3->D
}

export { checkAnswer, loadQuestions };