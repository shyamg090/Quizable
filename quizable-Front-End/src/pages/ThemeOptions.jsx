import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { topics } from '../data/topics';
import axios from "axios";
import v7 from 'uuid';

function ThemeOptions() {
    const navigate = useNavigate();

    useEffect(async () => {
        const token = await axios.get('http://localhost:3000/api/token'); // Updated to send unique_id directly
        localStorage.setItem("access_token", token.data.access_token);
    }, [])

    localStorage.setItem('selectedTopic', null);
    const handleTopicSelect = async (selectedTopic) => {
        
        localStorage.setItem('selectedTopic', selectedTopic?.id);
        const accessToken = localStorage.getItem("access_token");

        const startQuiz = await axios.post(
            `http://localhost:3000/api/start`,
            {
                topic: selectedTopic?.id
            }, // request body (empty in your case)
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        navigate('/landing');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center px-4 py-8">
            <div className="max-w-6xl w-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-9xl md:text-7xl font-extrabold text-white drop-shadow-md"
                        >
                            Quizable
                        </motion.h1>
                        <p className="mt-4 text-xl md:text-2xl text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 inline-block rounded-full shadow-md">
                            🎯 Choose Your Challenge
                        </p>
                    </motion.div>
                </div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    {topics.map((topic, index) => {
                        const IconComponent = topic.icon;
                        return (
                            <motion.div
                                key={topic.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: index * 0.15 }}
                                whileHover={
                                    topic.available
                                        ? {
                                            scale: 1.02,
                                            y: -8,
                                            rotateY: 5,
                                            transition: { duration: 0.3 },
                                        }
                                        : {}
                                }
                                className="relative group"
                            >
                                {/* Card */}
                                <div
                                    className={`relative overflow-hidden transition-all duration-500 h-full cursor-pointer rounded-xl 
                    backdrop-blur-md border-2 bg-gradient-to-br from-white/5 to-white/10
                    ${topic.available
                                            ? `border-white/20 hover:border-opacity-60 hover:shadow-2xl hover:shadow-current/20`
                                            : "border-gray-600/30 opacity-50 cursor-not-allowed"
                                        }`}
                                    onClick={() => topic.available && handleTopicSelect(topic)}
                                >
                                    {/* Dynamic Themed Background Gradient */}
                                    <div
                                        className={`absolute inset-0 opacity-100 transition-opacity duration-500 ${topic.gradient} 
                      ${topic.available ? "group-hover:opacity-50" : ""}`}
                                    />

                                    {/* Dynamic Glow Effect on Hover */}
                                    {topic.available && (
                                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${topic.gradient.replace('bg-gradient-to-br', 'bg-gradient-to-r')} bg-opacity-10`} />
                                    )}

                                    {/* Card Content */}
                                    <div className="relative p-8 h-full flex flex-col z-10">
                                        {!topic.available && (
                                            <motion.div
                                                className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.5 + index * 0.1 }}
                                            >
                                                ✨ Coming Soon
                                            </motion.div>
                                        )}

                                        {/* Icon and Emoji Section */}
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-4">
                                                <motion.div
                                                    className="text-5xl filter drop-shadow-lg"
                                                    whileHover={
                                                        topic.available ? { scale: 1.2, rotate: 10 } : {}
                                                    }
                                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                                >
                                                    {topic.emoji}
                                                </motion.div>
                                                <motion.div
                                                    whileHover={topic.available ? { scale: 1.1 } : {}}
                                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                                >
                                                    <IconComponent
                                                        className={`w-10 h-10 transition-colors duration-300
                              ${topic.available
                                                                ? getThemeTextColor(topic.colorScheme) + " group-hover:brightness-110"
                                                                : "text-gray-500"
                                                            }`}
                                                    />
                                                </motion.div>
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3
                                            className={`text-2xl font-black mb-4 transition-colors duration-300
                        ${topic.available
                                                    ? "text-white group-hover:brightness-110"
                                                    : "text-gray-500"
                                                }`}
                                        >
                                            {topic.name}
                                        </h3>

                                        {/* Description */}
                                        <p
                                            className={`text-sm leading-relaxed flex-grow transition-colors duration-300
                        ${topic.available
                                                    ? "text-gray-300 group-hover:text-gray-200"
                                                    : "text-gray-600"
                                                }`}
                                        >
                                            {topic.description}
                                        </p>

                                        {/* Action Button */}
                                        {topic.available ? (
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <button
                                                    className={`mt-6 w-full font-bold text-white border-2 transition-all duration-300 
                            ${getThemeButtonClasses(topic.colorScheme)}
                            hover:shadow-lg hover:shadow-current/20
                            backdrop-blur-sm py-3 rounded-lg`}
                                                >
                                                    🚀 Start Quiz
                                                </button>
                                            </motion.div>
                                        ) : (
                                            <div className="mt-6 w-full py-3 text-center">
                                                <span className="text-gray-500 text-sm font-medium">
                                                    Stay tuned...
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="text-center">
                    <motion.p
                        className="text-gray-400 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        More quiz topics coming soon! • Developed by Shyam
                    </motion.p>
                </div>
            </div>
        </div>
    )
}

// Helper function to get theme-specific text colors
function getThemeTextColor(colorScheme) {
    const colors = {
        football: 'text-green-400',
        anime: 'text-pink-400',
        science: 'text-blue-400',
        history: 'text-amber-400',
        gaming: 'text-indigo-400',
        general: 'text-slate-400'
    };
    return colors[colorScheme] || 'text-gray-400';
}

// Helper function to get theme-specific button classes
function getThemeButtonClasses(colorScheme) {
    const classes = {
        football: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50 hover:border-green-400 hover:bg-gradient-to-r hover:from-green-500/30 hover:to-emerald-500/30',
        anime: 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-400/50 hover:border-pink-400 hover:bg-gradient-to-r hover:from-pink-500/30 hover:to-purple-500/30',
        science: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/50 hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-cyan-500/30',
        history: 'bg-gradient-to-r from-amber-500/20 to-red-500/20 border-amber-400/50 hover:border-amber-400 hover:bg-gradient-to-r hover:from-amber-500/30 hover:to-red-500/30',
        gaming: 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-indigo-400/50 hover:border-indigo-400 hover:bg-gradient-to-r hover:from-indigo-500/30 hover:to-purple-500/30',
        general: 'bg-gradient-to-r from-slate-500/20 to-gray-500/20 border-slate-400/50 hover:border-slate-400 hover:bg-gradient-to-r hover:from-slate-500/30 hover:to-gray-500/30'
    };
    return classes[colorScheme] || classes.general;
}

export default ThemeOptions