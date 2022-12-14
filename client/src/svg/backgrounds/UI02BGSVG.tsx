import { SvgIconProps } from '@mui/material';
import { ReactComponent as UI02SVG } from './UI02.svg';
import { css } from '@emotion/css';
import { useTheme } from '@mui/material/styles';
import clsx from 'clsx';
import { assess } from 'helperFunctions/componentAssess';

export const UI02BGSVG: React.FC<SvgIconProps> = ({ className, ...rest }) => {
  assess && console.log('assess')
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
