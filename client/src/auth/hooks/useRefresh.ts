import axios from 'api/axios';
import { assess } from 'helperFunctions/componentAssess';
import { strToBool } from 'helperFunctions/strToBool';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { accessTokenCtx, refreshTokenCtx, persistCtx } = useAuth();

  const refresh = async (persistRT?: string | null) => {
    assess && console.log('assess');
    const rT =
      persistCtx.value &&
      !strToBool(refreshTokenCtx.token) &&
      strToBool(persistRT)
        ? persistRT
        : refreshTokenCtx.token;

    const response = await axios.get('auth/refresh', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${rT}`,
      },
    });
    accessTokenCtx.update(response.data.accessToken);
    refreshTokenCtx.update(response.data.refreshToken);
    return { aT: response.data.accessToken, rT: response.data.refreshToken };
  };

  return refresh;
};

export default useRefreshToken;
