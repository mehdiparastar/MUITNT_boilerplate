import AuthContext from 'auth/context/AuthProvider';

import { useContext, useDebugValue } from 'react';

const useAuth = () => {
  
  const { userProfile } = useContext(AuthContext);
  useDebugValue(userProfile, (userProfile) =>
    userProfile ? 'Logged In' : 'Logged Out',
  );
  return useContext(AuthContext);
};

export default useAuth;
