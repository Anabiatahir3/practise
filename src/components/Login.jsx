import { useState } from "react";
export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });
  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleInput(identifier, value) {
    setEnteredValues((prevValue) => ({
      ...prevValue,
      [identifier]: value,
    }));
    setDidEdit((prevValue) => ({
      ...prevValue,
      [identifier]: false,
    }));
  }
  function handleInputBlur(identifier) {
    setDidEdit((prevValue) => ({
      ...prevValue,
      [identifier]: true,
    }));
  }
  const isInvalidEmail = didEdit.email && !enteredValues.email.includes("@");
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onBlur={() => {
              handleInputBlur("email");
            }}
            value={enteredValues.email}
            onChange={(e) => {
              handleInput("email", e.target.value);
            }}
          />
          <div className="control-error">
            {isInvalidEmail && <p>Please enter a valid email</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={enteredValues.password}
            onChange={(e) => {
              handleInput("password", e.target.value);
            }}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
