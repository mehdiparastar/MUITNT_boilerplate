import { Container, Slide, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import { assess } from 'helperFunctions/componentAssess';
import React, { FC, ReactElement } from 'react';
import { LoginSVG } from 'svg/pages/loginSVG';

import { LoginForm } from './components/LoginForm';
import { Side } from './components/Side';

const Login: FC<any> = (): ReactElement => {
  assess && console.log('assess')
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {};
  }, []);

  // return <Side />

  return (
    <Grid
      container
      width={1}
      height={1}
      columns={100}
      justifyContent={'center'}
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
          <Grid
            container
            direction={'column'}
            justifyContent="center"
            alignItems={'center'}            
          >
            {isMd && <Side />}
            {isMd && (
              <LoginSVG
                width={300}
                height={'100%'}
              />
            )}
          </Grid>
        </Grid>
      </Slide>
      <Grid
        xs={100}
        md={70}
        paddingY={4}
        container
        maxWidth={{ xs: '100%', md: '70%' }}
        sx={{ display: 'grid', alignContent: 'center' }}
        width={'-webkit-fill-available'}
        data-aos={isMd ? 'fade-left' : 'fade-up'}
      >
        <Container maxWidth={'sm'}>
          <LoginForm />
        </Container>
      </Grid>
    </Grid>
  );
};

export default Login;
