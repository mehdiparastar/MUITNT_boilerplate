import { assess } from 'helperFunctions/componentAssess';
import { strToBool } from 'helperFunctions/strToBool';
import { createContext, FC, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';

const initAuthState: IAuthContext = {
  userCtx: {
    profile: null,
    update: () => { },
  },
  accessTokenCtx: {
    token: null,
    update: () => { },
  },
  refreshTokenCtx: {
    token: null,
    update: () => { },
  },
  persistCtx: {
    value: false,
    update: () => { },
  },
  loadingPersistCtx: {
    value: false,
    update: () => { },
  },
  loadingFetchCtx: {
    value: false,
    update: () => { },
  }
};

const AuthContext = createContext<IAuthContext>(initAuthState);

export const AuthProvider: FC<Props> = ({ children }) => {
  assess && console.log('assess')
  const [cookies] = useCookies(['persist']);
  const [user, setUser] = useState<IUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [persist, setPersist] = useState<boolean>(strToBool(cookies.persist));
  const [loadingPersist, setLoadingPersist] = useState<boolean>(true)
  const [loadingFetch, setLoadingFetch] = useState<boolean>(false)

  const userCtx = useMemo(() => {
    return {
      profile: user,
      update: (user: IUser | null) => {
        setUser(user);        
      },
    };
  }, [user]);

  const accessTokenCtx = useMemo(() => {
    return {
      token: accessToken,
      update: (token: string | null) => {
        setAccessToken(token);
      },
    };
  }, [accessToken]);

  const refreshTokenCtx = useMemo(() => {
    return {
      token: refreshToken,
      update: (token: string | null) => {
        setRefreshToken(token);
      },
    };
  }, [refreshToken]);

  const persistCtx = useMemo(() => {
    return {
      value: persist,
      update: (bool: boolean) => {
        setPersist(bool);
      },
    };
  }, [persist]);

  const loadingPersistCtx = useMemo(() => {
    return {
      value: loadingPersist,
      update: (bool: boolean) => {
        setLoadingPersist(bool);
      },
    };
  }, [loadingPersist]);

  const loadingFetchCtx = useMemo(() => {
    return {
      value: loadingFetch,
      update: (bool: boolean) => {
        setLoadingFetch(bool);
      },
    };
  }, [loadingFetch]);

  return (
    <AuthContext.Provider
      value={{ userCtx, accessTokenCtx, refreshTokenCtx, persistCtx, loadingPersistCtx, loadingFetchCtx }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
