import AuthContext from 'auth/context/AuthProvider1';

import { useContext } from 'react';

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
