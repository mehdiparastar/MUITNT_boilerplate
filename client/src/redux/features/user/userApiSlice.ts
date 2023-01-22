import { apiSlice } from '../../../api/apiSlice'

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<IUser[], void>({
            query: () => {
                return ({ url: 'auth/all', method: 'GET' })
            },
            providesTags: ['User'],
            keepUnusedDataFor: 5
        }),
    })
})

export const {
    useGetAllUsersQuery
} = userApiSlice