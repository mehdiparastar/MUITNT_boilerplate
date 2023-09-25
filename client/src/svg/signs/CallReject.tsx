import { css } from '@emotion/css';
import { keyframes } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';

import React from 'react';
import { ReactComponent as CALLREJECT } from './CallReject.svg';

const anim1 = keyframes`
      0% {opacity: 1; transform: translate(0px, 0px) scale(1);}
  
      50%{opacity: 0; transform:translate(25px, 25px) scale(0.9);}
    `;

const shakeAnimation = keyframes`
    0% { transform: rotate(0deg); }
    25% { transform: rotate(5deg); }
    50% { transform: rotate(0eg); }
    75% { transform: rotate(-5deg); }
    100% { transform: rotate(0deg); }
    `

const CallReject: React.FC<SvgIconProps> = (props) => {

    const theme = useTheme();

    return (
        <CALLREJECT
            className={css`
        #firstLine {
          fill: ${theme.palette.primary.main};
          animation: 1.4s linear 0s infinite running ${anim1};
        }

        #secondLine {
          fill: ${theme.palette.primary.light};
          animation: 1.4s linear 0.2s infinite running ${anim1};
        }        

        #handset {
            fill: ${theme.palette.error.main};
            transform-origin: center center;
            animation: 0.4s linear 0.2s infinite ${shakeAnimation};
          } 
      `}
            {...props}
        />
    );
};

export default CallReject;
