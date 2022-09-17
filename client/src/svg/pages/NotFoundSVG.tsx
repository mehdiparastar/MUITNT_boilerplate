import { SvgIconProps } from '@mui/material';
import { ReactComponent as UI03SVG } from './not-found.svg';
import { css } from '@emotion/css';
import { useTheme } from '@mui/material/styles';

export const NotFoundSVG: React.FC<SvgIconProps> = (props) => {
  const theme = useTheme();
  return (
    <UI03SVG
      className={css`
        #qmark path {
          fill: ${theme.palette.primary.main};
        }

        #coat path {
          fill: ${theme.palette.secondary.main};
        }        

        #shirt {
          fill: ${theme.palette.primary.main};
        }
      `}
      {...props}
    />
  );
};
