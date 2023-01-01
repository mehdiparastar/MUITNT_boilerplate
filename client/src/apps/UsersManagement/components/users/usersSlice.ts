import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../redux/store';

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
  reducers: {},
});

// Other code such as selectors can use the imported `RootState` type
export const selectAllUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
