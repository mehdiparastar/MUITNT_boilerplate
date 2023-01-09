import React from 'react';
import { useTheme } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { keyframes } from '@emotion/react';
import { css } from '@emotion/css';

import { ReactComponent as NODATAFOUND } from './NoDataFound.svg';

const anim1 = keyframes`
      0% {opacity: 1; transform: translateX(0px) scale(1);}
      25%{opacity: 0; transform:translateX(20px) scale(0.9);}
      26%{opacity: 0; transform:translateX(-20px) scale(0.9);}
      55% {opacity: 1; transform: translateX(0px) scale(1);}             
    `;

const anim2 = keyframes`
    0% {opacity: 1; scale(1);}
    25%{opacity: 0; scale(0.9);}
    26%{opacity: 0; scale(0.9);}
    55% {opacity: 1; scale(1);}             
  `;

const NoDataFoundSVG: React.FC<SvgIconProps> = (props) => {
  
  const theme = useTheme();

  return (
    <NODATAFOUND
      className={css`
        #shirt {
          fill: ${theme.palette.primary.main};          
        }

        #hair {
          fill: ${theme.palette.secondary.main};
        }        

        #dot1 {
          fill: ${theme.palette.primary.light};
          animation: 1.4s linear 0.0s infinite running ${anim1};
        }

        #dot2 {
          fill: ${theme.palette.primary.light};
          animation: 1.4s linear 0.1s infinite running ${anim1};
        }

        #dot3 {
          fill: ${theme.palette.primary.light};
          animation: 1.4s linear 0.2s infinite running ${anim1};
        }

        #dot4 {
          fill: ${theme.palette.primary.light};
          animation: 1.4s linear 0.3s infinite running ${anim1};
        }

        #Q {
          animation: 1.4s linear 0.0s infinite running ${anim2};
        }
      `}
      {...props}
    />
  );
};

export default NoDataFoundSVG;
