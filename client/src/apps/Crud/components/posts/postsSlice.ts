import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { reactionTypeEnum } from 'enum/reactionType.enum';
import { thunkStatus } from 'enum/reduxThunkStatus.enum';
import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';
import type { RootState } from '../../redux/store';

// Define a type for the slice state
export type IReactionState = {
  [ket in reactionTypeEnum]: number;
}
export interface IPostsState {
  id: number;
  title: string;
  caption: string;
  author: IUser;
  createdAt: Date;
  updatedAt: Date;
  reactions: Partial<IReactionState>;
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

interface ICreatePostDto {
  title: string;
  caption: string;
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
    handleLoading: (bool: boolean) => void;
    skip: number;
    limit: number;
  },
  { rejectValue: AxiosError }
>(
  'posts/fetchPosts',
  async ({ axiosPrivate, handleLoading, skip, limit }, thunkApi) => {
    try {
      handleLoading(true);
      const response = await axiosPrivate.get<{
        count: number;
        data: IPostsState[];
      }>(`posts/all-posts?skip=${skip}&&limit=${limit}`);
      handleLoading(false);
      return response.data;
    } catch (ex) {
      const err = ex as AxiosError;
      handleLoading(false);
      return thunkApi.rejectWithValue(err);
    }
  },
);

export const likePost = createAsyncThunk<
  { reaction: Partial<{ [key in reactionTypeEnum]: number }>, postId?: number },
  {
    axiosPrivate: AxiosInstance;
    handleLoading: (bool: boolean) => void;
    postId: number;
  },
  { rejectValue: AxiosError }
>(
  'posts/likePost',
  async ({ axiosPrivate, handleLoading, postId }, thunkApi) => {
    try {
      handleLoading(true);
      const response = await axiosPrivate.patch<Partial<{ [key in reactionTypeEnum]: number }>>(`posts/like-post/${postId}`);
      handleLoading(false);
      return { reaction: response.data, postId };
    } catch (ex) {
      const err = ex as AxiosError;
      handleLoading(false);
      return thunkApi.rejectWithValue(err);
    }
  },
);


export const dislikePost = createAsyncThunk<
  { reaction: Partial<{ [key in reactionTypeEnum]: number }>, postId?: number },
  {
    axiosPrivate: AxiosInstance;
    handleLoading: (bool: boolean) => void;
    postId: number;
  },
  { rejectValue: AxiosError }
>(
  'posts/dislikePost',
  async ({ axiosPrivate, handleLoading, postId }, thunkApi) => {
    try {
      handleLoading(true);
      const response = await axiosPrivate.patch<Partial<{ [key in reactionTypeEnum]: number }>>(`posts/dislike-post/${postId}`);
      handleLoading(false);
      return { reaction: response.data, postId };
    } catch (ex) {
      const err = ex as AxiosError;
      handleLoading(false);
      return thunkApi.rejectWithValue(err);
    }
  },
);


export const deletePost = createAsyncThunk<
  { postId: number },
  {
    axiosPrivate: AxiosInstance;
    handleLoading: (bool: boolean) => void;
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey;
    postId: number;
  },
  { rejectValue: AxiosError }
>(
  'posts/deletePost',
  async ({ axiosPrivate, handleLoading, enqueueSnackbar, postId }, thunkApi) => {
    try {
      handleLoading(true);
      await axiosPrivate.delete<Partial<IPostsState>>(`posts/delete-post/${postId}`);
      handleLoading(false);
      enqueueSnackbar('successfully deleted', { variant: 'success' });
      return { postId, };
    } catch (ex) {
      const err = ex as AxiosError<{ msg?: string }>;
      handleLoading(false);
      enqueueSnackbar(err.response?.data?.msg || 'Unknown Error', { variant: 'error' });
      return thunkApi.rejectWithValue(err);
    }
  },
);


export const createPost = createAsyncThunk<
  IPostsState,
  {
    axiosPrivate: AxiosInstance;
    handleLoading: (bool: boolean) => void;
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey;
    data: ICreatePostDto
  },
  { rejectValue: AxiosError }
>(
  'posts/createPost',
  async ({ axiosPrivate, handleLoading, enqueueSnackbar, data }, thunkApi) => {
    try {
      handleLoading(true);
      const response = await axiosPrivate.post<IPostsState>(`posts/create-post`, data);
      handleLoading(false);
      enqueueSnackbar('successfully added', { variant: 'success' });
      return response.data
    } catch (ex) {
      const err = ex as AxiosError<{ msg?: string }>;
      handleLoading(false);
      enqueueSnackbar(err.response?.data?.msg || 'Unknown Error', { variant: 'error' });
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
      })
      .addCase(likePost.pending, (state, action) => {
        state.status = thunkStatus.loading;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.status = thunkStatus.succeeded;
        state.posts.data.find(post => post.id === action.payload.postId)!.reactions = action.payload.reaction
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status = thunkStatus.failed;
        if (action.payload) state.error = action.payload;
      })
      .addCase(dislikePost.pending, (state, action) => {
        state.status = thunkStatus.loading;
      })
      .addCase(dislikePost.fulfilled, (state, action) => {
        state.status = thunkStatus.succeeded;
        state.posts.data.find(post => post.id === action.payload.postId)!.reactions = action.payload.reaction
      })
      .addCase(dislikePost.rejected, (state, action) => {
        state.status = thunkStatus.failed;
        if (action.payload) state.error = action.payload;
      })
      .addCase(createPost.pending, (state, action) => {
        state.status = thunkStatus.loading;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = thunkStatus.succeeded;
        state.posts.data = [action.payload, ...state.posts.data]
        state.posts.count = state.posts.count + 1
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = thunkStatus.failed;
        if (action.payload) state.error = action.payload;
      })
      .addCase(deletePost.pending, (state, action) => {
        state.status = thunkStatus.loading;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = thunkStatus.succeeded;
        state.posts.data = state.posts.data.filter(post => post.id !== action.payload.postId)
        state.posts.count = state.posts.count - 1
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = thunkStatus.failed;
        if (action.payload) state.error = action.payload;
      });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;
export const selectPostReactionsCoundByPostIdAndReactionName =
  createSelector(
    [
      selectAllPosts,
      (selectAllPosts, postId: number, name: reactionTypeEnum) => ({ postId, name })
    ],
    (selectAllPosts, { postId, name }) => {
      // console.log(postId, name)
      return selectAllPosts.data.find(post => post.id === postId)?.reactions[name]
    })
export default postsSlice.reducer;
