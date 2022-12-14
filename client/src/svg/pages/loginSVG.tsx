import { SvgIconProps } from '@mui/material';
import { ReactComponent as LOGINSVG } from './login.svg';
import { css } from '@emotion/css';
import { useTheme } from '@mui/material/styles';
import { assess } from 'helperFunctions/componentAssess';

export const LoginSVG: React.FC<SvgIconProps> = (props) => {
  assess && console.log('assess')
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
