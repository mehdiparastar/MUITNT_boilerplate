import { IAddMusicFileInfoDto } from 'models/MUSICS_APP/addMusicFile.model';
import {
  IMusicFile,
  IMusicFilePaginated,
} from 'models/MUSICS_APP/musicFile.model';
import { apiSlice } from '../../../api/rtkApi/apiSlice';

export const musicsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMultipleMusicFileInfo: builder.mutation<
      IMusicFile[],
      IAddMusicFileInfoDto[]
    >({
      query(data) {
        return {
          url: `musics_app/create-music-files-info`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Music'],
    }),

    uploadMultipleMusicFile: builder.mutation<
      { id: number; segmentNo: number }[],
      FormData
    >({
      query(data) {
        return {
          url: `musics_app/uploads`,
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Music'],
    }),

    setUploadingMusicFileAsCompleted: builder.mutation<
      IMusicFile,
      { fileInfoId: number }
    >({
      query(arg) {
        return {
          url: `musics_app/set-uploading-file-as-completed`,
          method: 'POST',
          body: arg,
        };
      },
      invalidatesTags: ['Music'],
    }),

    downloadMusicFile: builder.mutation<
      Blob,
      { fileId: number; fileName: string }
    >({
      query(arg) {
        return {
          url: `musics_app/get-file/${arg.fileId}`,
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

    getAllMusicFiles: builder.query<IMusicFilePaginated, { qry: string }>({
      query(arg) {
        return {
          url: `musics_app/all-files?${arg.qry}`,
          method: 'GET',
        };
      },
      providesTags: ['Music'],
      transformResponse: (results: IMusicFilePaginated) => {
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

    deleteMusicFile: builder.mutation<IMusicFile, { id: number }>({
      query({ id }) {
        return {
          url: `musics_app/delete-file/${id}`,
          method: 'Delete',
        };
      },
      invalidatesTags: ['Music'],
    }),
  }),
});

export const {
  useUploadMultipleMusicFileMutation,
  useGetAllMusicFilesQuery,
  useDownloadMusicFileMutation,
  useDeleteMusicFileMutation,
  useCreateMultipleMusicFileInfoMutation,
  useSetUploadingMusicFileAsCompletedMutation,
} = musicsApiSlice;
