import { IFile, IFilePaginated } from 'models/FILES_APP/file.model';
import { apiSlice } from '../../../api/rtkApi/apiSlice';

export const fileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadMultipleFile: builder.mutation<number[], FormData>({
            query(data) {
                return {
                    url: `files_app/uploads`,
                    method: 'POST',
                    body: data
                };
            },
            invalidatesTags: ['File']
        }),

        downloadFile: builder.mutation<Blob, { fileId: number, fileName: string }>({

            query(arg) {
                return {
                    url: `files_app/get-file/${arg.fileId}`,
                    method: 'GET',
                    responseHandler: async (response) => {
                        console.log(response)
                        const hiddenElement = document.createElement('a');
                        const url = window.URL || window.webkitURL;
                        const res = await response.blob()
                        const blob = url.createObjectURL(res);
                        hiddenElement.href = blob;
                        hiddenElement.target = '_blank';
                        hiddenElement.download = arg.fileName;
                        hiddenElement.click();
                        // return res
                        return { data: null }
                    },
                    cache: "no-cache",
                }
            },

        }),

        getAllFiles: builder.query<IFilePaginated, { qry: string }>({
            query(arg) {
                return {
                    url: `files_app/all-files?${arg.qry}`,
                    method: 'GET'
                }
            },
            providesTags: ['File'],
            transformResponse: (results: IFilePaginated) => {
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
        }),

        deleteFile: builder.mutation<IFile, { id: number }>({
            query({ id }) {
                return {
                    url: `files_app/delete-file/${id}`,
                    method: 'Delete',
                };
            },
            invalidatesTags: ['File']
        }),


    })
})

export const {
    useUploadMultipleFileMutation,
    useGetAllFilesQuery,
    useDownloadFileMutation,
    useDeleteFileMutation
} = fileApiSlice
