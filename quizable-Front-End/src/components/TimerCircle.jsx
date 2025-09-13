import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const CountdownCircle = forwardRef(({ startTime = 15, onTimeUp }, ref) => {
  const [time, setTime] = useState(startTime);
  const timerRef = useRef(null);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = ((startTime - time) / startTime) * circumference;

  // Expose reset function to parent via ref
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

  // Start countdown on mount
  useEffect(() => {
    startCountdown();
    return () => clearInterval(timerRef.current);
  }, [startTime]);

  // Stop countdown when answer is selected
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="relative w-32 h-32">
      <svg className="w-32 h-32 transform -rotate-90">
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="lightgray"
          strokeWidth="10"
          fill="transparent"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="blue"
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
        {time}s
      </div>
    </div>
  );
});

export default CountdownCircle;
