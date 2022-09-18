import { SvgIconProps } from '@mui/material';
import { ReactComponent as MAINTENANCESVG } from './maintenance.svg';
import { css } from '@emotion/css';
import { useTheme } from '@mui/material/styles';

export const MaintenanceSVG: React.FC<SvgIconProps> = (props) => {
  const theme = useTheme();
  return (
    <MAINTENANCESVG
      className={css`
        #mainprimary path {
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
