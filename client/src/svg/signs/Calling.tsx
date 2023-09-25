import { css } from '@emotion/css';
import { keyframes } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';

import React from 'react';
import { ReactComponent as CALLING } from './calling.svg';

const anim1 = keyframes`
      0% {opacity: 1; transform: translate(0px, 0px) scale(1);}
  
      50%{opacity: 0; transform:translate(25px, 25px) scale(0.9);}
    `;

const shakeAnimation = keyframes`
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
    `

const CallingSVG: React.FC<SvgIconProps> = (props) => {

    const theme = useTheme();

    return (
        <CALLING
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
            fill: ${theme.palette.primary.light};
            transform-origin: center center;
            animation: 1.4s linear 0.2s infinite running ${shakeAnimation};
          } 
      `}
            {...props}
        />
    );
};

export default CallingSVG;
