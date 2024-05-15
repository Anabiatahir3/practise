import React from "react";
import Button from "../UI/Button";
import logoImg from "../assets/logo.png";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { useContext, useRef } from "react";
const Header = () => {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);
  const cartQuantity = items.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  function handleShowCart() {
    showCart();
  }

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={logoImg} alt="A food and drink logo" />
          <h1>React Food</h1>
        </div>
        <nav>
          <Button onClick={handleShowCart}> Cart {cartQuantity}</Button>
        </nav>
      </header>
    </>
  );
};

export default Header;
