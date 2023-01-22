import { Avatar, Chip, Paper, Stack, styled, TextField, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Item from "components/Item/Item";
import { PageLoader } from "components/PageLoader/PageLoader";
import { getRoleName } from "enum/userRoles.enum";
import { useGetCurrentUserQuery } from "redux/features/currentUser/currentUserApiSlice";
import EditUserProfile from "./components/EditUserProfile";

export interface IUpdateProfileDetailProps {

}

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

export function UpdateProfileDetail(props: IUpdateProfileDetailProps) {
    const { data: currentUser, isSuccess, isLoading, isError, error } = useGetCurrentUserQuery()

    const theme = useTheme()

    let content = <p>unknown status(bug)!!!</p>;

    if (isLoading) {
        content = <PageLoader />
    } else if (isSuccess) {
        content = <Grid container height={1} width={1}>
            <Grid xs={12} sm={4} bgcolor={theme.palette.alternate.dark}>
                <Item p={2} width={1} height={1}>
                    <Stack direction={'column'} spacing={1}>
                        <Avatar
                            src={currentUser?.photo}
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
                            {`you are a ${currentUser?.provider || 'unknown'} user`}
                        </Paper>
                        <TextField
                            label="your email"
                            value={currentUser?.email}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                        />
                        <TextField
                            label="your name"
                            value={currentUser?.name}
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
                            {currentUser?.roles?.map((item, index) =>
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
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>
    }
    return content;
}
