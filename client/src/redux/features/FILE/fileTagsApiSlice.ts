import { appNameEnum } from 'enum/appName.enum';
import { IAddTag, ITag } from 'models/TAGS/tag.model';
import { apiSlice } from '../../../api/rtkApi/apiSlice';

export const fileTagsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFileTags: builder.query<ITag[], void>({
            query() {
                return {
                    url: `tags/all/${appNameEnum.file}`,
                    method: 'GET',
                };
            },
            keepUnusedDataFor: 0,
            providesTags: ['FileTags']
        }),
        addFileTag: builder.mutation<ITag, IAddTag>({
            query(arg) {
                return {
                    url: `tags/create`,
                    method: 'Post',
                    body: arg
                }
            },
            invalidatesTags: ['FileTags']
        })
    })
})

export const {
    useGetFileTagsQuery,
    useAddFileTagMutation
} = fileTagsApiSlice
