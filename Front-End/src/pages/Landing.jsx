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
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full">
        {/* Back Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="outline"
            onClick={handleBackToTopics}
            className="group bg-background/20 backdrop-blur-sm hover:bg-primary/10 text-bright hover:text-accent-bright transition-all duration-300 rounded-xl px-6 py-3 font-semibold shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer border-0"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Topics
          </Button>
        </motion.div>

        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              {/* <span className="text-4xl">{selectedTopic.subject === 'Football' ? '⚽' : '🧠'}</span> */}
              {/* <h1 className="text-4xl md:text-5xl font-black text-accent-bright">
                {selectedTopic.name}
              </h1> */}
            </div>
            <TypingHello />
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl font-semibold mt-4 text-bright"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {theme.tagline}
          </motion.p>
        </div>

        {/* Main Content Card */}
        <motion.div
          className="card-premium p-8 mb-6 bg-gradient-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* How to Play Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6 text-accent-bright text-center">{theme.howToPlay.title}</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-bright mb-6">
              {theme.howToPlay.steps.map((step) => (
                <div key={step.number} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">{step.number}</div>
                  <span>{step.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Name Input Section */}
          <div className="space-y-6 mb-8">
            <Input
              type="text"
              placeholder={theme.placeholders.nameInput}
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="h-14 text-lg bg-background/50 border-2 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-2xl"
              onKeyPress={(e) => e.key === 'Enter' && handleStartGame()}
            />

            <Button
              variant="hero"
              size="xl"
              onClick={handleStartGame}
              disabled={!playerName.trim()}
              className="w-full font-black text-xl hover:text-white hover:"
            >
              {theme.buttons.startButton}
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {features.map((feature, index) => {
              const IconComponent = icons[index] || Trophy;
              return (
                <motion.div
                  key={feature.title}
                  className="text-center p-4 bg-card/30 border border-border/30 rounded-xl hover:bg-card/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <IconComponent className="w-6 h-6 text-primary mb-2 mx-auto" />
                  <h3 className="font-bold text-sm mb-1 text-accent-bright">{feature.title}</h3>
                  <p className="text-xs text-bright">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center">
          {/* <motion.p
            className="text-bright text-sm mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {theme.footerMessages.landing}
          </motion.p> */}
          <motion.p
            className="text-bright/70 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            Developed by Shyam
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Landing;