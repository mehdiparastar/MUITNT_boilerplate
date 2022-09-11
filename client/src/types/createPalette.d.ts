import * as createPalette from '@material-ui/core/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface Palette extends createPalette.Palette {
    alternate: {
      main: string;
      dark: string;
    };
    cardShadow: string;
  }

  interface PaletteOptions extends createPalette.PaletteOptions {
    alternate?: {
      main: string;
      dark: string;
    };
    cardShadow?: string;
  }

  interface TypeBackground extends createPalette.TypeBackground {
    level1: string;
    level2: string;
  }
}
