import { useState } from "react";
import Header from "./components/Header";
import Quiz from "./components/Quiz";
import QuestionTimer from "./components/QuestionTimer";
import useNetwork from "./hooks/useNetwork";
function App() {
  const isOnline = useNetwork();
  console.log("val", isOnline);
  return (
    <>
      <Header />
      <main>{isOnline ? <Quiz /> : "No internet"}</main>
    </>
  );
}

export default App;
