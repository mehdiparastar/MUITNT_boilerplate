import { SvgIconProps } from '@mui/material';
import { ReactComponent as UI01SVG } from './UI01_modified.svg';
import { css } from '@emotion/css';
import { useTheme } from '@mui/material/styles';
import { assess } from 'helperFunctions/componentAssess';

export const UI01BGMODIFIEDSVG: React.FC<SvgIconProps> = (props) => {
  assess && console.log('assess')
  const theme = useTheme();
  return (
    <UI01SVG
      className={css`
        #bigborder,
        #pageheader {
          stroke: ${theme.palette.alternate.dark} !important;
        }
      `}
      {...props}
    />
  );
};
