import useAxiosPrivate from './useAxiosPrivate';
import useAuth from './useAuth';

const useLogout = () => {
  const { userCtx, accessTokenCtx, refreshTokenCtx } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    try {
      await axiosPrivate.get('auth/logout');
      userCtx.update(null);
      accessTokenCtx.update(null);
      refreshTokenCtx.update(null);
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
