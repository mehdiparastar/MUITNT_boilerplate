import { SvgIconProps } from '@mui/material';
import { ReactComponent as UI02SVG } from './UI02.svg';
import { css } from '@emotion/css';
import { useTheme } from '@mui/material/styles';
import clsx from 'clsx';


export const UI02BGSVG: React.FC<SvgIconProps> = ({ className, ...rest }) => {
  
  const theme = useTheme();
  return (
    <UI02SVG
      className={clsx([
        css`
          .shirt {
            fill: ${theme.palette.secondary.main};
          }

          .text {
            fill: ${theme.palette.primary.main} !important;
          }
        `,
        className,
      ])}
      {...rest}
    />
  );
};
