import { Check, Close } from '@mui/icons-material'
import { Alert, AlertTitle, Box, Container, Fade, IconButton, Slide, Stack, Tooltip, Typography } from '@mui/material'
import { useConfirmJoinRequestMutation, useGetMyAllRequestsQuery, useRejectJoinRequestMutation } from 'redux/features/CHAT_APP/chatApiSlice'
import { formatDistanceToNow } from 'date-fns'
import { NotFoundSVG } from 'svg/pages/NotFoundSVG'
import { useTheme } from '@mui/material/styles';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';
import { RoomIntendedParticipantDto } from 'models/CHAT_APP/intendedParticipant.model'
import { useSnackbar } from 'notistack';

type Props = {}

const ChatRoomRequests = (props: Props) => {
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar()
    const { data: allReqs = [], isLoading } = useGetMyAllRequestsQuery()
    const [confirmJoinRequest] = useConfirmJoinRequestMutation()
    const [rejectJoinRequest] = useRejectJoinRequestMutation()

    const handleConfirmRequst = async (req: RoomIntendedParticipantDto) => {
        try {
            const confirm = await confirmJoinRequest(req.id).unwrap()
            enqueueSnackbar(`Successfully Confirmed! id=${confirm.id}`, { variant: 'success' })
        }
        catch (ex) {
            const err = ex as { data: { msg: string } }
            enqueueSnackbar(`Confirming Failed! ${err.data?.msg || 'Unknown Error'}`, { variant: 'error' });
        }
    }

    const handleRejectRequst = async (req: RoomIntendedParticipantDto) => {
        try {
            const reject = await rejectJoinRequest(req.id).unwrap()
            enqueueSnackbar(`Successfully Rejected! id=${reject.id}`, { variant: 'success' })
        }
        catch (ex) {
            const err = ex as { data: { msg: string } }
            enqueueSnackbar(`Rejecting Failed! ${err.data?.msg || 'Unknown Error'}`, { variant: 'error' });
        }
    }

    return (
        allReqs.length === 0 ?
            <Container maxWidth={'sm'}>
                <Box
                    height={'100%'}
                    width={'100%'}
                    maxWidth={{ xs: 500, md: '100%' }}
                    data-aos={'fade-up'}
                    display="flex"
                    flexDirection={'column'}
                    justifyContent={'space-between'}
                >
                    <Typography color={theme.palette.primary.main} fontWeight={'bold'} fontFamily={'TheBlacklist'} mb={8} mt={4} variant='h2' textAlign={'center'} >{'There is No Request!'}</Typography>
                    <NotFoundSVG
                        width={'100%'}
                        height={'100%'}
                    />
                </Box>
            </Container>
            :
            <Stack component={TransitionGroup} width={1} direction={'column'} spacing={1}>
                {allReqs.map((req, index) => {
                    return <Collapse key={req.id}>
                        <Alert
                            key={index}
                            sx={{ width: '100%' }}
                            severity="info"
                            action={
                                <Stack spacing={1} direction='row'>
                                    <Tooltip title="confirm">
                                        <IconButton edge="end" aria-label="confirm" onClick={() => handleConfirmRequst(req)}>
                                            <Check color='success' />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="reject">
                                        <IconButton edge="end" aria-label="reject" onClick={() => handleRejectRequst(req)}>
                                            <Close color='error' />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            }
                        >
                            <AlertTitle>{req.room.title}</AlertTitle>
                            by {req.creator.name} | {formatDistanceToNow(req.createdAt)} ago
                        </Alert>
                    </Collapse >
                })}
            </Stack >
    )
}

export default ChatRoomRequests