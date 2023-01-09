import React, { ReactElement, FC } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { MaintenanceSVG } from 'svg/pages/MaintenanceSVG';


const Maintenance: FC<any> = (): ReactElement => {
  
  const theme = useTheme();

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
            p={3}
          >
            <Box
              height={'100%'}
              width={'100%'}
              maxWidth={500}
              data-aos="fade-up"
            >
              <MaintenanceSVG
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
                We are in maintenance mode
              </Typography>
              <Typography
                component="p"
                color="textSecondary"
                align={'center'}
              >
                We are working to deliver the cool features ever.
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

export default Maintenance;
