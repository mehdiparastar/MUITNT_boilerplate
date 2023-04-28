import { appNameEnum } from 'enum/appName.enum';
import { IAddTag, ITag } from 'models/TAGS/tag.model';
import { apiSlice } from '../../../api/rtkApi/apiSlice';

export const movieFileTagsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMovieFileTags: builder.query<ITag[], void>({
      query() {
        return {
          url: `tags/all/${appNameEnum.movie}`,
          method: 'GET',
        };
      },
      keepUnusedDataFor: 0,
      providesTags: ['MovieFileTags'],
    }),
    addMovieFileTag: builder.mutation<ITag, IAddTag>({
      query(arg) {
        return {
          url: `tags/create`,
          method: 'Post',
          body: arg,
        };
      },
      invalidatesTags: ['MovieFileTags'],
    }),
  }),
});

export const { useGetMovieFileTagsQuery, useAddMovieFileTagMutation } =
  movieFileTagsApiSlice;
