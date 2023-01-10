import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Unstable_Grid2';
import { HidableAppBar } from 'components/HidableAppBar/HidableAppBar';
import Item from 'components/Item/Item';
import { Sidebar } from 'components/Sidebar/Sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { FooterContent } from './components/FooterContent/FooterContent';
import { SidebarContent } from './components/SidebarContent/SidebarContent';
import { TopbarContent } from './components/TopbarContent/TopbarContent';

export const MainLayout: React.FC<layoutProps> = ({ children }) => {

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
