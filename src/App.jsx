import { useState } from "react";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";

function App() {
  return (
    <>
      <Header />
      <Meals />
      <Cart />
    </>
  );
}

export default App;
