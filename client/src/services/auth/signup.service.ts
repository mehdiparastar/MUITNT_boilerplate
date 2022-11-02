import { AxiosRequestConfig } from 'axios';
import { callExternalApi } from './../external-api.service';

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const signupService = async (
  email: string,
  password: string,
): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/auth/signup`,
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    data: { email, password },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return {
    data,
    error,
  };
};
