import { AxiosRequestConfig } from 'axios';
import { callExternalApi } from '../external-api.service';

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const googleLoginService = async (
  credential: string | undefined,
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/auth/google/login`,
    method: 'Post',
    headers: {
      'content-type': 'application/json',
    },
    data: {credential},
    // withCredentials: true,
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return {
    data,
    error,
  };
};
