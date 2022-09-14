
import React, { ReactElement, FC } from "react";
import { Box, Typography } from "@mui/material";

const About: FC<any> = (): ReactElement => {
    return (
        <Box sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Typography fontFamily={'iransansx'} variant="h3">مهدی پرستار</Typography>
        </Box>
    );
};

export default About;