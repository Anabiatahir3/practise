import Modal from "../UI/Modal";
import { currencyFormatter } from "../utils/formatting";
import CartContext from "../store/CartContext";
import { useContext } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import UserProgressContext from "../store/UserProgressContext";

export default function Checkout() {
  const { items } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  function handleCloseCheckout() {
    hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries();
  }
  return (
    <Modal open={progress === "checkout"} onClose={handleCloseCheckout}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount:{currencyFormatter.format(totalPrice)}</p>
        <Input label="Full Name" type="text" id="full-name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />

          <p className="modal-actions">
            <Button onClick={handleCloseCheckout} textOnly type="button">
              Close
            </Button>
            <Button>Submit Order</Button>
          </p>
        </div>
      </form>
    </Modal>
  );
}
