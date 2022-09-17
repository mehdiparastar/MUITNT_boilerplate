import React, { ReactElement, FC, useEffect } from 'react';
import { Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Hero } from './components/Hero/Hero';
import { Features } from './components/Features/Features';
import { Inspiration } from './components/Inspiration/Inspiration';

const Home: FC<Props> = (Props): ReactElement => {
  const theme = useTheme();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {};
  }, []);

  return (
    <Box>
      <Box
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
      </Box>
      <Container
        maxWidth="lg"
        sx={{
          px: 2,
          py: { xs: 4, sm: 6, md: 8 },
        }}
      >
        <Features />
      </Container>
      <Box bgcolor={theme.palette.alternate.main}>
        <Container
          maxWidth="lg"
          sx={{
            px: 2,
            py: { xs: 4, sm: 6, md: 8 },
          }}
        >
          <Inspiration />
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
