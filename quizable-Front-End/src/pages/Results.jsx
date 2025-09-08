import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { Trophy, Target, RotateCcw, Share2, Star, Clock, CheckCircle, Award, Zap } from 'lucide-react'

function Results() {
    const navigate = useNavigate()
    const location = useLocation()
    
    // Get results data from navigation state or localStorage
    const resultsData = location.state || JSON.parse(localStorage.getItem('gameResults') || '{}')
    
    const [score, setScore] = useState(0)
    const [total, setTotal] = useState(10)
    const [playerName, setPlayerName] = useState('Player')
    const [theme, setTheme] = useState({ name: 'Quiz' })
    const [timeTaken, setTimeTaken] = useState(0)
    const [correctAnswers, setCorrectAnswers] = useState(0)

    useEffect(() => {
        if (resultsData.playerDetails) {
            setScore(resultsData.playerDetails.currentScore || 0)
            setCorrectAnswers(resultsData.playerDetails.correctAnswers || 0)
            setTotal(resultsData.playerDetails.totalQuestions || 10)
            setPlayerName(resultsData.playerName || resultsData.playerDetails.playerName || 'Player')
        }
        
        if (resultsData.theme) {
            setTheme(resultsData.theme)
        }
        
        // Calculate time taken
        if (resultsData.startTime && resultsData.endTime) {
            const timeInSeconds = Math.floor((resultsData.endTime - resultsData.startTime) / 1000)
            setTimeTaken(timeInSeconds)
        }
        
    }, [resultsData, score, total])

    const percentage = Math.round((score / total) * 100)

    const getPerformanceLevel = () => {
        if (percentage >= 90) return { 
            level: "Legendary", 
            icon: "🏆", 
            color: "text-yellow-400",
            bgGradient: "from-yellow-400/20 to-orange-400/20",
            borderColor: "border-yellow-400/30"
        }
        if (percentage >= 80) return { 
            level: "Expert", 
            icon: "⭐", 
            color: "text-purple-400",
            bgGradient: "from-purple-400/20 to-pink-400/20",
            borderColor: "border-purple-400/30"
        }
        if (percentage >= 70) return { 
            level: "Skilled", 
            icon: "🎯", 
            color: "text-blue-400",
            bgGradient: "from-blue-400/20 to-cyan-400/20",
            borderColor: "border-blue-400/30"
        }
        if (percentage >= 50) return { 
            level: "Average", 
            icon: "📚", 
            color: "text-green-400",
            bgGradient: "from-green-400/20 to-emerald-400/20",
            borderColor: "border-green-400/30"
        }
        return { 
            level: "Beginner", 
            icon: "💪", 
            color: "text-gray-400",
            bgGradient: "from-gray-400/20 to-slate-400/20",
            borderColor: "border-gray-400/30"
        }
    }

    const getPerformanceMessage = () => {
        if (percentage >= 90) return "Outstanding! You're a true genius! 🧠"
        if (percentage >= 80) return "Excellent work! Your knowledge is impressive! 👏"
        if (percentage >= 70) return "Good job! You know your stuff well!"
        if (percentage >= 50) return "Not bad! Keep studying to improve!"
        return "Keep practicing! Every expert was once a beginner! 💪"
    }

    const performance = getPerformanceLevel()

    const handlePlayAgain = () => {
        // Clear game data and redirect to theme selection
        localStorage.removeItem('currentGame')
        localStorage.removeItem('gameResults')
        localStorage.removeItem('startTime')
        navigate('/')
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `${theme.name} Results`,
                text: `I scored ${score}/${total} (${percentage}%) in ${theme.name}! 🎯`,
                url: window.location.origin,
            })
        } else {
            // Fallback to copying to clipboard
            const shareText = `I scored ${score}/${total} (${percentage}%) in ${theme.name}! 🎯 ${window.location.origin}`
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Results copied to clipboard!')
            })
        }
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`
    }

    if (!resultsData.playerDetails) {
        return (
            <div className="h-[100vh] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden">
                <motion.div 
                    className="text-center p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-6xl mb-4">🤔</div>
                    <h1 className="text-2xl text-white mb-4 font-bold">No results found</h1>
                    <p className="text-white/70 mb-6">It looks like you haven't completed a quiz yet.</p>
                    <motion.button 
                        onClick={() => navigate('/')}
                        className="px-6 py-3 rounded-xl font-medium transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Start Your First Quiz
                    </motion.button>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="h-[100dvh] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 flex items-center justify-center px-4 py-4 h-full overflow-y-auto">
                <div className="max-w-4xl w-full">
                    {/* Floating particles animation */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-white/20 rounded-full"
                                initial={{ 
                                    x: Math.random() * window.innerWidth, 
                                    y: Math.random() * window.innerHeight,
                                    opacity: 0 
                                }}
                                animate={{ 
                                    y: -100,
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ 
                                    duration: Math.random() * 3 + 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2
                                }}
                            />
                        ))}
                    </div>

                    {/* Header */}
                    <motion.div
                        className="text-center mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div 
                            className="flex items-center justify-center gap-3 mb-4"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <Trophy className="w-8 h-8 text-yellow-400 drop-shadow-lg" />
                            </motion.div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                                Quiz Complete!
                            </h1>
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <Trophy className="w-8 h-8 text-yellow-400 drop-shadow-lg" />
                            </motion.div>
                        </motion.div>
                        <motion.p 
                            className="text-lg text-white/90 font-medium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Congratulations, <span className="text-cyan-400 font-bold">{playerName}</span>! 🎉
                        </motion.p>
                    </motion.div>

                    {/* Results Card */}
                    <motion.div
                        className={`relative p-6 bg-gradient-to-br ${performance.bgGradient} backdrop-blur-xl rounded-3xl shadow-2xl mb-4 border ${performance.borderColor} overflow-hidden`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 animate-shimmer"></div>
                        
                        {/* Performance Level */}
                        <div className="text-center mb-6 relative z-10">
                            <motion.div
                                className="text-6xl mb-4 filter drop-shadow-2xl"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.6 }}
                            >
                                {performance.icon}
                            </motion.div>
                            <motion.h2 
                                className={`text-2xl font-bold mb-3 ${performance.color} drop-shadow-lg`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                {performance.level}
                            </motion.h2>
                            <motion.div
                                className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <p className="text-white/90 text-base font-medium">
                                    {getPerformanceMessage()}
                                </p>
                            </motion.div>
                        </div>

                        {/* Score Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            {/* Main Score */}
                            <motion.div
                                className="relative text-center p-6 bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm rounded-2xl border border-blue-400/30 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <Target className="w-8 h-8 text-blue-400 mx-auto mb-3 filter drop-shadow-lg" />
                                <div className="text-3xl font-bold text-blue-400 mb-2 relative z-10">
                                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                        {score}/{total}
                                    </span>
                                </div>
                                <p className="text-white/80 text-sm font-medium relative z-10">Questions Correct</p>
                            </motion.div>

                            {/* Percentage */}
                            <motion.div
                                className="relative text-center p-6 bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-sm rounded-2xl border border-green-400/30 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3 filter drop-shadow-lg" />
                                <div className="text-3xl font-bold text-green-400 mb-2 relative z-10">
                                    <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                        {percentage}%
                                    </span>
                                </div>
                                <p className="text-white/80 text-sm font-medium relative z-10">Accuracy</p>
                            </motion.div>

                            {/* Time */}
                            <motion.div
                                className="relative text-center p-6 bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-sm rounded-2xl border border-orange-400/30 shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <Clock className="w-8 h-8 text-orange-400 mx-auto mb-3 filter drop-shadow-lg" />
                                <div className="text-3xl font-bold text-orange-400 mb-2 relative z-10">
                                    <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                                        {formatTime(timeTaken)}
                                    </span>
                                </div>
                                <p className="text-white/80 text-sm font-medium relative z-10">Time Taken</p>
                            </motion.div>
                        </div>

                        {/* Progress Bar */}
                        <motion.div 
                            className="mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                        >
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-white/90 text-base font-medium flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-yellow-400" />
                                    Overall Performance
                                </span>
                                <span className="text-white font-bold text-lg bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                    {percentage}%
                                </span>
                            </div>
                            <div className="relative w-full bg-slate-800/50 rounded-full h-3 backdrop-blur-sm border border-white/10 overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-full"></div>
                            </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.0 }}
                        >
                            <motion.button
                                onClick={handlePlayAgain}
                                className="relative w-full px-6 py-3 rounded-2xl font-bold text-base transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-1 overflow-hidden group"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative flex items-center justify-center gap-3">
                                    <RotateCcw className="w-5 h-5" />
                                    Play Again
                                </div>
                            </motion.button>

                            <motion.button
                                onClick={handleShare}
                                className="relative w-full px-6 py-3 rounded-2xl font-bold text-base transition-all duration-300 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 overflow-hidden group"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative flex items-center justify-center gap-3">
                                    <Share2 className="w-5 h-5" />
                                    Share Results
                                </div>
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Footer Message */}
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        <div className="inline-block px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                            <p className="text-white/70 text-sm">
                                Thanks for playing <span className="text-cyan-400 font-semibold">{theme.name}</span>! Challenge your friends and see who knows more! 🚀
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Results