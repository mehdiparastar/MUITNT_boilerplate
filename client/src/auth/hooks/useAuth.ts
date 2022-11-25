import AuthContext from 'auth/context/AuthProvider';
import { useContext, useDebugValue } from 'react';

const useAuth = () => {
  const { userCtx } = useContext(AuthContext);
  useDebugValue(userCtx, (userCtx) =>
    userCtx?.profile ? 'Logged In' : 'Logged Out',
  );
  return useContext(AuthContext);
};

export default useAuth;
