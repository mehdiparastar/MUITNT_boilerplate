import React from 'react';
import { HidableAppBar } from 'components/HidableAppBar/HidableAppBar';
import { Topbar } from './components/Topbar/Topbar';

export const MainLayout: React.FC<layoutProps> = ({ children }) => {
  const [openSidebar, setOpenSidebar] = React.useState<boolean>(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  console.log(openSidebar, handleSidebarClose);

  return (
    <div>
      <HidableAppBar>
        <Topbar onSidebarOpen={handleSidebarOpen} />
      </HidableAppBar>
      <main>{children}</main>
    </div>
  );
};
