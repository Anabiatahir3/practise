import { useReducer } from "react";
import { createContext } from "react";
const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
});
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];
    if (existingCartItemIndex > -1) {
      const existingCartItem = updatedItems[existingCartItemIndex];
      existingCartItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = existingCartItem;
    } else {
      updatedItems.push(action.item);
    }
  }
  if (action.type === "REMOVE_ITEM") {
  }
  return state;
}

export function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
  });
  return <CartContext.Provider>{children}</CartContext.Provider>;
}
export default CartContext;
