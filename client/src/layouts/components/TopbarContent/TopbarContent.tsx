import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { colors } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import { useAppSelector } from 'redux/hooks';
import { selectCurrentAccessToken } from 'redux/features/WHOLE_APP/auth/authSlice';
import { useGetCurrentUserQuery } from 'redux/features/WHOLE_APP/currentUser/currentUserApiSlice';
import React from 'react';
import MUITNTSVG from 'svg/logos/MUITNT';
import { paletteTypes } from 'theme/paletteTypes';
import { ThemeContext } from 'WithLayout';
import LogOutCountDownBadge from './components/LogOutCountDownBadge';

export const TopbarContent: React.FC<Props & { onSidebarOpen: () => void }> = ({
  onSidebarOpen,
}) => {

  const theme = useTheme();
  const themeConfig = React.useContext(ThemeContext);
  const accessToken = useAppSelector(selectCurrentAccessToken)
  const themeMode = theme.palette.mode;
  const paletteType = theme.palette.paletteType;
  const themeToggler = themeConfig.themeMode.toggleThemeMode;
  const setThemePalette = themeConfig.themePaletteType.changeThemePaletteType;
  const { data: currentUser } = useGetCurrentUserQuery(accessToken)

  return (
    <Grid container justifyContent={'space-between'} alignItems={'center'}>
      <Grid container justifyContent={'center'} alignItems={'center'}>
        <IconButton
          color="primary"
          aria-label="Menu"
          edge="start"
          onClick={onSidebarOpen}
          sx={{ mx: 0.5 }}
        >
          <MenuIcon />
        </IconButton>
        {accessToken && currentUser?.email ? (
          <LogOutCountDownBadge />
        ) : (
          <MUITNTSVG
            sx={{
              width: 50,
              height: { xs: 28, md: 32 },
            }}
          />
        )}
      </Grid>
      <Grid container alignItems={'center'}>
        <Grid
          container
          padding={1}
          borderRadius={8}
          bgcolor={theme.palette.alternate.main}
        >
          {paletteTypes.map((item, i) => (
            <Grid
              container
              key={item}
              bgcolor={colors[item][700]}
              width={18}
              height={18}
              borderRadius={'100%'}
              marginRight={i === paletteTypes.length - 1 ? 0 : 1}
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
            </Grid>
          ))}
        </Grid>
        <Grid container justifyContent={'center'} alignItems={'center'}>
          <IconButton
            onClick={() => themeToggler()}
            aria-label="Dark mode toggler"
            sx={{
              color: themeMode === 'light' ? 'blueviolet' : 'yellow',
            }}
          >
            {themeMode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
