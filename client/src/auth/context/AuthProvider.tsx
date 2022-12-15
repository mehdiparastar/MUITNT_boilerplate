import { assess } from 'helperFunctions/componentAssess';
import { strToBool } from 'helperFunctions/strToBool';
import { createContext, FC, useState } from 'react';
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
  loadingFetch: false,
  setLoadingFetch: () => { }
};

const AuthContext = createContext<IAuthContext>(initAuthState);

export const AuthProvider: FC<Props> = ({ children }) => {
  assess && console.log('assess')
  const [cookies] = useCookies(['persist']);
  const [userProfile, setUserProfile] = useState<IUser | null | undefined>(initAuthState.userProfile);
  const [accessToken, setAccessToken] = useState<string | null | undefined>(initAuthState.accessToken);
  const [refreshToken, setRefreshToken] = useState<string | null | undefined>(initAuthState.refreshToken);
  const [persist, setPersist] = useState<boolean>(strToBool(cookies.persist) || initAuthState.persist);
  const [loadingPersist, setLoadingPersist] = useState<boolean>(initAuthState.loadingPersist)
  const [loadingFetch, setLoadingFetch] = useState<boolean>(initAuthState.loadingFetch)

  return (
    <AuthContext.Provider
      value={{
        userProfile, setUserProfile,
        accessToken, setAccessToken,
        refreshToken, setRefreshToken,
        persist, setPersist,
        loadingPersist, setLoadingPersist,
        loadingFetch, setLoadingFetch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
