import { defineSignal, defineQuery, setHandler, proxyActivities } from '@temporalio/workflow';

export const answer = defineSignal('answer');
export const addData = defineSignal('addData');

// export const getanswerQuery = defineQuery('getAnswer');
export const getChatquery = defineQuery('getChat');
export const getChatHistoryQuery = defineQuery('getChatHistory');
export const getCurrentQuestionQuery = defineQuery('getCurrentQuestion');
export const getQuizStatusQuery = defineQuery('getQuizStatus');

const { checkAnswer, loadQuestions } = proxyActivities({
    startToCloseTimeout: '1 minute',
});

export async function startGameWorkflow(topic) {
    // Load questions for the specified topic
    const questions = await loadQuestions(topic);

    let currentQuestionIndex = 0;
    let questionsHistory = [];
    let score = 0;
    let quizCompleted = false;
    let currentQuestion = null;

    // Fisher-Yates shuffle algorithm for proper randomization
    function shuffleArray(array) {
        const shuffled = [...array]; // Create a copy to avoid mutating original
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Select 10 random questions from the topic using proper shuffle
    const shuffledQuestions = shuffleArray(questions).slice(0, 10);

    // Set the first question
    currentQuestion = shuffledQuestions[currentQuestionIndex];

    // Add initial question to history
    questionsHistory.push({
        questionNumber: 1,
        question: currentQuestion,
        timestamp: new Date().toISOString()
    });

    // Handler for answer signal
    setHandler(answer, async (data) => {
        if (quizCompleted) return;

        const userAnswer = data.answer;
        const questionId = data.questionId;

        // Validate the answer
        const isCorrect = await checkAnswer(currentQuestion, userAnswer);

        if (isCorrect) {
            score++;
        }

        // Add user's answer to history
        questionsHistory.push({
            questionNumber: currentQuestionIndex + 1,
            questionId: questionId,
            userAnswer: userAnswer,
            isCorrect: isCorrect,
            timestamp: new Date().toISOString()
        });

        // Move to next question
        currentQuestionIndex++;

        if (currentQuestionIndex >= 10) {
            // Quiz completed
            quizCompleted = true;
            currentQuestion = null;

            questionsHistory.push({
                type: 'quiz_completed',
                finalScore: score,
                totalQuestions: 10,
                percentage: (score / 10) * 100,
                timestamp: new Date().toISOString()
            });
        } else {
            // Set next question
            currentQuestion = shuffledQuestions[currentQuestionIndex];

            questionsHistory.push({
                questionNumber: currentQuestionIndex + 1,
                question: currentQuestion,
                timestamp: new Date().toISOString()
            });
        }
    });

    // Query handlers
    setHandler(getCurrentQuestionQuery, () => {
        if (quizCompleted) {
            return {
                completed: true,
                finalScore: score,
                totalQuestions: 10,
                percentage: (score / 10) * 100
            };
        }
        return {
            completed: false,
            questionNumber: currentQuestionIndex + 1,
            totalQuestions: 10,
            question: currentQuestion
        };
    });

    setHandler(getQuizStatusQuery, () => ({
        currentQuestionNumber: currentQuestionIndex + 1,
        totalQuestions: 10,
        score: score,
        completed: quizCompleted,
        topic: topic
    }));

    setHandler(getChatHistoryQuery, () => questionsHistory);
    setHandler(getChatquery, () => currentQuestion);

    if (quizCompleted) {
        await new Promise(() => { }); // keep alive important
    }
}