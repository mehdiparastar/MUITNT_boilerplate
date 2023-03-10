import { SvgIconProps } from '@mui/material';
import { ReactComponent as UI01SVG } from './UI01.svg';
import { css } from '@emotion/css';
import { useTheme } from '@mui/material/styles';


export const UI01BGSVG: React.FC<SvgIconProps> = (props) => {
  
  const theme = useTheme();
  return (
    <UI01SVG
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
