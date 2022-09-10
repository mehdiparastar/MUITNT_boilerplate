import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Auth0BannerSVG from 'svg/banners/Auth0/Auth0';
import DockerBannerSVG from 'svg/banners/Docker/Docker';
import GoogleBannerSVG from 'svg/banners/Google/Google';
import MUIBannerSVG from 'svg/banners/MUI/MUI';
import { Auth0Feature } from './components/Auth0Feature/Auth0Feature';

export const Auth0Features: React.FC = () => {
  const featuresList = [
    {
      title: 'Auth0 Authentication and Authorization',
      description:
        'Auth0 supports social providers such as Google, Facebook, and Twitter, along with Enterprise providers such as Microsoft Office 365, Google Apps, and Azure. You can also use any OAuth 2.0 Authorization Server.',
      resourceUrl: 'https://auth0.com/docs/connections',
      banner: (
        <Auth0BannerSVG
          sx={{
            backgroundColor: 'whitesmoke',
            padding: '1rem',
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
            backgroundColor: 'whitesmoke',
            padding: '1rem',
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
            backgroundColor: 'whitesmoke',
            padding: '1rem',
          }}
        />
      ),
    },
    {
      title: 'Google Cloud Functions',
      description:
        'Cloud Functions has a simple and intuitive developer experience. Just write your code and let Google Cloud handle the operational infrastructure. Develop faster by writing and running small code snippets that respond to events. Streamline challenging orchestration problems by connecting Google Cloud products to one another or third party services using events.',
      resourceUrl: 'https://cloud.google.com/functions',
      banner: 
        <GoogleBannerSVG
          sx={{
            backgroundColor: 'whitesmoke',
            padding: '1rem',
          }}
        />,
    },
  ];
  return (
    <Box
      sx={{
        padding: '3.2rem 4.8rem',
      }}
    >
      <Typography
        variant="h2"
        sx={{
          textAlign: 'center',
          color: 'white',
          fontWeight: 600,
          marginTop: 0,
          marginBottom: '4.8rem',
          fontSize: '3.2rem',
          lineHeight: '4.8rem',
        }}
      >
        Explore Outstanding Features
      </Typography>
      <Grid
        container
        columnSpacing={8}
        rowSpacing={8}
        alignItems="center"
      >
        {featuresList.map((feature) => (
          <Grid
            xs={12}
            md={6}
            key={feature.resourceUrl}
          >
            <Auth0Feature
              title={feature.title}
              description={feature.description}
              resourceUrl={feature.resourceUrl}
              banner={feature.banner}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
