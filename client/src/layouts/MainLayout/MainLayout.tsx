import React from 'react';
import { HidableAppBar } from 'components/HidableAppBar/HidableAppBar';
import { TopbarContent } from './components/TopbarContent/TopbarContent';
import { Sidebar } from 'components/Sidebar/Sidebar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { SidebarContent } from './components/SidebarContent/SidebarContent';
import Divider from '@mui/material/Divider';
import { FooterContent } from './components/FooterContent/FooterContent';

export const MainLayout: React.FC<layoutProps> = ({ children }) => {
  const [openSidebar, setOpenSidebar] = React.useState<boolean>(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  return (
    <React.Fragment>
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
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: 200,
          pt: 0,
          pb: 0,
        }}
      >
        {children}
      </Box>
      <Divider />
      <Box component={'footer'}>
        <FooterContent />
      </Box>
    </React.Fragment>
  );
};
