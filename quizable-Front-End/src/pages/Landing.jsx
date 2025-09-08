import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Zap, Beaker, History, Gamepad2, Brain } from 'lucide-react';
import TypingHello from '../components/TypingHello';
import { getThemeByTopicId } from '../utils/themeUtils';

function Landing() {
    const navigate = useNavigate();
    const [playerName, setPlayerName] = useState('');
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        const topicId = localStorage.getItem('selectedTopic');
        if (topicId === null || topicId === 'null') {
            navigate('/');
            return;
        }

        // Get complete theme data based on topic ID
        const themeData = getThemeByTopicId(topicId);
        if (!themeData.isValid) {
            navigate('/');
            return;
        }

        setTheme(themeData);
    }, [navigate]);

    const handleBackToTopics = () => {
        localStorage.setItem('selectedTopic', null);
        navigate('/');
    };

    const handleStartGame = () => {
        if (!playerName.trim()) return;
        
        // Create game data structure for QuizBoard
        const gameData = {
            playerName: playerName.trim(),
            theme: {
                name: content.name || topic.name,
                emoji: topic.emoji,
                subject: topic.subject
            },
            startTime: Date.now(),
            playerDetails: {
                playerName: playerName.trim(),
                currentScore: 0,
                questionIndex: 0,
                correctAnswers: 0,
                totalQuestions: 10
            }
        };
        
        // Save to localStorage for persistence
        localStorage.setItem('currentGame', JSON.stringify(gameData));
        localStorage.setItem('startTime', 'true');
        
        // Navigate to QuizBoard with game data
        navigate('/quizboard', { state: gameData });
    };

    // Define features based on selected topic
    const features = [
        { title: "Timed", icon: "timer" },
        { title: "Scored", icon: "score" },
        { title: "Ranked", icon: "rank" },
        { title: "Fun", icon: "fun" },
        { title: "Challenge", icon: "challenge" }
    ];

    const icons = [Trophy, Zap, Beaker, History, Gamepad2];

    if (!theme) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    const { topic, content, styles } = theme;

    return (
        <div className={`h-screen ${styles.background} flex flex-col px-4 py-4 overflow-hidden`}>
            <div className="max-w-6xl w-full mx-auto flex flex-col h-full">
                {/* back button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <button
                        onClick={handleBackToTopics}
                        className={`group flex items-center text-white hover:${styles.accent} transition-all duration-300 rounded-xl px-4 py-2 font-semibold hover:scale-105 bg-transparent cursor-pointer border-0`}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                        Back to Topics
                    </button>
                </motion.div>

                {/* Topic Header with Dynamic Content */}
                <div className="flex justify-center items-center mb-4">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center justify-center gap-4 mb-2">
                            <span className="text-6xl">{topic.emoji}</span>
                            <h1 className="text-4xl md:text-6xl font-extrabold text-white">
                                {topic.name}
                            </h1>
                        </div>
                        {/* <TypingHello /> */}
                    </motion.div>
                </div>

                {/* Main Content Container */}
                <div className="flex-1 flex items-center justify-center min-h-0">
                    <div className="grid lg:grid-cols-2 gap-8 w-full items-start max-h-full">
                        {/* Left Side - Game Info & Features */}
                        <motion.div
                            className="space-y-4 flex-shrink-0"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            {/* Tagline */}
                            <motion.p
                                className="text-xl md:text-2xl font-semibold text-white mb-6 min-h-[3rem]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            >
                                {content.tagline}
                            </motion.p>

                            {/* How to Play - Compact Version */}
                            <div className={`${styles.cardBg} ${styles.border} border rounded-xl p-4 mb-4 min-h-[8rem]`}>
                                <h3 className={`text-lg font-bold mb-3 ${styles.accent}`}>
                                    {content.howToPlay.title}
                                </h3>
                                <div className="grid grid-cols-1 gap-2 text-sm text-white">
                                    {content.howToPlay.steps.slice(0, 3).map((step) => (
                                        <div key={step.number} className="flex items-center gap-2">
                                            <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${styles.primary} text-white flex items-center justify-center font-bold text-xs`}>
                                                {step.number}
                                            </div>
                                            <span className="text-sm">{step.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Features Grid - Horizontal */}
                            <div className="grid grid-cols-5 gap-2 min-h-[4rem]">
                                {features.map((feature, index) => {
                                    const IconComponent = icons[index] || Trophy;
                                    return (
                                        <motion.div
                                            key={feature.title}
                                            className={`text-center p-2 ${styles.cardBg} ${styles.border} border rounded-lg hover:bg-opacity-60 transition-all duration-300 h-16 flex flex-col items-center justify-center`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                        >
                                            <IconComponent className={`w-4 h-4 ${styles.accent} mb-1 mx-auto`} />
                                            <h6 className={`font-bold text-xs mb-1 ${styles.accent}`}>
                                                {feature.title}
                                            </h6>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Right Side - Game Start Form */}
                        <motion.div
                            className={`rounded-xl p-6 ${styles.cardBg} max-w-md mx-auto w-full shadow-lg flex-shrink-0 min-h-[24rem] flex flex-col justify-center`}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            {/* Name Input Section */}
                            <div className="space-y-4 text-center">
                                <h2 className={`text-2xl font-bold ${styles.accent} mb-4`}>
                                    Ready to Start?
                                </h2>

                                <input
                                    type="text"
                                    placeholder={content.placeholders.nameInput}
                                    value={playerName}
                                    onChange={(e) => setPlayerName(e.target.value)}
                                    className={`h-12 w-full text-lg bg-black/20 border-2 ${styles.border} focus:outline-none focus:ring-2 focus:ring-current rounded-xl px-3 text-white placeholder:text-gray-400`}
                                    onKeyPress={(e) =>
                                        e.key === "Enter" && handleStartGame()
                                    }
                                />

                                <motion.button
                                    onClick={handleStartGame}
                                    disabled={!playerName.trim()}
                                    className={`w-full py-3 rounded-xl font-black text-xl text-white bg-gradient-to-r ${styles.primary} hover:opacity-90 transition-all duration-300 disabled:opacity-50`}
                                    whileHover={{ scale: playerName.trim() ? 1.02 : 1 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {content.buttons.startButton}
                                </motion.button>

                                {/* Additional Game Stats or Info */}
                                <div className="mt-4 p-3 bg-black/20 rounded-lg">
                                    <p className="text-sm text-white/80">
                                        Join thousands of players testing their {topic.subject.toLowerCase()} knowledge!
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Footer */}
                <motion.div
                    className="text-center py-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                >
                    <p className="text-white/70 text-xs">Developed by Shyam</p>
                </motion.div>
            </div>
        </div>
    )
}

export default Landing