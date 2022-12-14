import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useRefreshToken from 'auth/hooks/useRefresh';
import useAuth from 'auth/hooks/useAuth';
import axios from 'api/axios';
import { useCookies } from 'react-cookie';
import { strToBool } from 'helperFunctions/strToBool';
import { assess } from 'helperFunctions/componentAssess';

const PersistLogin = () => {
  assess && console.log('assess')
  const refresh = useRefreshToken();
  const { refreshTokenCtx, userCtx, persistCtx, loadingPersistCtx } = useAuth();
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
        loadingPersistCtx.update(false)
      }
    };
    if (persistCtx.value) {
      (!refreshTokenCtx.token && strToBool(cookies.rT)) && verifyRefreshToken();
    } else {
      loadingPersistCtx.update(false)
    }
    persistCtx.value && refreshTokenCtx.token && setCookie('rT', refreshTokenCtx.token)

  }, [refreshTokenCtx.token, refresh, cookies.rT, persistCtx.value, setCookie, userCtx, loadingPersistCtx]);


  return (
    <>
      {!persistCtx.value ? (
        <Outlet />
      ) : loadingPersistCtx.value ? (
        <p>loading...</p>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
