import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Container, Icon, IconButton, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import MUITNMSVG from 'svg/logos/MUITNM';
import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
} from '@mui/icons-material';

export const FooterContent: React.FC = () => {
  const theme = useTheme();
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: '100%',
        px: 2,
        py: 4,
      }}
    >
      <Grid
        container
        rowSpacing={1}
        columnSpacing={1}
      >
        <Grid
          xs={12}
          alignItems="center"
          sx={{}}
        >
          <Box
            width="100%"
            height="100%"
            textAlign="center"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height="100%"
            >
              <Box>
                <Grid xs={12}>
                  <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection={{ xs: 'column', sm: 'row' }}
                  >
                    <IconButton
                      onClick={() =>
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth',
                        })
                      }
                    >
                      <MUITNMSVG
                        sx={{
                          width: 50,
                          height: 50,
                        }}
                      />
                    </IconButton>
                  </Box>
                </Grid>
              </Box>
              <Box>
                <Grid xs={12}>
                  <Typography
                    align={'center'}
                    variant={'subtitle2'}
                    color="text.secondary"
                    gutterBottom
                  >
                    &copy;{' '}
                    {
                      <strong style={{ color: theme.palette.secondary.main }}>
                        MUITNM.
                      </strong>
                    }{' '}
                    {`${new Date().getFullYear()}`},{' '}
                    {
                      <strong style={{ color: theme.palette.primary.main }}>
                        M
                      </strong>
                    }
                    ehdi{' '}
                    {
                      <strong style={{ color: theme.palette.primary.main }}>
                        P
                      </strong>
                    }
                    arastar. All rights reserved
                  </Typography>
                  <Typography
                    align={'center'}
                    variant={'caption'}
                    color="text.secondary"
                    component={'p'}
                  >
                    This is an infrastructure for utilizing trend technologies
                    in web development; Material-UI v5 - Reactjs v18 - SVG -
                    Nestjs - MongoDB - Docker are fantastic.
                  </Typography>
                </Grid>
                <Grid
                  xs={12}
                  paddingTop={2}
                >
                  <Stack
                    direction="row"
                    alignItems="normal"
                    gap={1}
                    justifyContent="center"
                  >
                    <Icon
                      component="a"
                      target="_blank"
                      href="https://www.linkedin.com/in/mehdi-parastar-a7567516b/"
                    >
                      <LinkedIn />
                    </Icon>
                    <Icon
                      component="a"
                      target="_blank"
                      href="https://www.instagram.com/mehdi.parastar70/"
                    >
                      <Instagram />
                    </Icon>
                    <Icon
                      component="a"
                      target="_blank"
                      href="https://www.youtube.com/channel/UCyJ2xoNZmtPUBPPcL_DHa2g"
                    >
                      <YouTube />
                    </Icon>
                    <Icon
                      component="a"
                      target="_blank"
                      href="https://twitter.com/mehdi81988950"
                    >
                      <Twitter />
                    </Icon>
                    <Icon
                      component="a"
                      target="_blank"
                      href=""
                    >
                      <Facebook />
                    </Icon>
                  </Stack>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
