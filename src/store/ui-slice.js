import { createSlice } from "@reduxjs/toolkit";
const uiSlice = createSlice({
  name: "uislice",
  initialState: { cartIsVisible: false },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;
