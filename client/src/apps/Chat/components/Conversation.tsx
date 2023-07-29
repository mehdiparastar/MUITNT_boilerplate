import { AttachFileOutlined, CallOutlined, Check, EmojiEmotionsOutlined, MoreVertOutlined, PhotoLibraryOutlined, ReportOutlined, Send, VideoCameraFrontOutlined, VolumeUpOutlined } from '@mui/icons-material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Avatar, Box, Divider, IconButton, ListItemButton, ListItemText, Paper, Stack, TextField, Toolbar, Typography, useTheme } from '@mui/material';
import { formatRelative } from 'date-fns';
import { ChatEvent } from 'enum/chatEvent.enum';
import { useFormik } from 'formik';
import { IChatRoomAddMessageFormDto } from 'models/CHAT_APP/message.model';
import { useSnackbar } from 'notistack';
import { createRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { chatSocket, useAddMessageMutation, useGetMessagesQuery } from 'redux/features/CHAT_APP/chatApiSlice';
import { useGetCurrentUserQuery } from 'redux/features/WHOLE_APP/currentUser/currentUserApiSlice';
import SimpleBarReact from "simplebar-react";
import UI04BGSVG from 'svg/backgrounds/UI04BGSVG';
import { UnauthorizedSVG } from 'svg/pages/UnauthorizedSVG';
import * as yup from 'yup';

type Props = {}

const validationSchema = yup.object<Shape<IChatRoomAddMessageFormDto>>({
    message: yup
        .string()
        .required('Please specify your new message')
        .min(1, 'The new caption should have at minimum length of 1'),
    roomId: yup.number().required('Please specify your room')
});


const Conversation = (props: Props) => {
    let { roomId } = useParams();
    const theme = useTheme()
    const { enqueueSnackbar } = useSnackbar()
    const scrollableNodeRef = createRef<any>();
    const [addMessage] = useAddMessageMutation()
    const { data: messages = [], error: getMessagesErr } = useGetMessagesQuery({ roomId: parseInt(roomId as string) })
    const { data: currentUser = null } = useGetCurrentUserQuery()

    const initialValues: IChatRoomAddMessageFormDto = {
        message: '',
        roomId: parseInt(roomId as string)
    };

    useEffect(() => {
        formik.values.roomId = Number(roomId)
        localStorage.setItem('active-room-id', roomId as string)
        chatSocket.emit(ChatEvent.ChangeActiveRoom, { currentActiveRoomId: Number(roomId) })
        // eslint-disable-next-line
    }, [roomId])

    useEffect(() => {
        if (scrollableNodeRef.current) {
            scrollableNodeRef.current.scrollTop = scrollableNodeRef.current.scrollHeight
        }
    }, [messages, scrollableNodeRef])

    const onSubmit = async (values: IChatRoomAddMessageFormDto) => {
        try {
            await addMessage(values).unwrap()
            formik.resetForm()
        } catch (ex) {
            const err = ex as { data: { msg: string } }
            enqueueSnackbar(`Creating new Room Failed! ${err.data?.msg || 'Unknown Error'}`, { variant: 'error' });
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit,
    });

    console.log(getMessagesErr)

    return (
        <Stack spacing={1} height={1} width={1} display={'flex'} direction={'column'}>
            <Paper elevation={2}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography fontFamily={'TheBlackList'} variant="h4">header</Typography>
                    <Box>
                        <IconButton>
                            <CallOutlined />
                        </IconButton>
                        <IconButton>
                            <VideoCameraFrontOutlined />
                        </IconButton>
                        <IconButton>
                            <ReportOutlined />
                        </IconButton>
                        <IconButton>
                            <MoreVertOutlined />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Paper>
            <Box sx={{
                width: 1,
                position: 'relative',
                // backgroundImage: 'url("/statics/images/chatBG5.svg")',
                // backgroundRepeat: 'no-repeat',
                // backgroundPosition: 'center',
                // backgroundSize: '100% 100%'
            }}>
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    width: 1,
                    height: 1,
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                    justifyContent: 'center',
                    '&::after': {
                        position: 'absolute',
                        content: '""',
                        width: '100%',
                        top: 0,
                        right: 0,
                        height: '100%',
                        // backgroundSize: '18px 18px',
                        // backgroundImage: `radial-gradient(${theme.palette.primary.light} 20%, transparent 20%)`,
                        opacity: 0.6,
                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.common.black : theme.palette.common.white
                    },
                }}>
                    <UI04BGSVG maxwidth={'100%'} />
                </Box>
                <SimpleBarReact
                    scrollableNodeProps={{
                        ref: scrollableNodeRef,
                    }}
                    style={{ maxHeight: 'calc(100vh - 410px', height: 'calc(100vh - 410px' }}
                >
                    {
                        getMessagesErr ?
                            <Box
                                width={'100%'}
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                            // height={300}
                            >
                                <UnauthorizedSVG width={300} />
                            </Box>
                            :
                            messages.map((msg, i) => {
                                const isWriter = msg.writer.id === currentUser?.id

                                return (
                                    <ListItemButton disableRipple key={i} sx={{ mb: 3, display: 'flex', justifyContent: 'flex-start', flexDirection: !isWriter ? 'row' : 'row-reverse', alignItems: 'flex-start' }}>
                                        <Avatar sx={{ mx: 1 }}>
                                            <Box width={1} component={'img'} alt="writerImg" src={msg.writer.photo} />
                                        </Avatar>
                                        <Box sx={{ display: 'flex', alignItems: !isWriter ? 'flex-start' : 'flex-end', flexDirection: 'column' }}>
                                            <Paper elevation={2} sx={{ width: 'fit-content', p: 0.5, backgroundColor: !isWriter ? theme.palette.alternate.dark : theme.palette.primary.main }}>
                                                <ListItemText>
                                                    {msg.message}
                                                </ListItemText>
                                            </Paper>
                                            <Box textAlign={!isWriter ? 'left' : 'right'} sx={{ display: 'flex', flexDirection: isWriter ? 'row' : 'row-reverse', alignItems: 'flex-end' }}>
                                                {
                                                    isWriter && (
                                                        (msg.isDelivered && !msg.isSeen) ?
                                                            <DoneAllIcon sx={{ mx: 1 }} /> :
                                                            (msg.isDelivered && msg.isSeen) ?
                                                                <DoneAllIcon sx={{ mx: 1 }} color='primary' /> :
                                                                <Check sx={{ mx: 1 }} />)
                                                }
                                                <Typography variant={'caption'}>{formatRelative(msg.updatedAt, new Date())}</Typography>
                                            </Box>
                                        </Box>
                                    </ListItemButton>
                                )
                            })}
                </SimpleBarReact>
            </Box>
            <Paper elevation={2}>
                <Toolbar disableGutters>
                    <Box
                        onSubmit={formik.handleSubmit}
                        component={'form'}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: 1,
                            height: 1,
                        }}
                    >
                        <TextField
                            id="filled-multiline-static"
                            multiline
                            rows={4}
                            placeholder="your message..."
                            variant="filled"
                            fullWidth
                            name={'message'}
                            value={formik.values.message}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.message && Boolean(formik.errors.message)}
                            helperText={formik.touched.message && formik.errors.message}
                        />
                        <Divider />
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                p: 0.5
                            }}
                        >
                            <Stack direction={'row'}>
                                <IconButton>
                                    <AttachFileOutlined />
                                </IconButton>
                                <IconButton>
                                    <PhotoLibraryOutlined />
                                </IconButton>
                                <IconButton>
                                    <EmojiEmotionsOutlined />
                                </IconButton>
                                <IconButton>
                                    <VolumeUpOutlined />
                                </IconButton>
                            </Stack>
                            <IconButton size='large' type='submit'>
                                <Send color='success' />
                            </IconButton>
                        </Box>
                    </Box>
                </Toolbar>
            </Paper>
        </Stack >
    )
}

export default Conversation