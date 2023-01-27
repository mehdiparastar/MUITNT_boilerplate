import { IChangeCurrentUserPasswordDto, ICurrentUser, IEditCurrentUserDto } from 'models/WHOLE_APP/currentUser.model'
import { apiSlice } from '../../../../api/apiSlice'

export const currentUserApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query<ICurrentUser, void>({
            query: () => {
                return ({ url: 'auth/profile', method: 'GET' })
            },
            providesTags: (result) => {
                return ['CurrentUser']
            },
            keepUnusedDataFor: 0
        }),
        updateCurrentUser: builder.mutation<ICurrentUser, IEditCurrentUserDto>(
            {
                query(updateDto) {
                    return {
                        url: `auth/change-profile-detail`,
                        method: 'PATCH',
                        body: updateDto,
                    };
                },
                invalidatesTags: ['CurrentUser', 'PermissionRequest', 'User']
                // invalidatesTags: (result, error, { photo }) =>
                //     result
                //         ? [
                //             { type: 'CurrentUser', id: photo },
                //             { type: 'CurrentUser', id: 'LIST' },
                //         ]
                //         : [{ type: 'CurrentUser', id: 'LIST' }],
                // transformResponse: (response: { data: { post: IPostResponse } }) =>response.data.post,
            }
        ),
        changeCurrentUserPassword: builder.mutation<ICurrentUser, IChangeCurrentUserPasswordDto>(
            {
                query(changePassDto) {
                    return {
                        url: `auth/change-password`,
                        method: 'PATCH',
                        body: changePassDto,
                    };
                },
                invalidatesTags: ['CurrentUser']
                // invalidatesTags: (result, error, { password }) =>
                //     result
                //         ? [
                //             { type: 'CurrentUser', id: password },
                //             { type: 'CurrentUser', id: 'LIST' },
                //         ]
                //         : [{ type: 'CurrentUser', id: 'LIST' }],
                // transformResponse: (response: { data: { post: IPostResponse } }) =>response.data.post,
            }
        ),
    })
})

export const {
    useGetCurrentUserQuery,
    useUpdateCurrentUserMutation,
    useChangeCurrentUserPasswordMutation,
} = currentUserApiSlice
