import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from 'api/rtkApi/apiSlice';
import authReducer from './features/WHOLE_APP/auth/authSlice';

const nodeENV = process.env.NODE_ENV 

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([apiSlice.middleware]),
  devTools: nodeENV !== 'production' ? true : false,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
