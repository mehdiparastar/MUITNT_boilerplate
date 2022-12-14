import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import useRefreshToken from 'auth/hooks/useRefresh';
import useAuth from 'auth/hooks/useAuth';
import axios from 'api/axios';
import { useCookies } from 'react-cookie';
import { strToBool } from 'helperFunctions/strToBool';
import { assess } from 'helperFunctions/componentAssess';

const PersistLogin = () => {
  assess && console.log('assess')
  const refresh = useRefreshToken();
  const { refreshTokenCtx, userCtx, persistCtx, loadingPersistCtx: loadingCtx } = useAuth();
  const [cookies, setCookie] = useCookies(['rT']);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const { aT } = await refresh(cookies.rT);
        const response = await axios.get('auth/profile', {
          headers: {
            Authorization: `Bearer ${aT}`,
            'Content-Type': 'application/json',
          },
        });
        userCtx.update(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        loadingCtx.update(false);
      }
    };

    (!refreshTokenCtx.token && strToBool(cookies.rT)) ? verifyRefreshToken() : loadingCtx.update(false);
    persistCtx.value && refreshTokenCtx.token && setCookie('rT', refreshTokenCtx.token)

  }, [refreshTokenCtx.token, refresh, cookies.rT, persistCtx.value, setCookie, userCtx, loadingCtx]);

  return (
    <>
      {!persistCtx.value ? (
        <Outlet />
      ) : loadingCtx.value ? (
        <p>loading...</p>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
