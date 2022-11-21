import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Unstable_Grid2';
import { HidableAppBar } from 'components/HidableAppBar/HidableAppBar';
import { Sidebar } from 'components/Sidebar/Sidebar';
import React, { useEffect, useRef } from 'react';
import { ThemeContext } from 'WithLayout';

import { FooterContent } from './components/FooterContent/FooterContent';
import { SidebarContent } from './components/SidebarContent/SidebarContent';
import { TopbarContent } from './components/TopbarContent/TopbarContent';
import { Theme, useTheme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';

export const MainLayout: React.FC<layoutProps> = ({ children }) => {
  const theme = useTheme<Theme>();
  const themeConfig = React.useContext(ThemeContext);
  console.log(theme.layoutMainCompDimens);

  const [openSidebar, setOpenSidebar] = React.useState<boolean>(false);
  const topBarRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const updateThemeMainCompDimensions =
    themeConfig.themeMainCompDimentions.updateThemeMainCompDimensions;
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  useEffect(() => {
    updateThemeMainCompDimensions(
      (footerRef.current?.clientHeight || 0) +
        (topBarRef.current?.clientHeight || 0),
      0,
    );
  }, [footerRef.current?.clientHeight, topBarRef.current?.clientHeight]);

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
          <TopbarContent onSidebarOpen={handleSidebarOpen} />
        </HidableAppBar>
        <Sidebar
          onClose={handleSidebarClose}
          open={openSidebar}
          variant="temporary"
        >
          <SidebarContent onClose={handleSidebarClose} />
        </Sidebar>
        <Box ref={topBarRef}>
          <Toolbar />
        </Box>
        <Grid
          container
          component="main"
          justifyContent="center"
          alignItems="center"
          // minHeight={isMd ? "-webkit-calc(100vh - 302px)" : "-webkit-calc(100vh - 322px)"}
          // minHeight={(window.innerHeight) - theme.layoutMainCompDimens.height}
          minHeight={`-webkit-calc(100vh - ${theme.layoutMainCompDimens.height}px)`}
          bgcolor={'red'}
          sx={{
            pt: 0,
            pb: 0,
          }}
        >
          {/* {children} */}
        </Grid>
      </Grid>
      <Grid xs={12}>
        <Grid
          ref={footerRef}
          container
          component={'footer'}
          direction="column"
        >
          <Divider />
          <FooterContent />
        </Grid>
      </Grid>
    </Grid>
  );
};
