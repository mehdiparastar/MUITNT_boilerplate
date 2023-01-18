import { useAppDispatch, useAppSelector } from 'apps/hooks';
import { PageLoader } from 'components/PageLoader/PageLoader';
import { useGetUserProfileMutation } from 'features/auth/authApiSlice';
import { selectAuthUser, setAuthUserProfile } from 'features/auth/authSlice';
import { strToBool } from 'helperFunctions/strToBool';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const PersistLogin = () => {
  const { userProfile, refreshToken, persist } = useAppSelector(selectAuthUser)

  const [getUserProfile, { isLoading }] = useGetUserProfileMutation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const response = await getUserProfile().unwrap();
        dispatch(setAuthUserProfile(response))
      } catch (err) {
        throw err
      }
    };

    if (persist && isLoading === false && strToBool(refreshToken) && userProfile === null) {
      verifyRefreshToken();
    }

  }, [refreshToken, persist, userProfile]);

  if (persist === true && isLoading === false && userProfile !== null) {
    return <Outlet />
  }

  if (persist === true && isLoading === false && refreshToken === null) {
    return <Outlet />
  }

  return (
    <>
      {persist
        ?
        !isLoading && userProfile
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