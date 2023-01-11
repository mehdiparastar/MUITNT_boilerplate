
import { LinearProgress } from '@mui/material';
import { strToBool } from 'helperFunctions/strToBool';
import React, { createContext, FC, useState } from 'react';
import { useCookies } from 'react-cookie';

const initAuthState: IAuthContext = {
  userProfile: null,
  setUserProfile: () => { },
  accessToken: null,
  setAccessToken: () => { },
  refreshToken: null,
  setRefreshToken: () => { },
  persist: false,
  setPersist: () => { },
  loadingPersist: true,
  setLoadingPersist: () => { },
};

const AuthContext = createContext<IAuthContext>(initAuthState);

export const AuthProvider: FC<Props> = ({ children }) => {

  const [cookies] = useCookies(['persist']);
  const [userProfile, setUserProfile] = useState<IUser | null | undefined>(initAuthState.userProfile);
  const [accessToken, setAccessToken] = useState<string | null | undefined>(initAuthState.accessToken);
  const [refreshToken, setRefreshToken] = useState<string | null | undefined>(initAuthState.refreshToken);
  const [persist, setPersist] = useState<boolean>(strToBool(cookies.persist) || initAuthState.persist);
  const [loadingPersist, setLoadingPersist] = useState<boolean>(initAuthState.loadingPersist)

  const value = React.useMemo(() => ({
    userProfile, setUserProfile,
    accessToken, setAccessToken,
    refreshToken, setRefreshToken,
    persist, setPersist,
    loadingPersist, setLoadingPersist,
  }), [
    userProfile,
    accessToken,
    refreshToken,
    persist,
    loadingPersist,
  ])


  return (
    <AuthContext.Provider
      value={value}
    >
      {loadingPersist && <LinearProgress id='loader' sx={{ position: 'fixed', zIndex: 1000000000, top: 0, width: '100%' }} />}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
