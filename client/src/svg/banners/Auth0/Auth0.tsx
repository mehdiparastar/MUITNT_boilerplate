import React from 'react';
import { useTheme } from '@mui/material/styles';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { keyframes } from '@emotion/react';
import { css } from '@emotion/css';

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

const Auth0BannerSVG: React.FC<SvgIconProps> = ({ sx, ...rest }) => {
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
        padding: 0,
      }}
      {...rest}
    >
      {/* <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 800 310" {...rest}> */}
      <g>
        <g fill="rgb(155, 65, 65)">
          <g>
            <rect
              strokeWidth="8"
              fill="rgb(255, 255, 255)"
              stroke="#021818"
              x="11.3"
              y="9.3"
              width="283.6"
              height="174"
            />
            <rect
              fill="#021818"
              x="127.2"
              y="186.6"
              width="50"
              height="49.4"
            />
            <rect
              fill="#021818"
              x="93.5"
              y="234.7"
              width="119.4"
              height="29.4"
            />
          </g>
          <g>
            <ellipse
              cx="152.6"
              cy="67.2"
              rx="15"
              ry="15"
              fill="#021818"
            />
            <polyline
              points="147.8,78.8 142.7,136.2 165.1,136.2 158.6,78.4"
              fill="#021818"
            />
            <rect
              x="112.3"
              y="141.5"
              width="82"
              height="18"
              fill="#2b8b3b"
              rx="10"
              ry="10"
            />
          </g>
          <g transform="matrix(0.9,0.4,-0.4,0.9,33.6,-78.4)">
            <rect
              rx="4"
              ry="4"
              x="171"
              y="76.9"
              width="84"
              height="7.8"
              fill="#ffff00"
            />
            <g>
              <rect
                x="175"
                y="84.1"
                width="2.4"
                height="9.2"
                fill="rgb(252, 255, 0)"
              />
              <rect
                x="176.6"
                y="82.1"
                width="3"
                height="9.2"
                fill="rgb(252, 255, 0)"
              />
              <rect
                x="179.1"
                y="84.1"
                width="2.2"
                height="9.8"
                fill="rgb(252, 255, 0)"
              />
              <rect
                x="180.9"
                y="81"
                width="3.2"
                height="9.2"
                fill="rgb(252, 255, 0)"
              />
              <rect
                x="182.8"
                y="82.7"
                width="2.4"
                height="10"
                fill="rgb(252, 255, 0)"
              />
              <rect
                x="185"
                y="82.7"
                width="2.4"
                height="9.2"
                fill="rgb(252, 255, 0)"
              />
              <rect
                x="186.6"
                y="81.6"
                width="2.2"
                height="9.2"
                fill="rgb(252, 255, 0)"
              />
              <rect
                x="188.5"
                y="84.1"
                width="2.4"
                height="10"
                fill="rgb(252, 255, 0)"
              />
            </g>
            <g>
              <ellipse
                cx="262.4"
                cy="80.6"
                rx="13.5"
                ry="16.8"
                fill="rgb(252, 255, 0)"
              />
              <ellipse
                cx="262.7"
                cy="75.6"
                rx="8.1"
                ry="7.4"
                fill="rgb(255, 255, 255)"
              />
              <ellipse
                fill="rgb(255, 255, 255)"
                cx="262.7"
                cy="85.6"
                rx="8.1"
                ry="7.4"
              />
            </g>
            <rect
              x="243.3"
              y="74.4"
              width="4.2"
              height="12.4"
              rx="3"
              ry="3"
              fill="rgb(255, 255, 0)"
            />
          </g>
        </g>
        <g>
          <path
            d="M 277.2 215 L 329.3 221.8 L 318.9 294.3 L 308.4 293.5 L 303.2 216.7 L 292.8 242.3 L 298 291.3 L 287.6 293.5 L 272 244.5 Q 266.8 221.8 273.6 200"
            fill="#021818"
          />
          <path
            transform="matrix(1,0,0,1,-10.1,11.2)"
            d="M 329.3 290.3 C 329.3 290.3 310 291.9 310 291.9 S 309 287.8 309 287.8 S 318.7 283.8 318.7 283.8 S 328.7 284.7 328.7 284.7"
            fill="#021818"
          />
          <path
            transform="matrix(1,-0.3,0.3,1,-77.8,104.8)"
            d="M 294.5 281.2 C 294.5 281.2 275.1 282.8 275.1 282.8 S 274.1 278.7 274.1 278.7 S 283.8 274.7 283.8 274.7 S 293.8 275.6 293.8 275.6"
            fill="#021818"
          />
          <polyline
            points="304.5,122.3 302.8,140.7 271.6,138.2 250.4,101.5 251.2,97.8 279.1,124"
            fill="rgba(163, 102, 82, 0.9)"
          />
          <path
            d="M 286.5 108.5 L 309.5 106.5 Q 359.5 168.5 335.5 224.5 L 264.5 213.5 Z"
            fill="rgb(163, 102, 82)"
          />
          <polyline
            transform="matrix(1,-0.1,0.1,1,-16.2,46.4)"
            points="304.3,113.1 302.6,131.4 271.3,128.9 247.6,92.2 250.9,88.5 278.8,114.7"
            fill="rgb(173, 102, 82)"
          />
          <polyline
            points="243.2,110.6 241,109.1 239.2,110.6 241,113.5"
            fill="rgb(237, 208, 179)"
          />
          <polyline
            points="247.7,96 246.7,96.4 246.6,96.9 246.7,97.4 246.9,97.9 247.1,98"
            fill="rgb(237, 208, 179)"
          />
          <path
            d="M 299.6 102.5 C 284.1 104.2 284 86.8 284 86.8 S 285.4 85.3 285.4 85.3 S 307 85.1 307 85.1 S 306.9 101 307 101"
            fill="rgb(237, 208, 179)"
          />
          <path
            d="M 308.4 88.8 C 308.4 88.8 314.5 89.4 314.5 89.4 S 315 76.9 315 76.9 S 282.6 74.5 282.6 74.5 S 279.8 77.9 279.8 77.9 S 279.6 81.3 279.6 81.3 S 284 86.7 284 86.7"
            fill="rgb(193, 20, 20)"
          />
          <path
            d="M 307.1 88.3 C 306.9 87.3 305.9 101.2 305.9 101.2 S 313.8 100 313.8 100 S 314.6 88.7 314.6 88.3"
            fill="rgb(193, 20, 20)"
          />
        </g>
        <g>
          <text
            className={css`
              animation: 1s linear 0.9s infinite running ${anim7};
            `}
            y="56.4"
            textLength="90"
            fontSize="20"
            x="19.1"
            fill={colorPrimaryLight}
          >
            11001001
          </text>
          <text
            className={css`
              animation: 1s linear 0.75s infinite running ${anim6};
            `}
            y="76.4"
            textLength="90"
            fontSize="20"
            x="19.1"
            fill={colorPrimaryMain}
          >
            00110101
          </text>
          <text
            className={css`
              animation: 1s linear 0.6s infinite running ${anim5};
            `}
            y="96.4"
            textLength="90"
            fontSize="20"
            x="19.1"
            fill={colorPrimaryDark}
          >
            11001100
          </text>
          <text
            className={css`
              animation: 1s linear 0.45s infinite running ${anim4};
            `}
            y="116.4"
            textLength="90"
            fontSize="20"
            x="19.1"
            fill={colorSecondaryLight}
          >
            01010001
          </text>
          <text
            className={css`
              animation: 1s linear 0.3s infinite running ${anim3};
            `}
            y="136.4"
            textLength="90"
            fontSize="20"
            x="19.1"
            fill={colorSecondaryMain}
          >
            11110010
          </text>
          <text
            className={css`
              animation: 1s linear 0.15s infinite running ${anim2};
            `}
            y="156.4"
            textLength="90"
            fontSize="20"
            x="19.1"
            fill={colorSecondaryDark}
          >
            00111101
          </text>
          <text
            className={css`
              animation: 1s linear 0s infinite running ${anim1};
            `}
            y="176.4"
            textLength="90"
            fontSize="20"
            x="19.1"
            fill={colorPrimaryLight}
          >
            10110001
          </text>
        </g>
        <g>
          <text
            textLength="180"
            fontWeight="600"
            fontSize="28"
            x="383.1"
            y="51.9"
            fill="#021818"
          >
            AN EFFECTIVE
          </text>
          <text
            x="383.1"
            textLength="180"
            fontWeight="900"
            fontSize="45"
            y="91.9"
            fill="#034d24"
          >
            SOCIAL
          </text>
          <text
            x="383.1"
            textLength="405"
            fontWeight="900"
            fontSize="45"
            y="141.9"
            fill="#034d24"
          >
            AUTHENTICATION
          </text>
          <text
            x="383.1"
            textLength="250"
            fontWeight="900"
            fontSize="45"
            y="191.9"
            fill="none"
            stroke={colorPrimaryDark}
            strokeWidth="1px"
          >
            SOLUTION
          </text>
          <text
            x="383.1"
            textLength="250"
            fontWeight="900"
            fontSize="45"
            y="191.9"
            // fill="none"
            stroke={colorPrimaryDark}
            strokeWidth="1px"
            className={css`
              color: ${colorSecondaryMain};
              animation: ${anim8} 2s ease-in-out infinite;
            `}
          >
            SOLUTION
          </text>

          <text
            textLength="180"
            fontWeight="600"
            fontSize="28"
            x="383.1"
            y="225.9"
            fill="#021818"
            className={css`
              &:hover {
                animation: 1s ${anim9} ease-in-out;
              }
            `}
          >
            WITH AUTH0
          </text>
        </g>
      </g>
    </SvgIcon>
  );
};

export default Auth0BannerSVG;
