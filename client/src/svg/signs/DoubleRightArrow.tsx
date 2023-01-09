import { css } from '@emotion/css';
import { keyframes } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';

import React from 'react';
import { ReactComponent as DOUBLERIGHTARROW } from './DoubleRightArrow.svg';

const anim1 = keyframes`
      0% {opacity: 1; transform: translateX(0px) scale(1);}
      25%{opacity: 0; transform:translateX(20px) scale(0.9);}
      26%{opacity: 0; transform:translateX(-20px) scale(0.9);}
      55% {opacity: 1; transform: translateX(0px) scale(1);}             
    `;

const DoubleRightArrowSVG: React.FC<SvgIconProps> = (props) => {
  
  const theme = useTheme();

  return (
    <DOUBLERIGHTARROW
      className={css`
        #arrow1 {
          fill: ${theme.palette.primary.main};
          animation: 1.4s linear 0s infinite running ${anim1};
        }

        #arrow2 {
          fill: ${theme.palette.primary.light};
          animation: 1.4s linear 0.2s infinite running ${anim1};
        }        
      `}
      {...props}
    />
  );
};

export default DoubleRightArrowSVG;
