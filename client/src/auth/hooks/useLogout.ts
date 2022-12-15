import { assess } from 'helperFunctions/componentAssess';
import { useCookies } from 'react-cookie';
import useAuth from './useAuth';
import useAxiosPrivate from './useAxiosPrivate';

const useLogout = () => {
  const { setUserProfile, setAccessToken, setRefreshToken, setPersist } =
    useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [, setCookie] = useCookies(['rT', 'persist']);

  const logout = async () => {
    assess && console.log('assess');
    try {
      setUserProfile(null);
      setAccessToken(null);
      setRefreshToken(null);
      setPersist(false);
      setCookie('rT', null);
      setCookie('persist', false);
      await axiosPrivate.get('auth/logout');
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
