import { chatSocket } from 'redux/features/CHAT_APP/chatApiSlice';
import { apiSlice } from '../../../../api/rtkApi/apiSlice';
import { setAuthTokens } from './authSlice';

export interface ILocalLoginRequest {
  email: string;
  password: string;
}

export interface ILocalRegisterDto {
  email: string;
  password: string;
  name: string;
  photo?: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    authLocalLogin: builder.mutation<IAuthResponse, ILocalLoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const tokens = await queryFulfilled;
          dispatch(setAuthTokens(tokens.data));
        } catch (error) {
          dispatch(setAuthTokens({ accessToken: null, refreshToken: null }));
        }
      },
      invalidatesTags: ['CurrentUser'],
    }),
    authLogout: builder.mutation<IUser, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'GET',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setAuthTokens({ accessToken: null, refreshToken: null }));
          chatSocket.disconnect();
        } catch (error) {
          dispatch(setAuthTokens({ accessToken: null, refreshToken: null }));
        }
      },
      invalidatesTags: ['CurrentUser', 'PermissionRequest', 'User'],
    }),
    authLocalRegister: builder.mutation<IAuthResponse, ILocalRegisterDto>({
      query: (credentials) => ({
        url: '/auth/local-create',
        method: 'POST',
        body: { ...credentials },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const tokens = await queryFulfilled;
          dispatch(setAuthTokens(tokens.data));
        } catch (error) {
          dispatch(setAuthTokens({ accessToken: null, refreshToken: null }));
        }
      },
      invalidatesTags: ['CurrentUser', 'PermissionRequest', 'User'],
    }),
  }),
});

export const {
  useAuthLocalLoginMutation,
  useAuthLocalRegisterMutation,
  useAuthLogoutMutation,
} = authApiSlice;
