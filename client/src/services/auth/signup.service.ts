import axios from 'api/axios';

export const signupService = async (email: string, password: string) => {
  const response = await axios.post(
    'auth/signup',
    { email, password },
    {
      // withCredentials:true
    },
  );

  return response;
};
