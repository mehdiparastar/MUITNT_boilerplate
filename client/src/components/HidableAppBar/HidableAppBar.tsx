import React from 'react';
import {
  useScrollTrigger,
  Slide,
  AppBar,
  Toolbar,
  Container,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

function HideOnScroll(props: HideOnScrollProps) {
  const { children } = props;
  const trigger = useScrollTrigger({});
  return (
    <Slide
      appear={false}
      direction="down"
      in={!trigger}
    >
      {children}
    </Slide>
  );
}

export const HidableAppBar: React.FC<Props> = ({ children }) => {
  const theme = useTheme();

  return (    
      <HideOnScroll>
        <AppBar
          elevation={1}
          sx={{
            backgroundColor: theme.palette.background.paper,
          }}
        // enableColorOnDark
        >
          <Toolbar>
            <Container maxWidth="lg">{children}</Container>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
  );
};
