import { apiSlice } from './apiSlice';
const USERS_URL = 'http://localhost:6869';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/auth/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth/register`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    listUsers: builder.mutation({
      query: ({ page, perPage }) => ({
        url: `${USERS_URL}/users?page=${page}&limit=${perPage}`,
        method: 'GET',
      }),

    }),
    listOrders: builder.mutation({
      query: (userId: string | undefined) => ({
        url: `${USERS_URL}${(userId !== undefined ? "/users/" + userId + "/orders" : "/orders")
          }`,
        method: 'GET',
      }),
    }),
  })
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useListUsersMutation,
  useListOrdersMutation,
} = userApiSlice;