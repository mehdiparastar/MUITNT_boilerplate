import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  colors,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { paletteTypes } from 'theme/paletteTypes';
import { ThemeContext } from 'WithLayout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MUITNTSVG from 'svg/logos/MUITNT';
import Grid from '@mui/material/Unstable_Grid2';
import useAuth from 'auth/hooks/useAuth';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import useLogout from 'auth/hooks/useLogout';

export const TopbarContent: React.FC<Props & { onSidebarOpen: () => void }> = ({
  onSidebarOpen,
}) => {
  const theme = useTheme();
  const themeConfig = React.useContext(ThemeContext);
  const logout = useLogout();
  const { userCtx } = useAuth();
  const themeMode = theme.palette.mode;
  const paletteType = theme.palette.paletteType;
  const themeToggler = themeConfig.themeMode.toggleThemeMode;
  const setThemePalette = themeConfig.themePaletteType.changeThemePaletteType;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = async () => {
    await logout();
  };

  const popupMenu = (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem>
        <Typography variant="h6">{`Hi, dear ${userCtx.profile?.name}`}</Typography>
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>My account</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleLogOut}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  );

  return (
    <Grid container justifyContent={'space-between'} alignItems={'center'}>
      <Grid container justifyContent={'center'} alignItems={'center'}>
        <IconButton
          color="primary"
          aria-label="Menu"
          edge="start"
          onClick={onSidebarOpen}
          sx={{ mx: 1 }}
        >
          <MenuIcon />
        </IconButton>
        {userCtx.profile?.email ? (
          <>
            <Tooltip title="Account settings">
              <IconButton
                sx={{
                  alignItems: 'center',
                  textAlign: 'center',
                  justifyContent: 'center',
                }}
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar
                  alt={userCtx.profile.name}
                  sx={{ width: 32, height: 32 }}
                >
                  <Box
                    component={'img'}
                    width={'100%'}
                    src={
                      'https://lh3.googleusercontent.com/a/AEdFTp4Xf60FIP-Tgm_rWlPwL09Lzpr2fsYKiYAelARSlQ=s96-c'
                    }
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            {popupMenu}
          </>
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
              width={20}
              height={20}
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
