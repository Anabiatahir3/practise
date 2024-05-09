import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log("set timeout");
    const timer = setTimeout(onTimeout, timeout);

    return () => clearTimeout(timer);
  }, [timeout, onTimeout]);

  useEffect(() => {
    console.log("set interval");

    const interval = setInterval(() => {
      setRemainingTime((prevState) => prevState - 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <progress id="question-time" max={timeout} value={remainingTime} />;
      <p>{remainingTime}</p>
    </>
  );
}
