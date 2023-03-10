import { Box, Paper } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Unstable_Grid2';
import { HidableAppBar } from 'components/HidableAppBar/HidableAppBar';
import { Sidebar } from 'components/Sidebar/Sidebar';
import React from 'react';
import { Outlet } from "react-router-dom";
import { SidebarContent } from '../components/SidebarContent/SidebarContent';
import { TopbarContent } from '../components/TopbarContent/TopbarContent';
import BottomNav from './components/BottomNav';
import RoomSide from './components/RoomSide';

export const ChatLayout: React.FC<layoutProps> = ({ children }) => {
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
      direction="column"
    >
      <Grid minHeight={'100vh'} xs={12} >
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
        <Box
          display={'flex'}
          justifyContent="center"
          alignItems="center"
          flexDirection={'row'}
          width={1}
          height={1}
        >
          <RoomSide drawerWidth={300} />
          <Grid
            container
            component="main"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: '100%',
              p: 1,
            }}
          >
            <Outlet />
            <Toolbar />
          </Grid>
        </Box>
      </Grid>
      <BottomNav />
    </Grid>
  );
};
