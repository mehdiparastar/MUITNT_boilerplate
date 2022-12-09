import { createContext, FC, useMemo, useState } from 'react';

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
};

const AuthContext = createContext<IAuthContext>(initAuthState);

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

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

  return (
    <AuthContext.Provider value={{ userCtx, accessTokenCtx, refreshTokenCtx }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
