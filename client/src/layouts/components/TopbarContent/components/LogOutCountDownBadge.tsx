import ListAllIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Badge, Box, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography, useTheme } from '@mui/material';
import { apiSlice } from 'api/rtkApi/apiSlice';
import { MUINavLink } from 'components/MUINavLink/MUINavLink';
import { UserRoles } from 'enum/userRoles.enum';
import { strToBool } from 'helperFunctions/strToBool';
import jwt_decode, { JwtPayload } from "jwt-decode";
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useAuthLogoutMutation } from 'redux/features/WHOLE_APP/auth/authApiSlice';
import { selectCurrentRefreshToken } from 'redux/features/WHOLE_APP/auth/authSlice';
import { useGetCurrentUserQuery } from 'redux/features/WHOLE_APP/currentUser/currentUserApiSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

interface MyBadgeProps {
    children?: React.ReactNode;
}
function MyBadge(props: MyBadgeProps) {
    const { children } = props;
    const [countDown, setCountDown] = useState<number>(0)
    const refreshToken = useAppSelector(selectCurrentRefreshToken)
    const decodedAT: JwtPayload = (strToBool(refreshToken) && jwt_decode(refreshToken as string)) || {} as JwtPayload
    const [serverLogout] = useAuthLogoutMutation()

    useEffect(() => {
        const interval = setInterval(() => {
            if (decodedAT.exp !== undefined && ((decodedAT.exp * 1000) - new Date().getTime()) > 0) {
                setCountDown((decodedAT.exp * 1000) - new Date().getTime())
            }
            if (decodedAT.exp !== undefined && ((decodedAT.exp * 1000) - new Date().getTime()) <= 0) {
                clearInterval(interval)
                serverLogout()
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [decodedAT.exp, serverLogout]);

    return (
        <Badge
            sx={{
                '.MuiBadge-anchorOriginTopRight': { mt: -1.5 }
            }}
            // invisible={Math.floor(countDown / 1000) > 90}
            color="secondary"
            badgeContent={Math.floor(countDown / 1000) || 0}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            max={999}
        >
            {children}
        </Badge>
    )
}

function Children() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { data: currentUser } = useGetCurrentUserQuery()
    const [authLogout] = useAuthLogoutMutation()
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useAppDispatch()

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = async () => {
        try {
            await authLogout().unwrap()
            dispatch(apiSlice.util.resetApiState())
        } catch (ex) {
            const err = ex as { data: { msg: string } }
            enqueueSnackbar(`Loggin Out Failed! ${err.data?.msg || 'Unknown Error'}`, { variant: 'error' });
        }
    };


    const popupMenu = (
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem>
                <Typography variant="h6">{`Hi, dear ${currentUser?.name}`}</Typography>
            </MenuItem>
            <Divider />
            {
                currentUser?.roles?.includes(UserRoles.superUser) && <MenuItem component={MUINavLink} to='/approve-permission-requests'>
                    <ListItemIcon>
                        <ListAllIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                        Permission Requests
                    </ListItemText>
                </MenuItem>
            }
            <MenuItem component={MUINavLink} to='/my-account'>
                <ListItemIcon>
                    <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                    My Account
                </ListItemText>
            </MenuItem>
            <MenuItem onClick={handleLogOut}>
                <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <Tooltip title="Account settings">
                <IconButton
                    sx={{
                        alignItems: 'center',
                        textAlign: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar
                        alt={currentUser?.name}
                        sx={{
                            width: 45,
                            height: 45,
                            boxShadow: `0 0 0 4px ${theme.palette.background.paper}`,
                        }}
                    >
                        <Box
                            component={'img'}
                            width={'100%'}
                            src={currentUser?.photo}
                        />
                    </Avatar>
                </IconButton>
            </Tooltip>
            {popupMenu}
        </>
    )
}

type Props = {}

const LogOutCountDownBadge = (props: Props) => {

    return (
        <>
            <Children />
            <MyBadge />
        </>
    )
}

export default LogOutCountDownBadge
