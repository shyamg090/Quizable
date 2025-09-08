import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TypingHello from '@/components/TypingHello';
import { Trophy, Target, Users, Zap, Shuffle, ArrowLeft } from 'lucide-react';
import { applyColorScheme } from '@/lib/themeManager';
import quizData from '@/football_quiz_100_questions.json';

const Landing = () => {
  const [playerName, setPlayerName] = useState('');
  const [theme, setTheme] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get selected topic from localStorage
    const topicId = localStorage.getItem('selectedTopic');
    const storedTheme = localStorage.getItem('selectedTheme');

    // console.log("topic here is : ", topicId);
    if (!topicId || !storedTheme) {
      // If no topic selected, redirect to topic selection
      navigate('/');
      return;
    }
    // console.log("quiz data here :", quizData[0][topicId].theme);

    const parsedTheme = JSON.parse(storedTheme);
    setSelectedTopic(parsedTheme);

    setTheme(quizData[0][topicId].theme);
    applyColorScheme(parsedTheme.colorScheme);

  }, [navigate]);

  const handleStartGame = () => {
    if (playerName.trim() && theme) {
      // Store player name for later use using theme's storage prefix
      localStorage.setItem(`${theme.storagePrefix}player`, playerName.trim());
      localStorage.setItem('start_timer', 'true'); // Activate timer for the first question
      navigate('/quiz');
    }
  };

  const handleBackToTopics = () => {
    // Clear selected topic and go back to topic selection
    localStorage.removeItem('selectedTopic');
    localStorage.removeItem('selectedTheme');
    navigate('/');
  };

  // Use theme features if available, otherwise fallback to default
  const features = theme?.features || [
    {
      title: "Championship Level",
      description: "Test your knowledge against the world's best"
    },
    {
      title: "Precision Questions",
      description: "Carefully crafted questions"
    },
    {
      title: "Global Competition",
      description: "Compete with fans worldwide"
    },
    {
      title: "Lightning Fast",
      description: "Quick rounds, instant results"
    },
    {
      title: "Random Questions",
      description: "New random questions for every user"
    }
  ];

  const icons = [Trophy, Target, Users, Zap, Shuffle];

  if (!theme || !selectedTopic) {
    return <div>Loading...</div>; // Loading state while theme loads
  }

  return (
    <div className="h-screen bg-gradient-hero flex flex-col px-4 py-4 overflow-hidden">
      <div className="max-w-6xl w-full mx-auto flex flex-col h-full">
        {/* Header with Back Button and Title */}
        <div className="flex justify-between items-center mb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="outline"
              onClick={handleBackToTopics}
              className="group text-bright hover:text-accent-bright transition-all duration-300 rounded-xl px-4 py-2 font-semibold hover:scale-105 bg-transparent hover:bg-transparent cursor-pointer border-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Topics
            </Button>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TypingHello />
          </motion.div>

          <div className="w-32"></div> {/* Spacer for centering */}
        </div>

        {/* Main Content Container */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <div className="grid lg:grid-cols-2 gap-8 w-full items-center">
            
            {/* Left Side - Game Info & Features */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Tagline */}
              <motion.p
                className="text-xl md:text-2xl font-semibold text-bright mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {theme.tagline}
              </motion.p>

              {/* How to Play - Compact Version */}
              <div className="bg-card/20 border border-border/30 rounded-xl p-4 mb-4">
                <h3 className="text-lg font-bold mb-3 text-accent-bright">{theme.howToPlay.title}</h3>
                <div className="grid grid-cols-1 gap-2 text-sm text-bright">
                  {theme.howToPlay.steps.slice(0, 3).map((step) => (
                    <div key={step.number} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">{step.number}</div>
                      <span className="text-sm">{step.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Grid - Horizontal */}
              <div className="grid grid-cols-5 gap-2">
                {features.map((feature, index) => {
                  const IconComponent = icons[index] || Trophy;
                  return (
                    <motion.div
                      key={feature.title}
                      className="text-center p-2 bg-card/20 border border-border/20 rounded-lg hover:bg-card/40 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <IconComponent className="w-4 h-4 text-primary mb-1 mx-auto" />
                      <h6 className="font-bold text-xs mb-1 text-accent-bright">{feature.title}</h6>
                      {/* <p className="text-xs text-bright/80 leading-tight">{feature.description}</p> */}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Side - Game Start Form */}
            <motion.div
              className="card-premium p-6 bg-gradient-card max-w-md mx-auto w-full"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Name Input Section */}
              <div className="space-y-4 text-center">
                <h2 className="text-2xl font-bold text-accent-bright mb-4">Ready to Start?</h2>
                
                <Input
                  type="text"
                  placeholder={theme.placeholders.nameInput}
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="h-12 text-lg bg-background/50 border-2 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl"
                  onKeyPress={(e) => e.key === 'Enter' && handleStartGame()}
                />

                <Button
                  variant="hero"
                  size="xl"
                  onClick={handleStartGame}
                  disabled={!playerName.trim()}
                  className="w-full font-black text-xl hover:text-white"
                >
                  {theme.buttons.startButton}
                </Button>

                {/* Additional Game Stats or Info */}
                <div className="mt-4 p-3 bg-background/20 rounded-lg">
                  <p className="text-sm text-bright/80">
                    Join thousands of players testing their knowledge!
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
          <p className="text-bright/70 text-xs">
            Developed by Shyam
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;