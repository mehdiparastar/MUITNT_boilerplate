import { Avatar, Box, Button, Link, Paper, Typography } from "@mui/material";
import React from "react";
import MUITNMSVG from '../../svg/logos/MUITNM'

export const HeroBanner: React.FC = () => {
    const logo = "https://cdn.auth0.com/blog/developer-hub/react-logo.svg";

    return (
        <Box
            component="div"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                // background:"linear-gradient(153.07deg, #ebca40 -2.47%, #ff7f38 102.78%)",
                color: "black",
                margin: "0 auto",
                padding: "3.2rem 6.4rem",
                background: "linear-gradient(153.07deg, #ff44dd -2.47%, #ebca40 102.78%)",
            }}
        >
            <Paper
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "whitesmoke",
                    borderRadius: "50%",
                    boxShadow: "0 2px 4px rgb(0 0 0 / 12%)",
                    width: "12.8rem",
                    height: "12.8rem",
                }}
            >
                <MUITNMSVG />
            </Paper>
            <Typography
                variant="h1"
                sx={{
                    letterSpacing: "-1.5px",
                    margin: "2.4rem 0 8px 0",
                    fontSize: "4.8rem",
                    fontFamily: ["Yellowtail", "cursive"].join(",")
                }}
            >
                Hello, Lovely World!
            </Typography>
            <Typography
                component="p"
                sx={{
                    maxWidth: "58rem",
                    textAlign: "center",
                    marginBottom: "3.2rem",
                    fontSize: "20px",
                    lineHeight: "3.2rem",
                }}
            >
                This application has been developed by <strong>MUI5 | Typescript | NestJs | MongoDB</strong> for <strong>React</strong> apps.
            </Typography>
            <Button
                id="code-sample-link"
                variant="contained"
                href="https://auth0.com/developers/hub/code-samples/spa/react-typescript/basic-authentication-with-react-router-6"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                    border: "0",
                    borderRadius: "0.8rem",
                    fontWeight: "600",
                    color: "black",
                    transition: "background 0.3s ease-out, color 0.3s ease-out",
                    minWidth: "10rem",
                    padding: "1.6rem 1.6rem",
                    fontSize: "1.6rem",
                    lineHeight: "2.4rem",
                    backgroundColor: "white",                    
                }}
            >
                Check out the React code sample →
            </Button>
        </Box>
    )
}
