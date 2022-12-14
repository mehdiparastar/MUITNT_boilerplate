import React, { FC, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Container, Stack, Typography } from '@mui/material';
import UsersList from './components/UsersList';
import { assess } from 'helperFunctions/componentAssess';

type Props = {};

const UsersManagement: FC<Props> = (props: Props) => {
  assess && console.log('assess')
  const theme = useTheme();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => { };
  }, []);

  return (
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
      </Container>
    </Box>
  );
};

export default UsersManagement;
