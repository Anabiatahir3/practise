import { useReducer } from "react";
import { createContext } from "react";
const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];
    if (existingCartItemIndex > -1) {
      const existingCartItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ quantity: 1, ...action.item });
    }
    return {
      ...state,
      items: updatedItems,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item
    );

    const existingCartitem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];
    if (existingCartitem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartitem,
        quantity: existingCartitem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
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
  function clearCart() {
    cartDispatch({
      type: "CLEAR_CART",
    });
  }

  let ctxValue = {
    items: cartState.items,
    addToCart: handleItemToCart,
    removeFromCart: removeItemFromCart,
    clearCart: clearCart,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
export default CartContext;
