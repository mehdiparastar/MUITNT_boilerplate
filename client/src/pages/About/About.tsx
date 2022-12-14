import React, { ReactElement, FC } from 'react';
import { Box, Typography } from '@mui/material';
import { assess } from 'helperFunctions/componentAssess';

const About: FC<any> = (): ReactElement => {
  assess && console.log('assess')
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => { };
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography fontFamily={'iransansx'} variant="h3">
        مهدی پرستار
      </Typography>
    </Box>
  );
};

export default About;
