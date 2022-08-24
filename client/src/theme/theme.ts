import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
        light: '#63b8ff',
        main: '#0989e3',
        dark: '#005db0',
        contrastText: '#000',
    },
    secondary: {
        main: '#4db6ac',
        light: '#82e9de',
        dark: '#00867d',
        contrastText: '#000',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;

