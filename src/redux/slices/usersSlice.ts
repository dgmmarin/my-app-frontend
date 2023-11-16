import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  total: 0,
  page: 1,
  perPage: 10,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
})

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;