import React from "react";
import Button from "../UI/Button";
import logoImg from "../assets/logo.png";
import CartContext from "../store/CartContext";
import { useContext } from "react";
const Header = () => {
  const { items } = useContext(CartContext);
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A food and drink logo" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly>Cart {items.length}</Button>
      </nav>
    </header>
  );
};

export default Header;
