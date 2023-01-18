import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { strToBool } from "helperFunctions/strToBool";
import { RootState } from "../../apps/store";

type StateType = {
    userProfile: IUser | null;
    accessToken: string | null;
    refreshToken: string | null;
    persist: boolean;
}

const initState: StateType = {
    userProfile: null,
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
        setAuthTokens: (state: StateType, action: PayloadAction<{ accessToken: string, refreshToken: string }>) => {
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        },
        setAuthUserProfile: (state: StateType, action: PayloadAction<IUser>) => {
            state.userProfile = action.payload
        },
        logOut: (state: StateType, action: PayloadAction<IUser>) => {
            state.userProfile = null
            state.accessToken = null
            state.refreshToken = null
        },
        setPersist: (state: StateType, action: PayloadAction<boolean>) => {
            state.persist = action.payload
        },
    },
})

export const { setAuthTokens, setAuthUserProfile, setPersist, logOut } = authSlice.actions

export default authSlice.reducer

export const selectAuthUser = (state: RootState) => state.auth;
export const selectCurrentUserProfile = (state: RootState) => state.auth.userProfile;
export const selectCurrentAccessToken = (state: RootState) => state.auth.accessToken;
export const selectCurrentRefreshToken = (state: RootState) => state.auth.refreshToken;