import quizComplete from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";

export default function Summary({ userAnswers }) {
  const skipped = userAnswers.filter((answer) => answer === null);
  const correct = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );
  const wrong = userAnswers.length - skipped.length - correct.length;

  return (
    <div id="summary">
      <img src={quizComplete} alt="icon" />
      <h2>Quiz completed</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skipped.length}</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correct.length}</span>
          <span className="text">correct</span>
        </p>
        <p>
          <span className="number">{wrong}</span>
          <span className="text">wrong</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = "user-answer";
          if (answer === null) {
            cssClass += " skipped";
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
