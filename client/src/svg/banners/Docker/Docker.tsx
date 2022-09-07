import React from 'react';
import { useTheme } from '@mui/material/styles';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { keyframes } from '@emotion/react';
import { css } from '@emotion/css';
import { ReactComponent as Svg } from './Docker1.svg';

const hook_arm_anim = keyframes`
  0% {transform: scaleY(0);}
  80% {transform: scaleY(1.2);}
  85% {transform: scaleY(1.2);}
  100% {transform: scaleY(0.9);}
`;

const hook_head_anim = keyframes`
      0%    { transform: translateY(-52%); }
      80%  { transform: translateY(13%); }        
      85%  { transform: translateY(13%); }        
      100%  { transform: translateY(-13%); }        
    `;

const crane_arm_and_hook_anim = keyframes`
    0%    { transform-origin: right center; transform: rotate3d(0,0,0,0deg); }          
    100%  { transform-origin: 89% center; transform: rotate3d(0,1,0,40deg); }        
  `;
const docker_anim = keyframes`
      0%    { transform: translate(-30%, 18.5%); }
      20%    { transform: translate(40%, 18.5%); }
      80%    { transform: translate(40%, 18.5%); }
      100%  { transform: translate(110%, 18.5%); }  
    `;
const sea_waves_anim = keyframes`
      0%    { transform: translate(50%);}
      100%  { transform: translate(-50%);}  
    `;
const sea_waves__anim = keyframes`
    0%    { transform: translate(50%);}
    100%  { transform: translate(-50%);}  
  `;
const clouds_anim01 = keyframes`
      0%    { transform: translate(0%);}     
      20%  { transform: translate(-20%);}          
      20.0001%  { transform: translate(100%);}          
      100%  { transform: translate(0%);}          
    `;
const clouds_anim02 = keyframes`
      0%    { transform: translate(0%);}     
      35%  { transform: translate(-35%);}          
      35.0001%  { transform: translate(100%);}          
      100%  { transform: translate(0%);}  
    `;
const clouds_anim03 = keyframes`
      0%    { transform: translate(0%);}     
      50%  { transform: translate(-50%);}          
      50.0001%  { transform: translate(100%);}          
      100%  { transform: translate(0%);}          
    `;
const clouds_anim04 = keyframes`
      0%    { transform: translate(0%);}     
      65%  { transform: translate(-65%);}          
      65.0001%  { transform: translate(100%);}          
      100%  { transform: translate(0%);}           
    `;
const clouds_anim05 = keyframes`
      0%    { transform: translate(0%);}     
      80%  { transform: translate(-80%);}          
      80.0001%  { transform: translate(100%);}          
      100%  { transform: translate(0%);}         
    `;
const clouds_anim06 = keyframes`
      0%    { transform: translate(0%);}     
      95%  { transform: translate(-95%);}          
      95.0001%  { transform: translate(100%);}          
      100%  { transform: translate(0%);}          
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

function getTime(seconds: number): number {
  const msDuration: number = (seconds * 1000);
  const currentTime: number = new Date().getTime();
  const msDelay: number = msDuration - (currentTime % msDuration);
  return (msDelay / 1000);
}

const DockerBannerSVG: React.FC<SvgIconProps> = ({ sx, ...rest }) => {
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
      <Svg
        title="docker"
        className={css`
          #hook_arm {
            transform: scaleY(0);
            transform-origin: center center;
            animation: 6s ${hook_arm_anim} linear forwards;
          }

          #hook_head {
            animation: 6s ${hook_head_anim} linear forwards;
          }
          
          #crane_arm_and_hook {
            animation: 6s ${crane_arm_and_hook_anim} linear forwards;
          }

          #docker {animation: 20s ${docker_anim} linear infinite;}
          
          #first_wave {animation: 480s ${sea_waves_anim} 0s linear infinite both;}
          #first_wave_ {animation: 480s ${sea_waves__anim} 0s linear infinite both;}
          
          #second_wave {animation: 480s ${sea_waves_anim} 0s linear infinite both;}
          #second_wave_ {animation: 480s ${sea_waves__anim} 0s linear infinite both;}
          
          #third_wave {animation: 480s ${sea_waves_anim} 0s linear infinite both;}
          #third_wave_ {animation: 480s ${sea_waves__anim} 0s linear infinite both;}
                  
          #forth_wave {animation: 480s ${sea_waves_anim} 0s linear infinite both;}
          #forth_wave_ {animation: 480s ${sea_waves__anim} 0s linear infinite both;}    
          
          #cloud01 {animation: 240s ${clouds_anim01} 0s linear infinite forwards;}
          #cloud02 {animation: 240s ${clouds_anim02} 0s linear infinite forwards;}
          #cloud03 {animation: 240s ${clouds_anim03} 0s linear infinite forwards;}
          #cloud04 {animation: 240s ${clouds_anim04} 0s linear infinite forwards;}
          #cloud05 {animation: 240s ${clouds_anim05} 0s linear infinite forwards;}
          #cloud06 {animation: 240s ${clouds_anim06} 0s linear infinite forwards;}

        `}
      />
    </SvgIcon>
  );
};

export default DockerBannerSVG;
