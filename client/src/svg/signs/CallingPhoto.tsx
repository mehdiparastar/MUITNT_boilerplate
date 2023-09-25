import { css } from '@emotion/css';
import { keyframes } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';

import React from 'react';
import { ReactComponent as CALLINGPHOTO } from './CallingPhoto.svg';

const anim1 = keyframes`
      0% {opacity: 1; transform: translate(0px, 0px) scale(1);}
  
      50%{opacity: 0; transform:translate(25px, 25px) scale(0.9);}
    `;

const shakeAnimation = keyframes`
    0% { transform: skewX(-5deg); }
    5% { transform: skewX(5deg); }
    10% { transform: skewX(-5deg); }
    15% { transform: skewX(5deg); }
    20% { transform: skewX(0deg); }
    100% { transform: skewX(0deg); }    
    `

const CallingPhoto: React.FC<SvgIconProps> = (props) => {

    const theme = useTheme();

    return (
        <CALLINGPHOTO
            className={css`
        #firstLine {
          fill: ${theme.palette.primary.main};
          animation: 1.4s linear 0s infinite running ${anim1};
        }

        #secondLine {
          fill: ${theme.palette.primary.light};
          animation: 1.4s linear 0.2s infinite running ${anim1};
        }        

        #_66_calling_outline {
            transform-origin: bottom;
            animation: 1.4s linear 0.2s infinite ${shakeAnimation};
          } 
      `}
            {...props}
        />
    );
};

export default CallingPhoto;
