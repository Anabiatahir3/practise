import { useState } from "react";
import Header from "./components/Header";
import Quiz from "./components/Quiz";
import QuestionTimer from "./components/QuestionTimer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Quiz />
      </main>
    </>
  );
}

export default App;
