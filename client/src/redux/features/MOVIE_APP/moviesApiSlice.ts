import {
  IMovieFile,
  IMovieFilePaginated,
} from 'models/MOVIES_APP/movieFile.model';
import { apiSlice } from '../../../api/rtkApi/apiSlice';
import { IAddMovieFileInfoDto } from 'models/MOVIES_APP/addMovieFile.model';

export const moviesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMultipleMovieFileInfo: builder.mutation<
      IMovieFile[],
      IAddMovieFileInfoDto[]
    >({
      query(data) {
        return {
          url: `movies_app/create-movie-files-info`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Movie'],
    }),

    uploadMultipleMovieFile: builder.mutation<
      { id: number; segmentNo: number }[],
      FormData
    >({
      query(data) {
        return {
          url: `movies_app/uploads`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Movie'],
    }),

    setUploadingFileAsCompleted: builder.mutation<
      IMovieFile,
      { fileInfoId: number }
    >({
      query(arg) {
        return {
          url: `movies_app/set-uploading-file-as-completed`,
          method: 'POST',
          body: arg,
        };
      },
      invalidatesTags: ['Movie'],
    }),

    downloadMovieFile: builder.mutation<
      Blob,
      { fileId: number; fileName: string }
    >({
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

    getHlsStreamUrl: builder.mutation<Blob, number>({
      query(arg) {
        return {
          url: `movies_app/get-file/${arg}`,
          method: 'GET',
          responseHandler: async (response) => {
            const res = await response.blob();

            return res;
          },
        };
      },
      invalidatesTags: ['Movie'],
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
  useGetHlsStreamUrlMutation,
  useCreateMultipleMovieFileInfoMutation,
  useSetUploadingFileAsCompletedMutation,
} = moviesApiSlice;
