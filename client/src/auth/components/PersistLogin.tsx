import axios from 'api/axios';
import { useAuth } from 'auth/hooks/useAuth';
import useRefreshToken from 'auth/hooks/useRefresh';
import { strToBool } from 'helperFunctions/strToBool';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { PageLoader } from 'components/PageLoader/PageLoader'

const PersistLogin = () => {

  const {
    userProfile,
    setUserProfile,
    refreshToken,
    setRefreshToken,
    persist,
  } = useAuth();
  const refresh = useRefreshToken();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        setLoading(true)
        const { aT } = await refresh(refreshToken);
        const response = await axios.get('auth/profile', {
          headers: {
            Authorization: `Bearer ${aT}`,
            'Content-Type': 'application/json',
          },
        });
        setUserProfile(response.data);
        setLoading(false)
      } catch (err) {
        setRefreshToken(null)
        setLoading(false)
        throw err
      }
    };

    if (persist && strToBool(refreshToken) && userProfile === null) {
      verifyRefreshToken();
    }

  }, [refreshToken, persist, userProfile, refresh, setUserProfile, setRefreshToken]);

  if (persist === true && loading === false && userProfile !== null) {
    return <Outlet />
  }

  if (persist === true && loading === false && refreshToken === null) {
    return <Outlet />
  }

  return (
    <>
      {persist
        ?
        !loading && userProfile
          ?
          <Outlet />
          :
          <PageLoader />
        :
        <Outlet />
      }
    </>
  );
};

export default PersistLogin;