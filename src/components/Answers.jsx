import { useRef } from "react";
export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef(); //why use useRef:not using causes the shuffle to recalculate on every render when we only want it to calculate on initial mount. we can use useEffect for this but we should avoid using useEffect as much as possible.
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }
  return (
    <>
      <ul id="answers">
        {shuffledAnswers.current.map((answer) => {
          const isSelected = selectedAnswer === answer;
          let cssClass = "";
          if (answerState === "answered" && isSelected) {
            cssClass = "selected";
          }
          if (
            (answerState === "correct" || answerState === "wrong") &&
            isSelected
          ) {
            cssClass = answerState;
          }
          return (
            <li key={answer} className="answer">
              <button
                disabled={answerState !== ""}
                className={cssClass}
                onClick={() => onSelect(answer)}
              >
                {answer}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
