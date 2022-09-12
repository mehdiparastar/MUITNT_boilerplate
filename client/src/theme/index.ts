import { responsiveFontSizes, createTheme } from '@mui/material/styles';
import shadows from './shadows';
import palette from './palette';
import { themeMode, themePaletteType } from 'types/types';
import IransansXWoff from '../assets/fonts/IRANSansX-Regular.woff';
import IransansXWoff2 from '../assets/fonts/IRANSansX-Regular.woff2';
import IransansXBoldWoff from '../assets/fonts/IRANSansX-Bold.woff';
import IransansXBoldWoff2 from '../assets/fonts/IRANSansX-Bold.woff2';

const getTheme = (mode: themeMode, paletteType: themePaletteType) =>
  responsiveFontSizes(
    createTheme({
      palette: palette(mode, paletteType),
      layout: {
        contentWidth: 1236,
      },
      shadows: shadows(mode),
      typography: {
        fontFamily: '"Inter", sans-serif',
        button: {
          textTransform: 'none',
          fontWeight: 'medium',
        },
      },
      zIndex: {
        appBar: 1200,
        drawer: 1300,
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: (themeParam) => `        
            @font-face {
              font-family: 'IRANSansX';
              font-style: normal;
              font-weight: 400;
              src: url(${IransansXWoff}) format('woff'), url(${IransansXWoff2}) format('woff2');
            }      
            
            @font-face {
              font-family: 'IRANSansX';
              font-style: normal;
              font-weight: 700;
              src: url(${IransansXBoldWoff}) format('woff'), url(${IransansXBoldWoff2}) format('woff2');
            }                  
          `,
        },
        MuiButton: {
          styleOverrides: {
            containedSecondary: mode === 'light' ? { color: 'white' } : {},
          },
        },
      },
    }),
  );

export default getTheme;
