import { Avatar, Chip, Paper, Stack, styled, TextField, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useAuth } from "auth/hooks/useAuth";
import Item from "components/Item/Item";
import { getRoleName } from "enum/userRoles.enum";
import EditUserProfile from "./components/EditUserProfile";

export interface IUpdateProfileDetailProps {

}

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

export function UpdateProfileDetail(props: IUpdateProfileDetailProps) {
    const { userProfile } = useAuth()
    const theme = useTheme()

    return (
        <Grid container height={1} width={1}>
            <Grid xs={12} sm={4} bgcolor={theme.palette.alternate.dark}>
                <Item p={2} width={1} height={1}>
                    <Stack direction={'column'} spacing={1}>
                        <Avatar
                            src={userProfile?.photo}
                            alt="user profile pic"
                            sx={{ width: 1, height: 1, minHeight: 200 }}
                        />
                        <Paper
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                p: 0.5,
                                m: 0,
                            }}
                        >
                            {`you are a ${userProfile?.provider || 'unknown'} user`}
                        </Paper>
                        <TextField
                            label="your email"
                            value={userProfile?.email}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                        />
                        <TextField
                            label="your name"
                            value={userProfile?.name}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                        />
                        <Typography variant='button' textAlign={'left'}>
                            your roles:
                        </Typography>
                        <Paper
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                listStyle: 'none',
                                p: 0.5,
                                m: 0,
                            }}
                            component="ul"
                        >
                            {userProfile?.roles?.map((item, index) =>
                                <ListItem key={index}>
                                    <Chip label={getRoleName(item)} color="primary" variant="outlined" />
                                </ListItem>
                            )}
                        </Paper>
                    </Stack>
                </Item>
            </Grid>
            <Grid xs={12} sm={8}>
                <Item p={2} width={1} height={1} sx={{ textAlign: 'left' }}>
                    <EditUserProfile />
                </Item>
            </Grid>
        </Grid >
    );
}
