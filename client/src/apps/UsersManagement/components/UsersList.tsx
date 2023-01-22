import { Box, Typography } from '@mui/material';
import { PageLoader } from 'components/PageLoader/PageLoader';
import { useGetAllUsersQuery } from 'redux/features/user/userApiSlice';

const UsersList = () => {

  const { data: allUsers, isLoading: isGetAllUsersLoading, isSuccess: isGetAllUsersSuccess, isError: isGetAllUsersError, error } = useGetAllUsersQuery()

  let content = <h3>unknown status(bug)!!!</h3>

  if (isGetAllUsersLoading) {
    content = <PageLoader />
  } else if (isGetAllUsersSuccess) {
    content = (
      <Box component={'article'}>
        <Typography variant="h2">Users List</Typography>
        {allUsers?.length ? (
          <Box component={'ul'}>
            {allUsers.map((user, i) => (
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
  } else if (isGetAllUsersError) {
    content = <p>{JSON.stringify(error)}</p>
  }

  return content

};

export default UsersList;
