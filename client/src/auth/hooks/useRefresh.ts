import axios from 'api/axios';

import { strToBool } from 'helperFunctions/strToBool';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAccessToken, refreshToken, setRefreshToken, persist } = useAuth();

  const refresh = async (persistRT?: string | null) => {
    
    const rT =
      persist && !strToBool(refreshToken) && strToBool(persistRT)
        ? persistRT
        : refreshToken;
    const response = await axios.get('auth/refresh', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${rT}`,
      },
    });
    setAccessToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);
    return { aT: response.data.accessToken, rT: response.data.refreshToken };
  };

  return refresh;
};

export default useRefreshToken;
