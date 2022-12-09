import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from 'auth/hooks/useRefresh';
import useAuth from 'auth/hooks/useAuth';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { accessTokenCtx, persistCtx } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
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
