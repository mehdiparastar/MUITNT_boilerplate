import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Checkbox, Chip, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grow, Pagination, Paper, Radio, RadioGroup, Skeleton, Slide, Stack, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import useAxiosPrivate from 'auth/hooks/useAxiosPrivate';
import { AxiosError } from 'axios';
import Item from 'components/Item/Item';
import { MUIAsyncAutocomplete } from 'components/MUIAsyncAutocomplete/MUIAsyncAutocomplete';
import { formatDistanceToNow } from 'date-fns';
import { pReqResultENUM } from 'enum/pReqResult.enum';
import { getRoleName } from 'enum/userRoles.enum';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { forwardRef, useEffect, useState } from 'react';
import NoDataFoundSVG from 'svg/banners/NoDataFound/NoDataFound';

interface IApprovePReqsProps {
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return (
        <Slide
            direction="up"
            ref={ref}
            {...props}
        />
    );
});

const ApprovePReqs: React.FunctionComponent<IApprovePReqsProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const theme = useTheme();
    const axiosPrivate = useAxiosPrivate();
    const { enqueueSnackbar } = useSnackbar();
    const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
        defaultMatches: true,
    });

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

    const [selectedApprovePReq, setSelectedApprovePReq] = useState<IPermissionRequest | null>(null);
    const [showApprovePReqAlert, setShowApprovePReqAlert] = useState<boolean>(false);

    const [approveType, setApproveType] = React.useState<string | null>(null);

    const handleCloseApprovePReq = () => {
        setShowApprovePReqAlert(false);
        setSelectedApprovePReq(null);
        setApproveType(null)
    };

    const handleOpenApprovePReq = (pReq: IPermissionRequest) => {
        if (pReq.result === pReqResultENUM.accepted) {
            setApproveType(pReqResultENUM.accepted)
        }
        if (pReq.result === pReqResultENUM.rejected) {
            setApproveType(pReqResultENUM.rejected)
        }
        setShowApprovePReqAlert(true);
        setSelectedApprovePReq(pReq);
        if (pReq.result !== pReqResultENUM.seen) {
            axiosPrivate.patch('auth/set-seen-preq', { pReqId: pReq.id })
            // setReload(true)
        }
    };

    const handleApprovingPReq = async () => {
        try {
            handleCloseApprovePReq();
            if (approveType === pReqResultENUM.accepted) {
                await axiosPrivate.patch(
                    `auth/set-approve-preq`, { pReqId: selectedApprovePReq?.id }
                );
            }
            if (approveType === pReqResultENUM.rejected) {
                await axiosPrivate.patch(
                    `auth/set-reject-preq`, { pReqId: selectedApprovePReq?.id }
                );
            }
            setReload(true)
            enqueueSnackbar(
                `your request approvement changed successfully. (id=${selectedApprovePReq?.id})`,
                { variant: 'success' },
            );
        } catch (err) {
            const ex = err as AxiosError<{ msg: string }>;
            enqueueSnackbar(ex.response?.data?.msg || 'Unknown Error', {
                variant: 'error',
            });
        } finally {
            setReload(true)
            setSelectedApprovePReq(null);
        }
    };

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        setLoading(true);

        const getData = async () => {
            try {
                const query = `accepted=${accepted}&&rejected=${rejected}&&unSeen=${unSeen}&&seen=${seen}&&skip=${skip}&&limit=${limit}&&selectedUserId=${selectedUser?.id}`;
                const response: {
                    data: { data: IPermissionRequest[]; count: number };
                } = await axiosPrivate.get(
                    `auth/get-all-permission-requests-to-approve?${query}`,
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
                isMounted && setLoading(false);
                isMounted && setReload(false);
                isMounted = false;
            }
        };
        getData();

        return () => {
            isMounted = false;
            setLoading(false);
            setReload(false);
            controller.abort();
        };
    }, [
        axiosPrivate,
        setLoading,
        accepted,
        rejected,
        unSeen,
        seen,
        skip,
        limit,
        reload,
        selectedUser
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

    const handleChangeApproveType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApproveType((event.target as HTMLInputElement).value);
    };

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
                                    Tag Filter:
                                </Typography>
                                <FormGroup row={isSm}>
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
                            <Divider sx={{ my: 2 }} />
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
                                    User Filter:
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
                                                                loading ? (
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
                                                                loading ? (
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
                                                            {loading ? (
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
                                                                            {formatDistanceToNow(item.createdAt)} ago
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
                                                                            {formatDistanceToNow(item.updatedAt)} ago
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
                                                        {loading ? (
                                                            <Stack
                                                                width={1}
                                                                direction={'row'}
                                                                alignItems="center"
                                                                display="flex"
                                                                justifyContent={'space-between'}
                                                            >
                                                                <Skeleton
                                                                    variant="text"
                                                                    animation="wave"
                                                                    width={70}
                                                                />
                                                                <Skeleton
                                                                    variant="rectangular"
                                                                    animation="wave"
                                                                    width={50}
                                                                />
                                                            </Stack>
                                                        ) : (
                                                            <Stack
                                                                width={1}
                                                                direction={'row'}
                                                                alignItems="center"
                                                                display="flex"
                                                                justifyContent={'space-between'}
                                                            >
                                                                <Chip
                                                                    label={item.result}
                                                                    color={item.result === pReqResultENUM.accepted ? 'success' : item.result === pReqResultENUM.rejected ? 'error' : item.result === pReqResultENUM.seen ? 'warning' : 'secondary'}
                                                                    variant="filled"
                                                                />
                                                                <Button
                                                                    color='secondary'
                                                                    size="small"
                                                                    onClick={() => handleOpenApprovePReq(item)}
                                                                >
                                                                    APPROVE
                                                                </Button>
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
            <Dialog
                open={showApprovePReqAlert}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseApprovePReq}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{`Approving Permission Request With the if of ${selectedApprovePReq?.id}.`}</DialogTitle>
                <DialogContent dividers>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">
                            Approving Type:
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={approveType}
                            onChange={handleChangeApproveType}
                        >
                            <Stack direction={'row'} alignItems={'center'} display={'flex'}><FormControlLabel value={pReqResultENUM.accepted} control={<Radio />} label="Accept" /><DoneAllIcon color='success' /></Stack>
                            <Stack direction={'row'} alignItems={'center'} display={'flex'}><FormControlLabel value={pReqResultENUM.rejected} control={<Radio />} label="Reject" /><RemoveDoneIcon color='error' /></Stack>
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseApprovePReq}>Cancel</Button>
                    <Button onClick={handleApprovingPReq}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ApprovePReqs;
