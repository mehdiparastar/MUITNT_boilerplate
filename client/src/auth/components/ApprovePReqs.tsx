import DeleteIcon from '@mui/icons-material/DeleteForever';
import { Box, Card, CardActionArea, CardActions, CardContent, CardHeader, Checkbox, Chip, Container, FormControlLabel, FormGroup, Grow, IconButton, Pagination, Paper, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import useAuth from 'auth/hooks/useAuth';
import useAxiosPrivate from 'auth/hooks/useAxiosPrivate';
import Item from 'components/Item/Item';
import { MUIAsyncAutocomplete } from 'components/MUIAsyncAutocomplete/MUIAsyncAutocomplete';
import { getRoleName } from 'enum/userRoles.enum';
import moment from 'moment';
import * as React from 'react';
import { useEffect, useState } from 'react';
import NoDataFoundSVG from 'svg/banners/NoDataFound/NoDataFound';

interface IApprovePReqsProps {
}

const ApprovePReqs: React.FunctionComponent<IApprovePReqsProps> = (props) => {
    const { loadingFetch, setLoadingFetch } = useAuth();
    const theme = useTheme();
    const axiosPrivate = useAxiosPrivate();

    const [, setError] = useState<any>(null);
    const [accepted, setAccepted] = useState<boolean>(false);
    const [rejected, setRejected] = useState<boolean>(false);
    const [unSeen, setUnSeen] = useState<boolean>(false);
    const [seen, setSeen] = useState<boolean>(false);
    const [inDbPReqs, setInDbPReqs] = useState<IPermissionRequest[]>([]);
    const [skip, setSkip] = useState<number>(0);
    const [limit,] = useState<number>(6);
    const [count, setCount] = useState<number>(1);
    const [page, setPage] = useState<number>(1);
    const [allCount, setAllCount] = useState<number>(0);
    const [reload, setReload] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null)

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        setLoadingFetch(true);

        const getData = async () => {
            try {
                const query = `accepted=${accepted}&&rejected=${rejected}&&unSeen=${unSeen}&&seen=${seen}&&skip=${skip}&&limit=${limit}`;
                const response: {
                    data: { data: IPermissionRequest[]; count: number };
                } = await axiosPrivate.get(
                    `auth/get-my-all-permission-requests?${query}`,
                    {
                        signal: controller.signal,
                    },
                );
                isMounted && setAllCount(response.data.count);
                isMounted && setCount(Math.ceil(response.data.count / limit));
                isMounted && setInDbPReqs(response.data.data);
            } catch (err) {
                isMounted && setError(err);
            } finally {
                isMounted && setLoadingFetch(false);
                isMounted && setReload(false);
                isMounted = false;
            }
        };
        getData();

        return () => {
            isMounted = false;
            setLoadingFetch(false);
            setReload(false);
            controller.abort();
        };
    }, [
        axiosPrivate,
        setLoadingFetch,
        accepted,
        rejected,
        unSeen,
        seen,
        skip,
        limit,
        reload,
    ]);

    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        value: number,
    ) => {
        setPage(value);
        setSkip((value - 1) * limit);
    };

    const hangleGetUsersList = async () => {
        return axiosPrivate.get<(IUser)[]>('auth/all')
    }

    return (
        <Box
            height={1}
            width={1}
            minHeight={{ xs: 'auto', md: 'calc(100vh - 64px)' }}
            display={'flex'}
            alignItems={'flex-start'}
            bgcolor={theme.palette.alternate.main}
            component={'section'}
            sx={{
                position: 'relative',
                backgroundColor: theme.palette.alternate.main,
                '&::after': {
                    position: 'absolute',
                    content: '""',
                    width: '30%',
                    zIndex: 1,
                    top: 0,
                    left: 0,
                    height: '100%',
                    backgroundSize: '18px 18px',
                    backgroundImage: `radial-gradient(${theme.palette.primary.light} 20%, transparent 20%)`,
                    opacity: 0.2,
                },
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    textAlign: 'center',
                    px: 2,
                    py: { xs: 2 },
                    zIndex: 2
                }}
            >
                <Grid
                    container
                    spacing={2}
                >
                    <Grid xs={12}>
                        <Paper
                            sx={{
                                p: 2,
                                height: 1,
                                width: 1
                            }}
                        >
                            <Stack
                                justifyContent={'space-between'}
                                direction={'row'}
                                alignItems="center"
                            >
                                <Typography
                                    variant="body1"
                                    fontWeight={'bold'}
                                    textAlign={'left'}
                                >
                                    Filter By Current Status Tag:
                                </Typography>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={accepted}
                                                onChange={(event) => setAccepted(event.target.checked)}
                                            />
                                        }
                                        label="Accepted"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={rejected}
                                                onChange={(event) => setRejected(event.target.checked)}
                                            />
                                        }
                                        label="Rejected"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={unSeen}
                                                onChange={(event) => setUnSeen(event.target.checked)}
                                            />
                                        }
                                        label="Unseen"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={seen}
                                                onChange={(event) => setSeen(event.target.checked)}
                                            />
                                        }
                                        label="seen"
                                    />
                                </FormGroup>
                            </Stack>
                            <Stack
                                justifyContent={'space-between'}
                                direction={'row'}
                                alignItems="center"
                            >
                                <Typography
                                    variant="body1"
                                    fontWeight={'bold'}
                                    textAlign={'left'}
                                >
                                    Filter By User:
                                </Typography>
                                <MUIAsyncAutocomplete
                                    value={selectedUser}
                                    setValue={setSelectedUser}
                                    titleField={'email'}
                                    label='Users List'
                                    getOptions={hangleGetUsersList}
                                />
                            </Stack>
                        </Paper>
                    </Grid>
                    <Grid xs={12}>
                        <Item>
                            <Grid
                                container
                                spacing={1}
                                p={0}
                            >
                                {inDbPReqs.map((item, index) => (
                                    <Grid
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        key={index}
                                    >
                                        <Item
                                            sx={{
                                                transition: 'all .2s ease-in-out',
                                                '&:hover': {
                                                    transform: `translateY(-${theme.spacing(0.5)})`,
                                                },
                                            }}
                                        >
                                            <Grow
                                                in={true}
                                                timeout={(index + 1) * 200}
                                            >
                                                <Card variant="elevation">
                                                    <CardActionArea>
                                                        <CardHeader
                                                            avatar={
                                                                loadingFetch ? (
                                                                    <Skeleton
                                                                        variant="circular"
                                                                        animation="wave"
                                                                        width={32}
                                                                        height={32}
                                                                    />
                                                                ) : (
                                                                    <Tooltip
                                                                        title="This Request Unique Id"
                                                                        arrow
                                                                    >
                                                                        <Chip
                                                                            label={item.id}
                                                                            color="primary"
                                                                        />
                                                                    </Tooltip>
                                                                )
                                                            }
                                                            title={
                                                                loadingFetch ? (
                                                                    <Skeleton
                                                                        variant="text"
                                                                        animation="wave"
                                                                        width={'100%'}
                                                                    />
                                                                ) : (
                                                                    <Tooltip
                                                                        title="This Request Type"
                                                                        arrow
                                                                    >
                                                                        <Typography
                                                                            variant="body1"
                                                                            sx={{ fontWeight: 'bold', textAlign: 'right' }}
                                                                        >
                                                                            {getRoleName(item.role)}
                                                                        </Typography>
                                                                    </Tooltip>
                                                                )
                                                            }
                                                        />
                                                        <CardContent>
                                                            {loadingFetch ? (
                                                                <>
                                                                    <Skeleton
                                                                        sx={{ my: 1 }}
                                                                        variant="text"
                                                                        animation="wave"
                                                                        width={'100%'}
                                                                    />
                                                                    <Skeleton
                                                                        sx={{ my: 1 }}
                                                                        variant="text"
                                                                        animation="wave"
                                                                        width={'100%'}
                                                                    />
                                                                    <Skeleton
                                                                        sx={{ my: 1 }}
                                                                        variant="text"
                                                                        animation="wave"
                                                                        width={'100%'}
                                                                    />
                                                                    <Skeleton
                                                                        sx={{ my: 1 }}
                                                                        variant="text"
                                                                        animation="wave"
                                                                        width={'100%'}
                                                                    />
                                                                    <Skeleton
                                                                        sx={{ my: 1 }}
                                                                        variant="text"
                                                                        animation="wave"
                                                                        width={'100%'}
                                                                    />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Stack
                                                                        direction={'row'}
                                                                        display="flex"
                                                                        alignItems={'center'}
                                                                        justifyContent="space-between"
                                                                    >
                                                                        <Typography variant="caption">
                                                                            Email:
                                                                        </Typography>
                                                                        <Typography variant="body1">
                                                                            {item.user.email}
                                                                        </Typography>
                                                                    </Stack>
                                                                    <Stack
                                                                        direction={'row'}
                                                                        display="flex"
                                                                        alignItems={'center'}
                                                                        justifyContent="space-between"
                                                                    >
                                                                        <Typography variant="caption">
                                                                            Name:
                                                                        </Typography>
                                                                        <Typography variant="body1">
                                                                            {item.user.name}
                                                                        </Typography>
                                                                    </Stack>
                                                                    <Stack
                                                                        direction={'row'}
                                                                        display="flex"
                                                                        alignItems={'center'}
                                                                        justifyContent="space-between"
                                                                    >
                                                                        <Typography variant="caption">
                                                                            Created At:
                                                                        </Typography>
                                                                        <Typography variant="body1">
                                                                            {moment(item.createdAt).format(
                                                                                'DD-MMM-YYYY HH:mm:ss',
                                                                            )}
                                                                        </Typography>
                                                                    </Stack>
                                                                    <Stack
                                                                        direction={'row'}
                                                                        display="flex"
                                                                        alignItems={'center'}
                                                                        justifyContent="space-between"
                                                                    >
                                                                        <Typography variant="caption">
                                                                            Last Update At:
                                                                        </Typography>
                                                                        <Typography variant="body1">
                                                                            {moment(item.updatedAt).format(
                                                                                'DD-MMM-YYYY HH:mm:ss',
                                                                            )}
                                                                        </Typography>
                                                                    </Stack>
                                                                    <Stack
                                                                        direction={'row'}
                                                                        display="flex"
                                                                        alignItems={'center'}
                                                                        justifyContent="space-between"
                                                                    >
                                                                        <Typography variant="caption">
                                                                            Message:
                                                                        </Typography>
                                                                        {item.adminMsg
                                                                            ? item.adminMsg
                                                                            : 'There is no message yet!'}
                                                                    </Stack>
                                                                </>
                                                            )}
                                                        </CardContent>
                                                    </CardActionArea>
                                                    <CardActions>
                                                        {loadingFetch ? (
                                                            <Stack
                                                                width={1}
                                                                direction={'row'}
                                                                alignItems="center"
                                                                display="flex"
                                                                justifyContent={'space-between'}
                                                            >
                                                                <IconButton>
                                                                    <Skeleton
                                                                        variant="rounded"
                                                                        animation="wave"
                                                                        width={18}
                                                                        height={26}
                                                                    />
                                                                </IconButton>
                                                                <IconButton disableRipple>
                                                                    <Skeleton
                                                                        variant="text"
                                                                        animation="wave"
                                                                        width={50}
                                                                    />
                                                                </IconButton>
                                                            </Stack>
                                                        ) : (
                                                            <Stack
                                                                width={1}
                                                                direction={'row'}
                                                                alignItems="center"
                                                                display="flex"
                                                                justifyContent={'space-between'}
                                                            >
                                                                <IconButton
                                                                // onClick={() => handleOpenDeletePReq(item)}
                                                                >
                                                                    <DeleteIcon color="error" />
                                                                </IconButton>
                                                                <Chip
                                                                    label={item.result}
                                                                    color="primary"
                                                                    variant="outlined"
                                                                />
                                                            </Stack>
                                                        )}
                                                    </CardActions>
                                                </Card>
                                            </Grow>
                                        </Item>
                                    </Grid>
                                ))}
                            </Grid>
                        </Item>
                    </Grid>
                    <Grid xs={12}>
                        <Item>Total Count:{allCount}</Item>
                    </Grid>
                    {count > 1 && (
                        <Grid xs={12}>
                            <Item
                                justifyContent={'center'}
                                display="flex"
                                m={1}
                            >
                                <Pagination
                                    variant="outlined"
                                    shape="rounded"
                                    count={count}
                                    page={page}
                                    onChange={handleChangePage}
                                />
                            </Item>
                        </Grid>
                    )}
                    {count === 0 && (
                        <Grid xs={12}>
                            <Item
                                data-aos="flip-left"
                                justifyContent={'center'}
                                display="flex"
                                m={1}
                            >
                                <NoDataFoundSVG width={450} />
                            </Item>
                            <Typography
                                m={1}
                                variant="h5"
                            >
                                No Data Found
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </Box>
    );
};

export default ApprovePReqs;
