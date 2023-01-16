import { AuthContext } from 'auth/context/AuthProvider';
import { useContext } from 'react';

type UseAuthHookType = {
  userProfile: IUser | null,
  accessToken: string | null,
  refreshToken: string | null,
  persist: boolean,
  setUserProfile: (userProfile: IUser | null) => void,
  setAccessToken: (accessToken: string | null) => void
  setRefreshToken: (refreshToken: string | null) => void,
  setPersist: (persist: boolean) => void,
}

export const useAuth = (): UseAuthHookType => {
  const {
    state: { userProfile, accessToken, refreshToken, persist },
    setUserProfile,
    setAccessToken,
    setRefreshToken,
    setPersist,
  } = useContext(AuthContext)
  return {
    userProfile,
    accessToken,
    refreshToken,
    persist,
    setUserProfile,
    setAccessToken,
    setRefreshToken,
    setPersist,
  }
}
