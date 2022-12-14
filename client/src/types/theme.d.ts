import * as theme from '@material-ui/core/styles';

declare module '@mui/material/styles' {
  interface Theme extends theme.Theme {
    layout: {
      contentWidth: number;
    };
  }

  interface ThemeOptions extends theme.ThemeOptions {
    layout?: {
      contentWidth: number;
    };
  }
}
