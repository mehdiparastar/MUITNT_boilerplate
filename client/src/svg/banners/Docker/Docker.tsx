import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { keyframes } from '@emotion/react';
import { css } from '@emotion/css';
import { ReactComponent as Svg } from './Docker1.svg';

const hook_arm_anim = keyframes`
  0% {transform: scaleY(0);}
  8.4% {transform: scaleY(1.2);}
  10.2% {transform: scaleY(1.2);}
  12% {transform: scaleY(0.9);}
  27% {transform: scaleY(0.9);}
  33% {transform: scaleY(1.7);}
  35% {transform: scaleY(1.5);}
  50% {transform: scaleY(0);}
  100% {transform: scaleY(0);}
`;

const hook_head_anim = keyframes`
      0%    { transform: translateY(-52%); }
      8.4%  { transform: translateY(-8%); }        
      10.2%  { transform: translateY(-8%); }        
      12%  { transform: translateY(-23%); }
      27%  { transform: translateY(-23%); }        
      33%  { transform: translateY(12.2%); }        
      35%  { transform: translateY(10.2%); }        
      50%  { transform: translateY(-52%); } 
      100%  { transform: translateY(-52%); }        
    `;

const crane_arm_and_hook_anim = keyframes`
    0%    { transform-origin: right center; transform: rotate3d(0,0,0,0deg); }          
    12%  { transform-origin: 89% center; transform: rotate3d(0,1,0,35deg); }        
    23%  { transform-origin: 89% center; transform: rotate3d(0,1,0,35deg); } 
    38% { transform-origin: 89% center; transform: rotate3d(0,1,0,0deg); }
    100%  { transform-origin: 89% center; transform: rotate3d(0,1,0,0deg); }            
  `;
const docker_anim = keyframes`
      0%    { transform: translate(-30%, 18.5%); }
      47%    { transform: translate(42%, 18.5%); }
      55%    { transform: translate(42%, 18.5%); }
      70%    { transform: translate(110%, 18.5%); }
      100%  { transform: translate(110%, 18.5%); }  
    `;
const truck_anim = keyframes`
    0%   { transform: translateX(3000px); }
    20%  { transform: translateX(0px); }
    34%  { transform: translateX(0px); }
    52%  { transform: translateX(-3500px); }
    100% { transform: translateX(-3500px); }
  `;

const containers_anim = keyframes`
  0%   { transform: translateX(535px); }
  20%  { transform: translateX(106px); }
  30%  { transform: translateX(106px); }
  32.4%  { transform: translate(106px,-14.5px); }
  33.4%  { transform: translate(106px,-14.5px); }
  37.2%  { transform: translate(114px,-14.5px); }
  38.34%  { transform: translate(117px,-14.5px); }
  41%  { transform: translate(124px,-14.5px); }
  44%  { transform: translate(139px,-14.5px); }
  47%  { transform: translate(139px,-14.5px); }
  53%  { transform: translate(139px,20px) }
  55%  { transform: translate(139px,20px) }
  70%  { transform: translate(680px,20px) }
  100% { transform: translate(680px,20px); }
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

const text_anim = keyframes`    
      0%{
        stroke-dasharray: 0;
      }
      15%{
        stroke-dasharray: 20;
      }
      30%{
        stroke-dasharray: 0;
      }
      100%{
        stroke-dasharray: 0;
      }
    `;

const seaWaves_anim = keyframes`
    0%{
      d: path("M 0 250.178 C 133.333 232.607 266.667 232.607 400 250.178 C 533.333 268.894 666.667 268.894 800 250.178 L 800 309 L 0 309");
    }
    25%{
      d: path("M 0 236.999 C 133.333 236.999 266.667 271.559 400 271.559 C 533.333 271.559 666.667 236.999 800 236.999 L 800 308.999 L 0 308.999");
    }
    50%{
      d: path("M 0 250.177 C 133.333 268.893 266.667 268.893 400 250.177 C 533.333 232.606 666.667 232.606 800 250.177 L 800 308.999 L 0 308.999");
    }
    75%{
      d: path("M 0 271.559 C 133.333 271.559 266.667 236.999 400 236.999 C 533.333 236.999 666.667 271.559 800 271.559 L 800 308.999 L 0 308.999");
    }
    100%{
      d: path("M 0 250.178 C 133.333 232.607 266.667 232.607 400 250.178 C 533.333 268.894 666.667 268.894 800 250.178 L 800 309 L 0 309");
    }
  `;

const DockerBannerSVG: React.FC<SvgIconProps> = ({ sx, ...rest }) => {

  return (
    <SvgIcon
      viewBox="0 0 800 310"
      sx={{
        width: '-webkit-fill-available',
        height: 'auto',
        ...sx,
        padding: 0,
      }}
      {...rest}
    >
      <Svg
        title="docker"
        className={css`
          #hook_arm {
            transform: scaleY(0);
            transform-origin: center center;
            animation: 35s ${hook_arm_anim} 7s linear infinite forwards;
          }

          #hook_head {
            transform: translateY(-52%);
            animation: 35s ${hook_head_anim} 7s linear infinite forwards;
          }

          #crane_arm_and_hook {
            animation: 35s ${crane_arm_and_hook_anim} 11.2s linear infinite
              forwards;
          }

          #docker {
            animation: 35s ${docker_anim} linear infinite forwards;
          }
          #truck {
            transform-origin: 0px 0px;
            animation-name: ${truck_anim};
            animation-delay: 0s;
            animation-duration: 35s;
            animation-fill-mode: forwards;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
          #containers {
            transform-origin: 0px 0px;
            animation-name: ${containers_anim};
            animation-delay: 0s;
            animation-duration: 35s;
            animation-fill-mode: forwards;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }

          #text {
            font-family: 'Yellowtail' !important;
            font-size: xxx-large !important;
            animation: 35s ${text_anim} 24.5s linear infinite forwards;
          }

          #first_wave {
            animation: 480s ${sea_waves_anim} 0s linear infinite both;
          }
          #first_wave_ {
            animation: 480s ${sea_waves__anim} 0s linear infinite both;
          }
          #second_wave {
            animation: 480s ${sea_waves_anim} 0s linear infinite both;
          }
          #second_wave_ {
            animation: 480s ${sea_waves__anim} 0s linear infinite both;
          }
          #third_wave {
            animation: 480s ${sea_waves_anim} 0s linear infinite both;
          }
          #third_wave_ {
            animation: 480s ${sea_waves__anim} 0s linear infinite both;
          }
          #forth_wave {
            animation: 480s ${sea_waves_anim} 0s linear infinite both;
          }
          #forth_wave_ {
            animation: 480s ${sea_waves__anim} 0s linear infinite both;
          }

          #cloud01 {
            animation: 240s ${clouds_anim01} 0s linear infinite forwards;
          }
          #cloud02 {
            animation: 240s ${clouds_anim02} 0s linear infinite forwards;
          }
          #cloud03 {
            animation: 240s ${clouds_anim03} 0s linear infinite forwards;
          }
          #cloud04 {
            animation: 240s ${clouds_anim04} 0s linear infinite forwards;
          }
          #cloud05 {
            animation: 240s ${clouds_anim05} 0s linear infinite forwards;
          }
          #cloud06 {
            animation: 240s ${clouds_anim06} 0s linear infinite forwards;
          }
          #seaWave01 {
            animation: ${seaWaves_anim} 14s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            animation-delay: 0s;
          }
          #seaWave02 {
            animation: ${seaWaves_anim} 14s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            animation-delay: 2s;
          }
          #seaWave03 {
            animation: ${seaWaves_anim} 14s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            animation-delay: 4s;
          }
          #seaWave04 {
            animation: ${seaWaves_anim} 14s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            animation-delay: 6s;
          }
        `}
      />
    </SvgIcon>
  );
};

export default DockerBannerSVG;
