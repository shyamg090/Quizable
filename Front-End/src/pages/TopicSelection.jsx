import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Zap, Brain, History, Beaker, Gamepad2 } from 'lucide-react';
import { applyColorScheme } from '@/lib/themeManager';

const TopicSelection = () => {
  const navigate = useNavigate();

  // Define available quiz topics with their themes
  const topics = [
    {
      id: 'football',
      name: 'Football IQ',
      subject: 'Football',
      emoji: '⚽',
      icon: Trophy,
      description: 'Test your football knowledge with questions about players, teams, and tournaments',
      colorScheme: 'football',
      gradient: 'bg-gradient-to-br from-green-600 to-orange-500',
      available: true
    },
    {
      id: 'anime',
      name: 'Anime Quiz',
      subject: 'Anime',
      emoji: '🎌',
      icon: Zap,
      description: 'Challenge yourself with questions about popular anime series and characters',
      colorScheme: 'anime',
      gradient: 'bg-gradient-to-br from-pink-500 to-purple-600',
      available: true // Will be implemented later
    },
    {
      id: 'science',
      name: 'Science Quiz',
      subject: 'Science',
      emoji: '🧬',
      icon: Beaker,
      description: 'Explore your scientific knowledge across physics, chemistry, and biology',
      colorScheme: 'science',
      gradient: 'bg-gradient-to-br from-blue-500 to-cyan-400',
      available: false
    },
    {
      id: 'history',
      name: 'History Quiz',
      subject: 'History',
      emoji: '🏛️',
      icon: History,
      description: 'Journey through time with questions about world history and civilizations',
      colorScheme: 'history',
      gradient: 'bg-gradient-to-br from-amber-600 to-red-500',
      available: false
    },
    {
      id: 'gaming',
      name: 'Gaming Quiz',
      subject: 'Gaming',
      emoji: '🎮',
      icon: Gamepad2,
      description: 'Test your gaming knowledge about video games, consoles, and gaming culture',
      colorScheme: 'gaming',
      gradient: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      available: false
    },
    {
      id: 'general',
      name: 'General Knowledge',
      subject: 'General',
      emoji: '🧠',
      icon: Brain,
      description: 'Challenge yourself with questions across various topics and subjects',
      colorScheme: 'general',
      gradient: 'bg-gradient-to-br from-slate-600 to-slate-800',
      available: false
    }
  ];

  const handleTopicSelect = (topic) => {
    if (!topic.available) {
      // Show coming soon message for unavailable topics
      return;
    }

    // Apply the color scheme for the selected topic
    applyColorScheme(topic.colorScheme);

    // Store the selected topic
    localStorage.setItem('selectedTopic', topic.id);
    localStorage.setItem('selectedTheme', JSON.stringify({
      name: topic.name,
      subject: topic.subject,
      colorScheme: topic.colorScheme
    }));

    // Navigate to the main landing page
    navigate('/landing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-8">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Background Glow Effect */}
            <div className="text-center mb-12">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-6xl md:text-7xl font-extrabold text-purple-800 drop-shadow-md"
              >
                Quizable
              </motion.h1>
              <p className="mt-4 text-xl md:text-2xl text-white font-semibold bg-purple-600 px-6 py-2 inline-block rounded-full shadow-md">
                🎯 Choose Your Challenge
              </p>
            </div>
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
                whileHover={topic.available ? {
                  scale: 1,
                  y: -8,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                } : {}}
                className="relative group"
              >
                <Card
                  className={`
                    relative overflow-hidden transition-all duration-500 h-full cursor-pointer
                    backdrop-blur-md border-2 bg-gradient-to-br from-white/5 to-white/10
                    ${topic.available
                      ? 'border-white/20 hover:border-orange-400/60 hover:shadow-2xl hover:shadow-orange-500/20'
                      : 'border-gray-600/30 opacity-50 cursor-not-allowed'
                    }
                  `}
                  onClick={() => handleTopicSelect(topic)}
                >
                  {/* Animated Background Gradient */}
                  <div className={`
                    absolute inset-0 opacity-30 transition-opacity duration-500
                    ${topic.gradient} 
                    ${topic.available ? 'group-hover:opacity-50' : ''}
                  `} />

                  {/* Glow Effect on Hover */}
                  {topic.available && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-orange-400/10 via-pink-400/10 to-purple-400/10" />
                  )}

                  <CardContent className="relative p-8 h-full flex flex-col z-10">
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
                          whileHover={topic.available ? { scale: 1.2, rotate: 10 } : {}}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          {topic.emoji}
                        </motion.div>
                        <motion.div
                          whileHover={topic.available ? { scale: 1.1 } : {}}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                          <IconComponent className={`
                            w-10 h-10 transition-colors duration-300
                            ${topic.available
                              ? 'text-orange-200 group-hover:text-orange-300'
                              : 'text-gray-500'
                            }
                          `} />
                        </motion.div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className={`
                      text-2xl font-black mb-4 transition-colors duration-300
                      ${topic.available
                        ? 'text-white group-hover:text-orange-100'
                        : 'text-gray-500'
                      }
                    `}>
                      {topic.name}
                    </h3>

                    {/* Description */}
                    <p className={`
                      text-sm leading-relaxed flex-grow transition-colors duration-300
                      ${topic.available
                        ? 'text-gray-300 group-hover:text-gray-200'
                        : 'text-gray-600'
                      }
                    `}>
                      {topic.description}
                    </p>

                    {/* Action Button */}
                    {topic.available && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          className={`
                            mt-6 w-full font-bold text-white border-2 transition-all duration-300
                            bg-gradient-to-r from-orange-500/20 to-purple-500/20 
                            border-orange-400/50 hover:border-orange-400 
                            hover:bg-gradient-to-r hover:from-orange-500/30 hover:to-purple-500/30
                            hover:shadow-lg hover:shadow-orange-500/20
                            backdrop-blur-sm
                          `}
                        >
                          🚀 Start Quiz
                        </Button>
                      </motion.div>
                    )}

                    {!topic.available && (
                      <div className="mt-6 w-full py-3 text-center">
                        <span className="text-gray-500 text-sm font-medium">
                          Stay tuned...
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
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
  );
};

export default TopicSelection;