import axios from 'api/axios';
import { assess } from 'helperFunctions/componentAssess';

export const googleLoginService = async (credential: string | undefined) => {
  assess && console.log('assess');
  const response = await axios.post(
    `auth/google/login`,
    { credential },
    {
      // withCredentials:true
    },
  );

  return response;
};
