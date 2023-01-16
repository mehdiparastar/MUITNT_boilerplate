import DeleteIcon from '@mui/icons-material/DeleteForever';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    Checkbox,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControlLabel,
    FormGroup,
    Grow,
    IconButton,
    Pagination,
    Paper,
    Radio,
    Skeleton,
    Slide,
    Tooltip,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Stack } from '@mui/system';
import useAxiosPrivate from 'auth/hooks/useAxiosPrivate';
import { AxiosError } from 'axios';
import Item from 'components/Item/Item';
import { PageLoader } from 'components/PageLoader/PageLoader';
import { formatDistanceToNow } from 'date-fns';
import { pReqResultENUM } from 'enum/pReqResult.enum';
import {
    getRoleName,
    splitOnCapitalLetters,
    UserRoles,
    UserRolesFliped,
    UserRolesObj
} from 'enum/userRoles.enum';
import { getRolesClassified } from 'helperFunctions/get-roles-expand';
import { useSnackbar } from 'notistack';
import { forwardRef, useEffect, useState } from 'react';
import NoDataFoundSVG from 'svg/banners/NoDataFound/NoDataFound';

interface IPermissionRequestProps { }

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

const PermissionRequest: React.FunctionComponent<IPermissionRequestProps> = (
    props,
) => {
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();
    const axiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = useState(false)
    const [, setError] = useState<any>(null);
    const [accepted, setAccepted] = useState<boolean>(false);
    const [rejected, setRejected] = useState<boolean>(false);
    const [unSeen, setUnSeen] = useState<boolean>(false);
    const [seen, setSeen] = useState<boolean>(false);
    const [permissionReq, setPermissionReq] = useState<string>('');
    const [inDbPReqs, setInDbPReqs] = useState<IPermissionRequest[]>([]);
    const [skip, setSkip] = useState<number>(0);
    const [limit,] = useState<number>(6);
    const [count, setCount] = useState<number>(1);
    const [page, setPage] = useState<number>(1);
    const [allCount, setAllCount] = useState<number>(0);
    const [reload, setReload] = useState<boolean>(false);
    const [showDeletePReqAlert, setShowDeletePReqAlert] =
        useState<boolean>(false);
    const [selectedDeletePReq, setSelectedDeletePReq] =
        useState<IPermissionRequest | null>(null);

    let classifiedRoles: string[][] = Object.values(UserRoles).map((item) =>
        getRolesClassified(item).map((el) => UserRolesFliped[el]),
    );
    classifiedRoles = Array.from(
        new Map(classifiedRoles.map((p: any) => [p.join(), p])).values(),
    );

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        setLoading(true)

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
                isMounted && setLoading(false)
                isMounted && setReload(false);
                isMounted = false;
            }
        };
        getData();

        return () => {
            isMounted = false;
            setLoading(false)
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
    ]);

    const handleSendReq = async () => {
        try {
            const response = await axiosPrivate.post(
                'auth/create-permission-request',
                { role: permissionReq },
            );
            enqueueSnackbar(
                `your request added successfully. (id=${response.data.id})`,
                { variant: 'success' },
            );
            setPermissionReq('');
            setReload(true);
        } catch (ex) {
            const err = ex as AxiosError<{ msg: string }>;
            enqueueSnackbar(err.response?.data?.msg || 'Unknown Error', {
                variant: 'error',
            });
        }
    };

    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        value: number,
    ) => {
        setPage(value);
        setSkip((value - 1) * limit);
    };

    const handleCloseDeletePReq = () => {
        setShowDeletePReqAlert(false);
        setSelectedDeletePReq(null);
    };

    const handleOpenDeletePReq = (pReq: IPermissionRequest) => {
        setShowDeletePReqAlert(true);
        setSelectedDeletePReq(pReq);
    };

    const handleDeletingPReq = async () => {
        try {
            handleCloseDeletePReq();
            await axiosPrivate.delete(
                `auth/delete-permission-request/${selectedDeletePReq?.id}`,
            );
            enqueueSnackbar(
                `your request removed successfully. (id=${selectedDeletePReq?.id})`,
                { variant: 'success' },
            );
        } catch (err) {
            const ex = err as AxiosError<{ msg: string }>;
            enqueueSnackbar(ex.response?.data?.msg || 'Unknown Error', {
                variant: 'error',
            });
        } finally {
            setReload(true)
            setSelectedDeletePReq(null);
        }
    };

    return (
        loading ? <PageLoader /> :
            <>
                <Grid
                    container
                >
                    <Grid xs={12}>
                        <Item
                            p={3}
                            height={1}
                            width={1}
                        >
                            <Stack
                                justifyContent={'flex-end'}
                                direction={'row'}
                                alignItems="center"
                                spacing={1}
                            >
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
                        </Item>
                    </Grid>
                    <Grid xs={12}>
                        <Item>Total Count:{allCount}</Item>
                    </Grid>
                    <Grid xs={12}>
                        <Item m={2}>
                            <Grid
                                container
                                spacing={2}
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
                                                            action={
                                                                loading ? (
                                                                    <Skeleton
                                                                        variant="rectangular"
                                                                        animation="wave"
                                                                        width={130}
                                                                    />
                                                                ) : (
                                                                    <Paper sx={{ p: 0.5 }}>
                                                                        <Tooltip
                                                                            title="This Request Type"
                                                                            arrow
                                                                        >
                                                                            <Typography
                                                                                variant="body1"
                                                                                sx={{ fontWeight: 'bold' }}
                                                                            >
                                                                                {getRoleName(item.role)}
                                                                            </Typography>
                                                                            {/* </IconButton> */}
                                                                        </Tooltip>
                                                                    </Paper>
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
                                                                    variant="rounded"
                                                                    animation="wave"
                                                                    width={18}
                                                                    height={26}
                                                                />
                                                                <Skeleton
                                                                    variant="text"
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
                                                                <IconButton
                                                                    onClick={() => handleOpenDeletePReq(item)}
                                                                >
                                                                    <DeleteIcon color="error" />
                                                                </IconButton>
                                                                <Chip
                                                                    label={item.result}
                                                                    color={item.result === pReqResultENUM.accepted ? 'success' : item.result === pReqResultENUM.rejected ? 'error' : item.result === pReqResultENUM.seen ? 'warning' : 'secondary'}
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
                    <Grid xs={12}>
                        <Divider sx={{ my: 4 }} />
                    </Grid>
                    <Grid xs={12}>
                        <Item
                            p={3}
                            height={1}
                            width={1}
                        >
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography
                                        variant="body1"
                                        fontWeight={'bold'}
                                        textAlign={'left'}
                                    >
                                        Specify your new permission requests:
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormGroup>
                                        {classifiedRoles.map((roles, index) => (
                                            <Grid
                                                container
                                                key={index}
                                                display={'flex'}
                                                alignContent="center"
                                                justifyContent={'left'}
                                                textAlign={'left'}
                                                spacing={1}
                                            >
                                                {roles.map((role, i) => (
                                                    <Grid
                                                        key={`${index}-${i}`}
                                                        xs={6}
                                                        sm={4}
                                                        md={3}
                                                    >
                                                        <FormControlLabel
                                                            control={
                                                                <Radio
                                                                    name={UserRolesObj[role]}
                                                                    checked={permissionReq === UserRolesObj[role]}
                                                                    onChange={(event) =>
                                                                        setPermissionReq(event.target.name)
                                                                    }
                                                                />
                                                            }
                                                            label={splitOnCapitalLetters(role)}
                                                        />
                                                    </Grid>
                                                ))}
                                                {index + 1 !== classifiedRoles.length && (
                                                    <Grid xs={12}>
                                                        <Divider
                                                            variant="fullWidth"
                                                            sx={{ p: -1 }}
                                                        />
                                                    </Grid>
                                                )}
                                            </Grid>
                                        ))}
                                    </FormGroup>
                                    <Button
                                        onClick={handleSendReq}
                                        disabled={permissionReq === ''}
                                        size="large"
                                        sx={{ mt: 4, fontWeight: 'bold' }}
                                        variant="contained"
                                        fullWidth
                                    >
                                        send request
                                    </Button>
                                </AccordionDetails>
                            </Accordion>
                        </Item>
                    </Grid>
                </Grid>
                <Dialog
                    open={showDeletePReqAlert}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseDeletePReq}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{`Permission Request Deleting`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {`Are you sure about deleting the permission request with the id of `}
                            <strong>{selectedDeletePReq?.id}</strong>?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDeletePReq}>No, Not Sure</Button>
                        <Button onClick={handleDeletingPReq}>Yes, Sure</Button>
                    </DialogActions>
                </Dialog>
            </>
    );
};

export default PermissionRequest;
