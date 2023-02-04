import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { strToBool } from "helperFunctions/strToBool";
import { IAuth } from "models/WHOLE_APP/auth.model";
import { RootState } from "../../../store";

type StateType = IAuth

const initState: StateType = {
    accessToken: null,
    refreshToken:
        strToBool(localStorage.getItem('persist')) ?
            localStorage.getItem('rT') === 'null' ? null : localStorage.getItem('rT') :
            null,
    persist: strToBool(localStorage.getItem('persist')) || false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        setAuthTokens: (
            state: StateType,
            action: PayloadAction<{ accessToken: string | null, refreshToken: string | null }>) => {
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        },
        setPersist: (state: StateType, action: PayloadAction<boolean>) => {
            state.persist = action.payload
        },
    },
})

export const { setAuthTokens, setPersist } = authSlice.actions

export default authSlice.reducer

export const selectAuthState = (state: RootState) => state.auth;
export const selectCurrentAccessToken = (state: RootState) => state.auth.accessToken;
export const selectCurrentRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectCurrentPersist = (state: RootState) => state.auth.persist;