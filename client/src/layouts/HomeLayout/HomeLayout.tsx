import React, { FC, ReactNode } from "react";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout: FC<HomeLayoutProps> = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: 'black',
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          minHeight: "100vh",
          maxWidth: "100vw",
          flexGrow: 1,
        }}
      >
        <Navbar />
        {children}
        <Footer />
      </Box>
    </>
  );
};

export default HomeLayout;