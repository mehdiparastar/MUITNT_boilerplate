import { appNameEnum } from 'enum/appName.enum';
import { IAddTag, ITag } from 'models/TAGS/tag.model';
import { apiSlice } from '../../../api/rtkApi/apiSlice';

export const musicFileTagsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMusicFileTags: builder.query<ITag[], void>({
      query() {
        return {
          url: `tags/all/${appNameEnum.music}`,
          method: 'GET',
        };
      },
      keepUnusedDataFor: 0,
      providesTags: ['MusicFileTags'],
    }),
    addMusicFileTag: builder.mutation<ITag, IAddTag>({
      query(arg) {
        return {
          url: `tags/create`,
          method: 'Post',
          body: arg,
        };
      },
      invalidatesTags: ['MusicFileTags'],
    }),
  }),
});

export const { useGetMusicFileTagsQuery, useAddMusicFileTagMutation } =
  musicFileTagsApiSlice;
