import { defineSignal, defineQuery, setHandler, proxyActivities } from '@temporalio/workflow';

export const answer = defineSignal('answer');
export const endQuizSignal = defineSignal('endQuiz'); // New graceful shutdown signal

export const getCurrentQuestionQuery = defineQuery('getCurrentQuestion');
export const getQuizStatusQuery = defineQuery('getQuizStatus');

const { checkAnswer, loadQuestions } = proxyActivities({ startToCloseTimeout: '1 minute' });

export async function startGameWorkflow(topic) {
    const questions = await loadQuestions(topic);

    let currentIndex = 0;
    let history = [];
    let score = 0;
    let completed = false;
    let shouldEnd = false; // Flag for graceful shutdown

    const shuffled = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
    let currentQuestion = shuffled[currentIndex];

    // ✅ Push the first question in {question: {...}} format
    history.push({
        question: {
            number: currentIndex + 1,
            data: currentQuestion,
            timestamp: new Date().toISOString(),
        }
    });

    setHandler(answer, async ({ answer: userAnswer, questionId }) => {
        if (completed) return;

        const isCorrect = await checkAnswer(currentQuestion, userAnswer);
        if (isCorrect) score++;

        // ✅ Store the answer in {answer: {...}} format
        history.push({
            answer: {
                questionNumber: currentIndex + 1,
                questionId,
                userAnswer,
                isCorrect,
                timestamp: new Date().toISOString(),
            }
        });

        currentIndex++;
        if (currentIndex >= shuffled.length) {
            completed = true;
            currentQuestion = null;

            // ✅ Add a final "quiz_completed" marker
            history.push({
                answer: {
                    type: 'quiz_completed',
                    finalScore: score,
                    totalQuestions: shuffled.length,
                    timestamp: new Date().toISOString(),
                }
            });
        } else {
            currentQuestion = shuffled[currentIndex];

            // ✅ Store next question again in {question: {...}} format
            history.push({
                question: {
                    number: currentIndex + 1,
                    data: currentQuestion,
                    timestamp: new Date().toISOString(),
                }
            });
        }
    });

    // Add handler for graceful shutdown
    setHandler(endQuizSignal, () => {
        shouldEnd = true;
        completed = true;
        
        // Add end marker to history
        history.push({
            answer: {
                type: 'quiz_ended_by_user',
                finalScore: score,
                questionsCompleted: currentIndex,
                totalQuestions: shuffled.length,
                timestamp: new Date().toISOString(),
            }
        });
    });

    setHandler(getCurrentQuestionQuery, () => {
        if (completed) {
            return {
                completed: true,
                finalScore: score,
                totalQuestions: shuffled.length,
                history
            };
        }
        return {
            completed: false,
            questionNumber: currentIndex + 1,
            totalQuestions: shuffled.length,
            question: currentQuestion,
            history
        };
    });

    setHandler(getQuizStatusQuery, () => ({
        currentQuestionNumber: currentIndex + 1,
        totalQuestions: shuffled.length,
        score,
        completed,
        topic,
        history
    }));

    // Keep the workflow running until either completed OR shouldEnd
    while (!completed && !shouldEnd) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Workflow ends when either condition is met
}
