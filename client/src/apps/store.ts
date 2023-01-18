import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from 'api/apiSlice';
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production' ? true : false
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
