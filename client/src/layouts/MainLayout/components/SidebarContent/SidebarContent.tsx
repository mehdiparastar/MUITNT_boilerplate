import * as React from 'react';
import Box from '@mui/material/Box';
import { MUINavLink } from 'components/MUINavLink/MUINavLink';
import { useTheme } from '@mui/material/styles';
import { navigationPages } from 'layouts/navigation';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Link from '@mui/material/Link';
import { assess } from 'helperFunctions/componentAssess';
import { useLocation } from 'react-router-dom';

export const SidebarContent: React.FC<Props & { onClose: () => void }> = ({
  onClose,
}) => {
  assess && console.log('assess')
  const theme = useTheme();
  const location = useLocation()

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
                        underline={'none'}
                        sx={{
                          color: location.pathname === page.href ? theme.palette.info.light : theme.palette.text.primary,
                          fontWeight: location.pathname === page.href ? 600 : 400,
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
      </Box>
    </Box>
  );
};
