import axios from 'api/axios';
import { assess } from 'helperFunctions/componentAssess';

export const localRegisterService = async (data: ILocalRegisterDto) => {
  assess && console.log('assess');
  const response = await axios.post('auth/local-create', data, {
    // withCredentials:true
  });

  return response;
};
