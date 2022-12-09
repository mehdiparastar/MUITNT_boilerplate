import { Box, Typography } from '@mui/material';
import usePrivateFetch from 'hooks/usePrivateFetch';

const UsersList = () => {
  const { data: users } = usePrivateFetch<IUser[]>({
    api: 'auth/all',
    config: { method: 'get' },
  });

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
