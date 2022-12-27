import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { RootState } from '../../redux/store';
import { IAddUserFormDto } from './AddUserForm';

// Define a type for the slice state
export interface IUsersState {
  id: string;
  name: string;
}

// Define the initial state using that type
const initialState: IUsersState[] = [
  {
    id: '1',
    name: 'Mehdi Parastar',
  },
  {
    id: '2',
    name: 'Negin Khandan',
  },
];

export const usersSlice = createSlice({
  name: 'users',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    userAdded: {
      reducer(state, action: PayloadAction<IUsersState>) {
        state.push(action.payload);
      },
      prepare(addUserForm: IAddUserFormDto) {
        return {
          payload: {
            id: nanoid(),
            ...addUserForm,
          },
        };
      },
    },
  },
});

export const { userAdded } = usersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAllUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
