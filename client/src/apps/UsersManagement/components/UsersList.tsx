import { Box, Typography } from '@mui/material';
import useAxiosPrivate from 'auth/hooks/useAxiosPrivate';
import useLoadingFetch from 'auth/hooks/useLoadingFetch';

import { useEffect, useState } from 'react';

const UsersList = () => {

  const [users, setUsers] = useState<IUser[]>([]);
  const [, setError] = useState<any>(null);
  const axiosPrivate = useAxiosPrivate();
  const { handleLoading } = useLoadingFetch()

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    handleLoading(true);
    const getData = async () => {
      try {
        const response = await axiosPrivate.get('auth/all', {
          signal: controller.signal,
        });
        isMounted && setUsers(response.data);
      } catch (err) {
        isMounted && setError(err);
      } finally {
        isMounted && handleLoading(false);
        isMounted = false
      }
    };
    getData();

    return () => {
      isMounted = false;
      handleLoading(false);
      controller.abort();
    };
  }, [axiosPrivate, handleLoading]);

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
