import React, { ReactElement, FC } from "react";
import { Box, Container, Typography } from "@mui/material";
import { Auth0Features } from "../../components/Auth0Features/Auth0Features";
import { HeroBanner } from "../../components/HeroBanner/HeroBanner";

const Home: FC<any> = (): ReactElement => (
    <Container maxWidth="lg">
        <Box
            sx={{
                flexGrow: 1,
                backgroundColor: "whitesmoke",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography variant="h3">HomePage!</Typography>
        </Box>
        <Box
            sx={{
                flexGrow: 1,
                backgroundColor: "whitesmoke",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: 'column',
                color:'black'
            }}
        >
            <Typography variant="caption">
                {`Evironment variable test: REACT_APP_TEST_CODE = ${process.env.REACT_APP_TEST_CODE}`}
            </Typography>
            <Typography variant="caption">
                {`Node_ENV = ${process.env.NODE_ENV}`}
            </Typography>
        </Box>
        <HeroBanner />
        <Auth0Features />
    </Container>
);

export default Home;
