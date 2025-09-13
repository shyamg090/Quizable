import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountdownCircle from "../components/TimerCircle";
import axios from "axios";
import { initializeQuizBoardTheme } from "../utils/themeUtils";

function QuizBoardHeader({ quizBoardTheme, playerName, onTimeUp, resetTimerRef }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div className="text-left">
                <h1 className="text-2xl md:text-3xl font-bold" style={{ color: `hsl(${quizBoardTheme.colors.textPrimary})` }}>
                    Quiz Time
                </h1>
                <p className="text-sm md:text-base" style={{ color: `hsl(${quizBoardTheme.colors.textSecondary})` }}>
                    Welcome, {playerName}
                </p>
            </div>

            <div className="flex justify-center md:justify-end">
                <CountdownCircle startTime={15} onTimeUp={onTimeUp} ref={resetTimerRef} />
            </div>
        </div>
    );
}

function QuizBoard2() {
    const topicId = localStorage.getItem("selectedTopicId") || "football";
    const [quizBoardTheme] = useState(() => initializeQuizBoardTheme(topicId));
    const playerDetails = JSON.parse(localStorage.getItem("playerDetails") || '{}');

    const [currentQuestion, setCurrentQuestion] = useState({});
    const [qnumber, setQnumber] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [timeUp, setTimeUp] = useState(false);
    const [history, setHistory] = useState([]);


    const resetTimerRef = useRef(null);

    // Fetch new question whenever question number changes
    useEffect(() => {
        fetchQuestion();
    }, [qnumber]);

    const fetchQuestion = async () => {
        const workflowId = localStorage.getItem("workflowId");
        const response = await axios.post(
            `http://localhost:3000/question/${workflowId}`,
            {},
            { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }
        );

        setCurrentQuestion(response.data.currentQuestion.question || {});
        setHistory(response.data.quizStatus.history || []);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeUp(false);

        // Reset timer for new question
        resetTimerRef.current?.resetTimer();
    };

    const handleAnswerSelect = async (optionId) => {
        setSelectedAnswer(optionId);
        setShowResult(true);
        setTimeUp(false);

        const workflowId = localStorage.getItem("workflowId");

        // Only send answer to workflow, don't fetch next question yet
        await axios.post(
            `http://localhost:3000/answers/${workflowId}`,
            { answer: optionId, questionId: currentQuestion.id },
            { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }
        );

        // Update history immediately
        const historyResponse = await axios.get(
            `http://localhost:3000/history/${workflowId}`,
            { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }
        );
        setHistory(historyResponse.data.history || []);
    };

    const handleNextQuestion = () => {
        setQnumber(prev => prev + 1);
    };

    const handleTimeUp = () => {
        setTimeUp(true);
        setShowResult(true);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-6" style={{ background: quizBoardTheme.gradients.background }}>
            <div className="w-full max-w-5xl">
                <QuizBoardHeader
                    quizBoardTheme={quizBoardTheme}
                    playerName={playerDetails.playerName || "Player"}
                    onTimeUp={handleTimeUp}
                    resetTimerRef={resetTimerRef}
                />

                {/* Question Card */}
                <motion.div
                    key={qnumber}
                    className="p-6 sm:p-8 mb-8 rounded-2xl backdrop-blur-md border"
                    style={{
                        background: quizBoardTheme.gradients.questionCard,
                        borderColor: `hsl(${quizBoardTheme.colors.border})`,
                        boxShadow: quizBoardTheme.shadows.question
                    }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="text-xl md:text-3xl font-bold leading-snug" style={{ color: `hsl(${quizBoardTheme.colors.textPrimary})` }}>
                        {currentQuestion.question}
                    </h2>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        {currentQuestion.options?.map((option) => {
                            const isSelectedOption = selectedAnswer === option.id;
                            const isCorrect = option.id === currentQuestion.correctAnswer;

                            let buttonBg = `hsl(${quizBoardTheme.colors.optionButton})`;
                            if (showResult) {
                                if (isSelectedOption && isCorrect) buttonBg = quizBoardTheme.gradients.correctButton;
                                else if (isSelectedOption && !isCorrect) buttonBg = quizBoardTheme.gradients.wrongButton;
                                else if (isCorrect) buttonBg = quizBoardTheme.gradients.correctButton;
                            }

                            return (
                                <motion.button
                                    key={option.id}
                                    onClick={() => handleAnswerSelect(option.id)}
                                    disabled={showResult || timeUp}
                                    className="w-full p-5 sm:p-6 text-left justify-start h-auto min-h-[60px] rounded-lg font-medium flex items-center border-2"
                                    style={{
                                        background: buttonBg,
                                        color: `hsl(${quizBoardTheme.colors.bright})`,
                                        borderColor: `hsl(${quizBoardTheme.colors.border})`,
                                        boxShadow: quizBoardTheme.shadows.button
                                    }}
                                >
                                    <span className="w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">
                                        {option.id}
                                    </span>
                                    {option.text}
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Result Modal */}
                <AnimatePresence>
                    {showResult && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            <motion.div
                                className="fixed inset-0 backdrop-blur-sm"
                                style={{ backgroundColor: `hsl(${quizBoardTheme.colors.background} / 0.8)` }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />

                            <motion.div
                                className="relative z-10 w-full max-w-md mx-4 rounded-xl p-6 text-center border"
                                style={{
                                    background: `hsl(${quizBoardTheme.colors.modalBg})`,
                                    borderColor: `hsl(${quizBoardTheme.colors.modalBorder})`,
                                    boxShadow: quizBoardTheme.shadows.modal
                                }}
                                initial={{ scale: 0.85, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.85, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="text-6xl mb-4">
                                    {timeUp ? "⏰" : selectedAnswer === currentQuestion.correctAnswer ? "🎉" : "❌"}
                                </div>
                                <p className="text-lg md:text-xl font-bold mb-6">
                                    {timeUp
                                        ? "Time's up!"
                                        : selectedAnswer === currentQuestion.correctAnswer
                                            ? "Correct!"
                                            : "Wrong!"}{" "}
                                    The correct answer was:{" "}
                                    <span className="font-semibold">
                                        {currentQuestion.options?.find(opt => opt.id === currentQuestion.correctAnswer)?.text}
                                    </span>
                                </p>

                                <motion.button
                                    className="w-full px-4 py-3 rounded-lg font-medium text-lg"
                                    style={{
                                        background: quizBoardTheme.gradients.primaryButton,
                                        color: `hsl(${quizBoardTheme.colors.bright})`,
                                        boxShadow: quizBoardTheme.shadows.button
                                    }}
                                    onClick={handleNextQuestion}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Next Question
                                </motion.button>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>


                {/* Question Info & Progress */}
                <div className="text-center mt-6">
                    <p
                        className="text-base md:text-lg font-semibold"
                        style={{ color: `hsl(${quizBoardTheme.colors.textPrimary})` }}
                    >
                        Question {qnumber + 1} of 10
                    </p>

                    {/* Progress Bar */}
                    <div
                        className="w-full rounded-full h-2 mt-3"
                        style={{ backgroundColor: `hsl(${quizBoardTheme.colors.progressBg})` }}
                    >
                        <motion.div
                            className="h-2 rounded-full"
                            style={{ background: `hsl(${quizBoardTheme.colors.progressBar})` }}
                            initial={{ width: 0 }}
                            animate={{
                                width: `${((qnumber + 1) / 10) * 100}%`,
                            }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuizBoard2;
