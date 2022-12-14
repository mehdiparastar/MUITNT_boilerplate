import useAxiosPrivate from './useAxiosPrivate';
import useAuth from './useAuth';
import { useCookies } from 'react-cookie';
import { assess } from 'helperFunctions/componentAssess';

const useLogout = () => {
  const { userCtx, accessTokenCtx, refreshTokenCtx, persistCtx } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [, setCookie] = useCookies(['rT']);

  const logout = async () => {
    assess && console.log('assess');
    try {
      await axiosPrivate.get('auth/logout');
      userCtx.update(null);
      accessTokenCtx.update(null);
      refreshTokenCtx.update(null);
      persistCtx.update(false);
      setCookie('rT', null);
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
