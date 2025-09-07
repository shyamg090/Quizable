import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TimerCircle = ({ duration, onTimeUp, isActive, onTimeChange }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const circumference = 2 * Math.PI * 45; // radius = 45

  // Debug logging
  // console.log('TimerCircle render:', { duration, isActive, timeLeft });

  useEffect(() => {
    // console.log('TimerCircle useEffect triggered:', { isActive, duration });
    
    if (!isActive) {
      console.log('Timer is not active, returning early');
      return;
    }
    
    // Always reset timer to full duration when timer is (re)activated
    // console.log('Setting timer to duration:', duration);
    setTimeLeft(duration);
    if (onTimeChange) {
      onTimeChange(duration);
    }
    
    const timer = setInterval(() => {
      // console.log('Timer interval triggered');
      setTimeLeft((prev) => {
        const newTimeLeft = prev <= 1 ? 0 : prev - 1;
        // console.log('Timer tick:', { prev, newTimeLeft });
        
        if (onTimeChange) {
          onTimeChange(newTimeLeft);
        }
        
        if (prev <= 1) {
          // console.log('Time up!');
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // console.log('Timer interval created:', timer);
    
    return () => {
      console.log('Clearing timer interval');
      clearInterval(timer);
    };
  }, [isActive, duration]); // Removed onTimeUp and onTimeChange from dependencies

  const progress = (timeLeft / duration) * circumference;
  const isUrgent = timeLeft <= 5;

  return (
    <div className="relative w-24 h-24">
      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-muted-foreground/20"
        />
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          className={isUrgent ? 'text-destructive' : 'text-primary'}
          animate={{
            strokeDashoffset: circumference - progress,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </svg>

      {/* Timer text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span 
          className={`text-xl font-bold ${isUrgent ? 'text-destructive' : 'text-primary'}`}
          animate={{ 
            scale: isUrgent ? [1, 1.1, 1] : 1,
            color: isUrgent ? "hsl(var(--destructive))" : "hsl(var(--primary))"
          }}
          transition={{ 
            scale: { duration: 0.5, repeat: isUrgent ? Infinity : 0 },
            color: { duration: 0.3 }
          }}
        >
          {timeLeft}
        </motion.span>
      </div>
    </div>
  );
};

export default TimerCircle;