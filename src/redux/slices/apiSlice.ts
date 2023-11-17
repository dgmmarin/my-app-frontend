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
    },
    responseHandler: async (response) => {
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.startsWith('application/json')) {
        const data = await response.json();
        if (response.ok) {
          return data;
        }
        return Promise.reject(data);
      }
      const message = await response.text();
      return Promise.reject(message);
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});
