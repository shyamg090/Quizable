import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const CountdownCircle = forwardRef(({ startTime = 15, onTimeUp, quizBoardTheme }, ref) => {
  const [time, setTime] = useState(startTime);
  const timerRef = useRef(null);

  const size = 80; // SVG size
  const radius = 36; // radius of the circle
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const progress = ((startTime - time) / startTime) * circumference;

  useImperativeHandle(ref, () => ({
    resetTimer: () => {
      clearInterval(timerRef.current);
      setTime(startTime);
      startCountdown();
    }
  }));

  const startCountdown = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startCountdown();
    return () => clearInterval(timerRef.current);
  }, [startTime]);

  return (
    <div className="relative w-20 h-20 md:w-24 md:h-24">
      <svg
        className="w-full h-full transform -rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`hsl(${quizBoardTheme.colors.progressBg})`}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`hsl(${quizBoardTheme.colors.progressBar})`}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          style={{ transition: "stroke-dashoffset 1s linear", strokeLinecap: "round" }}
        />
      </svg>

      {/* Timer Text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg md:text-xl font-bold"
        style={{ color: `hsl(${quizBoardTheme.colors.textPrimary})`, textShadow: quizBoardTheme.shadows.text }}
      >
        {time}s
      </div>
    </div>
  );
});

export default CountdownCircle;
