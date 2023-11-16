import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: (headers, { getState }) => {
      const userInfo = (getState() as any).auth.userInfo;
      if (userInfo) {
        headers.set('Authorization', `Bearer ${userInfo.auth_token}`);
      } else {
        headers.delete('Authorization');
      }
    }
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});
