import { Box, Typography } from '@mui/material';
import useAuth from 'auth/hooks/useAuth';
import useAxiosPrivate from 'auth/hooks/useAxiosPrivate';

import { useEffect, useState } from 'react';

const UsersList = () => {
  
  const [users, setUsers] = useState<IUser[]>([]);
  const [, setError] = useState<any>(null);
  const axiosPrivate = useAxiosPrivate();
  const { setLoadingFetch } = useAuth()

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    setLoadingFetch(true);
    const getData = async () => {
      try {
        const response = await axiosPrivate.get('auth/all', {
          signal: controller.signal,
        });
        isMounted && setUsers(response.data);
      } catch (err) {
        isMounted && setError(err);
      } finally {
        isMounted && setLoadingFetch(false);
        isMounted = false
      }
    };
    getData();

    return () => {
      isMounted = false;
      setLoadingFetch(false);
      controller.abort();
    };
  }, [axiosPrivate, setLoadingFetch]);

  return (
    <Box component={'article'}>
      <Typography variant="h2">Users List</Typography>
      {users?.length ? (
        <Box component={'ul'}>
          {users.map((user, i) => (
            <Box component={'li'} key={i}>
              {user?.email}
            </Box>
          ))}
        </Box>
      ) : (
        <Typography component={'p'}>No Users to display</Typography>
      )}
    </Box>
  );
};

export default UsersList;
