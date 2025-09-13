import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { X, Lightbulb, Users, Target } from 'lucide-react'
import TimerCircle from '../components/TimerCircle'
import { timerConfig } from '../data/timerConfig'
import footballQuizData from '../data/football_quiz_100_questions.json'
import {
    initializeQuizBoardTheme,
    getQuizBoardTheme,
    getQuizBoardClasses,
    getThemeByTopicId
} from '../utils/themeUtils'

function QuizBoard() {
    const navigate = useNavigate()
    const location = useLocation()

    // Get game data from navigation state or localStorage
    const gameData = location.state || JSON.parse(localStorage.getItem('currentGame') || '{}')

    // Get topic ID for theming
    const topicId = localStorage.getItem('selectedTopic') || 'general'

    // Initialize theme
    const [quizBoardTheme] = useState(() => initializeQuizBoardTheme(topicId))

    // Quiz state
    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [score, setScore] = useState(0)
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [timeUp, setTimeUp] = useState(false)
    const [isAnswering, setIsAnswering] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [isTimerActive, setIsTimerActive] = useState(true)
    const [startTime] = useState(Date.now())

    // Player details from navigation state
    const [playerDetails, setPlayerDetails] = useState({
        playerName: gameData.playerName || "Player",
        currentScore: 0,
        questionIndex: 0,
        correctAnswers: 0,
        totalQuestions: 10
    })

    // Theme and lifelines
    const [theme] = useState(gameData.theme || { name: "IQ" })
    const [lifelines, setLifelines] = useState([
        {
            id: 'fiftyFifty',
            name: '50:50',
            icon: Target,
            used: false
        },
        {
            id: 'audiencePoll',
            name: 'Audience Poll',
            icon: Users,
            used: false
        },
        {
            id: 'hint',
            name: 'Hint',
            icon: Lightbulb,
            used: false
        }
    ])

    // Load questions on component mount
    useEffect(() => {
        const loadQuestions = () => {
            try {
                // Use imported football quiz data
                const QuizQuestions = footballQuizData[0][topicId].questions

                // Shuffle and select 10 questions
                // const shuffled = QuizQuestions.sort(() => 0.5 - Math.random())
                const selectedQuestions = QuizQuestions.slice(0, 10)

                setQuestions(selectedQuestions)
            } catch (error) {
                console.error('Error loading questions:', error)
                // Fallback to empty array if data loading fails
                setQuestions([])
            }
        }

        loadQuestions()
    }, [])

    // Save game state to localStorage
    const saveGameState = useCallback(() => {
        const gameState = {
            ...gameData,
            playerDetails: {
                ...playerDetails,
                questionIndex: currentQuestion,
                currentScore: score,
                correctAnswers
            }
        }
        localStorage.setItem('currentGame', JSON.stringify(gameState))
    }, [gameData, playerDetails, currentQuestion, score, correctAnswers])

    // Update game state whenever it changes
    useEffect(() => {
        setPlayerDetails(prev => ({
            ...prev,
            questionIndex: currentQuestion,
            currentScore: score,
            correctAnswers
        }))
        saveGameState()
    }, [currentQuestion, score, correctAnswers, saveGameState])

    const question = questions[currentQuestion]
    const isLastQuestion = currentQuestion === questions.length - 1

    // Handle timer events
    const handleTimeUp = useCallback(() => {
        setTimeUp(true)
        setIsTimerActive(false)
        setIsAnswering(true)
        setShowResult(true)
    }, [])

    const handleTimeChange = useCallback((timeLeft) => {
        // Optional: Add visual feedback when time is running low
        if (timeLeft <= timerConfig.warningThreshold) {
            // Could add warning styles here
        }
    }, [])

    // Handle answer selection
    const handleAnswerSelect = useCallback((answerIndex) => {
        if (isAnswering || timeUp) return

        setSelectedAnswer(answerIndex)
        setIsAnswering(true)
        setIsTimerActive(false) // Pause timer when answer is selected

        

        // const isCorrect = question.options[answerIndex].id === question.correctAnswer

        if (isCorrect) {
            setScore(prev => prev + 1)
            setCorrectAnswers(prev => prev + 1)
        }

        setShowResult(true)
    }, [isAnswering, timeUp, question])

    // Handle next question
    const handleNextQuestion = useCallback(() => {
        if (isLastQuestion) {
            // First hide the modal and reset states
            setShowResult(false)
            setIsAnswering(false)
            setIsTimerActive(false)

            // Create final game data
            const finalGameData = {
                ...gameData,
                playerDetails: {
                    ...playerDetails,
                    currentScore: score,
                    correctAnswers,
                    totalQuestions: questions.length,
                    completed: true
                },
                endTime: Date.now(),
                startTime,
                theme: theme
            }

            // Store results in localStorage
            localStorage.setItem('gameResults', JSON.stringify(finalGameData))
            console.log('Navigating to results with data:', finalGameData)
            window.location.href = '/results'

        } else {
            // Move to next question
            setCurrentQuestion(prev => prev + 1)
            setSelectedAnswer(null)
            setTimeUp(false)
            setIsAnswering(false)
            setShowResult(false)
            setIsTimerActive(true) // Restart timer for next question
        }
    }, [isLastQuestion, gameData, playerDetails, score, correctAnswers, questions.length, startTime, navigate, theme])

    // Lifeline handlers
    const useLifeline = useCallback((lifelineId) => {
        if (showResult) return

        setLifelines(prev =>
            prev.map(lifeline =>
                lifeline.id === lifelineId
                    ? { ...lifeline, used: true }
                    : lifeline
            )
        )

        switch (lifelineId) {
            case 'fiftyFifty':
                // Remove two incorrect options
                const correctAnswerId = question.correctAnswer
                const incorrectOptions = question.options.filter(opt => opt.id !== correctAnswerId)
                const optionsToRemove = incorrectOptions.slice(0, 2).map(opt => opt.id)

                // Mark options as removed (you'd implement visual hiding)
                console.log('50:50 used - remove options:', optionsToRemove)
                break

            case 'audiencePoll':
                // Show audience poll data
                if (question.lifelineData?.audiencePoll) {
                    console.log('Audience Poll:', question.lifelineData.audiencePoll)
                    // You could show this in a modal or sidebar
                }
                break

            case 'hint':
                // Show a hint (you'd implement this based on question data)
                console.log('Hint requested for question:', question.id)
                break
        }
    }, [showResult, question])

    // Button animation variants
    const getButtonAnimation = (index) => ({
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, delay: index * 0.1 }
    })

    // Loading state
    if (questions.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent-bright mb-4"></div>
                    <p className="text-bright text-xl">Loading questions...</p>
                </div>
            </div>
        )
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 py-6"
            style={{ background: quizBoardTheme.gradients.background }}
        >
            <div className="w-full max-w-5xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                    <div className="text-left">
                        <h1
                            className="text-2xl md:text-3xl font-bold"
                            style={{ color: `hsl(${quizBoardTheme.colors.textPrimary})` }}
                        >
                            {theme.name}
                        </h1>
                        <p
                            className="text-sm md:text-base"
                            style={{ color: `hsl(${quizBoardTheme.colors.textSecondary})` }}
                        >
                            Welcome, {playerDetails.playerName}
                        </p>
                    </div>

                    <div className="flex justify-center md:justify-end">
                        <TimerCircle
                            duration={timerConfig.timerDuration}
                            onTimeUp={handleTimeUp}
                            isActive={isTimerActive}
                            onTimeChange={handleTimeChange}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <motion.div
                    key={currentQuestion}
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
                    <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                        <div className="flex-1">
                            {/* Tags */}
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span
                                    className="px-3 py-1 rounded-full text-sm font-semibold"
                                    style={{
                                        background: `hsl(${quizBoardTheme.colors.primary})`,
                                        color: `hsl(${quizBoardTheme.colors.bright})`
                                    }}
                                >
                                    Question {currentQuestion + 1}
                                </span>
                                <span
                                    className="px-3 py-1 rounded-full text-sm"
                                    style={{
                                        background: `hsl(${quizBoardTheme.colors.secondary})`,
                                        color: `hsl(${quizBoardTheme.colors.background})`
                                    }}
                                >
                                    {question.difficulty}
                                </span>
                            </div>

                            {/* Question */}
                            <h2
                                className="text-xl md:text-3xl font-bold leading-snug"
                                style={{ color: `hsl(${quizBoardTheme.colors.textPrimary})` }}
                            >
                                {question.question}
                            </h2>
                        </div>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <AnimatePresence>
                            {question.options.map((option, index) => {
                                const isSelected = selectedAnswer === index
                                const isCorrect = option.id === question.correctAnswer
                                let buttonStyles = "w-full p-5 sm:p-6 text-left justify-start h-auto min-h-[60px] rounded-lg font-medium transition-all duration-200 flex items-center border-2"
                                let buttonBg, textColor, borderColor, hoverStyles = {}

                                if (showResult) {
                                    if (isSelected && isCorrect) {
                                        buttonBg = quizBoardTheme.gradients.correctButton
                                        textColor = `hsl(${quizBoardTheme.colors.bright})`
                                        borderColor = `hsl(${quizBoardTheme.colors.correctAnswer})`
                                        hoverStyles.boxShadow = quizBoardTheme.shadows.correctGlow
                                    } else if (isSelected && !isCorrect) {
                                        buttonBg = quizBoardTheme.gradients.wrongButton
                                        textColor = `hsl(${quizBoardTheme.colors.bright})`
                                        borderColor = `hsl(${quizBoardTheme.colors.wrongAnswer})`
                                        hoverStyles.boxShadow = quizBoardTheme.shadows.wrongGlow
                                    } else if (isCorrect) {
                                        buttonBg = quizBoardTheme.gradients.correctButton
                                        textColor = `hsl(${quizBoardTheme.colors.bright})`
                                        borderColor = `hsl(${quizBoardTheme.colors.correctAnswer})`
                                        hoverStyles.boxShadow = quizBoardTheme.shadows.correctGlow
                                    } else {
                                        buttonBg = `hsl(${quizBoardTheme.colors.muted})`
                                        textColor = `hsl(${quizBoardTheme.colors.textMuted})`
                                        borderColor = `hsl(${quizBoardTheme.colors.border})`
                                    }
                                } else {
                                    buttonBg = `hsl(${quizBoardTheme.colors.optionButton})`
                                    textColor = `hsl(${quizBoardTheme.colors.textSecondary})`
                                    borderColor = `hsl(${quizBoardTheme.colors.border})`
                                }

                                if (isAnswering || timeUp) {
                                    buttonStyles += " opacity-70 cursor-not-allowed"
                                } else {
                                    buttonStyles += " cursor-pointer"
                                }

                                return (
                                    <motion.div key={index} {...getButtonAnimation(index)}>
                                        <motion.button
                                            onClick={() => handleAnswerSelect(index)}
                                            disabled={isAnswering || timeUp}
                                            className={buttonStyles}
                                            style={{
                                                background: buttonBg,
                                                color: textColor,
                                                borderColor: borderColor,
                                                boxShadow: quizBoardTheme.shadows.button,
                                                ...hoverStyles
                                            }}
                                            whileHover={{
                                                scale: (isAnswering || timeUp) ? 1 : 1.02,
                                                background: !showResult ? `hsl(${quizBoardTheme.colors.optionHover})` : buttonBg
                                            }}
                                            whileTap={{ scale: (isAnswering || timeUp) ? 1 : 0.98 }}
                                        >
                                            <span
                                                className="w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0"
                                                style={{
                                                    background: `hsl(${quizBoardTheme.colors.primary})`,
                                                    color: `hsl(${quizBoardTheme.colors.bright})`
                                                }}
                                            >
                                                {String.fromCharCode(65 + index)}
                                            </span>
                                            <span className="text-base md:text-lg font-semibold">
                                                {option.text}
                                            </span>
                                        </motion.button>
                                    </motion.div>
                                )
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
                                background: lifeline.used ? `hsl(${quizBoardTheme.colors.lifelineUsed})` : `hsl(${quizBoardTheme.colors.lifeline})`,
                                color: lifeline.used ? `hsl(${quizBoardTheme.colors.textMuted})` : `hsl(${quizBoardTheme.colors.bright})`,
                                borderColor: lifeline.used ? `hsl(${quizBoardTheme.colors.border})` : `hsl(${quizBoardTheme.colors.lifeline})`,
                                opacity: lifeline.used ? 0.4 : 1,
                                cursor: lifeline.used || showResult ? 'not-allowed' : 'pointer'
                            }}
                            onClick={() => useLifeline(lifeline.id)}
                            disabled={lifeline.used || showResult}
                        >
                            <lifeline.icon className="w-4 h-4 mr-2" />
                            {lifeline.name}
                            {lifeline.used && <X className="w-3 h-3 ml-2" />}
                        </button>
                    ))}
                </div>

                {/* Result Modal */}
                <AnimatePresence>
                    {showResult && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            {/* Backdrop */}
                            <motion.div
                                className="fixed inset-0 backdrop-blur-sm"
                                style={{ backgroundColor: `hsl(${quizBoardTheme.colors.background} / 0.8)` }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />

                            {/* Modal Content */}
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
                                {timeUp ? (
                                    <div>
                                        <div className="text-6xl mb-4">⏰</div>
                                        <p
                                            className="text-lg md:text-xl font-bold mb-6"
                                            style={{ color: `hsl(${quizBoardTheme.colors.wrongAnswer})` }}
                                        >
                                            Time's up! The correct answer was:{" "}
                                            <span style={{ color: `hsl(${quizBoardTheme.colors.correctAnswer})` }}>
                                                {question.options.find((opt) => opt.id === question.correctAnswer).text}
                                            </span>
                                        </p>
                                    </div>
                                ) : selectedAnswer !== null &&
                                    question.options[selectedAnswer].id === question.correctAnswer ? (
                                    <div>
                                        <div className="text-6xl mb-4">🎉</div>
                                        <p
                                            className="text-lg md:text-xl font-bold mb-6"
                                            style={{ color: `hsl(${quizBoardTheme.colors.correctAnswer})` }}
                                        >
                                            Correct! The answer is:{" "}
                                            {question.options.find((opt) => opt.id === question.correctAnswer).text}
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="text-6xl mb-4">❌</div>
                                        <p
                                            className="text-lg md:text-xl font-bold mb-6"
                                            style={{ color: `hsl(${quizBoardTheme.colors.wrongAnswer})` }}
                                        >
                                            Wrong! The correct answer was:{" "}
                                            <span style={{ color: `hsl(${quizBoardTheme.colors.correctAnswer})` }}>
                                                {question.options.find((opt) => opt.id === question.correctAnswer).text}
                                            </span>
                                        </p>
                                    </div>
                                )}

                                <motion.button
                                    className="w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 text-lg"
                                    style={{
                                        background: quizBoardTheme.gradients.primaryButton,
                                        color: `hsl(${quizBoardTheme.colors.bright})`,
                                        boxShadow: quizBoardTheme.shadows.button
                                    }}
                                    onClick={handleNextQuestion}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isLastQuestion ? "🏆 View Results" : "➡️ Next Question"}
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
                        Question {currentQuestion + 1} of {questions.length} • Score: {score}
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
                                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                            }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizBoard