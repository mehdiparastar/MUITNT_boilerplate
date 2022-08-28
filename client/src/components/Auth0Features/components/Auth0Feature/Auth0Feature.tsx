import { Link, Typography } from "@mui/material"
import Box from '@mui/material/Box';

interface Auth0FeatureProps {
    title: string
    description: string
    resourceUrl: string
    icon: string
}

export const Auth0Feature: React.FC<Auth0FeatureProps> = ({
    title, description, resourceUrl, icon
}) => {
    return (
        <Link
            href={resourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
                display: 'block',
                bgcolor: 'white',
                color: 'black',
                cursor: 'pointer',
                transition: "all 0.3s ease-in-out 0s",
                padding: 3,
                borderRadius: 1,
                '&:hover': {
                    transform: "scale(1.03)",
                    textDecoration: "underline solid 2px black",
                    textUnderlineOffset: '2px',
                    transition: "all 0.3s ease-in-out 0s"
                },
            }}
        >
            <Typography
                variant="h3"
                display="flex"
                alignItems="center"
                mt={0}
                color="black"
                fontWeight={600}
                letterSpacing="-0.05rem"
                fontSize="2.4rem"
                lineHeight="3.2rem"
                sx={{
                    '&:hover': {
                        textDecoration: "underline solid 2px black",
                        textUnderlineOffset: '2px',
                        transition: "all 0.3s ease-in-out 0s"
                    },
                }}
            >
                <Box
                    component="img"
                    mr={1}
                    src={icon}
                    alt="external link icon"
                />
                {title}
            </Typography>
            <Box
                component="p"
                m={0}
                color="rgb(36, 36, 36)"
                fontWeight={500}
                fontSize="1.6rem"
                lineHeight="2.4rem"
                sx={{
                    opacity: 0.7
                }}
            >
                {description}
            </Box>
        </Link>
    )
}