import { EditNoteRounded, ExitToApp, MicExternalOffOutlined, MicNoneOutlined, MicOffOutlined, MicOutlined, NewReleasesSharp, NewReleasesTwoTone, OnlinePrediction, VideocamOff, VideocamOffOutlined, VideocamOffRounded, VideocamOutlined } from '@mui/icons-material';
import { Box, Button, Container, Divider, IconButton, InputBase, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useTheme } from '@mui/material/styles';
import Item from 'components/Item/Item';
import React, { memo, useEffect, useRef, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useGetMyConferenceLinkMutation, usePublishVideoMutation, useVideoCallSocketQuery, videoCallSocket } from 'redux/features/VIDEOCALL_APP/videoCallApiSlice';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { VideoCallEvent } from 'enum/videoCallEvent.enum';
import { getKeysWithValueOne } from 'helperFunctions/getObjectValueByValue';
import { useAppSelector } from 'redux/hooks';
import { selectCurrentAccessToken } from 'redux/features/WHOLE_APP/auth/authSlice';
import { useAuthRefreshNewAccessTokenMutation } from 'redux/features/WHOLE_APP/auth/authApiSlice';
import ReactPlayer from 'react-player';
import { useGetCurrentUserQuery } from 'redux/features/WHOLE_APP/currentUser/currentUserApiSlice';
// import flvjs from 'flv.js';

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
    const { data: socketData = { onlineUsers: {} } } = useVideoCallSocketQuery()
    const [getMyConferenceLink, { isLoading: gettingLinkLoading }] = useGetMyConferenceLinkMutation()
    const theme = useTheme();

    const localVideoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    // const flvPlayer = useRef<any>(null);

    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [link, setLink] = useState<string>('')
    const [localMicrophoneOn, setLocalMicrophoneOn] = useState(true);
    const [localCameraOn, setLocalCameraOn] = useState(true);
    const onlineUsersCount = (socketData.onlineUsers)[link]?.length || 0
    const [refreshNewAccessToken] = useAuthRefreshNewAccessTokenMutation()
    const accessToken = useAppSelector(selectCurrentAccessToken)
    const [publishVideo] = usePublishVideoMutation()
    const { data: currentUser = null } = useGetCurrentUserQuery()

    // const socket = new WebSocket('ws://192.168.1.6:8005');
    let mediaRecorder: MediaRecorder

    const handleStartCall = async () => {
        try {
            const mediaDevices = navigator.mediaDevices
            const stream = await mediaDevices.getUserMedia({
                video: {
                    frameRate: { max: 15 },
                    width: { exact: 640 },
                    height: { exact: 480 }
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

                const options = { mimeType: 'video/webm; codecs=vp8' };
                // const options = { mimeType: 'video/webm;codecs=h264,vp9,opus' };
                // const options = {
                //     mimeType: 'video/mp4; codecs="avc1.424028, mp4a.40.2"',
                // };
                mediaRecorder = new MediaRecorder(stream, options);

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
                const no = []
                mediaRecorder.ondataavailable = (event) => {
                    no.push('ondataavailable')

                    if (event.data.size > 0) {
                        console.log(no.length)
                        videoCallSocket.emit('clientcamera', event.data)
                        // socket.send(event.data)
                        // const blob = new Blob([event.data], { type: event.data.type })


                        // Convert Blob data to ArrayBuffer
                        // const arrayBuffer = await event.data.arrayBuffer();
                        // const chunk = new Uint8Array(arrayBuffer)
                        // socket.send(chunk)
                        // // Send the video stream to the NMS RTMP server using flv.js
                        // if (!flvPlayer.current) {
                        //     flvPlayer.current = flvjs.createPlayer({
                        //         type: 'flv',
                        //         url: `rtmp://192.168.1.6:1955/live/${link}`,
                        //     });
                        //     flvPlayer.current.attachMediaElement(localVideoRef.current);
                        //     flvPlayer.current.load();
                        //     flvPlayer.current.play();
                        // }
                        // flvPlayer.current.write(arrayBuffer);




                        // socket.send(event.data);
                        // console.log(socket)
                        // publishVideo({ stream: event.data, streamKey: link });
                    }
                };

                mediaRecorderRef.current = mediaRecorder;
                mediaRecorder.start(500);

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

    const setConderenceLink = async () => {
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
        setConderenceLink()

        window.addEventListener('beforeunload', handleEndCall);

        return () => {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
                mediaRecorderRef.current.stop();
                mediaRecorderRef.current = null;
            }
            window.removeEventListener('beforeunload', handleEndCall);
        };
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
                        <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}>
                            <video autoPlay muted id="local-video"></video>
                            {localVideoRef.current?.srcObject && localCameraOn &&
                                <ReactPlayer
                                    // url={`${file.hlsUrl}?auth=Bearer ${currentUser?.streamToken}`}
                                    url={'http://192.168.1.6:1955/live/stream_key'}
                                    controls
                                    width={400}
                                    height={300}
                                // onError={(error: any) => {
                                //     setError(error.target.error.code === 2)
                                // }}
                                />
                            }
                        </Paper>
                    </Grid>
                    <Grid xs={6} sm={4} md={3}>
                        <Paper sx={{ p: '2px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
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