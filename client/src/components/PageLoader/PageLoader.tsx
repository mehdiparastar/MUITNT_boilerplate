import { Box } from "@mui/material";
import { keyframes } from '@emotion/react'
import React from "react";

export const PageLoader: React.FC = () => {
    const loadingImg = "https://cdn.auth0.com/blog/hello-auth0/loader.svg";
    const spin = keyframes`
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }`
    return (
        <Box
            component="div"
            sx={{
                height: "5rem",
                width: "5rem",
                margin: "auto",
                animation: `${spin} 2s infinite linear`,
            }}
        >
            <Box
                component="img"
                src={loadingImg}
                alt="Loading..."
            />
        </Box>
    );
};