import { LinearProgress } from "@mui/material";
import React from "react";


export const PageLoader: React.FC = () => {

    return <LinearProgress
        sx={{
            position: 'fixed',
            width: '100%',
            top: 0,
            left: 0,
            zIndex: 10000
        }}
    />

    // const loadingImg = "https://cdn.auth0.com/blog/hello-auth0/loader.svg";
    // const spin = keyframes`
    //     from {
    //         transform: rotate(0deg);
    //     }
    //     to {
    //         transform: rotate(360deg);
    //     }`

    // return (
    //     <Box
    //         component="div"
    //         sx={{
    //             position: 'fixed',
    //             top: '40vh',
    //             height: "5rem",
    //             width: "5rem",
    //             margin: "auto",
    //             animation: `${spin} 2s infinite linear`,
    //         }}
    //     >
    //         <Box
    //             component="img"
    //             src={loadingImg}
    //             alt="Loading..."
    //         />
    //     </Box>
    // );
};