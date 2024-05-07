import { useRef, useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";

import CartModal from "./CartModal";

export default function Header() {
  const modal = useRef();
  const { items, theme, toggleTheme } = useContext(CartContext);

  const cartQuantity = items.length;

  function handleOpenCartClick() {
    modal.current.open();
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal ref={modal} title="Your Cart" actions={modalActions} />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1 className={theme}>Elegant Context</h1>
          <button style={{ display: "none" }} onClick={toggleTheme}>
            Toggle theme
          </button>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}
