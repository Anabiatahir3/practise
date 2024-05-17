import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cartslice",
  initialState: { items: [], totalQuantity: 0 },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      } else {
        state.items.push({
          id: newItem.id,
          totalPrice: newItem.price,
          name: newItem.title,
          quantity: 1,
          price: newItem.price,
        });
      }
    },
    removeFromCart(state, action) {
      if (state.totalQuantity > 0) {
        state.totalQuantity--;
      }

      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        message: "sending cart data",
        title: "sending",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-bc876-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Failed");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          message: "sent cart data",
          title: "Success",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: "not sent",
          title: "Failed",
        })
      );
    }
  };
};

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
