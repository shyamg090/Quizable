import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trophy, Target, RotateCcw, Share2, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import quizData from '@/football_quiz_100_questions.json';

const GameEnd = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(10);
  const [playerName, setPlayerName] = useState('Player');
  const [theme, setTheme] = useState(null);

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
    // Load theme data from JSON
    const themeData = quizData[0][topicId].theme;
    setTheme(themeData);

    // Get game results from localStorage using theme's storage prefix
    const finalScore = parseInt(localStorage.getItem(`${themeData.storagePrefix}score`) || '0');
    const totalQuestions = parseInt(localStorage.getItem(`${themeData.storagePrefix}total`) || '10');
    const name = localStorage.getItem(`${themeData.storagePrefix}player`) || 'Player';

    setScore(finalScore);
    setTotal(totalQuestions);
    setPlayerName(name);

    // Trigger confetti for good scores
    if (finalScore >= totalQuestions * 0.7) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        confetti({
          particleCount: 50,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: randomInRange(0.1, 0.9),
            y: Math.random() - 0.2
          }
        });
      }, 250);
    }
  }, []);

  const percentage = Math.round((score / total) * 100);
  const isWin = percentage >= 70;

  const getPerformanceLevel = () => {
    if (percentage >= 90) return { level: "Legendary", icon: "🏆", color: "text-yellow-400" };
    if (percentage >= 80) return { level: "Expert", icon: "⭐", color: "text-primary" };
    if (percentage >= 70) return { level: "Skilled", icon: "🎯", color: "text-success" };
    if (percentage >= 50) return { level: "Average", icon: "👍", color: "text-secondary" };
    return { level: "Beginner", icon: "📚", color: "text-muted-foreground" };
  };

  const getPerformanceMessage = () => {
    if (!theme) return "";
    if (percentage >= 90) return theme.performanceMessages.legendary;
    if (percentage >= 80) return theme.performanceMessages.expert;
    if (percentage >= 70) return theme.performanceMessages.skilled;
    if (percentage >= 50) return theme.performanceMessages.average;
    return theme.performanceMessages.beginner;
  };

  const performance = getPerformanceLevel();

  const handlePlayAgain = () => {
    if (!theme) return;
    // Clear previous game data using theme's storage prefix
    localStorage.removeItem(`${theme.storagePrefix}score`);
    localStorage.removeItem(`${theme.storagePrefix}total`);
    navigate('/');
  };

  const handleShare = () => {
    if (!theme) return;
    if (navigator.share) {
      navigator.share({
        title: theme.shareText,
        text: `I just scored ${score}/${total} (${percentage}%) on the ${theme.shareText}! Can you beat my score?`,
        url: window.location.origin
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(
        `I just scored ${score}/${total} (${percentage}%) on the ${theme.shareText}! Can you beat my score? ${window.location.origin}`
      );
    }
  };

  if (!theme) {
    return <div>Loading...</div>; // Loading state while theme loads
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full text-center">
        {/* Header Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          {isWin ? (
            <div className="text-success">
              <Trophy className="w-20 h-20 mx-auto mb-4 text-yellow-400" />
              <h1 className="text-4xl md:text-6xl font-black mb-4">
                You Won! 🎉
              </h1>
            </div>
          ) : (
            <div className="text-destructive">
              <Target className="w-20 h-20 mx-auto mb-4" />
              <h1 className="text-4xl md:text-6xl font-black mb-4">
                Game Over 💔
              </h1>
            </div>
          )}

          <p className="text-xl text-muted-foreground">
            Great effort, {playerName}!
          </p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          className="card-premium p-8 mb-8 bg-gradient-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-black text-primary mb-2">{score}</div>
              <div className="text-sm text-muted-foreground">Correct Answers</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-black text-secondary mb-2">{percentage}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>

            <div className="text-center">
              <div className={`text-3xl font-black mb-2 ${performance.color}`}>
                {performance.icon}
              </div>
              <div className="text-sm text-muted-foreground">{performance.level}</div>
            </div>
          </div>

          {/* Performance Message */}
          <motion.div
            className="p-6 rounded-2xl bg-background/20 border border-border/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg font-bold mb-2">Performance Analysis</h3>
            <p className="text-muted-foreground">
              {getPerformanceMessage()}
            </p>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            variant="hero"
            size="xl"
            onClick={handlePlayAgain}
            className="w-full mb-4"
          >
            <RotateCcw className="w-5 h-5 mr-3" />
            {theme.buttons.playAgain}
          </Button>

          <div className="grid md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={handleShare}
              className="w-full"
            >
              <Share2 className="w-5 h-5 mr-3" />
              {theme.buttons.shareScore}
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/')}
              className="w-full"
            >
              <Star className="w-5 h-5 mr-3" />
              {theme.buttons.newChallenge}
            </Button>
          </div>
        </motion.div>

        {/* Footer Message */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-muted-foreground text-sm">
            {theme.footerMessages.gameEnd}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default GameEnd;