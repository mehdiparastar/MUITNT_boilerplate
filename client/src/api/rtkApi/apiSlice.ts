import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { setAuthTokens } from 'redux/features/WHOLE_APP/auth/authSlice';
import { RootState } from 'redux/store';
import { baseURL } from '../baseUrl';

const baseQuery_login = fetchBaseQuery({ baseUrl: baseURL });

const baseQuery_access = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const accessToken = (getState() as RootState).auth.accessToken;
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQuery_refresh = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, { getState }) => {
    const refreshToken = (getState() as RootState).auth.refreshToken;
    if (refreshToken) {
      headers.set('authorization', `Bearer ${refreshToken}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (api.endpoint === 'authLocalLogin' || api.endpoint === 'authGoogleLogin') {
    const login = await baseQuery_login(args, api, extraOptions);
    // api.dispatch(setAuthTokens(login.data as IAuthResponse))
    return login;
  }
  else {
    let aT: string = (api.getState() && (api.getState() as unknown as any).auth && (api.getState() as unknown as any).auth?.accessToken) || ''
    let result = await baseQuery_access(args, api, extraOptions);
    if (result.error?.status === 401 || result.error?.status === 403) {
      // send refresh token to get new access token
      const refreshResult = await baseQuery_refresh(
        'auth/refresh',
        api,
        extraOptions,
      );
      if (refreshResult.data) {
        aT = (refreshResult.data as any).accessToken
        // store the new token
        api.dispatch(setAuthTokens({ ...refreshResult.data } as IAuthResponse));
        // retry the original query with new access token
        result = await baseQuery_access(args, api, extraOptions);
      } else {
        api.dispatch(setAuthTokens({ accessToken: null, refreshToken: null }));
      }
    }
    if (api.endpoint === 'authRefreshNewAccessToken') {
      // write your code here
      ((result.data as unknown as any).aT) = (result.data as unknown as any).aT || aT
    }
    return result;
  }
};

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'CurrentUser',
    'PermissionRequest',
    'User',
    'Post',
    'File',
    'FileTags',
    'Chat',
    'Movie',
    'MovieFileTags',
    'Music',
    'MusicFileTags',
  ],
  endpoints: (builder) => ({}),
});
