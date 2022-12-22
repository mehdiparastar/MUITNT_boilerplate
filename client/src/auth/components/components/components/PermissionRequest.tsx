import { Button, Card, CardActions, CardContent, CardMedia, Checkbox, Chip, Divider, FormControlLabel, FormGroup, IconButton, Pagination, Paper, Radio, TextareaAutosize, TextField, Tooltip, Typography } from '@mui/material';
import useAxiosPrivate from 'auth/hooks/useAxiosPrivate';
import { useSnackbar } from 'notistack';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Item from 'components/Item/Item';
import { useEffect, useState } from 'react';
import { Stack } from '@mui/system';
import { getRoleName, splitOnCapitalLetters, UserRoles, UserRolesFliped, UserRolesObj } from 'enum/userRoles.enum';
import { getRolesClassified } from 'helperFunctions/get-roles-expand';
import { AxiosError } from 'axios';
import useAuth from 'auth/hooks/useAuth';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import moment from 'moment';
import NoDataFoundSVG from 'svg/banners/NoDataFound/NoDataFound';

interface IPermissionRequestProps {
}
enum pReqResultENUM {
    accepted = 'accepted',
    rejected = 'rejected',
    unSeen = 'unSeen',
    seen = 'seen',
}
interface IPermissionRequest {
    id: number;
    user: IUser;
    adminMsg: string;
    role: UserRoles;
    result: pReqResultENUM;
    createdAt: Date;
    updatedAt: Date;

}

const PermissionRequest: React.FunctionComponent<IPermissionRequestProps> = (props) => {
    const { enqueueSnackbar } = useSnackbar()
    const { setLoadingFetch } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const [, setError] = useState<any>(null);
    const [accepted, setAccepted] = useState<boolean>(false)
    const [rejected, setRejected] = useState<boolean>(false)
    const [unSeen, setUnSeen] = useState<boolean>(false)
    const [seen, setSeen] = useState<boolean>(false)
    const [permissionReq, setPermissionReq] = useState<string>('')
    const [inDbPReqs, setInDbPReqs] = useState<IPermissionRequest[]>([])
    const [skip, setSkip] = useState<number>(0)
    const [limit, setLimit] = useState<number>(6)
    const [count, setCount] = useState<number>(1)
    const [page, setPage] = useState<number>(1)
    const [allCount, setAllCount] = useState<number>(0)
    const [reload, setReload] = useState<boolean>(false)
    let classifiedRoles: string[][] = Object.values(UserRoles).map(item => getRolesClassified(item).map(el => UserRolesFliped[el]))
    classifiedRoles = Array.from(
        new Map(classifiedRoles.map((p: any) => [p.join(), p])).values()
    )

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        setLoadingFetch(true);
        const getData = async () => {
            try {
                const query = `accepted=${accepted}&&rejected=${rejected}&&unSeen=${unSeen}&&seen=${seen}&&skip=${skip}&&limit=${limit}`
                const response: { data: { data: IPermissionRequest[], count: number } } =
                    await axiosPrivate
                        .get(`auth/get-my-all-permission-requests?${query}`, {
                            signal: controller.signal,
                        });
                isMounted && setAllCount(response.data.count)
                isMounted && setCount(Math.ceil(response.data.count / limit))
                isMounted && setInDbPReqs(response.data.data);
            } catch (err) {
                isMounted && setError(err);
            } finally {
                isMounted && setLoadingFetch(false);
                isMounted && setReload(false)
                isMounted = false
            }
        };
        getData();

        return () => {
            isMounted = false;
            setLoadingFetch(false);
            setReload(false)
            controller.abort();
        };
    }, [axiosPrivate, setLoadingFetch, accepted, rejected, unSeen, seen, skip, limit, reload]);

    const handleSendReq = async () => {
        try {
            const response = await axiosPrivate.post('auth/create-permission-request', { role: permissionReq })
            enqueueSnackbar(`your request added successfully. (id=${response.data.id})`, { variant: 'success' });
            setPermissionReq('')
            setReload(true)
        }
        catch (ex) {
            const err = ex as AxiosError<{ msg: string }>
            enqueueSnackbar(err.response?.data?.msg || 'Unknown Error', { variant: 'error' });
        }
    }

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        setSkip((value - 1) * limit)
    };

    return (
        <Grid container>
            <Grid xs={12}>
                <Item p={3} height={1} width={1}>
                    <Stack justifyContent={'space-between'} direction={'row'} alignItems="center">
                        <Typography variant="body1" fontWeight={'bold'} textAlign={"left"}>
                            Your Requests History:
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
                </Item>
            </Grid>
            <Grid xs={12}>
                <Item>
                    Total Count:{allCount}
                </Item>
            </Grid>
            <Grid xs={12}>
                <Item m={1}>
                    <Grid container spacing={1}>
                        {inDbPReqs.map((item, index) => (
                            <Grid xs={12} sm={6} md={4} key={index}>
                                <Card variant="elevation">
                                    <CardContent>
                                        <Stack direction={'row'} alignItems="center" display="flex" justifyContent={'space-between'}>
                                            <Tooltip title="This Request Unique Id" arrow>
                                                <Chip label={item.id} color="primary" />
                                            </Tooltip>
                                            <Paper sx={{ p: 1 }}>
                                                <Tooltip title="This Request Type" arrow>
                                                    <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                                                        {getRoleName(item.role)}
                                                    </Typography>
                                                </Tooltip>
                                            </Paper>
                                        </Stack>
                                        <br />
                                        <Stack direction={'row'} display="flex" alignItems={'center'} justifyContent="space-between">
                                            <Typography variant='caption'>
                                                Email:
                                            </Typography>
                                            <Typography variant='body1'>{item.user.email}</Typography>
                                        </Stack>
                                        <Stack direction={'row'} display="flex" alignItems={'center'} justifyContent="space-between">
                                            <Typography variant='caption'>
                                                Created At:
                                            </Typography>
                                            <Typography variant='body1'>{(moment(item.createdAt)).format('DD-MMM-YYYY HH:mm:ss')}</Typography>
                                        </Stack>
                                        <Stack direction={'row'} display="flex" alignItems={'center'} justifyContent="space-between">
                                            <Typography variant='caption'>
                                                Last Update At:
                                            </Typography>
                                            <Typography variant='body1'>{(moment(item.updatedAt)).format('DD-MMM-YYYY HH:mm:ss')}</Typography>
                                        </Stack>
                                        <Stack direction={'row'} display="flex" alignItems={'center'} justifyContent="space-between">
                                            <Typography variant='caption'>
                                                Message:
                                            </Typography>
                                            {item.adminMsg ? item.adminMsg : 'There is no message yet!'}
                                        </Stack>
                                    </CardContent>
                                    <Divider />
                                    <CardActions>
                                        <Stack
                                            width={1}
                                            direction={'row'}
                                            alignItems="center"
                                            display="flex" justifyContent={'space-between'}>
                                            <IconButton>
                                                <DeleteIcon color='error' />
                                            </IconButton>
                                            <Chip label={item.result} color="primary" variant="outlined" />
                                        </Stack>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Item>
            </Grid>
            {count > 1 &&
                <Grid xs={12}>
                    <Item justifyContent={'center'} display="flex" m={1}>
                        <Pagination variant="outlined" shape="rounded" count={count} page={page} onChange={handleChangePage} />
                    </Item>
                </Grid>
            }
            {count === 0 &&
                <Grid xs={12}>
                    <Item justifyContent={'center'} display="flex" m={1}>
                        <NoDataFoundSVG width={450} />
                    </Item>
                    <Typography m={1} variant='h5'>No Data Found</Typography>
                </Grid>
            }
            <Grid xs={12}>
                <Divider />
            </Grid>
            <Grid xs={12}>
                <Item p={3} height={1} width={1}>
                    <Typography variant="body1" fontWeight={'bold'} textAlign={"left"}>
                        Specify your new permission requests:
                    </Typography>
                </Item>
            </Grid>
            <Grid xs={12}>
                <Paper
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        p: 1,
                        mx: 4,
                        mb: 4
                    }}
                >
                    <FormGroup>
                        {classifiedRoles.map((roles, index) => (
                            <Grid
                                container
                                key={index}
                                display={"flex"}
                                alignContent="center"
                                justifyContent={'left'}
                                textAlign={"left"}
                                spacing={1}
                            >
                                {roles.map((role, i) => (
                                    <Grid key={`${index}-${i}`} xs={6} sm={4} md={3}>
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    name={UserRolesObj[role]}
                                                    checked={permissionReq === UserRolesObj[role]}
                                                    onChange={(event) => setPermissionReq(event.target.name)}
                                                />
                                            }
                                            label={splitOnCapitalLetters(role)}
                                        />
                                    </Grid>
                                ))}
                                {
                                    index + 1 !== classifiedRoles.length &&
                                    <Grid xs={12}>
                                        <Divider variant='fullWidth' sx={{ p: -1 }} />
                                    </Grid>
                                }
                            </Grid>
                        ))}
                    </FormGroup>
                    <Button onClick={handleSendReq} disabled={permissionReq === ''} size='large' sx={{ mt: 4, fontWeight: 'bold' }} variant='contained' fullWidth>send request</Button>
                </Paper>
            </Grid>
            <Grid xs={12}>
            </Grid>
        </Grid>
    )
};

export default PermissionRequest;
