import { AuthContext } from 'auth/context/AuthProvider copy';
import { useContext } from 'react';

type UseAuthHookType = {
  userProfile: IUser | null,
  accessToken: string | null,
  refreshToken: string | null,
  persist: boolean,
  setUserProfile: (userProfile: IUser) => void,
  setAccessToken: (accessToken: string) => void
  setRefreshToken: (refreshToken: string) => void,
  setPersist: (persist: boolean) => void,
}

export const useLoading = (): UseAuthHookType => {
  const {
    state: { userProfile, accessToken, refreshToken, persist },
    setUserProfile,
    setAccessToken,
    setRefreshToken,
    setPersist
  } = useContext(AuthContext)
  return {
    userProfile,
    accessToken,
    refreshToken,
    persist,
    setUserProfile,
    setAccessToken,
    setRefreshToken,
    setPersist
  }
}
