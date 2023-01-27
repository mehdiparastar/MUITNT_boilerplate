import { ICRUDAPPCreatePostDto, ICRUDAPPPost, ICRUDAPPReaction, ICRUDAPPUpdatePostDto, ICRUDAPPPostPaginated } from 'models/CRUD_APP/post.model';
import { apiSlice } from '../../../../api/apiSlice';

export const postApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPost: builder.mutation<ICRUDAPPPost, ICRUDAPPCreatePostDto>({
            query(newRecord) {
                return {
                    url: 'crud_app/posts/create-post',
                    method: 'POST',
                    body: newRecord,
                };
            },
            invalidatesTags: ['Post'],
            // invalidatesTags: [{ type: 'Post', id: 'LIST' }],
            // transformResponse: (result: { data: { post: IPostRespone } }) => result.data.post,
        }),

        getAllPosts: builder.query<ICRUDAPPPostPaginated, { query: string }>({
            query({ query }) {
                return {
                    url: `crud_app/posts/all-posts?${query}`,
                    method: 'GET'
                };
            },
            keepUnusedDataFor: 5,
            providesTags: ['Post'],
            transformResponse: (results: { data: ICRUDAPPPost[], count: number }) => {
                return ({
                    ...results,
                    data: results.data.map(
                        item => ({
                            ...item,
                            createdAt: new Date(item.createdAt),
                            updatedAt: new Date(item.updatedAt)
                        })
                    )
                })
            }
            // transformResponse: (results: { data: { posts: IPostRespone[] } }) => results.data.posts,
            // providesTags: (result) =>
            //     result?.data
            //         ? [
            //             ...result.data.map(({ id }) => ({
            //                 type: 'Post' as const,
            //                 id,
            //             })),
            //             { type: 'Post', id: 'LIST' },
            //         ]
            //         : [{ type: 'Post', id: 'LIST' }],
        }),

        getPost: builder.query<ICRUDAPPPost, { id: number }>({
            query({ id }) {
                return {
                    url: `crud_app/posts/post/${id}`,
                    method: 'Get',
                };
            },
            providesTags: ['Post']
            // invalidatesTags: [{ type: 'Post', id: 'LIST' }],
        }),

        deletePost: builder.mutation<ICRUDAPPPost, { id: number }>({
            query({ id }) {
                return {
                    url: `crud_app/posts/delete-post/${id}`,
                    method: 'Delete',
                };
            },
            invalidatesTags: ['Post']
            // invalidatesTags: [{ type: 'Post', id: 'LIST' }],
        }),

        updatePost: builder.mutation<ICRUDAPPPost, ICRUDAPPUpdatePostDto>({
            query({ id, ...rest }) {
                return {
                    url: `crud_app/posts/delete-post/${id}`,
                    method: 'PATCH',
                    body: rest
                };
            },
            invalidatesTags: ['Post']
            // invalidatesTags: [{ type: 'Post', id: 'LIST' }],
        }),

        postLike: builder.mutation<ICRUDAPPReaction, { postId: number }>({
            query({ postId }) {
                return {
                    url: `crud_app/posts/like-post/${postId}`,
                    method: 'PATCH',
                };
            },
            invalidatesTags: ['Post'],
            // invalidatesTags: [{ type: 'Post', id: 'LIST' }],
            // transformResponse: (result: { data: { post: IPostRespone } }) => result.data.post,
        }),

        postDisLike: builder.mutation<ICRUDAPPReaction, { postId: number }>({
            query({ postId }) {
                return {
                    url: `crud_app/posts/dislike-post/${postId}`,
                    method: 'PATCH',
                };
            },
            invalidatesTags: ['Post'],
            // invalidatesTags: [{ type: 'Post', id: 'LIST' }],
            // transformResponse: (result: { data: { post: IPostRespone } }) => result.data.post,
        }),
    })
})

export const {
    useCreatePostMutation,
    useGetAllPostsQuery,
    useDeletePostMutation,
    usePostLikeMutation,
    usePostDisLikeMutation,
    useUpdatePostMutation,
} = postApiSlice
