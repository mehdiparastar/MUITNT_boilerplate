import axios from 'api/axios';

export const localRegisterService = async (data: ILocalRegisterDto) => {
  
  const response = await axios.post('auth/local-create', data, {
    // withCredentials:true
  });

  return response;
};
