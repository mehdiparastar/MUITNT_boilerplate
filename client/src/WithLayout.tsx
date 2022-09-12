import { ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import getTheme from 'theme';
import { paletteTypes } from 'theme/paletteTypes';
import { themeMode, themePaletteType } from 'types/types';

type Props = {
  children?: React.ReactNode;
};

export const ThemeContext = React.createContext({
  themeMode: {
    toggleThemeMode: () => {},
  },
  themePaletteType: {
    changeThemePaletteType: (type: themePaletteType) => {},
  },
});

export const WithLayout: React.FC<Props> = ({ children }) => {
  const [mode, setMode] = React.useState<themeMode>('light');
  const [palleteType, setPaletteType] = React.useState<themePaletteType>(
    paletteTypes[0],
  );

  const themeMode = React.useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const themePaletteType = React.useMemo(
    () => ({
      changeThemePaletteType: (type: themePaletteType = 'green') => {
        const palette: themePaletteType =
          paletteTypes.indexOf(type) === -1 ? 'green' : type;

        setPaletteType(palette);
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () => getTheme(mode, palleteType),
    [mode, palleteType],
  );

  return (
    <ThemeContext.Provider value={{ themeMode, themePaletteType }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
