import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') || '')
    : null,
};

export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (amount: number) => {
    return await Promise.resolve();
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo',
        JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      console.log("1231231312")
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase('auth/logout', (state, action) => {
        state.userInfo = null;
        localStorage.removeItem('userInfo');
      })
  }
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;