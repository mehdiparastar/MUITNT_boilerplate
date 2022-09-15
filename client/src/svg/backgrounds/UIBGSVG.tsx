import { SvgIconProps } from '@mui/material';
import { ReactComponent as UISVG } from './UI.svg';
import { css } from '@emotion/css';
import { useTheme } from '@mui/material/styles';

export const UIBGSVG: React.FC<SvgIconProps> = (props) => {
  const theme = useTheme();
  return (
    <UISVG
      className={css`
        #shirt {
          fill: ${theme.palette.secondary.dark};
        }

        #menu {
          fill: ${theme.palette.primary.light};
        }

        #bigborder {
          fill: ${theme.palette.text.primary};
        }

        #pageheader {
          fill: ${theme.palette.primary.dark};
        }

        #manhead {
          fill: ${theme.palette.common.black};
        }

        #manpant {
          fill: ${theme.palette.primary.main};
        }

        #leftleaf {
          fill: ${theme.palette.success.main};
        }

        #rightleaf {
          fill: ${theme.palette.success.dark};
        }

        #middleleaf {
          fill: ${theme.palette.success.light};
        }
      `}
      {...props}
    />
  );
};
