import { Box, CircularProgress, LinearProgress } from '@mui/material';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Unstable_Grid2';
import useAuth from 'auth/hooks/useAuth';
import { HidableAppBar } from 'components/HidableAppBar/HidableAppBar';
import Item from 'components/Item/Item';
import { Sidebar } from 'components/Sidebar/Sidebar';
import { assess } from 'helperFunctions/componentAssess';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { FooterContent } from './components/FooterContent/FooterContent';
import { SidebarContent } from './components/SidebarContent/SidebarContent';
import { TopbarContent } from './components/TopbarContent/TopbarContent';

export const MainLayout: React.FC<layoutProps> = ({ children }) => {
  assess && console.log('assess')
  const { loadingPersist, loadingFetch } = useAuth()
  const [openSidebar, setOpenSidebar] = React.useState<boolean>(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

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
        <Toolbar />
        {/* <Box position={'fixed'} top={'30vh'} left={'50vw'} zIndex={1000000}>
          {(loadingPersist || loadingFetch) && <CircularProgress />}
        </Box> */}
        {(loadingPersist || loadingFetch) && <LinearProgress />}
        <Grid
          container
          component="main"
          justifyContent="center"
          alignItems="center"
          sx={{
            p: 0,
          }}
        >
          <Outlet />
        </Grid>
      </Grid>
      <Grid xs={12}>
        <Item width={1} height={1}>
          <Divider />
          <FooterContent />
        </Item>
      </Grid>
    </Grid>
  );
};
