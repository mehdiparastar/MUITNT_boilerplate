import AuthContext from 'auth/context/AuthProvider';
import { assess } from 'helperFunctions/componentAssess';
import { useContext, useDebugValue } from 'react';

const useAuth = () => {
  assess && console.log('assess');
  const { userCtx } = useContext(AuthContext);
  useDebugValue(userCtx, (userCtx) =>
    userCtx?.profile ? 'Logged In' : 'Logged Out',
  );
  return useContext(AuthContext);
};

export default useAuth;
