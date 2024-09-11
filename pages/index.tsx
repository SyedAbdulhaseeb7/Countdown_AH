import { useState, useEffect, useRef, ChangeEvent } from "react";

export default function home() {
  const [duration, setDuration] = useState<number>(0); // Input duration in seconds
  const [timeLeft, setTimeLeft] = useState<number>(0); // Remaining time in seconds
  const [isActive, setIsActive] = useState<boolean>(false); // Timer active status
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Reference to the timer interval

  // Handle input change for the duration
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDuration(Number(e.target.value));
  };

  // Set the duration for the countdown timer
  const handleSetDuration = () => {
    setTimeLeft(duration);
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Start the countdown timer
  const handleStart = () => {
    if (timeLeft > 0 && !isActive) {
      setIsActive(true);
    }
  };

  // Pause the countdown timer
  const handlePause = () => {
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Reset the countdown timer
  const handleReset = () => {
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(0);
    setDuration(0);
  };

  // Format the time (minutes:seconds)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Countdown effect when timer is active
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerRef.current) {
      clearInterval(timerRef.current);
      setIsActive(false);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  return (
    <div className="countdown-container">
      <div className="countdown">
      <h1 className="countdown-title">Countdown Timer</h1>

      {/* Input Field */}
      <input
        type="number"
        value={duration}
        onChange={handleInputChange}
        placeholder="Enter duration (seconds)"
        className="countdown-input"
      />

      {/* Buttons */}
      <div className="countdown-buttons">
        <button onClick={handleSetDuration} className="btn">
          Set Duration
        </button>
        <button onClick={handleStart} className="btn" disabled={isActive || timeLeft <= 0}>
          Start
        </button>
        <button onClick={handlePause} className="btn" disabled={!isActive}>
          Pause
        </button>
        <button onClick={handleReset} className="btn">
          Reset
        </button>
      </div>
      <div className="countdown-display">
        <h2>{formatTime(timeLeft)}</h2>
      </div>
</div>
      </div>
      )

    
}