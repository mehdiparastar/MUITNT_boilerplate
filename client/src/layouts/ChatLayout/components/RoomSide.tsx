import { SearchOutlined } from '@mui/icons-material';
import { Avatar, Box, Drawer, InputAdornment, List, ListItem, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText, Paper, Stack, TextField, Toolbar, Typography, useMediaQuery } from '@mui/material';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled, useTheme } from '@mui/material/styles';
import { MUINavLink } from 'components/MUINavLink/MUINavLink';
import { formatDistanceToNow } from 'date-fns';
import { chatIntendedParticipantStatus } from 'enum/chatIntendedParticipantStatus.enum';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useChatSocketQuery, useGetMyAllRoomsQuery } from 'redux/features/CHAT_APP/chatApiSlice';
import { ChatRoomIsMobileSideContext } from '../ChatLayout';

type Props = {
    drawerWidth?: number
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 10,
        top: 30,
        backgroundColor: theme.palette.alternate.dark
    },
}));


const RoomSide = (props: Props) => {
    const theme = useTheme();
    const location = useLocation()
    const roomSideOpen = useContext(ChatRoomIsMobileSideContext);
    const { data: socketData = { onlineUsers: {} } } = useChatSocketQuery()
    const { data = [] } = useGetMyAllRoomsQuery()
    const isMobileView = useMediaQuery(theme.breakpoints.down('md'), {
        defaultMatches: true,
    });

    const allRooms =
        data.map(
            room => ({
                ...room,
                members: [
                    ...room.intendedParticipants.filter(
                        participant =>
                            participant.status === chatIntendedParticipantStatus.accepted
                    ),
                    room.creator
                ].map(item => item.id).sort(),
                deliveredUsers: room.status_delivered_users?.map(item => item.id).sort()
            })
        )
            .map(room => ({
                ...room,
                members: room.members,
                deliveredUsers: room.deliveredUsers,
                isDelivered: JSON.stringify(room.members) === JSON.stringify(room.deliveredUsers)
            }))

    const drawerContent =
        <Box sx={{ overflow: 'auto' }}>
            {
                !isMobileView &&
                <Toolbar sx={{ background: theme.palette.alternate.main }}>
                    <Typography fontFamily={'BeautyDemo'} width={'100%'} variant='body1' textAlign={'center'} fontWeight={'bold'}>MUITNT</Typography>
                </Toolbar>
            }

            <Toolbar sx={{ position: 'absolute', zIndex: 1, width: '100%', mt: 1 }}>
                <Paper elevation={5} sx={{ width: 1, height: 1, p: 0 }}>
                    <TextField
                        placeholder='Search'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchOutlined color='info' />
                                </InputAdornment>
                            )
                        }}
                    />
                </Paper>
            </Toolbar>
            <Toolbar />
            <List>
                {allRooms.map((room, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        component={MUINavLink}
                        to={`${room.id}`}
                        sx={{ color: theme.palette.text.primary }}
                    >
                        <ListItemButton onClick={e => (isMobileView && roomSideOpen.isMobileSideOpen.open) ? roomSideOpen.isMobileSideOpen.toggleOpen() : null} selected={location.pathname === `/chat/${room.id}`}>
                            <ListItemAvatar>
                                <Avatar alt={room.title}
                                    sx={{
                                        width: 45,
                                        height: 45,
                                        boxShadow: `0 0 0 4px ${theme.palette.background.paper}`,
                                    }}
                                >
                                    <Box
                                        component={'img'}
                                        width={'100%'}
                                        src={room.photo}
                                    />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={room.title} secondary={`${room.intendedParticipants.length} member | ${socketData.onlineUsers[room.id] ? socketData.onlineUsers[room.id].length : 0 || 0} online`} />
                            <ListItemSecondaryAction sx={{ transform: 'translateY(-90%)' }}>
                                <StyledBadge
                                    badgeContent={5}
                                    max={99}
                                >
                                    <Stack direction={'row'} display='flex' spacing={0.5} alignItems='center'>
                                        {/* <Check fontSize='small' color='success' /> */}
                                        <Typography variant='caption'>{formatDistanceToNow(room.updatedAt)}</Typography>
                                    </Stack>
                                </StyledBadge>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Toolbar />
        </Box>

    return (
        isMobileView ?
            <Drawer
                variant={'temporary'}
                anchor='bottom'
                open={roomSideOpen.isMobileSideOpen.open}
                sx={{
                    [
                        `& .MuiDrawer-paper`]: {
                        maxHeight: '75%',
                    },
                }}
                onClose={(e) => roomSideOpen.isMobileSideOpen.open ? roomSideOpen.isMobileSideOpen.toggleOpen() : null}
            >
                {drawerContent}
            </Drawer>
            :
            <Drawer
                variant={'permanent'}
                sx={{
                    zIndex: 0,
                    width: props.drawerWidth,
                    flexShrink: 0,
                    [
                        `& .MuiDrawer-paper`]: {
                        width: props.drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                {drawerContent}
            </Drawer>
    )
}

export default RoomSide