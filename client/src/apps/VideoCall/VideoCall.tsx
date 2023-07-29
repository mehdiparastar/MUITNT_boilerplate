import { EditNoteRounded, NewReleasesSharp, NewReleasesTwoTone } from '@mui/icons-material';
import { Box, Button, Container, Divider, IconButton, InputBase, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useTheme } from '@mui/material/styles';
import Item from 'components/Item/Item';
import React, { useEffect, useRef } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

type Props = {}

const VideoCall = (props: Props) => {

    const theme = useTheme();
    const localVideoRef = useRef<HTMLVideoElement>(null);
    let localStream: MediaStream | null = null;

    const handleStartCall = async () => {
        try {
            const mediaDevices = navigator.mediaDevices
            const stream = await mediaDevices.getUserMedia({ video: true, audio: true });
            localStream = stream;
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = localStream;
            }
        } catch (error) {
            console.error('Error starting the call:', error);
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        return () => { };
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
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="please enter conference session id or click on ⏎ to get new id"
                                inputProps={{ 'aria-label': 'please enter conference session id or click on ⏎ to get new id' }}
                            />
                            <Divider sx={{ backgroundColor: theme.palette.mode === 'dark' ? theme.palette.common.white : 'inherit', height: 32, mx: 0.5 }} orientation="vertical" />
                            <Tooltip title="join" arrow>
                                <IconButton onClick={handleStartCall} color="primary" sx={{ p: '10px' }} aria-label="directions">
                                    <KeyboardReturnIcon />
                                </IconButton>
                            </Tooltip>
                        </Paper>
                    </Grid>
                    <Grid xs={12}>
                        <Paper sx={{  p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}>
                            {/* <video style={{transform: 'scaleX(-1)'}} width={'100%'} ref={localVideoRef} autoPlay muted playsInline /> */}
                            {/* <video autoPlay muted id="local-video"></video> */}
                        </Paper>
                    </Grid>
                    <Grid xs={6} sm={4} md={3}>
                        <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}>
                            <video width={'100%'} ref={localVideoRef} autoPlay muted playsInline />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default VideoCall