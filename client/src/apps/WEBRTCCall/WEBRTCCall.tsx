import { Cancel, ExitToApp, MicOffOutlined, MicOutlined, VideocamOffOutlined, VideocamOutlined } from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Box, Button, Chip, Container, Divider, IconButton, InputBase, Paper, Stack, Tooltip } from '@mui/material';
import Badge from '@mui/material/Badge';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { styled, useTheme } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import { CallInfoState, WEBRTCCallEvent, WEBRTCSignaling } from 'enum/webrtcCallEvent.enum';
import { IWEBRTCCall_JOINREQUEST } from 'models/WEBRTCCALL_APP/webrtcCallSocket.model';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { memo, useEffect, useRef, useState } from 'react';
// import { createWEBRTCPeerConnection, getWEBRTCPeerConnection } from 'redux/features/WEBRTCCALL_APP/peerConnectionContext';
import { useGetMyWEBRTCConferenceLinkMutation, useWEBRTCCallSocketQuery, webrtcCallSocket } from 'redux/features/WEBRTCCALL_APP/webrtcCallApiSlice';
import { useAuthRefreshNewAccessTokenMutation } from 'redux/features/WHOLE_APP/auth/authApiSlice';
import { selectCurrentAccessToken } from 'redux/features/WHOLE_APP/auth/authSlice';
import { useGetCurrentUserQuery } from 'redux/features/WHOLE_APP/currentUser/currentUserApiSlice';
import { useAppSelector } from 'redux/hooks';
import CallReject from 'svg/signs/CallReject';
import CallingSVG from 'svg/signs/Calling';
import CallingPhoto from 'svg/signs/CallingPhoto';

export let peerConnection: RTCPeerConnection

export const getWEBRTCPeerConnection = () => peerConnection

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


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

const WEBRTCCall = (props: Props) => {
    const { data: socketData, refetch } = useWEBRTCCallSocketQuery()
    const [getMyConferenceLink, { isLoading: gettingLinkLoading }] = useGetMyWEBRTCConferenceLinkMutation()
    const theme = useTheme();
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const { enqueueSnackbar } = useSnackbar()

    const [localStream, setLocalStream] = useState<MediaStream>(new MediaStream());
    const [remoteStream, setRemoteStream] = useState<MediaStream>(new MediaStream());

    const [link, setLink] = useState<string>('')
    const [localMicrophoneOn, setLocalMicrophoneOn] = useState(true);
    const [localCameraOn, setLocalCameraOn] = useState(true);
    const onlineUsersCount = (socketData && socketData.onlineUsers && link !== '' && (socketData.onlineUsers)[link] && ((socketData.onlineUsers)[link]).length) || 0
    const [refreshNewAccessToken] = useAuthRefreshNewAccessTokenMutation()
    const accessToken = useAppSelector(selectCurrentAccessToken)
    const { data: currentUser = null } = useGetCurrentUserQuery()

    const webrtcLinks = (socketData?.webrtcLinks && socketData?.webrtcLinks[link]) || {}
    const webRTCClients = Object.keys(webrtcLinks)

    const handleStartCall = async () => {
        try {
            const mediaDevices = navigator.mediaDevices
            const stream = await mediaDevices.getUserMedia({
                video: {
                    frameRate: { max: 15 },
                    // sampleSize: { max: 10 },
                    width: { exact: 320 },
                    height: { exact: 240 }
                },
                audio: true
            });

            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
                setLocalCameraOn(true)
                setLocalMicrophoneOn(true)

                const { aT } = await refreshNewAccessToken().unwrap()
                webrtcCallSocket.emit(WEBRTCCallEvent.NewMember, {
                    roomId: link,
                    accessToken: aT !== '' ? aT : accessToken
                })

                createWEBRTCPeerConnection(stream)

                // peerConnection.onicecandidateerror = ev => {
                //     console.log('err', ev)
                // }


                // publishing ...

                // const recorder = new MediaRecorder(
                //     stream,
                //     {
                //         mimeType: 'video/webm; codecs=vp9',
                //         // videoBitsPerSecond: 10000,           
                //     }
                // );

                // recorder.onerror = ev => {
                //     console.log('err', ev)
                // }
                // recorder.onstart = ev => {
                //     console.log('start', ev)
                // }
                // recorder.onpause = ev => {
                //     console.log('pause', ev)
                // }
                // recorder.onresume = ev => {
                //     console.log('resume', ev)
                // }
                // recorder.onstop = ev => {
                //     console.log('stop', ev)
                // }

                // recorder.ondataavailable = (event) => {

                //     // if (event.data.size > 0) {
                //     //     webrtcCallSocket.emit('clientcamera', { chunk: event.data, roomId: link })
                //     // }
                // };

                // mediaRecorderRef.current = recorder;
                // recorder.start(400);

                // setMediaRecorder(recorder)
            }
        } catch (error) {
            console.error('Error starting the call:', error);
        }
    };

    const handlePeerConnection = () => {
        // peerConnection.onicecandidate = async (ev) => {
        //     console.log('getting ice candidates from stun server', currentUser?.email, ev.candidate?.usernameFragment)
        //     if (ev.candidate) {
        //         //send our ice candidates to other peer ..
        //         const { aT } = await refreshNewAccessToken().unwrap()
        //         console.log(`sending ${currentUser?.email} ice.`)
        //         webrtcCallSocket.emit(WEBRTCCallEvent.WEBRTCSignaling, {
        //             type: WEBRTCSignaling.IceCandidate,
        //             candidate: ev.candidate,
        //             roomLink: link,
        //             accessToken: aT !== '' ? aT : accessToken
        //         })

        //     }
        // }

        // console.log('add remote stream to peer connection')
        // // recieving tracks ..
        // const thisRemoteStream = new MediaStream()
        // setRemoteStream(thisRemoteStream)
        // peerConnection.ontrack = ev => {
        //     thisRemoteStream.addTrack(ev.track)
        //     console.log('add remote track')
        // }
        // if (remoteVideoRef.current) {
        //     remoteVideoRef.current.srcObject = thisRemoteStream;
        // }
        // setRemoteStream(thisRemoteStream)


        // console.log('add our stream to peer connection')
        // // add our stream to peer connection
        // localStream.getTracks().forEach(track => {
        //     peerConnection.addTrack(track, localStream)
        // })

    }

    const handleEndCall = async () => {
        try {
            if (mediaRecorder) {
                mediaRecorder.stop()
            }
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop())
                setLocalCameraOn(false)
                setLocalMicrophoneOn(false)
                setLocalStream(new MediaStream())
            }
            const { aT } = await refreshNewAccessToken().unwrap()
            webrtcCallSocket.emit(WEBRTCCallEvent.HangUp, { roomId: link, accessToken: aT !== '' ? aT : accessToken })
            refetch()
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

    const handleCopyToClipboard = async () => {
        navigator.clipboard && navigator.clipboard.writeText(link)
        enqueueSnackbar(`Successfully Coppied To Clipboard!`, { variant: 'success' })
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

    const createWEBRTCPeerConnection = (stream: MediaStream) => {
        console.log('creating webrtc peer connection.', currentUser?.email)
        if (!peerConnection) {

            peerConnection = new RTCPeerConnection({
                iceServers: [
                    { urls: 'stun:stun.l.google.com:13902' }
                ]
            })

            peerConnection.onicecandidate = async (ev) => {
                console.log('getting ice candidates from stun server', currentUser?.email, ev.candidate?.usernameFragment)
                if (ev.candidate) {
                    //send our ice candidates to other peer ..
                    const { aT } = await refreshNewAccessToken().unwrap()
                    console.log(`sending ${currentUser?.email} ice.`)
                    webrtcCallSocket.emit(WEBRTCCallEvent.WEBRTCSignaling, {
                        type: WEBRTCSignaling.IceCandidate,
                        candidate: ev.candidate,
                        roomLink: link,
                        accessToken: aT !== '' ? aT : accessToken
                    })

                }
            }

            console.log('add remote stream to peer connection')
            // recieving tracks ..
            const thisRemoteStream = new MediaStream()
            setRemoteStream(thisRemoteStream)
            peerConnection.ontrack = ev => {
                console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
                thisRemoteStream.addTrack(ev.track)
            }
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = thisRemoteStream;
            }


            console.log('add our stream to peer connection')
            // add our stream to peer connection
            stream.getTracks().forEach(track => {
                peerConnection.addTrack(track, stream)
            })

            setRemoteStream(thisRemoteStream)
            setLocalStream(stream)



            // // recieving tracks ..
            // const remoteStream = new MediaStream()



            // peerConnection.ontrack = ev => {
            //     remoteStream.addTrack(ev.track)
            // }


            // // add our stream to peer connection
            // localStream?.getTracks().forEach(track => {
            //     peerConnection.addTrack(track, localStream)
            // })
        }
        console.log('created webrtc peer connection.', currentUser?.email, peerConnection)
        return peerConnection
    }

    const handleAcceptCall = async (call: IWEBRTCCall_JOINREQUEST) => {
        try {
            const { aT } = await refreshNewAccessToken().unwrap()
            webrtcCallSocket.emit(
                WEBRTCCallEvent.AcceptCall,
                {
                    roomLink: call.roomLink,
                    caller: call.caller,
                    accessToken: aT !== '' ? aT : accessToken
                }
            )
        }
        catch (ex) {
            const x = peerConnection
            console.log(ex)
        }
    }

    const handleRejectCall = (call: IWEBRTCCall_JOINREQUEST) => {

    }

    const sendWebRTCOffer = async ({ roomLink }: { roomLink: string }) => {
        const offerSDP = await peerConnection.createOffer()
        await peerConnection.setLocalDescription(offerSDP)
        console.log('set created offer as local description.')

        console.log('send created offer to other peer.')
        const { aT } = await refreshNewAccessToken().unwrap()
        webrtcCallSocket.emit(WEBRTCCallEvent.WEBRTCSignaling, {
            type: WEBRTCSignaling.Offer,
            sdp: offerSDP,
            roomLink: roomLink,
            accessToken: aT !== '' ? aT : accessToken,
        })
    }

    const activeCallings = (socketData && socketData.joinRequest && Object.values(socketData.joinRequest).filter(item => item.state === CallInfoState.Calling || item.state === CallInfoState.UnAvailable)) || []

    const caller = activeCallings.find(calling => calling.caller.email === currentUser?.email)

    // if (remoteVideoRef.current)
    //     remoteVideoRef.current.srcObject = remoteStream;
    // if (socketData && currentUser && socketData.webrtcEstablishedConnection && socketData.webrtcEstablishedConnection[currentUser.email || '']) {
    //     try {
    //         handlePeerConnection()
    //         console.log('handled')
    //     }
    //     catch (ex) {
    //         const x = peerConnection
    //         console.log(ex)
    //     }
    // }

    // useEffect(() => {
    //     if (currentUser?.email && socketData?.webrtcEstablishedConnection[currentUser.email]) {
    //         // console.log('mehdi', currentUser?.email, socketData?.webrtcEstablishedConnection)
    //         handlePeerConnection()
    //     }
    // }, [socketData?.webrtcEstablishedConnection])

    return (
        <>
            {
                caller && caller.state === CallInfoState.Calling &&
                <audio
                    id="ringingSound"
                    src="audio/WaitingCall.m4a"
                    autoPlay
                    loop
                    preload="auto">
                </audio>
            }
            {
                caller && caller.state === CallInfoState.UnAvailable &&
                <audio
                    id="ringingSound"
                    src="audio/UnAvailable.mp3"
                    autoPlay
                    loop
                    preload="auto">
                </audio>
            }
            {
                activeCallings.length > 0 && !caller &&
                <audio
                    id="ringingSound"
                    src="audio/IncomingCall.mp3"
                    autoPlay
                    loop
                    preload="auto">

                </audio>
            }
            <Dialog
                open={activeCallings.length > 0}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => null}
                aria-describedby="alert-dialog-slide-description"
                maxWidth="lg"
                PaperProps={{
                    sx: {
                        overflow: 'hidden',
                        borderRadius: '15px',
                        p: 1,
                        pr: 0,
                    }
                }}
            >
                <Grid container spacing={1} width={1}>
                    {
                        activeCallings.map((call, index) => {
                            const count = activeCallings.length
                            return (
                                <Grid
                                    key={index}
                                    xl={count >= 4 ? 3 : count >= 3 ? 4 : count >= 2 ? 6 : 12}
                                    lg={count >= 3 ? 4 : count >= 2 ? 6 : 12}
                                    md={count >= 3 ? 4 : count >= 2 ? 6 : 12}
                                    sm={count >= 2 ? 6 : 12}
                                    xs={12}
                                >
                                    {call.caller.email === currentUser?.email ?
                                        (
                                            call.state === CallInfoState.UnAvailable ?
                                                <>
                                                    <DialogTitle
                                                        borderRadius={'15px 15px 0 0'}
                                                        bgcolor={theme.palette.background.paper}
                                                    >
                                                        {`${call.callee.name || 'unknown'} is Unavailable!`}
                                                    </DialogTitle>
                                                    <DialogContent sx={{ bgcolor: theme.palette.background.level1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        {
                                                            call.callee.photo ?
                                                                <Box mt={1} borderRadius={2} width={1} component={'img'} alt="calleeImg" src={call.callee.photo} />
                                                                :
                                                                <CallingPhoto width={400} height={300} />
                                                        }
                                                    </DialogContent>
                                                    <DialogActions
                                                        sx={{
                                                            bgcolor: theme.palette.background.default,
                                                            borderRadius: '0 0 15px 15px',
                                                            justifyContent: 'center'
                                                        }}>
                                                        <Tooltip title={'Cancel'}>
                                                            <IconButton
                                                                onClick={() => handleRejectCall(call)}
                                                                sx={{ mr: 2 }}
                                                            >
                                                                <Cancel />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </DialogActions>
                                                </>
                                                :
                                                <>
                                                    <DialogTitle
                                                        borderRadius={'15px 15px 0 0'}
                                                        bgcolor={theme.palette.background.paper}
                                                    >
                                                        {`Calling ${call.callee.name || 'unknown'}`}
                                                    </DialogTitle>
                                                    <DialogContent sx={{ bgcolor: theme.palette.background.level1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        {
                                                            call.callee.photo ?
                                                                <Box mt={1} borderRadius={2} width={1} component={'img'} alt="calleeImg" src={call.callee.photo} />
                                                                :
                                                                <CallingPhoto width={400} height={300} />
                                                        }
                                                    </DialogContent>
                                                    <DialogActions
                                                        sx={{
                                                            bgcolor: theme.palette.background.default,
                                                            borderRadius: '0 0 15px 15px',
                                                            justifyContent: 'center'
                                                        }}>
                                                        <Tooltip title={'Cancel'}>
                                                            <IconButton
                                                                onClick={() => handleRejectCall(call)}
                                                                sx={{ mr: 2 }}
                                                            >
                                                                <CallReject width={40} height={40} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </DialogActions>
                                                </>
                                        )
                                        :
                                        <>
                                            <DialogTitle
                                                borderRadius={'15px 15px 0 0'}
                                                bgcolor={theme.palette.background.paper}
                                            >
                                                {`Call From ${call.caller.name || 'unknown'}`}
                                            </DialogTitle>
                                            <DialogContent sx={{ bgcolor: theme.palette.background.level1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                {
                                                    call.caller.photo ?
                                                        <Box mt={1} borderRadius={2} width={1} component={'img'} alt="callerImg" src={call.caller.photo} />
                                                        :
                                                        <CallingPhoto width={400} height={300} />
                                                }
                                            </DialogContent>
                                            <DialogActions
                                                sx={{
                                                    bgcolor: theme.palette.background.default,
                                                    borderRadius: '0 0 15px 15px',
                                                    justifyContent: 'space-between'
                                                }}>
                                                <Tooltip title={'Accept'}>
                                                    <IconButton
                                                        onClick={() => handleAcceptCall(call)}
                                                        sx={{ ml: 2 }}
                                                    >
                                                        <CallingSVG width={40} height={40} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={'Reject'}>
                                                    <IconButton
                                                        onClick={() => handleRejectCall(call)}
                                                        sx={{ mr: 2 }}
                                                    >
                                                        <CallReject width={40} height={40} />
                                                    </IconButton>
                                                </Tooltip>
                                            </DialogActions>
                                        </>
                                    }
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Dialog >
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
                                <Tooltip title="Copy To Clipboard" arrow>
                                    <IconButton onClick={handleCopyToClipboard} color="info" sx={{ p: '10px' }} aria-label="join">
                                        <ContentCopyIcon />
                                    </IconButton>
                                </Tooltip>
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
                            <Paper sx={{ p: '2px 4px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: 500 }}>
                                <video
                                    style={{ border: '1px solid red' }}
                                    width={'100%'}
                                    ref={remoteVideoRef}
                                    autoPlay
                                    playsInline
                                />
                                <Grid container spacing={1} width={1}>
                                    {
                                        webRTCClients.map((webrtcClientEmail, i) =>
                                            <Grid
                                                key={i}
                                                xs={webRTCClients.length === 1 ? 12 : 6}
                                                sm={webRTCClients.length === 1 ? 12 : webRTCClients.length === 2 ? 6 : 4}
                                                md={webRTCClients.length === 1 ? 12 : webRTCClients.length === 2 ? 6 : webRTCClients.length === 3 ? 4 : 3}
                                                lg={webRTCClients.length === 1 ? 12 : webRTCClients.length === 2 ? 6 : webRTCClients.length === 3 ? 4 : webRTCClients.length === 4 ? 3 : 2}
                                            >
                                                <Stack direction={'column'} spacing={1}>
                                                    <Chip
                                                        color='primary'
                                                        size='medium'
                                                        sx={{ width: '100%' }}
                                                        variant='outlined'
                                                        label={webrtcClientEmail}
                                                    />
                                                    <video
                                                        style={{ border: '1px solid red' }}
                                                        width={'100%'}
                                                        ref={remoteVideoRef}
                                                        autoPlay
                                                        playsInline
                                                    />

                                                    {/* <ReactPlayer
                                                    url={`${process.env.NODE_ENV === 'development'
                                                        ? process.env.REACT_APP_API_NMS_SERVER_URL_development
                                                        : process.env.REACT_APP_API_NMS_SERVER_URL_production}/live/${webrtcClientEmail}.flv`}
                                                    playing={true} // Auto-play the video
                                                    controls={false} // Dont Show video controls (play, pause, volume, etc.)
                                                    width={'100%'}
                                                    height={'100%'}
                                                /> */}
                                                </Stack>
                                            </Grid>
                                        )
                                    }
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
                                                    localCameraOn ? <VideocamOutlined /> : <VideocamOffOutlined />
                                                }
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title={localMicrophoneOn ? "Turn Off Microphone" : "Turn On Microphone"}>
                                            <IconButton onClick={handleToggleMicrophone}>
                                                {
                                                    localMicrophoneOn ? <MicOutlined /> : <MicOffOutlined />
                                                }
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                }
                            </Paper>
                        </Grid>
                    </Grid>
                    <Button href={`${process.env.NODE_ENV === 'development'
                        ? process.env.REACT_APP_API_NMS_SERVER_URL_development
                        : process.env.REACT_APP_API_NMS_SERVER_URL_production}/admin?auth=Bearer ${currentUser?.streamToken}`} target='_blank'>NMS Admn Pannel</Button>
                </Container>
            </Box >
        </>
    )
}

export default memo(WEBRTCCall)