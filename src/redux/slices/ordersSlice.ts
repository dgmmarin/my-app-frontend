import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  total: 0,
  page: 1,
  perPage: 10,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { setOrders } = ordersSlice.actions;
export default ordersSlice.reducer;