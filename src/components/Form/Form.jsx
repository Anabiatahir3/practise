import { useState } from "react";
const initialUserInput = {
  "current-savings": 1000,
  "yearly-contribution": 2000,
  "expected-return": 7,
  "duration-investment": 11,
};
const Form = ({ onCalculate }) => {
  const [userInput, setUserInput] = useState(initialUserInput);
  function handleSubmit() {
    console.log("submit");
    onCalculate(userInput);
  }

  function handleReset() {
    setUserInput(initialUserInput);
  }

  function inputChangeHandler(input, value) {
    setUserInput((prevInput) => {
      return {
        ...prevInput,
        [input]: value,
      };
    });
  }
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <p>
            <label htmlFor="current-savings">Current Savings ($)</label>
            <input
              type="number"
              value={userInput["current-savings"]}
              id="current-savings"
              onChange={(e) =>
                inputChangeHandler("current-savings", e.target.value)
              }
            />
          </p>
          <p>
            <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
            <input
              value={userInput["yearly-contribution"]}
              type="number"
              id="yearly-contribution"
              onChange={(e) =>
                inputChangeHandler("yearly-contribution", e.target.value)
              }
            />
          </p>
        </div>
        <div className="input-group">
          <p>
            <label htmlFor="expected-return">
              Expected Interest (%, per year)
            </label>
            <input
              type="number"
              id="expected-return"
              value={userInput["expected-return"]}
              onChange={(e) =>
                inputChangeHandler("expected-return", e.target.value)
              }
            />
          </p>
          <p>
            <label htmlFor="duration-investment">
              Investment Duration (years)
            </label>
            <input
              type="number"
              id="duration-investment"
              value={userInput["duration-investment"]}
              onChange={(e) =>
                inputChangeHandler("duration-investment", e.target.value)
              }
            />
          </p>
        </div>
        <p className="actions">
          <button type="reset" className="buttonAlt" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" className="button">
            Calculate
          </button>
        </p>
      </form>
    </>
  );
};

export default Form;
