import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import type { RootState } from '../../redux/store';
import { IUsersState } from '../users/usersSlice';
import { IAddPostFormDto } from './AddPostForm';

// Define a type for the slice state
export interface IReactionState {
  thumbsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
}
export interface IPostsState {
  id: string;
  title: string;
  content: string;
  user: IUsersState | null;
  date: Date;
  reactions: IReactionState;
}

export interface IAddReactionDto {
  postId: string;
  reaction: keyof IReactionState;
}

// Define the initial state using that type
const initialState: IPostsState[] = [
  {
    id: '1',
    title: 'Learning redux toolkit',
    content: `Aliqua ullamco Lorem dolor proident Lorem consectetur ipsum culpa dolore commodo ipsum ullamco ad eu. Occaecat sint quis cupidatat culpa ut amet fugiat minim adipisicing. Magna ea eiusmod laborum et incididunt proident incididunt consequat anim deserunt anim fugiat velit. Excepteur non reprehenderit consectetur adipisicing.`,
    user: null,
    date: sub(new Date(), { minutes: 10 }),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: '2',
    title: 'Slices ...',
    content:
      'Est dolore do do et culpa exercitation deserunt nulla dolore eiusmod. Exercitation deserunt deserunt exercitation in aliquip elit ex tempor adipisicing fugiat enim in excepteur. Et dolore anim nostrud consectetur adipisicing in commodo. Voluptate nostrud occaecat nisi irure duis anim. Culpa duis deserunt occaecat ex.',
    user: null,
    date: sub(new Date(), { minutes: 5 }),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

export const postsSlice = createSlice({
  name: 'posts',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<IPostsState>) {
        state.push(action.payload);
      },
      prepare(addPostForm: IAddPostFormDto) {
        return {
          payload: {
            id: nanoid(),
            date: new Date(),
            ...addPostForm,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          } as IPostsState,
        };
      },
    },
    reactionAdded(state, action: PayloadAction<IAddReactionDto>) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const { postAdded, reactionAdded } = postsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAllPosts = (state: RootState) => state.posts;

export default postsSlice.reducer;
