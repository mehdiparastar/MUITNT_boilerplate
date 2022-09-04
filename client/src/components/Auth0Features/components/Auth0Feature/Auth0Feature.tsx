import React from 'react'
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Avatar, Button, Card, CardActions, CardContent, CardMedia } from "@mui/material";

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
            <CardContent sx={{ padding: 0 }}>
                {banner}
            </CardContent>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    <strong>{title}</strong>
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button LinkComponent={"a"} href={resourceUrl} target="_blank" size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}