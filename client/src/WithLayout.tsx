import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import AOS from 'aos';
import { assess } from 'helperFunctions/componentAssess';
import * as React from 'react';
import getTheme from 'theme';
import { paletteTypes } from 'theme/paletteTypes';

export const ThemeContext = React.createContext({
  themeMode: {
    toggleThemeMode: () => {},
  },
  themePaletteType: {
    changeThemePaletteType: (type: themePaletteType) => {},
  },
  themeTopbarCompDimentions: {
    updateThemeTopbarCompDimensions: (height: number, width: number) => {},
  },
  themeFooterCompDimentions: {
    updateThemeFooterCompDimensions: (height: number, width: number) => {},
  },
});

export const WithLayout: React.FC<Props> = ({ children }) => {
  assess && console.log('assess');
  const [mode, setMode] = React.useState<themeMode>('dark');
  const [palleteType, setPaletteType] = React.useState<themePaletteType>(
    paletteTypes[0],
  );
  const [topbarCompHeight, setTopbarCompHeight] = React.useState<number>(0);
  const [topbarCompWidth, setTopbarCompWidth] = React.useState<number>(0);
  const [footerCompHeight, setFooterCompHeight] = React.useState<number>(0);
  const [footerCompWidth, setFooterCompWidth] = React.useState<number>(0);

  const themeMode = React.useMemo(() => {
    // Remove the server-side injected CSS.
    const jssStyles: HTMLInputElement | null =
      document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }

    AOS.init({
      offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 400, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: true, // whether animation should happen only once - while scrolling down
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });

    return {
      toggleThemeMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    };
  }, []);

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

  const themeTopbarCompDimentions = React.useMemo(
    () => ({
      updateThemeTopbarCompDimensions: (
        height: number = 0,
        width: number = 0,
      ) => {
        if (topbarCompHeight !== height) setTopbarCompHeight(height);
        if (topbarCompWidth !== width) setTopbarCompWidth(width);
      },
    }),
    [topbarCompHeight, topbarCompWidth],
  );

  const themeFooterCompDimentions = React.useMemo(
    () => ({
      updateThemeFooterCompDimensions: (
        height: number = 0,
        width: number = 0,
      ) => {
        if (footerCompHeight !== height) setFooterCompHeight(height);
        if (footerCompWidth !== width) setFooterCompWidth(width);
      },
    }),
    [footerCompHeight, footerCompWidth],
  );

  const theme = React.useMemo(() => {
    AOS.refresh();
    return getTheme(
      mode,
      palleteType,
      topbarCompHeight,
      topbarCompWidth,
      footerCompHeight,
      footerCompWidth,
    );
  }, [
    mode,
    palleteType,
    topbarCompHeight,
    topbarCompWidth,
    footerCompHeight,
    footerCompWidth,
  ]);

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        themePaletteType,
        themeTopbarCompDimentions,
        themeFooterCompDimentions,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline /*enableColorScheme => enabling this makes oauth2 ugly*/ />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
