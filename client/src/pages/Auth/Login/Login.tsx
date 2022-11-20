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
import { Side } from './components/Side';

const Login: FC<any> = (): ReactElement => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => { };
  }, []);

  // return <Side />

  return (
    <Grid
      container
      width="100%"
      height={isMd ? "-webkit-calc(100vh - 302px)" : "-webkit-calc(100vh - 322px)"}
      columns={100}
      spacing={3}
    >
      <Slide
        direction="right"
        in={true}
      >
        <Grid
          xs={0}
          md={30}
          bgcolor={theme.palette.alternate.main}
        >
          {/* <Side /> */}
          {/* <Grid xs={12}>            
          </Grid> */}
          {/* <LoginSVG
            width={'100%'}
            height={'100%'}
          /> */}
        </Grid>
      </Slide>
      <Grid
        xs={100}
        md={70}
        paddingY={4}
        // container
        // maxWidth={{ xs: '100%', md: '70%' }}
        // sx={{ display: 'grid', alignContent: 'center' }}
        // width={'-webkit-fill-available'}
        data-aos={isMd ? 'fade-left' : 'fade-up'}
      >
        {/* <Container
          maxWidth={'sm'}
        >
          <LoginForm />
        </Container> */}
      </Grid>
    </Grid>
  );
};

export default Login;
