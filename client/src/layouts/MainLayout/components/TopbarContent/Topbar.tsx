import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { colors } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { paletteTypes } from 'theme/paletteTypes';
import { ThemeContext } from 'WithLayout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MUITNMSVG from 'svg/logos/MUITNM';

export const Topbar: React.FC<Props & { onSidebarOpen: () => void }> = ({
  onSidebarOpen,
}) => {
  const theme = useTheme();
  const themeConfig = React.useContext(ThemeContext);

  const themeMode = theme.palette.mode;
  const paletteType = theme.palette.paletteType;
  const themeToggler = themeConfig.themeMode.toggleThemeMode;
  const setThemePalette = themeConfig.themePaletteType.changeThemePaletteType;

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={'100%'}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
      >
        <IconButton
          color="primary"
          aria-label="Menu"
          edge="start"
          onClick={onSidebarOpen}
          sx={{ mr: { xs: 1, sm: 2 } }}
        >
          <MenuIcon />
        </IconButton>
        <MUITNMSVG
          sx={{
            width: 50,
            height: { xs: 28, ms: 32 },
          }}
        />
      </Box>
      <Box
        display="flex"
        alignItems={'center'}
      >
        <Box
          display={'flex'}
          padding={1}
          borderRadius={8}
          bgcolor={theme.palette.alternate.main}
        >
          {paletteTypes.map((item, i) => (
            <Box
              key={item}
              bgcolor={colors[item][700]}
              width={20}
              height={20}
              borderRadius={'100%'}
              marginRight={i === paletteTypes.length - 1 ? 0 : 1}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              sx={{ cursor: 'pointer' }}
              onClick={() => setThemePalette(item)}
            >
              {paletteType === item && (
                <svg
                  width={12}
                  height={12}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </Box>
          ))}
        </Box>
        <Box>
          <IconButton
            onClick={() => themeToggler()}
            aria-label="Dark mode toggler"
            sx={{
              color: themeMode === 'light' ? 'common.black' : 'common.white',
            }}
          >
            {themeMode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
