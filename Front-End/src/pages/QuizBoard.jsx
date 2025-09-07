import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import TimerCircle from '@/components/TimerCircle';
import { Lightbulb, Users, Phone, X } from 'lucide-react';
import questionsData from '../football_quiz_100_questions.json';
import timerConfig from '../timer_config.json';

const QuizBoard = () => {
  const navigate = useNavigate();

  // Get selected topic from localStorage
  const topicId = localStorage.getItem('selectedTopic');
  const storedTheme = localStorage.getItem('selectedTheme');

  // console.log("topic here is : ", topicId);
  if (!topicId || !storedTheme) {
    // If no topic selected, redirect to topic selection
    navigate('/');
    return;
  }

  // Extract theme and questions from the data
  const theme = questionsData[0][topicId].theme;
  const questions = questionsData[0][topicId].questions;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [currentTimeLeft, setCurrentTimeLeft] = useState(timerConfig.timerDuration);

  const [lifelines, setLifelines] = useState([
    { id: 'hint', name: 'Hint', icon: Lightbulb, used: false },
    { id: 'audience', name: 'Ask Audience', icon: Users, used: false },
    { id: 'friend', name: 'Call Friend', icon: Phone, used: false },
  ]);

  const playerName = localStorage.getItem(`${theme.storagePrefix}player`) || 'Player';
  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsAnswering(false);
    setTimeUp(false);
    setIsTimerActive(true); // Start the timer when the question changes
  }, [currentQuestion]);

  const handleAnswerSelect = (answerIndex) => {
    if (isAnswering || timeUp) return;

    setSelectedAnswer(answerIndex);
    setIsAnswering(true);
    setIsTimerActive(false); // Stop timer when answer is selected

    setTimeout(() => {
      setShowResult(true);
      if (question.options[answerIndex].id === question.correctAnswer) {
        setScore((prev) => prev + 1); // Just increment score by 1 for correct answer
      }
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      localStorage.setItem(`${theme.storagePrefix}score`, score.toString());
      localStorage.setItem(`${theme.storagePrefix}total`, questions.length.toString());
      navigate('/results');
    } else {
      setCurrentQuestion((prev) => prev + 1); // Change question only on button click
    }
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    setIsTimerActive(false); // Stop timer when time is up
    setShowResult(true);

    // Auto-advance to next question after showing result for 3 seconds
    setTimeout(() => {
      if (isLastQuestion) {
        localStorage.setItem(`${theme.storagePrefix}score`, score.toString());
        localStorage.setItem(`${theme.storagePrefix}total`, questions.length.toString());
        navigate('/results');
      } else {
        setCurrentQuestion((prev) => prev + 1);
      }
    }, 3000);
  };

  const handleTimeChange = (timeLeft) => {
    setCurrentTimeLeft(timeLeft);
  };

  const useLifeline = (lifelineId) => {
    setLifelines((prev) =>
      prev.map((lifeline) =>
        lifeline.id === lifelineId
          ? { ...lifeline, used: true }
          : lifeline
      )
    );

    // Mock lifeline effects
    if (lifelineId === "hint") {
      // Remove two wrong answers
      console.log("Hint used - removing wrong answers");
    }
  };

  const getButtonVariant = (index) => {
    if (!showResult) return "quiz";

    if (question.options[index].id === question.correctAnswer) return "success";
    if (selectedAnswer !== null && question.options[selectedAnswer].id !== question.correctAnswer && index === selectedAnswer) return "destructive";
    return "quiz";
  };

  const getButtonAnimation = (index) => {
    if (!showResult) return {};

    if (question.options[index].id === question.correctAnswer) {
      return {
        scale: [1, 1.05, 1],
        transition: { duration: 0.6 },
      };
    }
    if (selectedAnswer !== null && question.options[selectedAnswer].id !== question.correctAnswer && index === selectedAnswer) {
      return {
        x: [-2, 2, -2, 2, 0],
        transition: { duration: 0.5 },
      };
    }
    return {};
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-left">
            <h1 className="text-2xl font-bold text-accent-bright">{theme.name}</h1>
            <p className="text-bright">Welcome, {playerName}</p>
          </div>

          <TimerCircle
            duration={timerConfig.timerDuration}
            onTimeUp={handleTimeUp}
            isActive={isTimerActive}
            onTimeChange={handleTimeChange}
          />
        </div>

        {/* Question Card */}
        <motion.div
          className="card-premium p-8 mb-8 bg-gradient-card"
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                  Question {currentQuestion + 1}
                </span>
                <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                  {question.difficulty}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-bright leading-tight">
                {question.question}
              </h2>
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <AnimatePresence>
              {question.options.map((option, index) => (
                <motion.div key={index} {...getButtonAnimation(index)}>
                  <Button
                    variant={getButtonVariant(index)}
                    size="lg"
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isAnswering || timeUp}
                    className="w-full p-6 text-left justify-start h-auto min-h-[60px] disabled:opacity-70"
                  >
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-base font-semibold">{option.text}</span>
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </motion.div>

        {/* Lifelines */}
        <div className="flex justify-center gap-4 mb-6">
          {lifelines.map((lifeline) => (
            <Button
              key={lifeline.id}
              variant={lifeline.used ? "ghost" : "outline"}
              size="sm"
              onClick={() => useLifeline(lifeline.id)}
              disabled={lifeline.used || showResult}
              className={lifeline.used ? "opacity-30" : ""}
            >
              <lifeline.icon className="w-4 h-4 mr-2" />
              {lifeline.name}
              {lifeline.used && <X className="w-3 h-3 ml-2" />}
            </Button>
          ))}
        </div>

        {/* Result Modal */}
        <Dialog open={showResult} onOpenChange={() => { }}>
          <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-md border-border/50 text-center shadow-2xl p-5">
            <DialogTitle className="sr-only">
              {timeUp ? "Time's Up" : 
               selectedAnswer !== null && question.options[selectedAnswer].id === question.correctAnswer ? "Correct Answer" : 
               "Wrong Answer"}
            </DialogTitle>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {timeUp ? (
                <div>
                  <div className="text-6xl mb-4">⏰</div>
                  <p className="text-destructive text-xl font-bold mb-6">Time's up! The correct answer was: {question.options.find(opt => opt.id === question.correctAnswer).text}</p>
                </div>
              ) : selectedAnswer !== null && question.options[selectedAnswer].id === question.correctAnswer ? (
                <div>
                  <div className="text-6xl mb-4">🎉</div>
                  <p className="text-success text-xl font-bold mb-6">Correct! The answer is: {question.options.find(opt => opt.id === question.correctAnswer).text}</p>
                </div>
              ) : (
                <div>
                  <div className="text-6xl mb-4">❌</div>
                  <p className="text-destructive text-xl font-bold mb-6">Wrong! The correct answer was: {question.options.find(opt => opt.id === question.correctAnswer).text}</p>
                </div>
              )}

              <Button
                variant="default"
                size="lg"
                onClick={handleNextQuestion}
                className="w-full"
              >
                {isLastQuestion ? '🏆 View Results' : '➡️ Next Question'}
              </Button>
            </motion.div>
          </DialogContent>
        </Dialog>

        {/* Progress */}
        <div className="text-center">
          <p className="text-bright text-lg font-semibold">
            Question {currentQuestion + 1} of {questions.length} • Score: {score}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 mt-3">
            <motion.div
              className="bg-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizBoard;