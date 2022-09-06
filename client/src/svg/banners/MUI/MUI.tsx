import React from 'react';
import { useTheme } from '@mui/material/styles';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { keyframes } from '@emotion/react';
import { css } from '@emotion/css';
import { ReactComponent as Svg } from './MUI.svg';

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
            <defs>
                <radialGradient gradientUnits="userSpaceOnUse" cx="125.716" cy="276.36" r="87.223" id="gradient-0" gradientTransform="matrix(1, 0, 0, 1, 0, -1)">
                    <stop offset="0" className={css`stop-color: #bada55`} />
                    <stop offset="1" className={css`stop-color: #758d29`} />
                </radialGradient>
                <path id="path-0" d="M 52.771 105.984 C 51.53 84.309 41.081 99.146 32.285 104.743 C 25.053 114.969 28.201 116.82 38.493 109.709 C 59.148 95.439 64.548 88.417 78.224 72.461 C 81.762 63.522 90.763 39.312 82.57 55.699 C 75.389 76.687 69.788 90.319 65.808 102.26 C 64.567 109.114 61.463 113.475 61.463 118.4 C 73.367 109.843 83.34 99.712 94.986 91.706 C 95.626 91.266 104.068 84.256 104.919 84.256 C 109.322 83.015 112.643 79.911 116.714 79.911 C 124.703 76.847 133.611 74.944 139.063 74.944 C 143.155 72.714 147.16 73.703 150.237 73.703 C 158.291 73.703 168.546 74.944 172.586 74.944 C 172.586 96.904 159.219 104.842 140.925 110.33 C 129.156 111.875 99.023 118.095 96.227 111.572 C 93.958 106.277 94.365 99.115 94.365 93.568 C 103.022 81.186 110.444 76.147 119.197 72.461 C 123.179 70.784 129.681 64.872 131.613 68.736 C 133.729 72.969 130.042 70.523 131.613 76.807 C 121.253 91.607 117.356 96.215 108.643 100.397 C 96.002 106.465 91.723 102.768 100.573 91.706 C 113.687 89.843 105.926 107.012 106.781 107.226 C 107.584 107.427 109.264 106.398 109.264 107.226 C 141.536 91.378 165.598 80.611 188.106 69.357 C 201.332 60.126 209.797 49.519 219.767 42.042 C 224.72 38.944 212.972 44.198 211.076 45.146 C 204.619 48.374 198.435 52.165 191.831 55.079 C 175.554 62.26 157.153 66.621 141.546 74.944 C 120.946 81.453 108.565 89.41 98.711 97.293 C 90.305 104.017 100.216 95.122 90.019 102.26 C 88.821 103.099 85.463 105.182 86.915 105.364 C 88.763 105.595 93.819 104.047 92.503 105.364 C 121.953 97.724 147.319 88.014 171.965 84.877 C 177.251 84.204 207.351 78.799 207.351 87.981 C 186.019 111.89 155.022 125.251 129.13 128.333 C 115.664 129.936 99.331 126.588 99.331 108.468 C 99.331 90.121 126.054 78.584 119.197 99.156 C 115.94 108.925 113.95 105.198 109.264 112.813 C 89.255 127.18 55.843 145.585 36.631 129.575 C 27.608 122.056 29.181 105.672 29.181 95.431 C 29.181 74.448 46.255 54.145 58.979 41.421 C 81.607 26.727 94.039 22.797 117.335 22.797 C 147.855 28.94 170.705 32.088 165.136 51.975 C 161 66.748 159.58 57.053 152.099 73.082 C 128.536 88.924 115.86 91.706 98.711 91.706 C 91.305 91.706 78.937 92.21 73.258 85.498 C 64.672 75.351 78.224 62.765 78.224 55.079 C 89.504 48.342 108.744 36.838 110.506 54.458 C 110.876 58.164 112.081 62.257 110.506 65.632 C 109.576 67.626 106.16 68.399 106.16 70.599 C 87.547 78.82 99.475 61.84 104.298 58.803 C 115.818 51.55 126.409 48.871 139.683 48.871 C 144.377 52.323 141.024 57.452 137.821 60.045 C 131.572 65.103 122.519 67.093 114.851 68.115 C 113.401 68.309 110.969 70.124 110.506 68.736 C 109.831 66.713 109.414 59.081 109.264 58.183 C 115.455 45.925 130.929 27.243 127.888 47.008 C 127.4 50.183 127.117 53.602 125.405 56.32 C 115.648 71.817 103.895 73.169 88.157 79.29 C 66.82 80.531 52.688 82.149 47.184 76.186 C 36.339 64.437 52.315 44.525 63.946 44.525 C 74.695 57.235 85.115 79.679 70.775 87.981 C 61.294 93.47 48.75 89.223 38.493 89.223 C 38.493 63.6 75.686 39.091 95.607 47.629 C 97.661 48.51 96.941 54.736 97.469 56.32 C 89.436 75.024 81.507 77.298 66.429 78.669 C 59.821 79.27 50.125 83.025 46.563 77.427 C 39.338 66.073 49.357 52.844 52.771 43.283 C 60.428 37.489 63.075 35.959 65.808 34.592 C 87.21 23.891 71.668 38.796 60.842 41.421 C 45.106 45.236 55.657 41.301 44.08 42.663 C 42.839 14.22 95.653 26.744 111.747 32.109 L 117.955 34.592 C 129.239 37.669 140.875 45.512 152.099 47.008 C 154.727 47.359 162.653 45.786 162.653 50.733" className={css`fill: none;`} />
            </defs>
            <g id="Laptop" transform="matrix(0.918614, 0, 0, 0.931954, -46.742699, 23.179258)">
                <path className={css`fill: #38454f`} d="M 646.4 288.8 v 17.7 h 141.2 V 288.8 H 937.7 V 6.3 c 0 -9.8 -7.9 -17.7 -17.7 -17.7 H 514 c -9.8 0 -17.7 7.9 -17.7 17.7 V 288.8 H 646.4 z" transform="matrix(0.6,0,0,0.6,184.3,63.1)" />
                <polygon className={css`fill: #546a79`} points="514,275.3 920.1,275.3 920.1,10.5 514,10.5" transform="matrix(0.6,0,0,0.6,184.3,60.4)" />
                <g transform="matrix(0.6,0,0,0.6,146.4,60.4)">
                    <path className={css`fill: #ea6148`} d="M 598.8 222.3 c -4.9 0 -8.8 -4 -8.8 -8.8 V 72.3 c 0 -4.9 4 -8.8 8.8 -8.8 c 4.9 0 8.8 4 8.8 8.8 v 141.2 C 607.6 218.4 603.6 222.3 598.8 222.3" />
                    <path className={css`transform-origin: 650px; animation: 1.5s linear infinite running ${anim3}; fill: #ea6148`} d="M 669.4 98.7 h -35.3 c -4.9 0 -8.8 -4 -8.8 -8.8 s 4 -8.8 8.8 -8.8 h 35.3 c 4.9 0 8.8 4 8.8 8.8 S 674.3 98.7 669.4 98.7" />
                    <path className={css`fill: #ea6148`} d="M 651.7 134.1 h -17.7 c -4.9 0 -8.8 -4 -8.8 -8.8 c 0 -4.9 4 -8.8 8.8 -8.8 h 17.7 c 4.9 0 8.8 4 8.8 8.8 C 660.6 130.1 656.6 134.1 651.7 134.1" />
                    <path className={css`transform-origin: 650px; animation: 2s linear 1s infinite running ${anim3}; fill: #ea6148`} d="M 669.4 169.4 h -35.3 c -4.9 0 -8.8 -4 -8.8 -8.8 s 4 -8.8 8.8 -8.8 h 35.3 c 4.9 0 8.8 4 8.8 8.8 S 674.3 169.4 669.4 169.4" />
                    <path className={css`fill: #ea6148`} d="M 651.7 204.7 h -17.7 c -4.9 0 -8.8 -4 -8.8 -8.8 s 4 -8.8 8.8 -8.8 h 17.7 c 4.9 0 8.8 4 8.8 8.8 S 656.6 204.7 651.7 204.7" />
                </g>
                <path className={css`fill: #b0b6bb`} d="M 787.7 211.3 v 17.7 H 646.4 V 211.3 H 461 v 26.5 c 0 9.8 7.9 17.7 17.7 17.7 h 476.7 c 9.8 0 17.7 -7.9 17.7 -17.7 V 211.3 H 787.7 z" transform="matrix(0.6,0,0,0.6,184.3,111)" />
            </g>
            <g id="Glasses" transform="matrix(0.918614, 0, 0, 0.931954, -60.264702, 21.986359)" >
                <path transform="matrix(1.4,0,0,1.5,-188.7,-114.4)" d="M 513.1 218.3 c -0.5 0 -1 0.4 -1.1 0.9 c 0 0.6 0.4 1 0.9 1.1 c 2.7 0.2 4 1.6 4.4 4.5 c 0.1 0.5 0.5 0.9 1 0.9 c 0 0 0.1 0 0.1 0 c 0.5 -0.1 0.9 -0.6 0.9 -1.1 C 518.8 220.6 516.7 218.6 513.1 218.3 z" />
                <path transform="matrix(1.4,0,0,1.5,-176.2,-114.3)" d="M 473.2 218.2 C 472.6 218.1 472.1 218.5 472.1 219.1 c 0 0.6 0.4 1 0.9 1.1 c 2.7 0.2 4 1.6 4.4 4.5 c 0.1 0.5 0.5 0.9 1 0.9 c 0 0 0.1 0 0.1 0 c 0.5 -0.1 0.9 -0.6 0.9 -1.1 C 478.9 220.5 476.8 218.5 473.2 218.2 z" />
                <path transform="matrix(1.4,0,0,1.5,-181.4,-115.5)" d="M 523.3 221.6 h -5 c -1.3 -4.7 -5.6 -8.1 -10.7 -8.1 c -4.3 0 -8.1 2.5 -9.9 6.1 c -0.9 -1.8 -2.6 -3.6 -5.4 -3.6 c -2.9 0 -4.5 1.8 -5.4 3.6 c -1.8 -3.6 -5.6 -6.1 -9.9 -6.1 c -5.1 0 -9.4 3.4 -10.7 8.1 H 461.3 c -0.6 0 -1 0.4 -1 1 s 0.4 1 1 1 h 4.5 c 0 0.4 -0.1 0.7 -0.1 1.1 c 0 6.2 5 11.2 11.2 11.2 c 6.2 0 11.2 -5 11.2 -11.2 c 0 -0.6 -0.1 -1.2 -0.2 -1.8 c 0.1 -0.1 0.1 -0.3 0.2 -0.4 c 0 -0.2 0.6 -4.4 4.2 -4.4 c 3.6 0 4.2 4.2 4.2 4.3 c 0 0.2 0.1 0.3 0.2 0.4 c -0.1 0.6 -0.2 1.2 -0.2 1.9 c 0 6.2 5 11.2 11.2 11.2 s 11.2 -5 11.2 -11.2 c 0 -0.4 0 -0.7 -0.1 -1.1 H 523.3 c 0.6 0 1 -0.4 1 -1 S 523.9 221.6 523.3 221.6 z M 476.9 233.9 c -5 0 -9.2 -4.1 -9.2 -9.2 s 4.1 -9.2 9.2 -9.2 c 5 0 9.2 4.1 9.2 9.2 S 481.9 233.9 476.9 233.9 z M 507.6 233.9 c -5 0 -9.2 -4.1 -9.2 -9.2 s 4.1 -9.2 9.2 -9.2 s 9.2 4.1 9.2 9.2 S 512.7 233.9 507.6 233.9 z" />
            </g>
            <polyline className={css`stroke: rgb(0, 0, 0); fill: none; stroke-dasharray: 4;`} points="439.37 68.358 439.37 68.358 438.912 101.211 645.845 101.597 665.495 81.556 674.703 91.417" />
            <g id="Image" transform="matrix(1.364016, 0, 0, 1.404509, -362.248169, -87.200294)" >
                <g transform="matrix(1.6,0,0,1.5,-400,-88.9)">
                    <g>
                        <rect x="643.4" y="149.3" className={css`fill: #ecf0f1`} width="55" height="42" />
                        <path className={css`fill: #545e73`} d="M 699.4 192.3 H 642.4 v -44 h 57 V 192.3 z M 644.4 190.3 h 53 v -40 H 644.4 V 190.3 z" />
                    </g>
                    <g>
                        <rect x="647.4" y="153.3" className={css`fill: #545e73`} width="47" height="34" />
                        <path className={css`fill: #ecf0f1`} d="M 695.4 188.3 H 646.4 v -36 h 49 V 188.3 z M 648.4 186.3 h 45 v -32 H 648.4 V 186.3 z" />
                    </g>
                    <circle className={css`fill: #f3d55a`} cx="657.4" cy="161.9" r="4.6" />
                    <polygon className={css`fill: #11a085`} points="693.4,177.4 692.4,176.3 680.4,165.3 669.9,176.8 675.4,182.3 679.4,186.3 693.4,186.3" />
                    <polygon className={css`fill: #26b999`} points="648.4,186.3 679.4,186.3 675.4,182.3 664.4,171.3 648.4,185.3" />
                </g>
                <g transform="matrix(1.6,0,0,1.5,-413.5,-100.6)">
                    <circle className={css`fill: #26b999`} cx="698.9" cy="196.9" r="12" />
                    <path className={css`fill: #ffffff`} d="M 705.5 191.1 c -0.5 -0.3 -1.1 -0.2 -1.4 0.3 l -5.6 8 l -3.9 -3.2 c -0.4 -0.4 -1.1 -0.3 -1.4 0.1 c -0.4 0.4 -0.3 1.1 0.1 1.4 l 4.8 3.9 c 0.2 0.1 0.4 0.2 0.6 0.2 c 0 0 0.1 0 0.1 0 c 0.3 0 0.5 -0.2 0.7 -0.4 l 6.2 -8.9 C 706 192 705.9 191.4 705.5 191.1 z" />
                </g>
            </g>
            <g id="world" transform="matrix(0.687353, 0, 0, 0.704073, 417.692322, 13.99214)" >
                <path fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" d="M32.001,0.887c17.184,0,31.113,13.929,31.112,31.113 C63.114,49.185,49.184,63.115,32,63.113C14.815,63.114,0.887,49.185,0.888,32.001C0.885,14.816,14.815,0.887,32.001,0.887z" />
                <line fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" x1="32" y1="1" x2="32" y2="63" />
                <line fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" x1="63" y1="32" x2="1" y2="32" />
                <path fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" d="M30,1c0,0-14,11-14,31s14,31,14,31" />
                <path fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" d="M34,1c0,0,14,11,14,31S34,63,34,63" />
                <path fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" d="M8,12c0,0,5,10,24,10s24-10,24-10" />
                <path fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" d="M8,52c0,0,5-10,24-10s24,10,24,10" />
            </g>
            <g id="cloud" transform="matrix(0.105641, 0, 0, 0.095083, 667.000854, 180.830917)">
                <path d="M489.579,254.766c-12.942-16.932-30.829-29.887-50.839-36.933c-0.828-48.454-40.501-87.618-89.148-87.618 c-7.618,0-15.213,0.993-22.647,2.958c-12.102-15.076-27.37-27.615-44.441-36.457c-19.642-10.173-40.881-15.331-63.127-15.331 c-74.705,0-135.736,59.676-137.931,133.859C33.885,227.82,0,271.349,0,321.107c0,60.383,49.125,109.508,109.508,109.508h292.983 C462.875,430.615,512,381.49,512,321.107C512,296.896,504.246,273.956,489.579,254.766z M402.491,415.061H109.508 c-51.806,0-93.953-42.147-93.953-93.953c0-44.549,31.647-83.274,75.248-92.079l6.342-1.281l-0.106-6.47 c-0.008-0.465-0.036-0.923-0.069-1.38c-0.012-0.173-0.031-0.344-0.031-0.52c0-67.512,54.925-122.437,122.436-122.437 c39.135,0,75.005,18.162,98.411,49.828l3.349,4.53l5.348-1.769c7.542-2.494,15.317-3.759,23.108-3.759 c40.587,0,73.606,33.019,73.606,73.607c0,0.645-0.05,1.382-0.103,2.164c-0.034,0.505-0.067,1.011-0.093,1.518l-0.303,6.145 l5.911,1.709c19.171,5.544,36.435,17.369,48.61,33.297c12.577,16.453,19.224,36.127,19.224,56.895 C496.445,372.913,454.297,415.061,402.491,415.061z" className={css`fill: rgb(182, 41, 41); stroke: rgb(150, 166, 99);`} />
                <path d="M135.62,193.401h15.555c0-26.66,21.69-48.35,48.351-48.35v-15.555C164.289,129.495,135.62,158.163,135.62,193.401z" className={css`stroke: rgb(186, 223, 65); fill: rgb(197, 76, 76);`} />
            </g>
            <g id="pen" transform="matrix(0.650142, 0, 0, 0.632726, 674.637146, 53.467194)" >
                <path className={css`fill:#EFCE4A;`} d="M32.598,8.426l14.746,14.746l-4.47,4.47c-3.93,3.93-3.93,10.301,0,14.231l3.417,3.417L1,54.77 l9.479-45.29l3.417,3.417c3.93,3.93,10.301,3.93,14.231,0L32.598,8.426z" />
                <rect x="32.177" y="9.442" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 63.4196 52.6008)" className={css`fill:#7383BF;`} width="20.853" height="7.448" />
                <rect x="40.422" y="4.176" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 76.1336 47.3345)" className={css`fill:#434C6D;`} width="14.895" height="7.448" />
                <path className={css`fill:#F7E6A1;`} d="M31.198,24.571c-1.033-1.033-2.406-1.602-3.867-1.602s-2.834,0.568-3.867,1.602 c-1.033,1.033-1.602,2.406-1.602,3.867c0,1.121,0.341,2.186,0.964,3.09L0.293,54.063c-0.391,0.391-0.391,1.023,0,1.414 C0.488,55.672,0.744,55.77,1,55.77s0.512-0.098,0.707-0.293l22.534-22.534c0.904,0.623,1.97,0.964,3.091,0.964 c1.46,0,2.834-0.568,3.867-1.602c1.033-1.033,1.602-2.406,1.602-3.866C32.8,26.978,32.231,25.605,31.198,24.571z M29.784,30.891 c-1.311,1.311-3.595,1.311-4.905,0c-1.352-1.353-1.352-3.553,0-4.905c0.655-0.655,1.526-1.016,2.453-1.016s1.797,0.36,2.453,1.016 C31.136,27.338,31.136,29.538,29.784,30.891z" />
            </g>
            <ellipse className={css`stroke: rgb(1, 1, 1); fill-rule: evenodd; fill: none; stroke-dasharray: 2px;`} cx="439.595" cy="36.299" rx="26.329" ry="26.525" />
            <ellipse className={css`stroke: rgb(0, 0, 0);`} cx="428.629" cy="36.292" rx="2.474" ry="2.325" />
            <ellipse className={css`stroke: rgb(0, 0, 0);`} cx="439.51" cy="36.277" rx="2.474" ry="2.325" />
            <ellipse className={css`transform-origin: 420px 36px; animation: 5s linear infinite running ${anim2}; stroke: rgb(0, 0, 0);`} cx="449.279" cy="45.445" rx="2.474" ry="2.325" />
            <ellipse className={css`transform-origin: 440px 36px; animation: 5s linear infinite running ${anim1}; stroke: rgb(0, 0, 0);`} cx="459.05" cy="18.715" rx="2.474" ry="2.325" />
            <ellipse className={css`transform-origin: 440px 36px; animation: 5s linear infinite running ${anim1}; stroke: rgb(0, 0, 0);`} cx="439.174" cy="9.61" rx="2.474" ry="2.325" />
            <ellipse className={css`fill: none; stroke: rgb(0, 0, 0);`} cx="439.174" cy="36.088" rx="31.004" ry="31.598" />
            <ellipse className={css`fill: rgb(31, 219, 50);`} cx="665.274" cy="81.636" rx="2.237" ry="2.14" />
            <ellipse className={css`fill: rgb(31, 219, 50);`} cx="673.724" cy="89.426" rx="2.237" ry="2.14" />
            <ellipse className={css`fill: rgb(31, 219, 50);`} cx="645.604" cy="101.243" rx="2.237" ry="2.14" />
            <ellipse className={css`fill: rgb(31, 219, 50);`} cx="618.296" cy="101.532" rx="2.237" ry="2.14" />
            <path strokeWidth="0" d="M 325.573 252.275 C 329.097 251.695 333.202 251.794 336.983 253.327 C 341.334 255.092 347.408 258.714 349.948 263.324 C 352.638 268.206 353.177 277.217 352.023 282.266 C 351.06 286.479 349.138 289.909 345.281 292.263 C 340.163 295.388 327.504 297.719 321.424 296.473 C 316.628 295.491 312.894 292.545 310.533 288.58 C 307.82 284.027 306.276 275.129 307.421 269.638 C 308.483 264.546 312.889 259.393 316.238 256.485 C 319.059 254.034 322.207 252.829 325.573 252.275 Z" className={css`strokeWidth: 2px; fill-opacity: 0.56; fill: rgb(52, 209, 131);`} />
            <path strokeWidth="0" d="M 698.112 259.72 C 700.477 259.292 703.232 259.364 705.77 260.498 C 708.69 261.803 712.766 264.481 714.471 267.89 C 716.276 271.499 716.638 278.162 715.863 281.895 C 715.217 285.01 713.927 287.547 711.338 289.287 C 707.904 291.598 699.408 293.321 695.328 292.399 C 692.109 291.673 689.603 289.495 688.018 286.563 C 686.198 283.197 685.161 276.619 685.929 272.558 C 686.642 268.793 689.6 264.983 691.847 262.832 C 693.74 261.02 695.853 260.13 698.112 259.72 Z" className={css`strokeWidth: 2px; fill-opacity: 0.56; fill: rgb(52, 209, 131);`} />
            <line className={css`stroke: rgb(0, 0, 0); fill: none; strokeWidth: 8px; stroke-linecap: round;`} x1="361.677" y1="272.701" x2="672.875" y2="272.701" />
            <line className={css`fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0); strokeWidth: 8px; stroke-linecap: round;`} x1="688.302" y1="272.996" x2="716.599" y2="272.517" />
            <line className={css`fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0); strokeWidth: 8px; stroke-linecap: round;`} x1="315.336" y1="272.996" x2="343.633" y2="272.517" />
            <line className={css`fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0); stroke-dasharray: 8px; stroke-linecap: round;`} x1="375.569" y1="212.509" x2="375.569" y2="117.419" />
            <line className={css`fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0);`} x1="369.295" y1="213.122" x2="381.771" y2="212.909" />
            <line className={css`fill: rgb(216, 216, 216); stroke: rgb(0, 0, 0);`} x1="369.276" y1="116.796" x2="381.752" y2="116.583" />
            <g id="XMLID_1396_" transform="matrix(0.163896, 0, 0, 0.187073, 285.4245, 117.93766)" >
                <g id="XMLID_1445_">
                    <polygon className={css`fill:#FAC15C;`} points="487.582,480.106 439.571,448.099 271.534,448.099 271.534,8.002 487.582,8.002 &#9;&#9;" />
                </g>
                <g id="XMLID_1444_">
                    <polygon className={css`fill:#F9B233;`} points="487.582,8.002 375.557,448.099 271.534,448.099 271.534,8.002 &#9;&#9;" />
                </g>
                <g id="XMLID_1443_">
                    <polygon className={css`fill:#A48A7B;`} points="15.478,480.106 63.488,448.099 231.525,448.099 231.525,8.002 15.478,8.002 &#9;&#9;" />
                </g>
                <g id="XMLID_1442_">
                    <polygon className={css`fill:#CBBBA0;`} points="15.478,8.002 127.503,448.099 231.525,448.099 231.525,8.002 &#9;&#9;" />
                </g>
                <g id="XMLID_1441_">
                    <path className={css`fill:#1D1D1B;`} d="M7.476,503.06V0h232.051v464.103H65.908L7.476,503.06z M23.48,16.004v457.151l37.582-25.057 h162.461V16.004H23.48z" />
                </g>
                <g id="XMLID_1440_">
                    <path className={css`fill:#1D1D1B;`} d="M495.583,495.058L437.151,456.1H263.533V0h232.051L495.583,495.058L495.583,495.058z M279.537,440.097h162.461l37.582,25.057V16.004H279.537V440.097z" />
                </g>
                <g id="XMLID_1439_">
                    <rect x="55.487" y="64.014" className={css`fill:#1D1D1B;`} width="136.029" height="16.004" />
                </g>
                <g id="XMLID_1438_">
                    <rect x="55.487" y="104.023" className={css`fill:#1D1D1B;`} width="48.011" height="16.004" />
                </g>
                <g id="XMLID_1437_">
                    <rect x="119.501" y="104.023" className={css`fill:#1D1D1B;`} width="72.016" height="16.004" />
                </g>
                <g id="XMLID_1436_">
                    <rect x="55.487" y="144.032" className={css`fill:#1D1D1B;`} width="88.02" height="16.004" />
                </g>
                <g id="XMLID_1434_">
                    <rect x="159.509" y="144.032" className={css`fill:#1D1D1B;`} width="32.007" height="16.004" />
                </g>
                <g id="XMLID_1433_">
                    <rect x="55.487" y="184.04" className={css`fill:#1D1D1B;`} width="24.005" height="16.004" />
                </g>
                <g id="XMLID_1432_">
                    <rect x="95.496" y="184.04" className={css`fill:#1D1D1B;`} width="64.014" height="16.004" />
                </g>
                <g id="XMLID_1430_">
                    <rect x="175.513" y="184.04" className={css`fill:#1D1D1B;`} width="16.003" height="16.004" />
                </g>
                <g id="XMLID_1427_">
                    <rect x="55.487" y="224.049" className={css`fill:#1D1D1B;`} width="72.016" height="16.004" />
                </g>
                <g id="XMLID_1426_">
                    <rect x="143.506" y="224.049" className={css`fill:#1D1D1B;`} width="48.01" height="16.004" />
                </g>
                <g id="XMLID_1425_">
                    <rect x="55.487" y="264.058" className={css`fill:#1D1D1B;`} width="136.029" height="16.004" />
                </g>
                <g id="XMLID_1424_">
                    <rect x="55.487" y="304.067" className={css`fill:#1D1D1B;`} width="32.007" height="16.004" />
                </g>
                <g id="XMLID_1423_">
                    <rect x="103.498" y="304.067" className={css`fill:#1D1D1B;`} width="88.019" height="16.004" />
                </g>
                <g id="XMLID_1422_">
                    <rect x="55.487" y="344.076" className={css`fill:#1D1D1B;`} width="104.022" height="16.004" />
                </g>
                <g id="XMLID_1421_">
                    <rect x="175.513" y="344.076" className={css`fill:#1D1D1B;`} width="16.003" height="16.004" />
                </g>
                <g id="XMLID_1420_">
                    <rect x="55.487" y="384.085" className={css`fill:#1D1D1B;`} width="136.029" height="16.004" />
                </g>
                <g id="XMLID_1419_">
                    <rect x="311.543" y="384.085" className={css`fill:#1D1D1B;`} width="136.029" height="16.004" />
                </g>
                <g id="XMLID_1418_">
                    <rect x="399.562" y="344.076" className={css`fill:#1D1D1B;`} width="48.011" height="16.004" />
                </g>
                <g id="XMLID_1417_">
                    <rect x="311.543" y="344.076" className={css`fill:#1D1D1B;`} width="72.016" height="16.004" />
                </g>
                <g id="XMLID_1415_">
                    <rect x="359.553" y="304.067" className={css`fill:#1D1D1B;`} width="88.02" height="16.004" />
                </g>
                <g id="XMLID_1413_">
                    <rect x="311.543" y="304.067" className={css`fill:#1D1D1B;`} width="32.007" height="16.004" />
                </g>
                <g id="XMLID_1410_">
                    <rect x="423.568" y="264.058" className={css`fill:#1D1D1B;`} width="24.005" height="16.004" />
                </g>
                <g id="XMLID_1409_">
                    <rect x="343.55" y="264.058" className={css`fill:#1D1D1B;`} width="64.014" height="16.004" />
                </g>
                <g id="XMLID_1408_">
                    <rect x="311.543" y="264.058" className={css`fill:#1D1D1B;`} width="16.003" height="16.004" />
                </g>
                <g id="XMLID_1406_">
                    <rect x="375.557" y="224.049" className={css`fill:#1D1D1B;`} width="72.016" height="16.004" />
                </g>
                <g id="XMLID_1405_">
                    <rect x="311.544" y="224.049" className={css`fill:#1D1D1B;`} width="48.01" height="16.004" />
                </g>
                <g id="XMLID_1404_">
                    <rect x="311.543" y="184.04" className={css`fill:#1D1D1B;`} width="136.029" height="16.004" />
                </g>
                <g id="XMLID_1403_">
                    <rect x="415.566" y="144.032" className={css`fill:#1D1D1B;`} width="32.007" height="16.004" />
                </g>
                <g id="XMLID_1402_">
                    <rect x="311.543" y="144.032" className={css`fill:#1D1D1B;`} width="88.019" height="16.004" />
                </g>
                <g id="XMLID_1401_">
                    <rect x="343.55" y="104.023" className={css`fill:#1D1D1B;`} width="104.022" height="16.004" />
                </g>
                <g id="XMLID_1400_">
                    <rect x="311.543" y="104.023" className={css`fill:#1D1D1B;`} width="16.003" height="16.004" />
                </g>
                <g id="XMLID_1397_">
                    <rect x="311.543" y="64.014" className={css`fill:#1D1D1B;`} width="136.029" height="16.004" />
                </g>
            </g>
            <g transform="matrix(0.178416, 0, 0, 0.200732, 265.315948, 105.604187)" />
            <g transform="matrix(0.178416, 0, 0, 0.200732, 265.315948, 105.604187)" />
            <g transform="matrix(0.178416, 0, 0, 0.200732, 265.315948, 105.604187)" />
            <g transform="matrix(0.178416, 0, 0, 0.200732, 265.315948, 105.604187)" />
            <g transform="matrix(0.178416, 0, 0, 0.200732, 265.315948, 105.604187)" />
            <g transform="matrix(0.178416, 0, 0, 0.200732, 265.315948, 105.604187)" />
            <g transform="matrix(0.178416, 0, 0, 0.200732, 265.315948, 105.604187)" />
            <g transform="matrix(0.178416, 0, 0, 0.200732, 265.315948, 105.604187)" />
            <g transform="matrix(0.178416, 0, 0, 0.200732, 265.315948, 105.604187)" />
            <g transform="matrix(0.178416, 0, 0, 0.200732, 265.315948, 105.604187)" />
            <g transform="matrix(0.178416, 0, 0, 0.200732, 265.315948, 105.604187)" />
            <g transform="matrix(0.178416, 0, 0, 0.200732, 265.315948, 105.604187)" />
            <g transform="matrix(0.178416, 0, 0, 0.200732, 265.315948, 105.604187)" />
            <g transform="matrix(0.178416, 0, 0, 0.200732, 265.315948, 105.604187)" />
            <g transform="matrix(0.178416, 0, 0, 0.200732, 265.315948, 105.604187)" />
            <path className={css`fill: rgb(143, 158, 156);`} d="M 116.394 223.784 C 118.807 225.822 123.518 224.528 126.923 220.894 C 130.323 217.26 145.107 197.719 142.701 195.678 C 140.285 193.643 121.587 209.884 118.187 213.518 C 114.787 217.148 113.983 221.744 116.394 223.784 Z" />
            <g transform="matrix(0.213893, 0, 0, 0.203254, 56.480278, 171.324417)" >
                <path className={css`"fill:#232728;`} d="M226.069,361.913c0,19.503-15.817,124.668-35.336,124.668c-19.495,0-35.304-105.173-35.304-124.668 c0-19.495,15.817-35.32,35.304-35.32C210.253,326.593,226.069,342.418,226.069,361.913z" />
                <path className={css`"fill:#232728;`} d="M344.42,361.913c0,19.503-15.817,124.668-35.336,124.668c-19.495,0-35.304-105.173-35.304-124.668 c0-19.495,15.817-35.32,35.304-35.32C328.603,326.593,344.42,342.418,344.42,361.913z" />
            </g>
            <path className={css`fill: rgb(165, 183, 181);`} d="M 131.247 235.399 C 131.247 261.076 121.706 252.525 109.935 252.525 C 98.164 252.525 88.622 261.076 88.622 235.399 C 88.622 220.718 98.168 208.818 109.935 208.818 C 121.705 208.819 131.247 220.72 131.247 235.399 Z" />
            <path className={css`fill: rgb(143, 158, 156);`} d="M 109.935 245.723 C 98.894 245.723 89.813 253.244 88.729 232.987 C 88.657 233.689 88.622 234.49 88.622 235.401 C 88.622 261.078 98.164 252.527 109.935 252.527 C 121.706 252.527 131.247 261.078 131.247 235.401 C 131.247 234.492 131.212 233.691 131.14 232.987 C 130.055 253.244 120.978 245.723 109.935 245.723 Z" />
            <path className={css`fill: rgb(17, 211, 192);`} d="M 105.778 270.354 C 105.778 273.39 101.97 273.79 97.276 273.79 C 92.586 273.79 88.776 273.391 88.776 270.354 C 88.776 267.317 92.586 263.137 97.276 263.137 C 101.97 263.139 105.778 267.317 105.778 270.354 Z" />
            <path className={css`fill: rgb(19, 169, 209);`} d="M 105.778 270.354 C 105.778 273.39 101.97 273.79 97.276 273.79 C 92.586 273.79 88.776 273.391 88.776 270.354" />
            <path className={css`fill: rgb(17, 211, 192);`} d="M 131.092 270.354 C 131.092 273.39 127.288 273.79 122.594 273.79 C 117.902 273.79 114.094 273.391 114.094 270.354 C 114.094 267.317 117.902 263.137 122.594 263.137 C 127.288 263.139 131.092 267.317 131.092 270.354 Z" />
            <path className={css`fill: rgb(19, 169, 209);`} d="M 131.092 270.354 C 131.092 273.39 127.288 273.79 122.594 273.79 C 117.902 273.79 114.094 273.391 114.094 270.354" />
            <path className={css`fill: rgb(165, 183, 181);`} d="M 107.586 212.742 C 109.73 215.034 108.369 219.511 104.545 222.747 C 100.72 225.977 80.155 240.028 78.009 237.74 C 75.867 235.444 92.96 217.676 96.781 214.445 C 100.602 211.215 105.439 210.451 107.586 212.742 Z" />
            <polygon className={css`fill: rgb(206, 140, 103);`} points="105.945 212.483 114.79 225.892 119.45 211.916" />
            <path className={css`fill: rgb(232, 176, 133);`} d="M 137.517 196.581 C 137.517 209.388 125.165 215.825 109.938 215.825 C 94.706 215.825 82.352 209.388 82.352 196.581 C 82.352 183.771 94.705 171.325 109.938 171.325 C 125.165 171.325 137.517 183.771 137.517 196.581 Z" />
            <path className={css`fill: rgb(221, 159, 118);`} d="M 137.517 196.581 C 137.517 209.388 125.165 215.825 109.938 215.825 C 94.706 215.825 82.352 209.388 82.352 196.581" />
            <circle className={css`fill: rgb(17, 62, 73);`} cx="225.754" cy="135.877" r="11.532" transform="matrix(0.213893, 0, 0, 0.203254, 56.480278, 171.324417)" />
            <path d="M 107.241 198.943 C 107.241 200.241 106.135 201.288 104.772 201.288 C 103.409 201.288 102.307 200.241 102.307 198.943" />
            <path className={css`fill: rgb(244, 195, 162);`} d="M 109.64 203.832 C 109.508 203.832 109.373 203.787 109.271 203.686 C 108.066 202.543 106.467 201.914 104.769 201.914 L 104.767 201.914 C 103.069 201.914 101.473 202.545 100.275 203.685 C 100.071 203.878 99.743 203.883 99.541 203.686 C 99.337 203.499 99.33 203.187 99.534 202.991 C 100.933 201.661 102.789 200.926 104.766 200.926 L 104.769 200.926 C 106.75 200.926 108.609 201.656 110.01 202.988 C 110.211 203.179 110.211 203.497 110.01 203.686 C 109.909 203.786 109.778 203.832 109.64 203.832 Z" />
            <circle className={css`fill: rgb(17, 62, 73);`} cx="348.437" cy="135.877" r="11.532" transform="matrix(0.213893, 0, 0, 0.203254, 56.480278, 171.324417)" />
            <path d="M 128.542 198.943 C 128.542 200.241 129.643 201.288 131.01 201.288 C 132.373 201.288 133.475 200.241 133.475 198.943" />
            <path className={css`fill: rgb(244, 195, 162);`} d="M 126.142 203.832 C 126.271 203.832 126.405 203.787 126.508 203.686 C 127.713 202.543 129.312 201.914 131.01 201.914 L 131.013 201.914 C 132.712 201.914 134.31 202.545 135.508 203.685 C 135.709 203.878 136.037 203.883 136.243 203.686 C 136.447 203.499 136.45 203.187 136.246 202.991 C 134.855 201.661 132.991 200.926 131.015 200.926 L 131.012 200.926 C 129.033 200.926 127.175 201.656 125.77 202.988 C 125.573 203.179 125.573 203.497 125.77 203.686 C 125.873 203.786 126.004 203.832 126.142 203.832 Z" />
            <path className={css`fill: rgb(102, 63, 36);`} d="M 119.983 204.433 C 119.983 204.433 117.1 198.538 109.348 203.381 C 101.596 208.224 100.931 206.748 100.931 206.748 C 100.931 206.748 109.126 212.436 117.99 208.858 L 119.319 207.801 L 119.983 204.433 Z" />
            <path className={css`fill: rgb(84, 55, 34);`} d="M 100.929 206.746 C 100.929 206.746 109.124 212.434 117.988 208.856 L 119.317 207.799 L 119.983 204.431" />
            <path className={css`fill: rgb(102, 63, 36);`} d="M 118.426 204.433 C 118.426 204.433 121.305 198.538 129.059 203.381 C 136.812 208.224 137.476 206.748 137.476 206.748 C 137.476 206.748 129.283 212.436 120.421 208.858 L 119.088 207.801 L 118.426 204.433 Z" />
            <path className={css`fill: rgb(84, 55, 34);`} d="M 137.476 206.746 C 137.476 206.746 129.283 212.434 120.421 208.856 L 119.088 207.799 L 118.426 204.431" />
            <path className={css`fill: rgb(102, 63, 36);`} d="M 82.708 193.206 C 82.708 193.206 86.499 185.601 89.868 193.206 L 89.868 199.878 L 92.677 199.878 L 92.677 192.673 L 98.926 186.736 C 98.926 186.736 94.749 173.109 88.571 178.712 C 82.393 184.316 82.147 188.403 82.288 190.805 C 82.43 193.206 82.708 193.206 82.708 193.206 Z" />
            <g transform="matrix(0.213893, 0, 0, 0.203254, 56.480278, 171.324417)" >
                <circle className={css`fill:#6A7775;`} cx="272.622" cy="293.085" r="5.908" />
                <circle className={css`fill:#6A7775;`} cx="272.622" cy="324.592" r="5.908" />
                <circle className={css`fill:#6A7775;`} cx="272.622" cy="356.1" r="5.908" />
            </g>
            <g transform="matrix(0.213893, 0, 0, 0.203254, -20.499014, 106.140343)" />
            <g transform="matrix(0.213893, 0, 0, 0.203254, -20.499014, 106.140343)" />
            <g transform="matrix(0.213893, 0, 0, 0.203254, -20.499014, 106.140343)" />
            <g transform="matrix(0.213893, 0, 0, 0.203254, -20.499014, 106.140343)" />
            <g transform="matrix(0.213893, 0, 0, 0.203254, -20.499014, 106.140343)" />
            <g transform="matrix(0.213893, 0, 0, 0.203254, -20.499014, 106.140343)" />
            <g transform="matrix(0.213893, 0, 0, 0.203254, -20.499014, 106.140343)" />
            <g transform="matrix(0.213893, 0, 0, 0.203254, -20.499014, 106.140343)" />
            <g transform="matrix(0.213893, 0, 0, 0.203254, -20.499014, 106.140343)" />
            <g transform="matrix(0.213893, 0, 0, 0.203254, -20.499014, 106.140343)" />
            <g transform="matrix(0.213893, 0, 0, 0.203254, -20.499014, 106.140343)" />
            <g transform="matrix(0.213893, 0, 0, 0.203254, -20.499014, 106.140343)" />
            <g transform="matrix(0.213893, 0, 0, 0.203254, -20.499014, 106.140343)" />
            <g transform="matrix(0.213893, 0, 0, 0.203254, -20.499014, 106.140343)" />
            <g transform="matrix(0.213893, 0, 0, 0.203254, -20.499014, 106.140343)" />
            <line className={css`fill: rgb(216, 216, 216); strokeWidth: 3px; stroke-linecap: round; stroke: url(#gradient-0);`} x1="38.493" y1="275.36" x2="212.938" y2="275.36" />
            <g id="Google" transform="matrix(0.106533, 0, 0, 0.110606, 27.54109, 212.574295)">
                <path className={css`fill:#167EE6;`} d="M492.668,211.489l-208.84-0.01c-9.222,0-16.697,7.474-16.697,16.696v66.715 c0,9.22,7.475,16.696,16.696,16.696h117.606c-12.878,33.421-36.914,61.41-67.58,79.194L384,477.589 c80.442-46.523,128-128.152,128-219.53c0-13.011-0.959-22.312-2.877-32.785C507.665,217.317,500.757,211.489,492.668,211.489z" />
                <path className={css`fill:#12B347;`} d="M256,411.826c-57.554,0-107.798-31.446-134.783-77.979l-86.806,50.034 C78.586,460.443,161.34,512,256,512c46.437,0,90.254-12.503,128-34.292v-0.119l-50.147-86.81 C310.915,404.083,284.371,411.826,256,411.826z" />
                <path className={css`fill:#0F993E;`} d="M384,477.708v-0.119l-50.147-86.81c-22.938,13.303-49.48,21.047-77.853,21.047V512 C302.437,512,346.256,499.497,384,477.708z" />
                <path className={css`fill:#FFD500;`} d="M100.174,256c0-28.369,7.742-54.91,21.043-77.847l-86.806-50.034C12.502,165.746,0,209.444,0,256 s12.502,90.254,34.411,127.881l86.806-50.034C107.916,310.91,100.174,284.369,100.174,256z" />
                <path className={css`fill:#FF4B26;`} d="M256,100.174c37.531,0,72.005,13.336,98.932,35.519c6.643,5.472,16.298,5.077,22.383-1.008 l47.27-47.27c6.904-6.904,6.412-18.205-0.963-24.603C378.507,23.673,319.807,0,256,0C161.34,0,78.586,51.557,34.411,128.119 l86.806,50.034C148.202,131.62,198.446,100.174,256,100.174z" />
                <path className={css`fill:#D93F21;`} d="M354.932,135.693c6.643,5.472,16.299,5.077,22.383-1.008l47.27-47.27 c6.903-6.904,6.411-18.205-0.963-24.603C378.507,23.672,319.807,0,256,0v100.174C293.53,100.174,328.005,113.51,354.932,135.693z" />
            </g>
            <g id="MUI" transform="matrix(0.284287, 0, 0, 0.340819, 139.700546, 165.037354)">
                <polygon fill="#00B0FF" points="0 110.848 0 0 96 55.424 96 92.3733333 32 55.424 32 129.322667" />
                <polygon fill="#0081CB" points="96 55.424 192 0 192 110.848 128 147.797333 96 129.322667 160 92.3733333 160 55.424 96 92.3733333" />
                <polygon fill="#00B0FF" points="96 129.322667 96 166.272 160 203.221333 160 166.272" />
                <path d="M160,203.221333 L256,147.797333 L256,73.8986667 L224,92.3733333 L224,129.322667 L160,166.272 L160,203.221333 Z M224,55.424 L224,18.4746667 L256,5.68434189e-14 L256,36.9493333 L224,55.424 Z" fill="#0081CB" />
            </g>
            <path strokeWidth="0" d="M 496.229 25.283 C 497.712 25.011 499.439 25.057 501.03 25.775 C 502.861 26.602 505.416 28.299 506.485 30.46 C 507.617 32.748 507.844 36.97 507.358 39.336 C 506.953 41.309 506.144 42.917 504.521 44.021 C 502.367 45.485 497.041 46.577 494.483 45.993 C 492.466 45.533 490.894 44.153 489.901 42.295 C 488.759 40.161 488.109 35.992 488.591 33.419 C 489.037 31.032 490.892 28.618 492.301 27.255 C 493.488 26.107 494.813 25.542 496.229 25.283 Z" className={css`strokeWidth: 2px; fill-opacity: 0.56; fill: rgb(52, 209, 131);`} />
        </SvgIcon>
    );
};

export default MUIBannerSVG;
