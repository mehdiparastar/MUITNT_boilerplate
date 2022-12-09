import axios from 'api/axios';

export const localLoginService = async (email: string, password: string) => {
  const response = await axios.post(
    `auth/login`,
    { email, password },
    {
      // withCredentials: true
    },
  );

  return response;
};
