import {
  IPermissionRequest,
  IPermissionRequestPaginated,
} from 'models/WHOLE_APP/permissionRequest.model';
import { apiSlice } from '../../../../api/rtkApi/apiSlice';

export const permissionRequestApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPermissionRequest: builder.mutation<
      IPermissionRequest,
      { role: string }
    >({
      query(PR) {
        return {
          url: 'auth/create-permission-request',
          method: 'POST',
          body: PR,
        };
      },
      invalidatesTags: ['PermissionRequest'],
      // invalidatesTags: [{ type: 'PermissionRequest', id: 'LIST' }],
      // transformResponse: (result: { data: { post: IPermissionRequestRespone } }) => result.data.post,
    }),

    getMyAllPermissionRequest: builder.query<
      IPermissionRequestPaginated,
      { query: string }
    >({
      query({ query }) {
        return {
          url: `auth/get-my-all-permission-requests?${query}`,
          method: 'GET',
        };
      },
      keepUnusedDataFor: 5,
      providesTags: ['PermissionRequest'],
      transformResponse: (results: {
        data: IPermissionRequest[];
        count: number;
      }) => {
        return {
          ...results,
          data: results.data.map((item) => ({
            ...item,
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt),
          })),
        };
      },
      // transformResponse: (results: { data: { posts: IPermissionRequestRespone[] } }) => results.data.posts,
      // providesTags: (result) =>
      //     result?.data
      //         ? [
      //             ...result.data.map(({ id }) => ({
      //                 type: 'PermissionRequest' as const,
      //                 id,
      //             })),
      //             { type: 'PermissionRequest', id: 'LIST' },
      //         ]
      //         : [{ type: 'PermissionRequest', id: 'LIST' }],
    }),

    getAllPermissionRequestToApprove: builder.query<
      IPermissionRequestPaginated,
      { query: string }
    >({
      query({ query }) {
        return {
          url: `auth/get-all-permission-requests-to-approve?${query}`,
          method: 'GET',
        };
      },
      keepUnusedDataFor: 5,
      providesTags: ['PermissionRequest'],
      transformResponse: (results: {
        data: IPermissionRequest[];
        count: number;
      }) => {
        return {
          ...results,
          data: results.data.map((item) => ({
            ...item,
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt),
          })),
        };
      },
      // providesTags: (result) =>
      //     result?.data
      //         ? [
      //             ...result.data.map(({ id }) => ({
      //                 type: 'PermissionRequest' as const,
      //                 id,
      //             })),
      //             { type: 'PermissionRequest', id: 'LIST' },
      //         ]
      //         : [{ type: 'PermissionRequest', id: 'LIST' }],
      // transformResponse: (results: { data: { posts: IPermissionRequestRespone[] } }) => results.data.posts,
    }),

    deletePermissionRequest: builder.mutation<
      IPermissionRequest,
      { id: number }
    >({
      query({ id }) {
        return {
          url: `auth/delete-permission-request/${id}`,
          method: 'Delete',
        };
      },
      invalidatesTags: ['PermissionRequest'],
      // invalidatesTags: [{ type: 'PermissionRequest', id: 'LIST' }],
    }),

    setPermissionRequestToSEEN: builder.mutation<
      IPermissionRequest,
      { pReqId: number }
    >({
      query({ pReqId }) {
        return {
          url: 'auth/set-seen-preq',
          method: 'PATCH',
          body: { pReqId },
        };
      },
      invalidatesTags: ['PermissionRequest'],
      // invalidatesTags: [{ type: 'PermissionRequest', id: 'LIST' }],
      // transformResponse: (result: { data: { post: IPermissionRequestRespone } }) => result.data.post,
    }),

    setPermissionRequestToAPPROVE: builder.mutation<
      IPermissionRequest,
      { pReqId: number }
    >({
      query({ pReqId }) {
        return {
          url: 'auth/set-approve-preq',
          method: 'PATCH',
          body: { pReqId },
        };
      },
      invalidatesTags: ['PermissionRequest'],
      // invalidatesTags: [{ type: 'PermissionRequest', id: 'LIST' }],
      // transformResponse: (result: { data: { post: IPermissionRequestRespone } }) => result.data.post,
    }),

    setPermissionRequestToREJECT: builder.mutation<
      IPermissionRequest,
      { pReqId: number }
    >({
      query({ pReqId }) {
        return {
          url: 'auth/set-reject-preq',
          method: 'PATCH',
          body: { pReqId },
        };
      },
      invalidatesTags: ['PermissionRequest'],
      // invalidatesTags: [{ type: 'PermissionRequest', id: 'LIST' }],
      // transformResponse: (result: { data: { post: IPermissionRequestRespone } }) => result.data.post,
    }),
  }),
});

export const {
  useCreatePermissionRequestMutation,
  useGetMyAllPermissionRequestQuery,
  useGetAllPermissionRequestToApproveQuery,
  useDeletePermissionRequestMutation,
  useSetPermissionRequestToSEENMutation,
  useSetPermissionRequestToAPPROVEMutation,
  useSetPermissionRequestToREJECTMutation,
} = permissionRequestApiSlice;
