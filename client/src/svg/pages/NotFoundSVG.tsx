import { SvgIconProps } from '@mui/material';
import { ReactComponent as NOTFOUNDSVG } from './not-found.svg';
import { css } from '@emotion/css';
import { useTheme } from '@mui/material/styles';
import { assess } from 'helperFunctions/componentAssess';

export const NotFoundSVG: React.FC<SvgIconProps> = (props) => {
  assess && console.log('assess')
  const theme = useTheme();
  return (
    <NOTFOUNDSVG
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
