import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { assess } from 'helperFunctions/componentAssess';
import { FC, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Counter } from './components/counter/Counter';
import { AddPostForm } from './components/posts/AddPostForm';
import { PostsList } from './components/posts/PostsList';
import UsersList from './components/UsersList';
import { store } from './redux/store';

type Props = {};

const UsersManagement: FC<Props> = (props: Props) => {
  assess && console.log('assess')
  const theme = useTheme();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => { };
  }, []);

  return (
    <Provider store={store}>
      <Box
        height={1}
        width={1}
        display={'flex'}
        alignItems={'center'}
        bgcolor={theme.palette.alternate.main}
        component={'section'}
      >
        <Container
          maxWidth="lg"
          sx={{
            textAlign: 'center',
            px: 2,
            py: { xs: 4, sm: 6, md: 8 },
          }}
        >
          <Stack direction={'column'}>
            <Typography variant="h2">users management</Typography>
            <UsersList />
          </Stack>
          <Divider sx={{ my: 4 }} />
          <Counter />
          <Divider sx={{ my: 4 }} />
          <AddPostForm />
          <Divider sx={{ my: 4 }} />
          <PostsList />
        </Container>
      </Box>
    </Provider>
  );
};

export default UsersManagement;
