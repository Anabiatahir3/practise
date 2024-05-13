import { useRef } from "react";
export default function RefLogin() {
  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const isInvalidEmail = !enteredEmail.includes("@");
    if (isInvalidEmail) {
      return;
    }

    console.log({ enteredEmail, enteredPassword });
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="control-row">
          <div className="control">
            <label htmlFor="email">Email</label>
            <input type="email" ref={emailRef} />
          </div>

          <div className="control">
            <label htmlFor="password">Password</label>
            <input type="password" ref={passwordRef} />
          </div>
        </div>

        <p className="form-actions">
          <button className="button button-flat">Reset</button>
          <button className="button">Login</button>
        </p>
      </form>
    </>
  );
}
