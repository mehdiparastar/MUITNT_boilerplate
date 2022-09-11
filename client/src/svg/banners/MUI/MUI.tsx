import React from 'react';
import { useTheme } from '@mui/material/styles';
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
            <MUISvg
                title="mui"
                className={css`
                    #dot04, #dot05 {transform-origin: 440px 36px; animation: 5s linear infinite running ${anim1};}
                    #dot03 {transform-origin: 420px 36px; animation: 5s linear infinite running ${anim2};}
                    #li02 {transform-origin: 650px; animation: 1.5s linear infinite running ${anim3};}
                    #li04 {transform-origin: 650px; animation: 2s linear 1s infinite running ${anim3};}
                `}
            />
        </SvgIcon>
    );
};

export default MUIBannerSVG;
