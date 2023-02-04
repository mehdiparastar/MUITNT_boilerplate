import { css } from '@emotion/css';
import { keyframes } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';

import React from 'react';
import { ReactComponent as UPLOADFILE } from './UploadFile.svg';

const anim1 = keyframes`
      0% {opacity: 1; transform: translateX(0px) scale(1);}
      25%{opacity: .5; transform:translateX(10px) scale(0.99);}
      26%{opacity: .5; transform:translateX(10px) scale(0.99);}
      50% {opacity: 1; transform: translateX(0px) scale(1);}             
      51% {opacity: 1; transform: translateX(0px) scale(1);} 
      75% {opacity: 1; transform: translateX(-10px) scale(1);} 
      76% {opacity: 1; transform: translateX(-10px) scale(1);} 
      100% {opacity: 1; transform: translateX(0px) scale(1);} 
    `;

const anim2 = keyframes`
    0% {opacity: 1; scale(1);}
    50%{opacity: .8; scale(0.9);}
    51%{opacity: .8; scale(0.9);}
    100% {opacity: 1; scale(1);}             
  `;

const UploadFileSVG: React.FC<SvgIconProps & { maxwidth?: string | number }> = (props) => {

    const theme = useTheme();

    return (
        <UPLOADFILE
            className={css`
            max-width:${props.maxwidth || '400px'};
        #shirt {
          fill: ${theme.palette.primary.main};          
        }

        #hair {
          fill: ${theme.palette.secondary.main};
        }  
        
        #pant {
            fill: ${theme.palette.primary.dark};
        } 

        #shoe {
            fill: ${theme.palette.alternate.dark};
        } 

        #mountain {
          fill: ${theme.palette.secondary.dark};
          animation: 1.4s linear 0.0s infinite running ${anim2};
        }

        #line1 {
            animation: 1.4s linear 0.0s infinite running ${anim2};
          }

        #line2 {
          fill: ${theme.palette.primary.light};
          animation: 1.4s linear 0.1s infinite running ${anim1};
        }

        #line3 {
          animation: 1.4s linear 0.2s infinite running ${anim1};
        }

        #line4 {
          animation: 1.4s linear 0.3s infinite running ${anim1};
        }

        #line5 {
            animation: 1.4s linear 0.4s infinite running ${anim1};
          }

        #Q {
          animation: 1.4s linear 0.0s infinite running ${anim2};
        }
      `}
            {...props}
        />
    );
};

export default UploadFileSVG;
