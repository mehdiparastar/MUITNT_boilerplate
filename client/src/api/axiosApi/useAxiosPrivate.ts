import { axiosPrivate } from 'api/axiosApi/axios';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectCurrentAccessToken } from 'redux/features/WHOLE_APP/auth/authSlice';
import { useAppSelector } from 'redux/hooks';
import useRefreshToken from './useRefresh';

const useAxiosPrivate = () => {
  const accessToken = useAppSelector(selectCurrentAccessToken);
  const refresh = useRefreshToken();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (config.headers!.Authorization === 'Bearer ') {
          config.headers!.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err: AxiosError) => {
        const prevReq:
          | (AxiosRequestConfig<any> & { sent?: boolean })
          | undefined = err?.config;

        if (err.response?.status === 401 && prevReq && !prevReq.sent) {
          prevReq.sent = true;
          try {
            const { aT: newAccessToken } = await refresh();
            prevReq.headers = {
              ...prevReq.headers,
              Authorization: `Bearer ${newAccessToken}`,
            };
            return axiosPrivate(prevReq);
          } catch (ex) {
            const exception = ex as any;
            if (
              exception.response?.status === 401 &&
              prevReq &&
              !!prevReq.sent
            ) {
              navigate('/auth', { state: { from: location }, replace: true });
            }
            return Promise.reject(exception);
          }
        }
        return Promise.reject(err);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh, location, navigate]);

  return axiosPrivate;
};

export default useAxiosPrivate;
