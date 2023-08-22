import { ExitToApp, MicOffOutlined, MicOutlined, VideocamOffOutlined, VideocamOutlined } from '@mui/icons-material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Box, Button, Container, Divider, IconButton, InputBase, Paper, Tooltip } from '@mui/material';
import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { styled, useTheme } from '@mui/material/styles';
import { VideoCallEvent } from 'enum/videoCallEvent.enum';
import { memo, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useGetMyConferenceLinkMutation, useVideoCallSocketQuery, videoCallSocket } from 'redux/features/VIDEOCALL_APP/videoCallApiSlice';
import { useAuthRefreshNewAccessTokenMutation } from 'redux/features/WHOLE_APP/auth/authApiSlice';
import { selectCurrentAccessToken } from 'redux/features/WHOLE_APP/auth/authSlice';
import { useGetCurrentUserQuery } from 'redux/features/WHOLE_APP/currentUser/currentUserApiSlice';
import { useAppSelector } from 'redux/hooks';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        // backgroundColor: '#44b700',
        color: '#44b700',
        // boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(1.4)',
            opacity: 0,
        },
    },
}));


type Props = {}


const VideoCall = (props: Props) => {
    const { data: socketData = { onlineUsers: {}, rtmpLinks: {} } } = useVideoCallSocketQuery()
    const [getMyConferenceLink, { isLoading: gettingLinkLoading }] = useGetMyConferenceLinkMutation()
    const theme = useTheme();
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [link, setLink] = useState<string>('')
    const [localMicrophoneOn, setLocalMicrophoneOn] = useState(true);
    const [localCameraOn, setLocalCameraOn] = useState(true);
    const onlineUsersCount = (socketData.onlineUsers)[link]?.length || 0
    const [refreshNewAccessToken] = useAuthRefreshNewAccessTokenMutation()
    const accessToken = useAppSelector(selectCurrentAccessToken)
    const { data: currentUser = null } = useGetCurrentUserQuery()

    // const socket = new WebSocket('ws://192.168.1.6:8005');
    let mediaRecorder: MediaRecorder
    const rtmpLinks: string[] = (socketData?.rtmpLinks && socketData?.rtmpLinks[link]) || []

    const handleStartCall = async () => {
        try {
            const mediaDevices = navigator.mediaDevices
            const stream = await mediaDevices.getUserMedia({
                video: {
                    // frameRate: { max: 15 },
                    // sampleSize: { max: 10 },
                    width: { exact: 6 },// { ideal: 640 },
                    height: { exact: 4 }
                },
                // video: true,
                audio: true
            });
            setLocalStream(stream)
            if (localVideoRef.current) {
                const { aT } = await refreshNewAccessToken().unwrap()
                videoCallSocket.auth = { accessToken: aT !== '' ? aT : accessToken }
                videoCallSocket.connect()
                localVideoRef.current.srcObject = stream;
                setLocalCameraOn(true)
                setLocalMicrophoneOn(true)
                videoCallSocket.emit(VideoCallEvent.NewMember, { roomId: link })
                // publishing ...

                mediaRecorder = new MediaRecorder(
                    stream,
                    {
                        mimeType: 'video/webm; codecs=vp9',
                        // videoBitsPerSecond: 100000,           
                    }
                );

                mediaRecorder.onerror = ev => {
                    console.log('err', ev)
                }
                mediaRecorder.onstart = ev => {
                    console.log('start', ev)
                }
                mediaRecorder.onpause = ev => {
                    console.log('pause', ev)
                }
                mediaRecorder.onresume = ev => {
                    console.log('resume', ev)
                }

                mediaRecorder.ondataavailable = (event) => {

                    if (event.data.size > 0) {
                        videoCallSocket.emit('clientcamera', { chunk: event.data, roomId: link })
                    }
                };

                mediaRecorderRef.current = mediaRecorder;
                mediaRecorder.start(400);

            }
        } catch (error) {
            console.error('Error starting the call:');
        }
    };

    const handleEndCall = async () => {
        try {
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop())
                setLocalCameraOn(false)
                setLocalMicrophoneOn(false)
                setLocalStream(null)
                if (mediaRecorder) {
                    mediaRecorder.onstop = ev => {
                        console.log('stop', ev)
                        videoCallSocket.disconnect()
                    }
                }
            }
        }
        catch (ex) {
            console.log(ex)
        }
    }

    const handleToggleMicrophone = () => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            audioTrack.enabled = !localMicrophoneOn;
            setLocalMicrophoneOn(!localMicrophoneOn);
        }
    };

    const handleToggleCamera = () => {
        if (localStream) {
            const audioTrack = localStream.getVideoTracks()[0];
            audioTrack.enabled = !localCameraOn;
            setLocalCameraOn(!localCameraOn);
        }
    };

    const setConferenceLink = async () => {
        try {
            const res = await getMyConferenceLink().unwrap()
            setLink(res.link)
        }
        catch (ex) {
            console.log(ex)
        }
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setConferenceLink()

        window.addEventListener('beforeunload', handleEndCall);

        return () => {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
                mediaRecorderRef.current.stop();
                mediaRecorderRef.current = null;
            }
            window.removeEventListener('beforeunload', handleEndCall);
        };
        // eslint-disable-next-line
    }, []);

    return (
        <Box width={1} height={1} display="flex" paddingBottom={15} pt={2}>
            <Container
                maxWidth="lg"
                sx={{
                    display: "flex",
                    flexDirection: 'column',
                    minHeight: { xs: 'auto', md: 'calc(100vh - 240px)' },
                    // justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Grid container spacing={1} width={1} >
                    <Grid xs={12}>
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
                        >
                            <IconButton sx={{ p: 2 }} aria-label="menu">
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    // variant="dot"
                                    badgeContent={onlineUsersCount}
                                />
                            </IconButton>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Enter Conference Link"
                                inputProps={{ 'aria-label': 'Enter Conference Link' }}
                                value={gettingLinkLoading ? 'getting...' : link}
                                onChange={e => setLink(e.target.value)}
                            />
                            <Divider sx={{ backgroundColor: theme.palette.mode === 'dark' ? theme.palette.common.white : 'inherit', height: 32, mx: 0.5 }} orientation="vertical" />
                            <Tooltip title="join" arrow>
                                <IconButton onClick={handleStartCall} color="primary" sx={{ p: '10px' }} aria-label="join">
                                    <KeyboardReturnIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="exit" arrow>
                                <IconButton onClick={handleEndCall} color="error" sx={{ p: '10px' }} aria-label="exit">
                                    <ExitToApp />
                                </IconButton>
                            </Tooltip>
                        </Paper>
                    </Grid>
                    <Grid xs={12}>
                        <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', minHeight: 500 }}>
                            <Grid container spacing={1} width={1}>
                                {rtmpLinks.map((rtmp, i) =>
                                    <Grid
                                        key={i}
                                        xs={rtmpLinks.length === 1 ? 12 : 6}
                                        sm={rtmpLinks.length === 1 ? 12 : rtmpLinks.length === 2 ? 6 : 4}
                                        md={rtmpLinks.length === 1 ? 12 : rtmpLinks.length === 2 ? 6 : rtmpLinks.length === 3 ? 4 : 3}
                                        lg={rtmpLinks.length === 1 ? 12 : rtmpLinks.length === 2 ? 6 : rtmpLinks.length === 3 ? 4 : rtmpLinks.length === 4 ? 3 : 2}
                                    >
                                        <video
                                            src={`http://192.168.1.6:8005/live/${rtmp}.flv`}
                                            autoPlay
                                            playsInline
                                        />
                                        {/* <ReactPlayer
                                            //url={"http://192.168.1.6:8005/live/stream_key.flv"}
                                            url={`http://192.168.1.6:8005/live/${rtmp}.flv`}
                                            playing={true} // Auto-play the video
                                            controls={false} // Dont Show video controls (play, pause, volume, etc.)
                                            width={'100%'}
                                            // height={'100%'}
                                            // width={640}
                                            style={{ maxHeight: 480 }}
                                        /> */}
                                    </Grid>
                                )}
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid xs={6} sm={4} md={3}>
                        <Paper sx={{ p: '2px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', minHeight: 200 }}>
                            <video style={{ transform: 'scaleX(-1)' }} width={'100%'} ref={localVideoRef} autoPlay playsInline />
                            {localStream &&
                                <Box>
                                    <Tooltip title={localCameraOn ? "Turn Off Camera" : "Turn On Camera"}>
                                        <IconButton onClick={handleToggleCamera}>
                                            {
                                                localCameraOn ? <VideocamOffOutlined /> : <VideocamOutlined />
                                            }
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title={localMicrophoneOn ? "Turn Off Microphone" : "Turn On Microphone"}>
                                        <IconButton onClick={handleToggleMicrophone}>
                                            {
                                                localMicrophoneOn ? <MicOffOutlined /> : <MicOutlined />
                                            }
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            }
                        </Paper>
                    </Grid>
                </Grid>
                <Button href={`http://192.168.1.6:8005/admin?auth=Bearer ${currentUser?.streamToken}`} target='_blank'>NMS Admn Pannel</Button>
            </Container>
        </Box>
    )
}

export default memo(VideoCall)