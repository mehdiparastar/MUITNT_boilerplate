import AuthContext from 'auth/context/AuthProvider';
import { assess } from 'helperFunctions/componentAssess';
import { useContext, useDebugValue } from 'react';

const useAuth = () => {
  assess && console.log('assess');
  const { userProfile } = useContext(AuthContext);
  useDebugValue(userProfile, (userProfile) =>
    userProfile ? 'Logged In' : 'Logged Out',
  );
  return useContext(AuthContext);
};

export default useAuth;
