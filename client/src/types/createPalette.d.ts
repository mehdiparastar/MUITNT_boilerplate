import * as createPalette from '@material-ui/core/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface Palette extends createPalette.Palette {
    alternate: {
      main: string;
      dark: string;
    };
    cardShadow: string;
    paletteType: themePaletteType;
  }

  interface PaletteOptions extends createPalette.PaletteOptions {
    alternate?: {
      main: string;
      dark: string;
    };
    cardShadow?: string;
    paletteType?: themePaletteType;
  }

  interface TypeBackground extends createPalette.TypeBackground {
    level1: string;
    level2: string;
  }
}
