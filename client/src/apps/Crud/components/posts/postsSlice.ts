import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createSlice, nanoid } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { sub } from 'date-fns';
import { thunkStatus } from 'enum/reduxThunkStatus.enum';
import type { RootState } from '../../redux/store';
import { IAddPostFormDto } from './AddPostForm';
import useAxiosPrivate from 'auth/hooks/useAxiosPrivate';
import { reactionTypeEnum } from 'enum/reactionType.enum';

// Define a type for the slice state
export interface IReactionState {
  id: number;
  type: reactionTypeEnum;
}
export interface IPostsState {
  id: number;
  title: string;
  caption: string;
  author: IUser;
  createdAt: Date;
  updatedAt: Date;
  reactions: IReactionState[];
}

export interface IAddReactionDto {
  postId: string;
  reaction: keyof IReactionState;
}

interface IPostsThunkState {
  posts: { data: IPostsState[]; count: number };
  status: thunkStatus;
  error: AxiosError | null;
}

// Define the initial state using that type
const initialState: IPostsThunkState = {
  posts: { data: [], count: 0 },
  status: thunkStatus.idle,
  error: null,
};

export const fetchPosts = createAsyncThunk<
  {
    count: number;
    data: IPostsState[];
  },
  {
    axiosPrivate: AxiosInstance;
    setLoadingFetch: (bool: boolean) => void;
    skip: number;
    limit: number;
  },
  { rejectValue: AxiosError }
>(
  'posts/fetchPosts',
  async ({ axiosPrivate, setLoadingFetch, skip, limit }, thunkApi) => {
    try {
      setLoadingFetch(true);
      const response = await axiosPrivate.get<{
        count: number;
        data: IPostsState[];
      }>(`posts/all-posts?skip=${skip}&&limit=${limit}`);
      setLoadingFetch(false);
      return response.data;
    } catch (ex) {
      const err = ex as AxiosError;
      setLoadingFetch(false);
      return thunkApi.rejectWithValue(err);
    }
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = thunkStatus.loading;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = thunkStatus.succeeded;
        // state.posts = state.posts.concat(action.payload);
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = thunkStatus.failed;
        if (action.payload) state.error = action.payload;
      });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

export default postsSlice.reducer;
