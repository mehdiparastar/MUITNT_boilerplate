import axios from 'api/axios';
import useAxiosPrivate from 'auth/hooks/useAxiosPrivate';
import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';

function usePrivateOnMountFetch<T>({
  api,
  config,
}: {
  api: string;
  config: AxiosRequestConfig;
}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    setLoading(true);
    const getData = async () => {
      try {
        const response = await axiosPrivate(api, {
          ...config,
          signal: controller.signal,
        });
        isMounted && setData(response.data);
      } catch (err) {
        isMounted && setError(err);
      } finally {
        isMounted && setLoading(false);
      }
    };
    getData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  return { loading, data, error };
}

export default usePrivateOnMountFetch;
