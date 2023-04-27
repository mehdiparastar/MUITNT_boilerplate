import { AddBox, JoinInnerOutlined, Notifications, Settings } from '@mui/icons-material';
import { Badge, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.secondary.main,
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

type Props = {
}

enum bottomNAVEnum {
    create = 'create',
    join = 'join',
    requests = 'requests',
    settings = 'settings',
}

const BottomNav = (props: Props) => {
    const location = useLocation();
    const currentLoc = location.pathname.split('/').at(-1) || '' as string
    const [value, setValue] = React.useState<bottomNAVEnum | null | any>(currentLoc in bottomNAVEnum ? currentLoc : null);
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        if (value !== currentLoc) {
            setValue(null)
        }
    }, [location.pathname, value, currentLoc])

    return (
        <Paper
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
            }}
            elevation={5}
        >
            <BottomNavigation
                showLabels
                sx={{ backgroundColor: theme.palette.alternate.dark }}
                value={value}
                onChange={(event, newValue) => {
                    if (newValue !== value) {
                        setValue(newValue);
                        navigate(newValue, { state: { from: location }, replace: true });
                    }
                }}
            >
                <BottomNavigationAction value={bottomNAVEnum.create} label="Create" icon={<AddBox />} />
                <BottomNavigationAction value={bottomNAVEnum.join} label="join" icon={<JoinInnerOutlined />} />
                <BottomNavigationAction value={bottomNAVEnum.requests} label="requests" icon={
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Notifications />
                    </StyledBadge>
                } />
                <BottomNavigationAction value={bottomNAVEnum.settings} label="Settings" icon={<Settings />} />
            </BottomNavigation>
        </Paper>
    )
}

export default BottomNav