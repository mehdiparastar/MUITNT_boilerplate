import { SvgIconProps } from '@mui/material';
import { ReactComponent as UI03SVG } from './UI03.svg';
import { css } from '@emotion/css';
import { useTheme } from '@mui/material/styles';

export const UI03BGSVG: React.FC<SvgIconProps> = (props) => {
  const theme = useTheme();
  return (
    <UI03SVG
      className={css`        
      `}
      {...props}
    />
  );
};
