import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import AOS from 'aos';
import * as React from 'react';
import { useCookies } from 'react-cookie';
import getTheme from 'theme';
import { paletteTypes } from 'theme/paletteTypes';

export const ThemeContext = React.createContext({
  themeMode: {
    toggleThemeMode: () => { },
  },
  themePaletteType: {
    changeThemePaletteType: (type: themePaletteType) => { },
  },
});

export const WithLayout: React.FC<Props> = ({ children }) => {
  const [cookies, setCookie] = useCookies<string, { 'theme-mode': themeMode, 'theme-pallete-type': themePaletteType }>(['theme-mode', 'theme-pallete-type']);

  const [mode, setMode] = React.useState<themeMode>(cookies['theme-mode'] || 'dark');
  const [palleteType, setPaletteType] = React.useState<themePaletteType>(cookies['theme-pallete-type'] || paletteTypes[0]);

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
        setCookie('theme-mode', mode === 'light' ? 'dark' : 'light')
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    };
  }, [mode, setCookie]);

  const themePaletteType = React.useMemo(
    () => ({
      changeThemePaletteType: (type: themePaletteType = 'green') => {
        const palette: themePaletteType =
          paletteTypes.indexOf(type) === -1 ? 'green' : type;

        setCookie('theme-pallete-type', palette)
        setPaletteType(palette);
      },
    }),
    [setCookie],
  );


  const theme = React.useMemo(() => {
    AOS.refresh();
    return getTheme(
      mode,
      palleteType,
    );
  }, [
    mode,
    palleteType,
  ]);

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        themePaletteType,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline /*enableColorScheme => enabling this makes oauth2 ugly*/ />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
