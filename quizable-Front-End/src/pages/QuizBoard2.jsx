import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountdownCircle from "../components/TimerCircle";
import axios from "axios";
import { initializeQuizBoardTheme } from "../utils/themeUtils";
import { ArrowBigLeft, X } from "lucide-react";

function QuizBoardHeader({ quizBoardTheme, playerName, onTimeUp, resetTimerRef }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div className="text-left flex items-center gap-2">
                <div>
                    <h1
                        className="text-2xl md:text-3xl font-bold"
                        style={{ color: `hsl(${quizBoardTheme.colors.textPrimary})` }}
                    >
                        Quiz Time
                    </h1>
                    <p
                        className="text-sm md:text-base"
                        style={{ color: `hsl(${quizBoardTheme.colors.textSecondary})` }}
                    >
                        Welcome, {playerName}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-end">
                {/* Timer */}
                <CountdownCircle
                    startTime={15}
                    onTimeUp={onTimeUp}
                    quizBoardTheme={quizBoardTheme}
                    ref={resetTimerRef}
                />

                {/* Quit Button */}
                <button
                    className="px-4 py-2 rounded-lg font-medium text-base md:text-lg transition-all duration-200 border-2"
                    style={{
                        background: `hsl(${quizBoardTheme.colors.wrongAnswer})`,
                        color: `hsl(${quizBoardTheme.colors.bright})`,
                        borderColor: `hsl(${quizBoardTheme.colors.border})`,
                        boxShadow: quizBoardTheme.shadows.button,
                    }}
                    onClick={async () => {
                        const confirmQuit = window.confirm("Are you sure you want to quit the quiz?");
                        if (!confirmQuit) return;

                        try {
                            const workflowId = localStorage.getItem("workflowId");
                            await axios.post(
                                `http://localhost:3000/workflow/end/${workflowId}`,
                                {},
                                { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
                            );
                            // After successful quit, redirect to home or results
                            window.location.href = "/";
                        } catch (err) {
                            console.error("Failed to quit workflow:", err);
                            alert("Something went wrong. Please try again.");
                        }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Quit
                </button>
            </div>
        </div>
    );
}

function QuizBoard2() {
    const topicId = localStorage.getItem("selectedTopic") || "football";
    const [quizBoardTheme] = useState(() => initializeQuizBoardTheme(topicId));
    const playerDetails = JSON.parse(localStorage.getItem("playerDetails") || "{}");

    const [currentQuestion, setCurrentQuestion] = useState({});
    const [qnumber, setQnumber] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [timeUp, setTimeUp] = useState(false);
    const [history, setHistory] = useState([]);

    const [lifelines, setLifelines] = useState([
        { id: "fiftyFifty", name: "50:50", used: false },
        { id: "audiencePoll", name: "Audience Poll", used: false },
        { id: "hint", name: "Hint", used: false },
    ]);

    const resetTimerRef = useRef(null);

    useEffect(() => {
        fetchQuestion();
    }, [qnumber]);

    const fetchQuestion = async () => {
        const workflowId = localStorage.getItem("workflowId");
        const response = await axios.post(
            `http://localhost:3000/question/${workflowId}`,
            {},
            { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
        );

        setCurrentQuestion(response.data.currentQuestion.question || {});
        setHistory(response.data.quizStatus.history || []);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeUp(false);

        resetTimerRef.current?.resetTimer();
    };

    const handleAnswerSelect = async (optionId) => {
        setSelectedAnswer(optionId);
        setShowResult(true);
        setTimeUp(false);

        const workflowId = localStorage.getItem("workflowId");

        await axios.post(
            `http://localhost:3000/answers/${workflowId}`,
            { answer: optionId, questionId: currentQuestion.id },
            { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
        );

        const historyResponse = await axios.get(`http://localhost:3000/history/${workflowId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        });
        setHistory(historyResponse.data.history || []);
    };

    const handleNextQuestion = () => {
        // Check if we've completed 10 questions (qnumber starts at 0, so 9 is the 10th question)
        if (qnumber >= 9) {
            window.location.href = "/results";
            return;
        }
        setQnumber((prev) => prev + 1);
    };

    const handleTimeUp = async () => {
        setTimeUp(true);
        setShowResult(true);
        
        // Submit empty answer when time runs out
        const workflowId = localStorage.getItem("workflowId");
        try {
            await axios.post(
                `http://localhost:3000/answers/${workflowId}`,
                { answer: null, questionId: currentQuestion.id },
                { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
            );

            const historyResponse = await axios.get(`http://localhost:3000/history/${workflowId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
            });
            setHistory(historyResponse.data.history || []);
        } catch (error) {
            console.error("Error submitting timeout answer:", error);
        }
    };

    const useLifeline = (lifelineId) => {
        if (showResult) return;
        setLifelines((prev) =>
            prev.map((l) => (l.id === lifelineId ? { ...l, used: true } : l))
        );
        // Add lifeline functionality here if needed
    };

    const getButtonAnimation = (index) => ({
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, delay: index * 0.1 },
    });

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 py-6"
            style={{ background: quizBoardTheme.gradients.background }}
        >
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
                        boxShadow: quizBoardTheme.shadows.question,
                    }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h2
                        className="text-xl md:text-3xl font-bold leading-snug"
                        style={{ color: `hsl(${quizBoardTheme.colors.textPrimary})` }}
                    >
                        {currentQuestion.question}
                    </h2>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        <AnimatePresence>
                            {currentQuestion.options?.map((option, index) => {
                                const isSelected = selectedAnswer === option.id;
                                const isCorrect = option.id === currentQuestion.correctAnswer;

                                let buttonBg = `hsl(${quizBoardTheme.colors.optionButton})`;
                                let textColor = `hsl(${quizBoardTheme.colors.textSecondary})`;
                                let borderColor = `hsl(${quizBoardTheme.colors.border})`;
                                let hoverShadow = quizBoardTheme.shadows.button;

                                if (showResult) {
                                    if (isSelected && isCorrect) {
                                        buttonBg = quizBoardTheme.gradients.correctButton;
                                        textColor = `hsl(${quizBoardTheme.colors.bright})`;
                                        borderColor = `hsl(${quizBoardTheme.colors.correctAnswer})`;
                                        hoverShadow = quizBoardTheme.shadows.correctGlow;
                                    } else if (isSelected && !isCorrect) {
                                        buttonBg = quizBoardTheme.gradients.wrongButton;
                                        textColor = `hsl(${quizBoardTheme.colors.bright})`;
                                        borderColor = `hsl(${quizBoardTheme.colors.wrongAnswer})`;
                                        hoverShadow = quizBoardTheme.shadows.wrongGlow;
                                    } else if (isCorrect) {
                                        buttonBg = quizBoardTheme.gradients.correctButton;
                                        textColor = `hsl(${quizBoardTheme.colors.bright})`;
                                        borderColor = `hsl(${quizBoardTheme.colors.correctAnswer})`;
                                        hoverShadow = quizBoardTheme.shadows.correctGlow;
                                    } else {
                                        buttonBg = `hsl(${quizBoardTheme.colors.muted})`;
                                        textColor = `hsl(${quizBoardTheme.colors.textMuted})`;
                                    }
                                }

                                return (
                                    <motion.div key={index} {...getButtonAnimation(index)}>
                                        <motion.button
                                            onClick={() => handleAnswerSelect(option.id)}
                                            disabled={showResult || timeUp}
                                            className={`w-full p-5 sm:p-6 text-left justify-start h-auto min-h-[60px] rounded-lg font-medium flex items-center border-2 ${showResult || timeUp ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
                                                }`}
                                            style={{
                                                background: buttonBg,
                                                color: textColor,
                                                borderColor,
                                                boxShadow: hoverShadow,
                                            }}
                                            whileHover={{
                                                scale: showResult || timeUp ? 1 : 1.02,
                                                background: !showResult ? `hsl(${quizBoardTheme.colors.optionHover})` : buttonBg,
                                            }}
                                            whileTap={{ scale: showResult || timeUp ? 1 : 0.98 }}
                                        >
                                            <span
                                                className="w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0"
                                                style={{
                                                    background: `hsl(${quizBoardTheme.colors.primary})`,
                                                    color: `hsl(${quizBoardTheme.colors.bright})`,
                                                }}
                                            >
                                                {option.id}
                                            </span>
                                            <span className="text-base md:text-lg font-semibold">{option.text}</span>
                                        </motion.button>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Lifelines */}
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                    {lifelines.map((lifeline) => (
                        <button
                            key={lifeline.id}
                            className="px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center border-2"
                            style={{
                                background: lifeline.used
                                    ? `hsl(${quizBoardTheme.colors.lifelineUsed})`
                                    : `hsl(${quizBoardTheme.colors.lifeline})`,
                                color: lifeline.used
                                    ? `hsl(${quizBoardTheme.colors.textMuted})`
                                    : `hsl(${quizBoardTheme.colors.bright})`,
                                borderColor: lifeline.used
                                    ? `hsl(${quizBoardTheme.colors.border})`
                                    : `hsl(${quizBoardTheme.colors.lifeline})`,
                                opacity: lifeline.used ? 0.4 : 1,
                                cursor: lifeline.used || showResult ? "not-allowed" : "pointer",
                            }}
                            onClick={() => useLifeline(lifeline.id)}
                            disabled={lifeline.used || showResult}
                        >
                            {lifeline.name}
                            {lifeline.used && <X className="w-3 h-3 ml-2" />}
                        </button>
                    ))}
                </div>

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
                                    boxShadow: quizBoardTheme.shadows.modal,
                                }}
                                initial={{ scale: 0.85, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.85, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="text-6xl mb-4">
                                    {timeUp ? "⏰" : selectedAnswer === currentQuestion.correctAnswer ? "🎉" : "❌"}
                                </div>
                                <p className="text-lg md:text-xl font-bold mb-6 text"
                                    style={{ color: `hsl(${quizBoardTheme.colors.textPrimary})` }}
                                >
                                    {timeUp
                                        ? "Time's up!"
                                        : selectedAnswer === currentQuestion.correctAnswer
                                            ? "Correct!"
                                            : "Wrong!"}{" "}
                                    The correct answer was:{" "}
                                    <span className="font-semibold">
                                        {currentQuestion.options?.find((opt) => opt.id === currentQuestion.correctAnswer)?.text}
                                    </span>
                                </p>

                                <motion.button
                                    className="w-full px-4 py-3 rounded-lg font-medium text-lg"
                                    style={{
                                        background: quizBoardTheme.gradients.primaryButton,
                                        color: `hsl(${quizBoardTheme.colors.bright})`,
                                        boxShadow: quizBoardTheme.shadows.button,
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

                {/* Progress */}
                <div className="text-center mt-6">
                    <p
                        className="text-base md:text-lg font-semibold"
                        style={{ color: `hsl(${quizBoardTheme.colors.textPrimary})` }}
                    >
                        Question {qnumber + 1} of 10
                    </p>

                    <div className="w-full rounded-full h-2 mt-3" style={{ backgroundColor: `hsl(${quizBoardTheme.colors.progressBg})` }}>
                        <motion.div
                            className="h-2 rounded-full"
                            style={{ background: `hsl(${quizBoardTheme.colors.progressBar})` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${((qnumber + 1) / 10) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuizBoard2;
