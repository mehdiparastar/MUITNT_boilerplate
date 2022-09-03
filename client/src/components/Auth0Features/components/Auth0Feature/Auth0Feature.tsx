import React from 'react'
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Card, CardActions, CardContent, CardMedia } from "@mui/material";

interface Auth0FeatureProps {
    title: string
    description: string
    resourceUrl: string
    banner: React.ReactNode | string 
}

export const Auth0Feature: React.FC<Auth0FeatureProps> = ({
    title, description, resourceUrl, banner
}) => {

    return (
        <Card>
            <CardMedia
                component="img"
                alt="Auth0"
                height="170"                
                image={<div>mehdi</div>}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    <strong>{title}</strong>
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )

    // return (
    //     <Paper
    //         sx={{
    //             display: 'block',
    //             backgroundColor: 'white',
    //             color: 'black',
    //             cursor: 'pointer',
    //             transition: "all 0.3s ease-in-out 0s",
    //             padding: "4.8rem",
    //             borderRadius: '1.6rem',
    //             textDecoration: "none",
    //             '&:hover': {
    //                 transform: "scale(1.03)",
    //                 transition: "all 0.3s ease-in-out 0s"
    //             },
    //         }}
    //     >
    //         <Link
    //             href={resourceUrl}
    //             target="_blank"
    //             rel="noopener noreferrer"
    //             underline="none"
    //         >
    //             <Typography
    //                 variant="h3"
    //                 sx={{
    //                     display: "flex",
    //                     alignItems: "center",
    //                     mt: 0,
    //                     color: "black",
    //                     fontWeight: 600,
    //                     letterSpacing: "-0.05rem",
    //                     fontSize: "2.4rem",
    //                     lineHeight: "3.2rem",
    //                     marginBottom: "1.6rem",
    //                     '&:hover': {
    //                         textDecoration: "underline solid 2px black",
    //                         textUnderlineOffset: '2px',
    //                         transition: "all 0.3s ease-in-out 0s"
    //                     },
    //                 }}
    //             >
    //                 <Box
    //                     component="img"
    //                     mr={1}
    //                     src={banner}
    //                     alt="external link icon"
    //                     sx={{ textDecoration: 'none' }}
    //                 />
    //                 {title}
    //             </Typography>
    //             <Box
    //                 component="p"
    //                 sx={{
    //                     margin: 0,
    //                     color: "rgb(36, 36, 36)",
    //                     fontWeight: 500,
    //                     fontSize: "1.6rem",
    //                     lineHeight: "2.4rem",
    //                     opacity: 0.7,
    //                     '&:hover': {
    //                         textDecoration: 'none !important',
    //                         color: 'blue'
    //                     }
    //                 }}
    //             >
    //                 {description}
    //             </Box>
    //         </Link>
    //     </Paper>
    // )
}