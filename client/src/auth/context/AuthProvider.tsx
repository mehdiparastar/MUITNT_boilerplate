import { createContext, FC, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';

const initAuthState: IAuthContext = {
  userCtx: {
    profile: null,
    update: () => {},
  },
  accessTokenCtx: {
    token: null,
    update: () => {},
  },
  refreshTokenCtx: {
    token: null,
    update: () => {},
  },
  persistCtx: {
    value: false,
    update: () => {},
  },
};

const AuthContext = createContext<IAuthContext>(initAuthState);

export const AuthProvider: FC<Props> = ({ children }) => {
  const [cookies, setCookie] = useCookies(['persist']);
  const [user, setUser] = useState<IUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [persist, setPersist] = useState<boolean>(
    (cookies.persist === 'false'
      ? false
      : cookies.persist === 'true'
      ? true
      : cookies.persist) || false,
  );

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

  return (
    <AuthContext.Provider
      value={{ userCtx, accessTokenCtx, refreshTokenCtx, persistCtx }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
