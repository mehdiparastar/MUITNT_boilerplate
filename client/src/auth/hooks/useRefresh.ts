import axios from 'api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { accessTokenCtx, refreshTokenCtx } = useAuth();

  const refresh = async () => {
    const response = await axios.get('auth/refresh', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshTokenCtx.token}`,
      },
    });
    accessTokenCtx.update(response.data.accessToken);
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
