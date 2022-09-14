import React from 'react';
import { HidableAppBar } from 'components/HidableAppBar/HidableAppBar';
import { Topbar } from './components/TopbarContent/Topbar';
import { Sidebar } from 'components/Sidebar/Sidebar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { SidebarContent } from './components/SidebarContent/SidebarContent';


export const MainLayout: React.FC<layoutProps> = ({ children }) => {
  const [openSidebar, setOpenSidebar] = React.useState<boolean>(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  return (
    <div>
      <HidableAppBar>
        <Topbar onSidebarOpen={handleSidebarOpen} />
      </HidableAppBar>
      <Sidebar
        onClose={handleSidebarClose}
        open={openSidebar}
        variant="temporary"
      >
        <SidebarContent />
      </Sidebar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </div>
  );
};
