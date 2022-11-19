import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React, { FC, ReactElement } from "react";
import Slider, { Settings } from "react-slick";
import { useTheme } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';

export const Side: FC<any> = (): ReactElement => {
    const theme = useTheme();
    const themeMode = theme.palette.mode;

    const settings: Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
    };
    return (
        <Slider {...settings}>
            {[
                {
                    feedback:
                        'Working with Materialist is fantastic! Simple, re-usable components all in one platform.',
                    image: 'https://assets.maccarianagency.com/avatars/img1.jpg',
                    name: 'Clara Bertoletti',
                    title: 'Material-UI lover',
                },
                {
                    feedback:
                        'This is great bundle. I can contruct anything in just 10 minuts. Absolutelly love it! 10 out of 10.',
                    image: 'https://assets.maccarianagency.com/avatars/img2.jpg',
                    name: 'Jhon Anderson',
                    title: 'Senior Frontend Developer',
                },
                {
                    feedback:
                        'Love the app for cash back, reward points and fraud protection – just like when you\'re swiping your card.',
                    image: 'https://assets.maccarianagency.com/avatars/img3.jpg',
                    name: 'Chary Smith',
                    title: 'SEO at Comoti',
                },
            ].map((item, i) => (
                <Box padding={{ xs: 0, sm: 1, md: 2 }} key={i}>
                    <Box marginBottom={1}>
                        {[1, 2, 3, 4, 5].map((item) => (
                            <StarIcon sx={{ color: theme.palette.primary.light }} />                            
                        ))}
                    </Box>
                    <Box
                        component={Typography}
                        variant={'h6'}
                        fontWeight={400}
                        marginBottom={2}
                    >
                        {item.feedback}
                    </Box>
                    <Box width={1}>
                        <Box
                            component={ListItem}
                            disableGutters
                            width={'auto'}
                            padding={0}
                        >
                            <ListItemAvatar>
                                <Avatar src={item.image} />
                            </ListItemAvatar>
                            <Box
                                component={ListItemText}
                                primary={item.name}
                                secondary={item.title}
                                margin={0}
                            />
                        </Box>
                    </Box>
                </Box>
            ))}
        </Slider>
    );
}