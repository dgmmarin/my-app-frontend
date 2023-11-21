import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApiSlice } from "../slices/userApiSlice";

const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async (userId: string | undefined, thunkAPI) => {
    const response = await thunkAPI.dispatch(userApiSlice.endpoints.listOrders.initiate(userId));
    if ('data' in response) {
      return response.data;
    } else {
      throw response.error;
    }
  }
)

interface OrdersState {
  orders: []
  total: number
  page: number
  perPage: number
  pages: number
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
  orders: [],
  total: 0,
  page: 1,
  perPage: 10,
  pages: 0,
  loading: 'idle'
} as OrdersState;

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // setOrders: (state, action) => {
    //   state.orders = action.payload.data;
    //   state.total = action.payload.meta.total;
    //   state.page = action.payload.meta.page;
    //   state.perPage = action.payload.meta.limit;
    //   state.pages = action.payload.meta.pages;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload.data;
      state.total = action.payload.meta.total;
      state.page = action.payload.meta.page;
      state.perPage = action.payload.meta.limit;
      state.pages = action.payload.meta.pages;
      state.loading = 'succeeded';
    });
    builder.addCase(fetchAllOrders.pending, (state, action) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchAllOrders.rejected, (state, action) => {
      state.loading = 'failed';
    });
  }
});

// export const { setOrders } = ordersSlice.actions;
export { fetchAllOrders };
export default ordersSlice.reducer;