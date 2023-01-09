import React, { ReactElement, FC } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Unstable_Grid2';
import { NotFoundSVG } from 'svg/pages/NotFoundSVG';


const NotFound: FC<any> = (): ReactElement => {
  
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => { };
  }, []);

  return (
    <Box
      width={1}
      minHeight={'100vh'}
      height={'100%'}
      display={'flex'}
      alignItems={'center'}
      bgcolor={theme.palette.alternate.main}
    >
      <Container
        maxWidth="lg"
        sx={{
          px: 2,
          py: { xs: 4, sm: 6, md: 8 },
        }}
      >
        <Grid container>
          <Grid
            container
            justifyContent={'center'}
            xs={12}
            md={6}
            p={3}
          >
            <Box
              height={'100%'}
              width={'100%'}
              maxWidth={{ xs: 500, md: '100%' }}
              data-aos={isMd ? 'fade-right' : 'fade-up'}
            >
              <NotFoundSVG
                width={'100%'}
                height={'100%'}
              />
            </Box>
          </Grid>
          <Grid
            container
            alignItems={'center'}
            justifyContent={'center'}
            xs={12}
            md={6}
            p={3}
          >
            <Box data-aos={isMd ? 'fade-left' : 'fade-up'}>
              <Typography
                variant="h1"
                component={'h1'}
                align={isMd ? 'left' : 'center'}
                sx={{ fontWeight: 700 }}
              >
                404
              </Typography>
              <Typography
                variant="h6"
                component="p"
                color="textSecondary"
                align={isMd ? 'left' : 'center'}
              >
                Oops! Looks like you followed a bad link.
                <br />
                If you think this is a problem with us, please{' '}
                <Link
                  href={''}
                  underline="none"
                >
                  tell us
                </Link>
              </Typography>
              <Box
                marginTop={4}
                display={'flex'}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                <Button
                  component={Link}
                  variant="contained"
                  color="primary"
                  size="large"
                  href={'/'}
                >
                  Back home
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NotFound;
