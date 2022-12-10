import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from 'auth/hooks/useRefresh';
import useAuth from 'auth/hooks/useAuth';
import axios from 'api/axios';
import { useCookies } from 'react-cookie';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { accessTokenCtx, userCtx, persistCtx } = useAuth();
  const [cookies, setCookie] = useCookies(['aT']);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        console.log(persistCtx.value);
        if (
          persistCtx.value &&
          (accessTokenCtx.token !== 'Bearer ' ||
            accessTokenCtx.token !== null ||
            accessTokenCtx.token !== undefined)
        ) {
          accessTokenCtx.update(cookies.aT);
        }
        const aT = await refresh();
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
        setIsLoading(false);
      }
    };
    !accessTokenCtx.token ? verifyRefreshToken() : setIsLoading(false);
  }, [accessTokenCtx.token, refresh]);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(accessTokenCtx.token)}`);
  }, [isLoading]);

  return (
    <>
      {!persistCtx.value ? (
        <Outlet />
      ) : isLoading ? (
        <p>loading...</p>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
