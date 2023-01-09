import axios from 'api/axios';


export const googleLoginService = async (credential: string | undefined) => {
  
  const response = await axios.post(
    `auth/google/login`,
    { credential },
    {
      // withCredentials:true
    },
  );

  return response;
};
