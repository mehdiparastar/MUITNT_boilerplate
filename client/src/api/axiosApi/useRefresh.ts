import axios from 'api/axiosApi/axios';
import { strToBool } from 'helperFunctions/strToBool';
import { selectCurrentPersist, selectCurrentRefreshToken, setAuthTokens } from 'redux/features/WHOLE_APP/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

const useRefreshToken = () => {
  const persist = useAppSelector(selectCurrentPersist)
  const refreshToken = useAppSelector(selectCurrentRefreshToken)
  const dispatch = useAppDispatch()

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
    dispatch(setAuthTokens(response.data))
    return { aT: response.data.accessToken, rT: response.data.refreshToken };
  };

  return refresh;
};

export default useRefreshToken;