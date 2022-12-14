import { Box, LinearProgress } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Theme, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Unstable_Grid2';
import { HidableAppBar } from 'components/HidableAppBar/HidableAppBar';
import { Sidebar } from 'components/Sidebar/Sidebar';
import { resizeToMinimum } from 'helperFunctions/resizeToMinimum';
import { updateThemeTopbarFooterDimentions } from 'helperFunctions/updateThemeTopbarFooterDimentions';
import React, { useEffect, useRef } from 'react';
import { ThemeContext } from 'WithLayout';

import { FooterContent } from './components/FooterContent/FooterContent';
import { SidebarContent } from './components/SidebarContent/SidebarContent';
import { TopbarContent } from './components/TopbarContent/TopbarContent';
import { Outlet } from 'react-router-dom';
import useAuth from 'auth/hooks/useAuth';
import { assess } from 'helperFunctions/componentAssess';

export const MainLayout: React.FC<layoutProps> = ({ children }) => {
  assess && console.log('assess')
  const theme = useTheme<Theme>();
  const themeConfig = React.useContext(ThemeContext);
  const { loadingPersistCtx, loadingFetchCtx } = useAuth()
  const [openSidebar, setOpenSidebar] = React.useState<boolean>(false);
  const topBarRef = useRef<HTMLElement>(null);
  const topBarContentRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const handleResize = () => {
    updateThemeTopbarFooterDimentions(
      themeConfig,
      topBarRef,
      topBarContentRef,
      footerRef,
    );

    resizeToMinimum();
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    updateThemeTopbarFooterDimentions(
      themeConfig,
      topBarRef,
      topBarContentRef,
      footerRef,
    );

    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line
  }, []);

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      minHeight={'100vh'}
      direction="column"
    >
      <Grid xs={12}>
        <HidableAppBar>
          <Box ref={topBarContentRef}>
            <TopbarContent onSidebarOpen={handleSidebarOpen} />
          </Box>
        </HidableAppBar>
        <Sidebar
          onClose={handleSidebarClose}
          open={openSidebar}
          variant="temporary"
        >
          <SidebarContent onClose={handleSidebarClose} />
        </Sidebar>
        <Box ref={topBarRef}>
          <Toolbar
            sx={{ minHeight: topBarContentRef.current?.clientHeight || 0 }}
          />
          {(loadingPersistCtx.value || loadingFetchCtx.value) && <LinearProgress />}
        </Box>
        <Grid
          container
          component="main"
          justifyContent="center"
          alignItems="center"
          minHeight={`-webkit-calc(100vh - ${theme.layoutTopbarCompDimentions.height +
            theme.layoutFooterCompDimentions.height
            }px)`}
          // bgcolor={'red'}
          sx={{
            p: 0,
          }}
        >
          <Outlet />
        </Grid>
      </Grid>
      <Grid xs={12}>
        <Grid ref={footerRef} container component={'footer'} direction="column">
          <Divider />
          <FooterContent />
        </Grid>
      </Grid>
    </Grid>
  );
};
