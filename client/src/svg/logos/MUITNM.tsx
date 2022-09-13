import React from 'react';
import { useTheme } from '@mui/material/styles';
import { SvgIcon, SvgIconProps } from '@mui/material';


const MUITNMSVG: React.FC<SvgIconProps> = ({
  width = 101.36,
  height = 70,
  ...rest
}) => {
  const theme = useTheme();
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 133.22 92"
      {...rest}
    >
      <rect
        x="20"
        y="1"
        width="93.22"
        height="90"
        fill="none"
        stroke={theme.palette.primary.dark}
        strokeWidth="2"
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
    </SvgIcon>
  );
};

export default MUITNMSVG;
