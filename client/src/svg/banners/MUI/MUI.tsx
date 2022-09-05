import React from 'react';
import { useTheme } from '@mui/material/styles';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { keyframes } from '@emotion/react';
import { css } from '@emotion/css';
import { ReactComponent as Svg } from './MUI.svg';

const anim1 = keyframes`
        0%    { transform: translateY(-48%); }
        100%  { transform: translateY(0%); }               
    `;
const anim2 = keyframes`
        0%    { transform: translateY(-41%); }
        100%  { transform: translateY(7%); }              
    `;
const anim3 = keyframes`
        0%    { transform: translateY(-34%); }
        100%  { transform: translateY(14%); }           
    `;
const anim4 = keyframes`
        0%    { transform: translateY(-27%); }
        100%  { transform: translateY(21%); }           
    `;
const anim5 = keyframes`
        0%    { transform: translateY(-20%); }
        100%  { transform: translateY(26%); }           
    `;
const anim6 = keyframes`
        0%    { transform: translateY(-13%); }
        100%  { transform: translateY(33%); }           
    `;
const anim7 = keyframes`
        0%    { transform: translateY(-6%); }
        100%  { transform: translateY(40%); }           
    `;
const anim8 = keyframes`
        0%,
        100% {
            clip-path: polygon(
                0% 45%,
                16% 44%,
                33% 50%,
                54% 60%,
                70% 61%,
                84% 59%,
                100% 52%,
                100% 100%,
                0% 100%
            );
        }

        50% {
            clip-path: polygon(
                0% 60%,
                15% 65%,
                34% 66%,
                51% 62%,
                67% 50%,
                84% 45%,
                100% 46%,
                100% 100%,
                0% 100%
            );
        }  
    `;
const anim9 = keyframes`
        0% {
            opacity:1
        }
        50% {
            opacity:0
        }
        100% {
            opacity:1
        }
    `;

const MUIBannerSVG: React.FC<SvgIconProps> = ({ sx, ...rest }) => {
  const theme = useTheme();
  const colorPrimaryLight = theme.palette.primary.light;
  const colorPrimaryMain = theme.palette.primary.main;
  const colorPrimaryDark = theme.palette.primary.dark;
  const colorSecondaryLight = theme.palette.secondary.light;
  const colorSecondaryMain = theme.palette.secondary.main;
  const colorSecondaryDark = theme.palette.secondary.dark;

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
      <Svg />
    </SvgIcon>
  );
};

export default MUIBannerSVG;
