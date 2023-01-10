import AuthContext from 'auth/context/AuthProvider';

import { useContext } from 'react';

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
