import React from 'react';
import { useTheme } from '@mui/material/styles';

interface SVGProps {
  width?: number
  height?: number
}

const MUITNMSVG: React.FC<SVGProps> = ({ width = 101.36, height = 70 }) => {
  const theme = useTheme();
  const colorPrimaryDark = theme.palette.primary.dark;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 133.22 92"
    >
      <rect
        x="20"
        y="1"
        width="93.22"
        height="90"
        fill='none'
        stroke={colorPrimaryDark}
        strokeWidth="1"
        rx="1"
        ry="1"
      />
      <text
        x={39.5}
        y={38}
        fill={theme.palette.primary.dark}
        stroke={theme.palette.primary.dark}
        fontSize="35"
        fontWeight="600"
        strokeWidth={2.5}
      >
        MP
      </text>
      <text
        x={1}
        y={78}
        fill={theme.palette.secondary.main}
        fontSize="28"
        fontWeight={600}
        letterSpacing={2.5}
        strokeWidth={2}
        stroke={theme.palette.secondary.main}
      >
        MUITNM
      </text>      
    </svg>
  );
};


export default MUITNMSVG;
