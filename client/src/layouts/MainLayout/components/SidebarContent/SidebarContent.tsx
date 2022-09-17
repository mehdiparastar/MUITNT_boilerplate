import * as React from 'react';
import Box from '@mui/material/Box';
import { MUINavLink } from 'components/MUINavLink/MUINavLink';
import { css } from '@emotion/css';
import { useTheme } from '@mui/material/styles';
import { navigationPages } from 'layouts/navigation';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Link from '@mui/material/Link';

export const SidebarContent: React.FC<Props & { onClose: () => void }> = ({
  onClose,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: '100%',
        padding: 1,
      }}
    >
      <Box
        paddingX={2}
        paddingBottom={2}
      >
        <Box>
          {navigationPages.map((navPage, i) => (
            <Box
              key={i}
              marginBottom={4}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: 1,
                  display: 'block',
                }}
              >
                {navPage.title}
              </Typography>
              <Grid
                container
                spacing={1}
              >
                {navPage.pages.map((page, i) => (
                  <Grid
                    xs={6}
                    key={i}
                  >
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="flex-end"
                      justifyContent="flex-start"
                      onClick={(e) => {
                        const target: EventTarget & { nodeName?: string } =
                          e.target;
                        if (target.nodeName === 'A') onClose();
                      }}
                    >
                      {page.icon}
                      <Link
                        variant="body2"
                        component={MUINavLink}
                        to={page.href}
                        activeClassName={css`
                          color: ${theme.palette.info.light};
                          font-weight: 600;
                        `}
                        color={theme.palette.text.primary}
                        underline={'none'}
                        sx={{
                          '&:hover': {
                            textDecoration: 'none',
                            color: theme.palette.primary.dark,
                          },
                        }}
                      >
                        {page.title}
                      </Link>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
        {/* <Box>
          <Button
            variant="outlined"
            fullWidth
            component="a"
            href="/docs-introduction"
          >
            Documentation
          </Button>
        </Box> */}
        {/* <Box marginTop={1}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            component="a"
            target="blank"
            href="https://material-ui.com/store/items/webbee-landing-page/"
          >
            Purchase now
          </Button>
        </Box> */}
      </Box>
      {/* <List>
        {navigationPages.map((navPage, index) => (
          <ListItem
            key={navPage.key}
            disablePadding
          >
            <ListItemButton
              component={MUINavLink}
              to={navPage.path}
              activeClassName={css`
                color: ${theme.palette.info.light};
              `}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={navPage.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
      {/* <SidebarNav pages={pages} onClose={onClose} /> */}
    </Box>
  );
};
