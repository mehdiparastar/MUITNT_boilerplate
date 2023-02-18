import { Check } from '@mui/icons-material';
import { Avatar, Box, Divider, Drawer, List, ListItem, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText, Stack, Toolbar, Typography } from '@mui/material';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled, useTheme } from '@mui/material/styles';
import { MUINavLink } from 'components/MUINavLink/MUINavLink';
import { formatDistanceToNow } from 'date-fns';
import { useLocation } from 'react-router-dom';
import { useGetMyAllRoomsQuery } from 'redux/features/CHAT_APP/chatApiSlice';

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
    const { data: allRooms = [], isLoading } = useGetMyAllRoomsQuery()
    return (
        <Drawer
            variant="permanent"
            sx={{
                zIndex: 0,
                width: props.drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: props.drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Box sx={{ overflow: 'auto' }}>
                <Toolbar >
                    <Typography fontFamily={'BeautyDemo'} width={'100%'} variant='body1' textAlign={'center'} fontWeight={'bold'}>MUITNT</Typography>
                    <Divider />
                </Toolbar>
                <Divider />
                <List>
                    {allRooms.map((room, index) => (
                        <ListItem
                            key={index}
                            disablePadding
                            component={MUINavLink}
                            to={`${room.id}`}
                            sx={{ color: theme.palette.text.primary }}
                        >
                            <ListItemButton selected={location.pathname === `/chat/${room.id}`}>
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
                                <ListItemText primary={room.title} secondary={`${room.participants.length} member`} />
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
            </Box>
        </Drawer>
    )
}

export default RoomSide