import { Box, Link, Typography } from "@mui/material";
import React from "react";

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
            <Box
                component="div"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    boxShadow: "0 2px 4px rgb(0 0 0 / 12%)",
                    width: "12.8rem",
                    height: "12.8rem",
                }}
            >
                <Box
                    component="img"
                    sx={{
                        width: "10.8rem",
                        height: "10.8rem",
                    }}
                    src={logo}
                    alt="React logo"
                />
            </Box>
            <Typography
                variant="h1"
                sx={{
                    letterSpacing: "-1.5px",
                    margin: "2.4rem 0 8px 0",
                    fontSize: "4.8rem",
                    fontFamily:["Yellowtail", "cursive"].join(",")
                }}
            >
                Hello, React World!
            </Typography>
            <Box
                component="p"
                sx={{
                    maxWidth: "58rem",
                    textAlign: "center",
                    marginBottom: "3.2rem",
                    fontSize: "20px",
                    lineHeight: "3.2rem",
                }}
            >
                This is a sample application that demonstrates the authentication flow
                for React apps using <strong>Auth0</strong>.
            </Box>
            <Link
                id="code-sample-link"
                target="_blank"
                rel="noopener noreferrer"
                href="https://auth0.com/developers/hub/code-samples/spa/react-typescript/basic-authentication-with-react-router-6"
                sx={{
                    border: "0",
                    borderRadius: "0.8rem",
                    //   fontFamily: var(--font-primary),
                    fontWeight: "600",
                    color: "black",
                    cursor: "pointer",
                    userSelect: "none",
                    transition: "background 0.3s ease-out, color 0.3s ease-out",
                    minWidth: "10rem",
                    padding: "1.6rem 1.6rem",
                    fontSize: "1.6rem",
                    lineHeight: "2.4rem",
                    backgroundColor: "white",
                }}
            >
                Check out the React code sample →
            </Link>
        </Box>
    )
}
