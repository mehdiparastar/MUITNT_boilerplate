import { Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

import React, { FC, ReactElement, useEffect } from 'react';

import { Features } from './components/Features/Features';
import { Hero } from './components/Hero/Hero';
import { Inspiration } from './components/Inspiration/Inspiration';

const Home: FC<Props> = (Props): ReactElement => {
  
  const theme = useTheme();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => { };
  }, []);

  return (
    <Grid
      container
      justifyContent={'center'}
      alignItems={'center'}
      width={1}
      height={1}
    >
      <Grid
        xs={12}
        bgcolor={theme.palette.alternate.main}
        position="relative"
      >
        <Container
          maxWidth="lg"
          sx={{
            px: 2,
            py: { xs: 4, sm: 6, md: 8 },
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Hero />
        </Container>
      </Grid>
      <Grid xs={12}>
        <Container
          maxWidth="lg"
          sx={{
            px: 2,
            py: { xs: 4, sm: 6, md: 8 },
          }}
        >
          <Features />
        </Container>
      </Grid>
      <Grid
        xs={12}
        bgcolor={theme.palette.alternate.main}
      >
        <Container
          maxWidth="lg"
          sx={{
            px: 2,
            py: { xs: 4, sm: 6, md: 8 },
          }}
        >
          <Inspiration />
        </Container>
      </Grid>
    </Grid>
  );
};

export default Home;
