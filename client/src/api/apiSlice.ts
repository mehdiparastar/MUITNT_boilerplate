import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError, createApi } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import { logOut, setAuthTokens } from 'features/auth/authSlice'
import { RootState } from 'apps/store'
import { baseURL } from './baseUrl'

const mutex = new Mutex()

const baseQuery_access = fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as RootState).auth.accessToken
        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`)
        }
        return headers
    }
})

const baseQuery_refresh = fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
        const refreshToken = (getState() as RootState).auth.refreshToken
        if (refreshToken) {
            headers.set('authorization', `Bearer ${refreshToken}`)
        }
        return headers
    }
})

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock()

    let result = await baseQuery_access(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                const refreshResult = await baseQuery_refresh('auth/refresh', api, extraOptions)
                if (refreshResult.data) {
                    api.dispatch(setAuthTokens(refreshResult.data as IAuthResponse))
                    localStorage.setItem('rT', String((refreshResult.data as IAuthResponse).refreshToken))
                    result = await baseQuery_access(args, api, extraOptions)
                } else {
                    const logoutResult = await baseQuery_access('auth/logout', api, extraOptions)
                    if (logoutResult.data) {
                        api.dispatch(logOut(logoutResult.data as IUser))
                    } else {
                        api.dispatch(logOut({} as IUser))
                    }
                }
            } finally {
                // release must be called once the mutex should be released again.
                release()
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock()
            result = await baseQuery_access(args, api, extraOptions)
        }
    }
    return result
}

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})