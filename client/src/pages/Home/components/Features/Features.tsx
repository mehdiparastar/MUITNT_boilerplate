import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Oauth2BannerSVG from 'svg/banners/Oauth2/Oauth2';
import MUIBannerSVG from 'svg/banners/MUI/MUI';
import DockerBannerSVG from 'svg/banners/Docker/Docker';
import GoogleBannerSVG from 'svg/banners/Google/Google';

const featuresList = [
  {
    title: 'Oauth2 Authentication and Authorization',
    description:
      'Oauth2 supports social providers such as Google, Facebook, and Twitter, along with Enterprise providers such as Microsoft Office 365, Google Apps, and Azure. You can also use any OAuth 2.0 Authorization Server.',
    resourceUrl: 'https://oauth.net/2/',
    banner: (
      <Oauth2BannerSVG
        sx={{
          backgroundColor: 'background.level2',
        }}
      />
    ),
  },
  {
    title: 'Variety of Material-UI components',
    description:
      'Material-UI is designed for rapid prototyping, increasing overall software development velocity, and creating user interfaces at speed. It helps developers spend more time on the logical layers of their apps rather than wrangling with CSS-related interface elements.',
    resourceUrl: 'https://mui.com/material-ui/getting-started/overview/',
    banner: (
      <MUIBannerSVG
        sx={{
          backgroundColor: 'background.level2',
        }}
      />
    ),
  },
  {
    title: 'Efficiency of Docker',
    description:
      'Docker takes away repetitive, mundane configuration tasks and is used throughout the development lifecycle for fast, easy and portable application development – desktop and cloud. Docker’s comprehensive end to end platform includes UIs, CLIs, APIs and security that are engineered to work together across the entire application delivery lifecycle.',
    resourceUrl: 'https://www.docker.com/',
    banner: (
      <DockerBannerSVG
        sx={{
          backgroundColor: 'background.level2',
        }}
      />
    ),
  },
  {
    title: 'Google Cloud Functions',
    description:
      'Cloud Functions has a simple and intuitive developer experience. Just write your code and let Google Cloud handle the operational infrastructure. Develop faster by writing and running small code snippets that respond to events. Streamline challenging orchestration problems by connecting Google Cloud products to one another or third party services using events.',
    resourceUrl: 'https://cloud.google.com/functions',
    banner: (
      <GoogleBannerSVG
        sx={{
          backgroundColor: 'background.level2',
        }}
      />
    ),
  },
];

export const Features: React.FC<Props> = (props) => {
  const theme = useTheme();

  return (
    <Box>
      <Box marginBottom={4}>
        <Box data-aos="fade-down">
          <Typography
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'medium',
            }}
            gutterBottom
            color={theme.palette.text.secondary}
            align={'center'}
          >
            Features
          </Typography>
          <Box
            component={Typography}
            fontWeight={700}
            variant={'h3'}
            gutterBottom
            align={'center'}
          >
            The powerful combination of best techs
            <br />
            for being comprehensive
          </Box>
          <Typography
            variant={'h6'}
            component={'p'}
            color={theme.palette.text.secondary}
            align={'center'}
          >
            Have <strong>MUI5 | Typescript | NestJs | TypeORM</strong> for your{' '}
            <strong>React</strong> apps.
            <br />
            An experience you'd expect from a full-stack system.
          </Typography>
        </Box>
        <Box
          marginTop={3}
          display={'flex'}
          justifyContent={'center'}
          data-aos="fade-up"
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<KeyboardDoubleArrowDownIcon />}
            endIcon={<KeyboardDoubleArrowDownIcon />}
            sx={{
              border: '0',
              borderRadius: '0.8rem',
              fontWeight: '600',
              minWidth: '10rem',
              padding: '1.6rem 1.6rem',
              fontSize: '1.6rem',
              lineHeight: '2.4rem',
            }}
          >
            Explore Outstanding Features
          </Button>
        </Box>
      </Box>
      <Box>
        <Grid
          container
          spacing={4}
          mt={6}          
        >
          {featuresList.map((feature, i) => (
            <Grid
              sm={12}
              md={6}
              key={i}
              justifyContent="center"
              alignItems="center"
              display="flex"
            >
              <Box
                component={Card}
                borderRadius={4}
                width={'100%'}
                height={'100%'}
                maxWidth={600}
                data-aos={'fade-up'}
              >
                <CardContent sx={{ padding: 0 }}>{feature.banner}</CardContent>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    <strong>{feature.title}</strong>
                  </Typography>
                  <Typography
                    variant="body1"
                    color={theme.palette.text.secondary}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    LinkComponent={'a'}
                    href={feature.resourceUrl}
                    target="_blank"
                    size="small"
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        marginBottom={4}
        bgcolor={theme.palette.alternate.main}
      >
        <Box
          height={'100%'}
          width={'100%'}
          maxWidth={600}
          data-aos="zoom-in"
        >
          <UI03BGSVG
            height={'100%'}
            width={'100%'}
          />
        </Box>
      </Box> */}
    </Box>
  );
};
