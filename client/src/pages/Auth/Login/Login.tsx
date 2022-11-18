import {
  Container,
  Slide,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import React, { FC, ReactElement } from 'react';
import { LoginSVG } from 'svg/pages/loginSVG';

import { LoginForm } from './components/LoginForm';

const Login: FC<any> = (): ReactElement => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {};
  }, []);

  return (
    <Grid
      container
      width="100%"
      height="100vh"
    >
      <Slide
        direction="right"
        in={true}
      >
        <Grid
          bgcolor={theme.palette.alternate.main}
          sx={{ display: { xs: 'none', md: 'grid' }, alignContent: 'center' }}
          maxWidth="30%"
          width={'-webkit-fill-available'}
        >
          <LoginSVG
            width={'100%'}
            height={'100%'}
          />
        </Grid>
      </Slide>
      <Grid
        maxWidth={{ xs: '100%', md: '70%' }}
        sx={{ display: 'grid', alignContent: 'center' }}
        width={'-webkit-fill-available'}
        data-aos={isMd ? 'fade-left' : 'fade-up'}
      >
        <Container
          maxWidth={'sm'}
          sx={{
            height: '100%',
            px: 2,
            py: { xs: 4, sm: 6, md: 8 },
          }}
        >
          <LoginForm />
        </Container>
      </Grid>
    </Grid>    
  );
};

export default Login;
