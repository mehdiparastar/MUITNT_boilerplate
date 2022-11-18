import { SvgIconProps } from '@mui/material';
import { ReactComponent as LOGINSVG } from './login.svg';
import { css } from '@emotion/css';
import { useTheme } from '@mui/material/styles';

export const LoginSVG: React.FC<SvgIconProps> = (props) => {
  const theme = useTheme();
  return (
    <LOGINSVG
      className={css`
        #mainprimary {
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
