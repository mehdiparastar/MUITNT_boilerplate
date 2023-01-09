import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { keyframes } from '@emotion/react';
import { css } from '@emotion/css';
import { ReactComponent as MUISvg } from './MUI.svg';


const anim1 = keyframes`
        0% {transform: rotate(0deg);}
        100% {transform: rotate(-360deg);}   
    `;
const anim2 = keyframes`
        0% {transform: rotate(-65deg);opacity:0;}
        5% {transform: rotate(-55deg);opacity:1;}
        45% {transform: rotate(22deg);opacity:1;}        
        50% {transform: rotate(32deg);opacity:0;}        
        100% {transform: rotate(360deg);opacity:0;}        
    `;
const anim3 = keyframes`
        50%    { transform: rotateY(0deg); }
        100%    { transform: rotateY(360deg); }
    `;

const MUIBannerSVG: React.FC<SvgIconProps> = ({ sx, ...rest }) => {
  
  return (
    <SvgIcon
      viewBox="0 0 800 310"
      sx={{
        width: '-webkit-fill-available',
        height: 'auto',
        ...sx,
      }}
      {...rest}
    >
      <MUISvg
        title="mui"
        className={css`
          #dot04,
          #dot05 {
            transform-origin: 440px 36px;
            animation: 5s linear infinite running ${anim1};
          }
          #dot03 {
            transform-origin: 420px 36px;
            animation: 5s linear infinite running ${anim2};
          }
          #li02 {
            transform-origin: 650px;
            animation: 1.5s linear infinite running ${anim3};
          }
          #li04 {
            transform-origin: 650px;
            animation: 2s linear 1s infinite running ${anim3};
          }
        `}
      />
    </SvgIcon>
  );
};

export default MUIBannerSVG;
