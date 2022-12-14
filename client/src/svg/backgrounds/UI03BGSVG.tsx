import { SvgIconProps } from '@mui/material';
import { ReactComponent as UI03SVG } from './UI03.svg';
import { css } from '@emotion/css';
import { useTheme } from '@mui/material/styles';
import { assess } from 'helperFunctions/componentAssess';

export const UI03BGSVG: React.FC<SvgIconProps> = (props) => {
  assess && console.log('assess')
  const theme = useTheme();
  return (
    <UI03SVG
      className={css`        
      `}
      {...props}
    />
  );
};
