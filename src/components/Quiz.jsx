import { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import Completed from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";
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
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);
  return (
    <>
      <div id="question">
        <QuestionTimer
          timeout={10000}
          onTimeout={handleSkipAnswer}
          key={activeQuestionIndex} // this key attribute helps in mounting and unmounting of the entire component
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            return (
              <li key={answer} className="answer">
                <button onClick={() => handleSubmit(answer)}>{answer}</button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
