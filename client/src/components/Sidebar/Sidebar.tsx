import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';

type SidebarProps = Props & {
    onClose: () => void
    open: boolean
    variant: 'permanent' | 'persistent' | 'temporary'
}

const drawerWidth: number = 400;

export const Sidebar: React.FC<SidebarProps> = (props) => {
    const { children, onClose, open, variant } = props

    return (       
        <Drawer
            variant={variant}
            open={open}
            onClose={onClose}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: 'flex',
                width: { sm: drawerWidth },
                flexShrink: { sm: 0 },
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: '100%',
                    maxWidth: { xs: '100%', sm: drawerWidth },
                },
            }}
        >
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <IconButton
                    onClick={() => onClose()}
                >
                    <CloseIcon color='secondary' fontSize="small" />
                </IconButton>
            </Toolbar>
            <Divider />
            {children}
        </Drawer>
    );

}