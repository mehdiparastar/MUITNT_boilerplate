import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import { UI02BGSVG } from 'svg/backgrounds/UI02BGSVG';

export const Hero: React.FC<Props> = (props) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Grid
      container
      rowSpacing={1}
    >
      <Grid
        container
        alignItems="center"
        xs={12}
        md={6}
      >
        <Box data-aos={isMd ? 'fade-right' : 'fade-up'}>
          <Box marginBottom={2}>
            <Typography
              variant="h2"
              color="textPrimary"
              sx={{
                fontWeight: 700,
              }}
            >
              Select the
              <Typography
                color={'secondary'}
                component={'span'}
                variant={'inherit'}
              >
                {' '}
                best.
              </Typography>
              <br />
              to be the
              <Typography
                color={'primary'}
                component={'span'}
                variant={'inherit'}
              >
                {' '}
                best.
              </Typography>
            </Typography>
          </Box>
          <Box marginBottom={3}>
            <Typography
              variant="h6"
              component="p"
              color="textSecondary"
              sx={{ fontWeight: 400 }}
            >
              <strong>MUITNT</strong> has gathered modern and professional
              technologies to help you buy your time while being the best.
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'stretched', sm: 'flex-start' }}
          >
            <Button
              component={'a'}
              variant="contained"
              color="primary"
              size="large"
              fullWidth={!isMd}
              startIcon={<GitHubIcon />}
              href={'https://github.com/mehdiparastar/MUITNT_boilerplate'}
              target={'_blank'}
            >
              View on Github
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid
        xs={12}
        md={6}
      >
        <Box
          height={'100%'}
          width={'100%'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          maxHeight={450}
          data-aos={isMd ? 'fade-left' : 'fade-down'}
        >
          <UI02BGSVG
            width="100%"
            height="100%"            
          />
          {/* <RocketIllustration
              width={'100%'}
              height={'100%'}
            /> */}
        </Box>
      </Grid>
    </Grid>
  );
};
