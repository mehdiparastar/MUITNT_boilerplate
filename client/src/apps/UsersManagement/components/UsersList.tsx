import { Box, Typography } from '@mui/material';
import useAxiosPrivate from 'auth/hooks/useAxiosPrivate';
import { useLoading } from 'loading/hooks/useLoading';
import { useEffect, useState } from 'react';

const UsersList = () => {

  const [users, setUsers] = useState<IUser[]>([]);
  const [, setError] = useState<any>(null);
  const axiosPrivate = useAxiosPrivate();
  const { enableLoading, disableLoading } = useLoading()

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    enableLoading();
    const getData = async () => {
      try {
        const response = await axiosPrivate.get('auth/all', {
          signal: controller.signal,
        });
        isMounted && setUsers(response.data);
      } catch (err) {
        isMounted && setError(err);
      } finally {
        isMounted && disableLoading();
        isMounted = false
      }
    };
    getData();

    return () => {
      isMounted = false;
      disableLoading();
      controller.abort();
    };
  }, [axiosPrivate, enableLoading, disableLoading]);

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
