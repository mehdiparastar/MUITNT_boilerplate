import { apiSlice } from '../../api/apiSlice'

export interface LocalLoginRequest {
    email: string
    password: string
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        localLogin: builder.mutation<IAuthResponse, LocalLoginRequest>({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        localRegister: builder.mutation<IAuthResponse, LocalLoginRequest>({
            query: credentials => ({
                url: '/auth/create',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        getUserProfile: builder.mutation<IUser, void>({
            query: () => {
                return ({ url: 'auth/profile', method: 'GET' })
            },
        }),
        // getUserProfile: builder.query<IUser, void>({
        //     query: () => {
        //         return ({ url: 'auth/profile', method: 'GET' })
        //     },
        //     providesTags: ['Auth'],
        //     keepUnusedDataFor: 5
        // })
    })
})

export const {
    useLocalLoginMutation,
    useGetUserProfileMutation,
    useLocalRegisterMutation
} = authApiSlice
