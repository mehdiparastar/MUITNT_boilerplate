import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectAllUsers } from './usersSlice';

export function UsersList() {
    // The `state` arg is correctly typed as `RootState` already
    const users = useAppSelector(selectAllUsers)
    const dispatch = useAppDispatch()

    const renderedUsers = users.map(user => (
        <ListItem key={user.id}>
            <ListItemText primary={user.name} />
        </ListItem>
    ))

    return (
        <Box component={'section'} >
            <List>
                <Typography variant='h2'>Users</Typography>
                {renderedUsers}
            </List>
        </Box>
    )
}