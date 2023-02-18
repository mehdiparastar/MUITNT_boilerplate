import { Check, Close } from '@mui/icons-material'
import { Alert, AlertTitle, Box, Container, Fade, IconButton, Slide, Stack, Tooltip, Typography } from '@mui/material'
import { useGetMyAllRequestsQuery } from 'redux/features/CHAT_APP/chatApiSlice'
import { formatDistanceToNow } from 'date-fns'
import { NotFoundSVG } from 'svg/pages/NotFoundSVG'
import { useTheme } from '@mui/material/styles';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';

type Props = {}

const ChatRoomRequests = (props: Props) => {
    const theme = useTheme();
    const { data: allReqs = [], isLoading } = useGetMyAllRequestsQuery()

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
                {allReqs.map((req, index) =>
                    <Collapse key={index}>
                        <Slide timeout={index * 50} in={true} direction="down">
                            <Alert
                                key={index}
                                sx={{ width: '100%' }}
                                severity="info"
                                action={
                                    <Box data-aos={'flip-up'}>
                                        <Tooltip title="confirm">
                                            <IconButton edge="end" aria-label="confirm">
                                                <Check color='success' />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="reject">
                                            <IconButton edge="end" aria-label="reject">
                                                <Close color='error' />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                }
                            >
                                <AlertTitle>{req.room.title}</AlertTitle>
                                by {req.creator.name} | {formatDistanceToNow(req.createdAt)} ago
                            </Alert>
                        </Slide>
                    </Collapse>
                )}
            </Stack>
    )
}

export default ChatRoomRequests