import Modal from "../UI/Modal";
import { currencyFormatter } from "../utils/formatting";
import CartContext from "../store/CartContext";
import { useContext } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Error from "./Error";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
export default function Checkout() {
  const { items, clearCart } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const { data, loading, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );
  function handleCloseCheckout() {
    hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd);

    // fetch("http:localhost:3000/orders", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     order: {
    //       items: items,
    //       customer: customerData,
    //     },
    //   }),
    // });

    sendRequest(
      JSON.stringify({
        order: { items, customer: customerData },
      })
    );
  }

  function handleFinish() {
    hideCheckout();
    clearCart();
    clearData();
  }

  let actions = (
    <>
      <Button onClick={handleCloseCheckout} textOnly type="button">
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (loading) {
    actions = <span>Sending data</span>;
  }

  if (data && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={handleFinish}>
        <h2>Success</h2>
        <p>Your order was submited successfully!</p>
        <p>Will get back to you via email</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={progress === "checkout"} onClose={handleCloseCheckout}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount:{currencyFormatter.format(totalPrice)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
          {error && <Error title="Failed" message={error} />}
          <p className="modal-actions">{actions}</p>
        </div>
      </form>
    </Modal>
  );
}
