import axios from 'api/axios';
import { assess } from 'helperFunctions/componentAssess';

export const localLoginService = async (email: string, password: string) => {
  assess && console.log('assess');
  const response = await axios.post(
    `auth/login`,
    { email, password },
    {
      // withCredentials: true
    },
  );

  return response;
};
