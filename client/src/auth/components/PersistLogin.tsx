import axios from 'api/axios';
import useAuth from 'auth/hooks/useAuth';
import useRefreshToken from 'auth/hooks/useRefresh';

import { strToBool } from 'helperFunctions/strToBool';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet } from 'react-router-dom';

const PersistLogin = () => {
  
  const {
    setUserProfile,
    refreshToken,
    loadingPersist,
    setLoadingPersist,
    persist
  } = useAuth();
  const [cookies, setCookie] = useCookies(['rT']);
  const refresh = useRefreshToken();

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
        setUserProfile(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingPersist(false)
      }
    };
    if (persist) {
      (!refreshToken && strToBool(cookies.rT)) && verifyRefreshToken();
    } else {
      setLoadingPersist(false)
    }
    persist && refreshToken && setCookie('rT', refreshToken)

  }, [refreshToken, cookies.rT, persist, refresh, setCookie, setLoadingPersist, setUserProfile]);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : loadingPersist ? (
        <p>loading...</p>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
