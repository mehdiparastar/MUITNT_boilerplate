import { AxiosRequestConfig } from 'axios';
import { callExternalApi } from './../external-api.service';

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const logoutService = async (): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/auth/signout`,
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    withCredentials: true,
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  console.log(data, error);

  return {
    data,
    error,
  };
};
