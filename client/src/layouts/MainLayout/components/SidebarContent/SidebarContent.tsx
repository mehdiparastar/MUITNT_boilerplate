import * as React from 'react';
import Box from '@mui/material/Box';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import { routes } from 'routes/routes'
import { MUINavLink } from 'components/MUINavLink/MUINavLink';
import { css } from '@emotion/css';
import { useTheme } from '@mui/material/styles';



export const SidebarContent: React.FC = () => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                height: '100%',
                padding: 1,
            }}
        >
            <List>
                {routes.map((item, index) =>
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            component={MUINavLink}
                            to={item.path}
                            activeClassName={css`color:${theme.palette.info.light}`}
                        >
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
            {/* <SidebarNav pages={pages} onClose={onClose} /> */}
        </Box >
    );

}