import React, { ReactElement, FC } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Unstable_Grid2';
import { ComingSoonSVG } from 'svg/pages/ComingSoonSVG';
import { useCountdown } from 'hooks/useCountdown';


const ComingSoon: FC<any> = (): ReactElement => {
  
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [days, hours, minutes, seconds] = useCountdown(
    new Date('2022-12-20').getTime(),
  );

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
            pr={isMd ? 6 : 3}
            pl={isMd ? 0 : 3}
            pb={isMd ? 0 : 2}
          >
            <Box
              height={'100%'}
              width={'100%'}
              maxWidth={{ xs: 500, md: '100%' }}
              data-aos={isMd ? 'fade-right' : 'fade-up'}
            >
              <ComingSoonSVG
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
            pl={isMd ? 6 : 3}
            pr={isMd ? 0 : 3}
            pt={isMd ? 0 : 2}
          >
            <Box data-aos={isMd ? 'fade-left' : 'fade-up'}>
              <Typography
                variant="h3"
                component={'h3'}
                align={isMd ? 'left' : 'center'}
                sx={{ fontWeight: 700 }}
              >
                We are coming soon
              </Typography>
              <Typography
                component="p"
                color="textSecondary"
                align={isMd ? 'left' : 'center'}
              >
                Our website is under construction.
                <br />
                We will be here soon with our new awesome site, subscribe us to
                be notified.
              </Typography>
              <Grid
                container
                marginY={2}
              >
                <Grid
                  xs={3}
                  textAlign="center"
                >
                  <Typography
                    variant={'h4'}
                    sx={{ fontWeight: 700 }}
                    color="primary"
                  >
                    {days}
                  </Typography>
                  <Typography>Days</Typography>
                </Grid>
                <Grid
                  xs={3}
                  textAlign="center"
                >
                  <Typography
                    variant={'h4'}
                    sx={{ fontWeight: 700 }}
                    color="primary"
                  >
                    {hours}
                  </Typography>
                  <Typography>Hours</Typography>
                </Grid>
                <Grid
                  xs={3}
                  textAlign="center"
                >
                  <Typography
                    variant={'h4'}
                    sx={{ fontWeight: 700 }}
                    color="primary"
                  >
                    {minutes}
                  </Typography>
                  <Typography>Mins</Typography>
                </Grid>
                <Grid
                  xs={3}
                  textAlign="center"
                >
                  <Typography
                    variant={'h4'}
                    sx={{ fontWeight: 700 }}
                    color="primary"
                  >
                    {seconds}
                  </Typography>
                  <Typography>Secs</Typography>
                </Grid>
              </Grid>
              <form
                autoComplete="off"
                noValidate
              >
                <Grid
                  container
                  spacing={1}
                >
                  <Grid
                    sm={12}
                    md={9}
                    width="100%"
                  >
                    <TextField
                      fullWidth
                      label="email"
                      type="email"
                      color="primary"
                      sx={{ width: '100%', height: '100%', minHeight: 54 }}
                    />
                  </Grid>
                  <Grid
                    sm={12}
                    md={3}
                    width="100%"
                  >
                    <Box
                      component={Button}
                      color="primary"
                      variant="contained"
                      sx={{ width: '100%', height: '100%', minHeight: 54 }}
                    >
                      Subscribe
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ComingSoon;
