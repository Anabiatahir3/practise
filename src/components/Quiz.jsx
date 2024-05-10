import { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import Completed from "../assets/quiz-complete.png";
import Question from "./Question";
import Summary from "./Summary";
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
        <Summary userAnswers={userAnswers} />
      </>
    );
  }
  return (
    <>
      <div id="quiz">
        <Question
          onSelectAnswer={handleSubmit} //we are using the useCllabck to wrap this function as it has a dependancy in the question timer component for it effect.
          onSkip={handleSkipAnswer}
          key={activeQuestionIndex}
          index={activeQuestionIndex}
        />
      </div>
    </>
  );
}
