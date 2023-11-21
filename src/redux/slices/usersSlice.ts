import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  total: 0,
  page: 1,
  perPage: 10,
  pages: 0,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.data;
      state.total = action.payload.meta.total;
      state.page = action.payload.meta.page;
      state.perPage = action.payload.meta.limit;
      state.pages = action.payload.meta.pages;
    },
  },
})

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;