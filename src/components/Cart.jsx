import CartContext from "../store/CartContext";
import { useContext } from "react";
export default function Cart() {
  const { items, addToCart, removeFromCart } = useContext(CartContext);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <div className="cart">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} {item.quantity}
            <button onClick={() => removeFromCart(item)}>Remove</button>
            <button onClick={() => addToCart(item)}>Add</button>
          </li>
        ))}
      </ul>
      <h2>{totalPrice}</h2>
    </div>
  );
}
