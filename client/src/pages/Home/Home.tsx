import React, { ReactElement, FC } from "react";
import { Box, Typography } from "@mui/material";

const Home: FC<any> = (): ReactElement => (
    <>
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
                flexDirection:'column'
            }}
        >
            <Typography variant="caption">
                {`Evironment variable test: REACT_APP_TEST_CODE = ${process.env.REACT_APP_TEST_CODE}`}
            </Typography>
            <Typography variant="caption">
                {`Node_ENV = ${process.env.NODE_ENV}`}
            </Typography>
        </Box>
    </>
);

export default Home;
