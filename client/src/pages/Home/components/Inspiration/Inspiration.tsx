import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  ListItemText,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

export const Inspiration: React.FC<Props> = (props) => {
  const theme = useTheme();

  return (
    <Box>
      <Box>
        <Box marginBottom={4}>
          <Typography
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'medium',
            }}
            gutterBottom
            color={'secondary'}
            align={'center'}
          >
            Inspiration
          </Typography>
          <Box
            component={Typography}
            fontWeight={700}
            variant={'h3'}
            gutterBottom
            align={'center'}
          >
            The statute of MUITNT
          </Box>
          <Typography
            variant={'h6'}
            component={'p'}
            color={'textSecondary'}
            align={'center'}
            data-aos="fade-up"
          >
            The centrality of creativity, uniqueness, variant attitude,
            knowledgebase and being experienced
            <br />
            have created the foundation of{' '}
            <strong style={{ color: theme.palette.secondary.main }}>
              MUITNT
            </strong>
            .
          </Typography>
        </Box>
        <Grid
          container
          spacing={2}
        >
          {[
            {
              name: 'Negin Khandan 💕',
              title: 'UX/UI head',
              avatar: 'statics/inspiration/n02.jpg',
            },
            {
              name: 'Mehdi Parastar 🚽',
              title: 'Full-stack Developer',
              avatar: 'statics/inspiration/m02.jpeg',
            },
            {
              name: 'Negin Khandan 💕',
              title: 'Senior Backend Developer',
              avatar: 'statics/inspiration/n01.jpg',
            },
            {
              name: 'Mehdi Parastar 🚽',
              title: 'SEO at MUITNT',
              avatar: 'statics/inspiration/m01.jpeg',
            },
          ].map((item, i) => (
            <Grid
              xs={12}
              sm={6}
              md={3}
              key={i}
              data-aos={'fade-up'}
            >
              <Box
                component={Card}
                boxShadow={0}
                bgcolor={'transparent'}
              >
                <Box
                  component={CardMedia}
                  borderRadius={2}
                  width={'100%'}
                  height={'100%'}
                  minHeight={320}
                  image={item.avatar}
                />
                <Box
                  component={CardContent}
                  bgcolor={'transparent'}
                  marginTop={-5}
                >
                  <Box
                    component={Card}
                    borderRadius={2}
                  >
                    <CardContent>
                      <ListItemText
                        primary={item.name}
                        secondary={item.title}
                      />
                      <Box marginTop={2}>
                        <IconButton
                          aria-label="facebook"
                          size={'small'}
                        >
                          <FacebookIcon />
                        </IconButton>
                        <IconButton
                          aria-label="twitter"
                          size={'small'}
                        >
                          <TwitterIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
