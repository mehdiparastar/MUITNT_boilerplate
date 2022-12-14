import React from 'react';
import {
  useScrollTrigger,
  Slide,
  AppBar,
  Toolbar,
  Container,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { assess } from 'helperFunctions/componentAssess';

function HideOnScroll(props: HideOnScrollProps) {
  assess && console.log('assess')
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
