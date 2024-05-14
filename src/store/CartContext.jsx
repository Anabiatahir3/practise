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
      let existingCartItem = updatedItems[existingCartItemIndex];
      existingCartItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = existingCartItem;
    } else {
      updatedItems.push({ quantity: 1, ...action.item });
    }
    return {
      items: updatedItems,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const updatedItems = [...state.items];
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item
    );
    let existingCartItem = updatedItems[existingCartItemIndex];
    if (existingCartItem.quantity > 0) {
      existingCartItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = existingCartItem;
    } else {
    }
    return {
      items: updatedItems,
    };
  }
  return state;
}

export function CartContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    items: [],
  });

  function handleItemToCart(item) {
    cartDispatch({
      type: "ADD_ITEM",
      item: item,
    });
  }
  function removeItemFromCart(item) {
    cartDispatch({
      type: "REMOVE_ITEM",
      item: item.id,
    });
  }

  let ctxValue = {
    items: cartState.items,
    addToCart: handleItemToCart,
    removeFromCart: removeItemFromCart,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
export default CartContext;
