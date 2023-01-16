
import { useAuth } from './useAuth';
import useAxiosPrivate from './useAxiosPrivate';

const useLogout = () => {
  const { setUserProfile, setAccessToken, setRefreshToken, setPersist } =
    useAuth();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {

    try {
      setUserProfile(null);
      setAccessToken(null);
      setRefreshToken(null);
      setPersist(false);
      localStorage.setItem('rT', String(null))
      localStorage.setItem('persist', String(false))
      await axiosPrivate.get('auth/logout');
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
