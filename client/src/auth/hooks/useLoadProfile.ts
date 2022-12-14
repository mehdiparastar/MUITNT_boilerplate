import { axiosPrivate } from 'api/axios';
import { useEffect, useState } from 'react';
import useRefreshToken from './useRefresh';
import useAuth from './useAuth';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from './useAxiosPrivate';
import { assess } from 'helperFunctions/componentAssess';

const useLoadProfile = () => {
  assess && console.log('assess');
  const [loadProfile, setLoadProfile] = useState(false);
  const { userCtx } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const fetch = async () => {
    const response = await axiosPrivate.get('auth/profile');
    userCtx.update(response.data);
    return response.data;
  };

  return fetch;
};

export default useLoadProfile;
