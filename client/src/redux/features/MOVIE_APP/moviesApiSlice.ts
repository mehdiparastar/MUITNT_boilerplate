import {
  IMovieFile,
  IMovieFilePaginated,
} from 'models/MOVIES_APP/movieFile.model';
import { apiSlice } from '../../../api/rtkApi/apiSlice';

export const moviesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadMultipleMovieFile: builder.mutation<number[], FormData>({
      query(data) {
        return {
          url: `movies_app/uploads`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Movie'],
    }),

    downloadMovieFile: builder.mutation<Blob,{ fileId: number; fileName: string }>({
      query(arg) {
        return {
          url: `movies_app/get-file/${arg.fileId}`,
          method: 'GET',
          responseHandler: async (response) => {
            const hiddenElement = document.createElement('a');
            const url = window.URL || window.webkitURL;
            const res = await response.blob();
            const blob = url.createObjectURL(res);
            hiddenElement.href = blob;
            hiddenElement.target = '_blank';
            hiddenElement.download = arg.fileName;
            hiddenElement.click();
            return { data: null };
          },
          cache: 'no-cache',
        };
      },
    }),

    getAllMovieFiles: builder.query<IMovieFilePaginated, { qry: string }>({
      query(arg) {
        return {
          url: `movies_app/all-files?${arg.qry}`,
          method: 'GET',
        };
      },
      providesTags: ['Movie'],
      transformResponse: (results: IMovieFilePaginated) => {
        return {
          ...results,
          data: results.data.map((item) => ({
            ...item,
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt),
          })),
        };
      },
    }),

    deleteMovieFile: builder.mutation<IMovieFile, { id: number }>({
      query({ id }) {
        return {
          url: `movies_app/delete-file/${id}`,
          method: 'Delete',
        };
      },
      invalidatesTags: ['Movie'],
    }),
  }),
});

export const {
  useUploadMultipleMovieFileMutation,
  useGetAllMovieFilesQuery,
  useDownloadMovieFileMutation,
  useDeleteMovieFileMutation,
} = moviesApiSlice;
