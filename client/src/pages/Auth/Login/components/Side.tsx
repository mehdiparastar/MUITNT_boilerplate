import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { FC, ReactElement } from 'react';
import Slider, { Settings } from 'react-slick';
import { useTheme } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import Grid from '@mui/material/Unstable_Grid2';


export const Side: FC<any> = (): ReactElement => {

  const theme = useTheme();
  const themeMode = theme.palette.mode;

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Grid
      xs={12}
      justifyContent={'center'}
      alignItems={'center'}
      sx={{
        padding: 2,
        '& .slick-dots li.slick-active button:before': {
          color: themeMode === 'dark' ? 'white' : 'black',
        },
        '& .slick-dots li button:before': {
          color: themeMode === 'dark' ? 'white' : 'black',
        },
        width: '100%'
      }}
    >
      <Slider {...settings}>
        {[
          {
            feedback:
              'This is great bundle. I can contruct anything in just 10 minuts. Absolutelly love it! 10 out of 10.',
            image: 'statics/inspiration/n01.jpg',
            name: 'Negin Khandan 💕',
            title: 'UX/UI head',
          },
          {
            feedback:
              'Working with Materialist is fantastic! Simple, re-usable components all in one platform.',
            image: 'statics/inspiration/m01.jpeg',
            name: 'Mehdi Parastar 🚽',
            title: 'SEO at MUITNT',
          },
          {
            feedback:
              "Love the app for cash back, reward points and fraud protection – just like when you're swiping your card.",
            image: 'statics/inspiration/n02.jpg',
            name: 'Negin Khandan 💕',
            title: 'Design Manager',
          },
        ].map((item, i) => (
          <Grid
            xs
            padding={{ xs: 0, sm: 1, md: 2 }}
            key={i}
          >
            <Grid xs>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <StarIcon
                  key={item}
                  sx={{
                    color:
                      item % 2 === 0
                        ? theme.palette.primary.dark
                        : theme.palette.primary.light,
                  }}
                />
              ))}
            </Grid>
            <Grid
              xs
              component={Typography}
              variant={'h6'}
              fontWeight={400}
              marginBottom={2}
            >
              {item.feedback}
            </Grid>
            <Grid xs>
              <Grid
                xs
                component={ListItem}
                disableGutters
                width={'auto'}
                padding={0}
              >
                <ListItemAvatar>
                  <Avatar src={item.image} />
                </ListItemAvatar>
                <Grid
                  component={ListItemText}
                  primary={item.name}
                  secondary={item.title}
                  margin={0}
                />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Slider>
      <Grid
        xs={12}
        padding={4}
        textAlign={'center'}
      >
        {[
          'statics/svgs/google-original.svg',
          'statics/svgs/amazon-original.svg',
          'statics/svgs/paypal-original.svg',
        ].map((item, i) => (
          <Grid
            xs={4}
            key={i}
            component="img"
            src={item}
            alt="..."
            sx={{
              filter: themeMode === 'dark' ? 'contrast(0)' : 'none',
              padding: 2,
            }}
            maxWidth={120}
          />
        ))}
      </Grid>
    </Grid>
  );
};
