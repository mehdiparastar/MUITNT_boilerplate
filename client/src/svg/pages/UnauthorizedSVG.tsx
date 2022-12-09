import { SvgIconProps } from '@mui/material';
import { ReactComponent as UNAUTHORIZEDSVG } from './unauthorized.svg';
import { css } from '@emotion/css';
import { useTheme } from '@mui/material/styles';

export const UnauthorizedSVG: React.FC<SvgIconProps> = (props) => {
  const theme = useTheme();
  return (
    <UNAUTHORIZEDSVG
      className={css`
        .mainprimary {
          fill: ${theme.palette.primary.main}!important;
        }

        .mainprimary path {
          fill: ${theme.palette.primary.main};
        }

        #darkprimary path {
          fill: ${theme.palette.primary.dark};
        }

        #mainsecondary path {
          fill: ${theme.palette.secondary.main};
        }
      `}
      {...props}
    />
  );
};
