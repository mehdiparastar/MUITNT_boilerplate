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
};

const AuthContext = createContext<IAuthContext>(initAuthState);

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const userCtx = useMemo(
    () => ({
      profile: user,
      update: (user: IUser) => {
        setUser(user);
      },
    }), // eslint-disable-next-line
    [],
  );

  const accessTokenCtx = useMemo(
    () => ({
      token: accessToken,
      update: (token: string) => {
        setAccessToken(token);
      },
    }), // eslint-disable-next-line
    [],
  );

  return (
    <AuthContext.Provider value={{ userCtx, accessTokenCtx }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
