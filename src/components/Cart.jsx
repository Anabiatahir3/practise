import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { useContext } from "react";
import { currencyFormatter } from "../utils/formatting";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
export default function Cart() {
  const { items, addToCart, removeFromCart } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  function handleCloseCart() {
    hideCart();
  }

  function openCheckout() {
    showCheckout();
  }
  return (
    <Modal
      className="cart"
      open={progress === "cart"}
      onClose={progress === "cart" ? handleCloseCart : null} //boolean error on esc key
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <li className="cart-item" key={item.id}>
            <p>{item.name}</p>
            <div className="cart-item-actions">
              <button onClick={() => removeFromCart(item)}>-1</button>
              <p>{item.quantity}</p>
              <button onClick={() => addToCart(item)}>+1</button>
            </div>
          </li>
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button onClick={handleCloseCart} textOnly>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={openCheckout}>Go to checkout</Button>
        )}
      </p>
    </Modal>
  );
}
