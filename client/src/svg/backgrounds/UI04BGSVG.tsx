import { css } from '@emotion/css';
import { useTheme } from '@mui/material/styles';
import { SvgIconProps } from '@mui/material/SvgIcon';
import React from 'react';
import { ReactComponent as UI04SVG } from './UI04.svg';

const UI04BGSVG: React.FC<SvgIconProps & { maxwidth?: string | number }> = (props) => {

  const theme = useTheme();

  return (
    <UI04SVG
      className={css`
        #dots {
          fill: ${theme.palette.primary.main};  
        }
        
        #lines {
          stroke: ${theme.palette.primary.light};
        }          
      `}
      {...props}
    />
  );
};

export default UI04BGSVG;
