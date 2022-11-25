import { AxiosRequestConfig } from 'axios';
import { callExternalApi } from '../external-api.service';

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const googleLoginService = async (): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/auth/google-logins`,
    method: 'Get',
    headers: {
      'content-type': 'application/json',
    },
    // withCredentials: true,
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return {
    data,
    error,
  };
};
