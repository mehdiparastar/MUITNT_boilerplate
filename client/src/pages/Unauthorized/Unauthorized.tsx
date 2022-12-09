import React, { ReactElement, FC } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { UnauthorizedSVG } from 'svg/pages/UnauthorizedSVG';

const Unauthorized: FC<any> = (): ReactElement => {
  const theme = useTheme();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => { };
  }, []);

  return (
    <Box
      minHeight={'calc(100vh - 64px - 183px)'}
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
            p={3}
          >
            <Box
              height={'100%'}
              width={'100%'}
              maxWidth={500}
              data-aos="fade-up"
            >
              <UnauthorizedSVG
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
            p={3}
          >
            <Box>
              <Typography
                variant="h4"
                component={'h4'}
                align={'center'}
                sx={{ fontWeight: 700 }}
              >
                MISSING PERMISSIONS
              </Typography>
              <Typography
                component="p"
                color="textSecondary"
                align={'center'}
              >
                This Page is not accessible for you.
                <br />
                Stay tuned!
              </Typography>
              <Box
                marginTop={4}
                display={'flex'}
                justifyContent={'center'}
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

export default Unauthorized;
