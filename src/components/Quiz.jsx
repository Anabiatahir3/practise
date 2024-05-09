import { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import Completed from "../assets/quiz-complete.png";
import Question from "./Question";
export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const quizIsComplete = userAnswers.length === QUESTIONS.length;
  const activeQuestionIndex = userAnswers.length;

  const handleSubmit = useCallback(function handleSubmit(selectedAnswer) {
    setUserAnswers((prevState) => {
      return [...prevState, selectedAnswer];
    });
  }, []);
  const handleSkipAnswer = useCallback(() => {
    handleSubmit(null);
  }, [handleSubmit]);

  if (quizIsComplete) {
    return (
      <>
        <div id="summary">
          <img src={Completed} alt="quiz completion" />
          <h2>Quiz completed</h2>
        </div>
      </>
    );
  }
  return (
    <>
      <div id="quiz">
        <Question
          onSelectAnswer={handleSubmit}
          onSkip={handleSkipAnswer}
          key={activeQuestionIndex}
          index={activeQuestionIndex}
        />
      </div>
    </>
  );
}
