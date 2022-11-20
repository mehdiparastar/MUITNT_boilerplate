import React from 'react';
import { HidableAppBar } from 'components/HidableAppBar/HidableAppBar';
import { TopbarContent } from './components/TopbarContent/TopbarContent';
import { Sidebar } from 'components/Sidebar/Sidebar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { SidebarContent } from './components/SidebarContent/SidebarContent';
import Divider from '@mui/material/Divider';
import { FooterContent } from './components/FooterContent/FooterContent';
import Grid from '@mui/material/Unstable_Grid2';

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
          component="main"
          justifyContent="center"
          alignItems='center'
          container
          // width={1}
          sx={{
            // flexGrow: 1,
            minHeight: 200,
            pt: 0,
            pb: 0,
          }}
        >
          {/* {children} */}
        </Grid>
        <Divider />
      </Grid>
      <Grid xs={12}>
        <Grid container component={'footer'}>
          <FooterContent />
        </Grid>
      </Grid>
    </Grid>
  );
};
