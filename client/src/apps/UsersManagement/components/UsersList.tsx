import { Box, Typography } from '@mui/material';
import useAxiosPrivate from 'auth/hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
import useAuth from 'auth/hooks/useAuth';
import { assess } from 'helperFunctions/componentAssess';

const UsersList = () => {
  assess && console.log('assess')
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState<any>(null);
  const axiosPrivate = useAxiosPrivate();
  const { loadingFetchCtx } = useAuth()

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    loadingFetchCtx.update(true);
    const getData = async () => {
      try {
        const response = await axiosPrivate.get('auth/all', {
          signal: controller.signal,
        });
        isMounted && setUsers(response.data);
      } catch (err) {
        isMounted && setError(err);
      } finally {
        isMounted && loadingFetchCtx.update(false);
        isMounted = false
      }
    };
    getData();

    return () => {
      isMounted = false;
      loadingFetchCtx.update(false);
      controller.abort();
    };
  }, [axiosPrivate]);

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
