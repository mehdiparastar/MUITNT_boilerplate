import { PauseRounded, PlayArrowRounded } from '@mui/icons-material';
import { Box, IconButton, Slider, Stack, Typography, useTheme } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAuthRefreshNewAccessTokenMutation } from 'redux/features/WHOLE_APP/auth/authApiSlice';
import WaveSurfer from 'wavesurfer.js';
import Minimap from 'wavesurfer.js/dist/plugins/minimap';
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.js';

// WaveSurfer hook
const useWavesurfer = (containerRef: any, options: any) => {
    const theme = useTheme();
    const [wavesurfer, setWavesurfer] = useState<WaveSurfer>()
    const ctx = document.createElement('canvas').getContext('2d')
    const gradient = ctx?.createLinearGradient(0, 0, 0, 150)
    gradient?.addColorStop(0, theme.palette.primary.dark)
    gradient?.addColorStop(0.7, theme.palette.primary.main)
    gradient?.addColorStop(1, theme.palette.primary.light)

    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
        if (!containerRef.current) return

        const ws = WaveSurfer.create({
            ...options,
            // barWidth={10}
            // barRadius={4}
            // barGap={2}
            waveColor: gradient,
            barWidth: 2,
            barHeight: 0.9,
            progressColor: theme.palette.secondary.main,
            container: containerRef.current,
            minPxPerSec: 20,
            hideScrollbar: true,
            autoCenter: true,
            // normalize: false,
            plugins: [
                // Register the plugin
                Minimap.create({
                    // normalize: false,
                    container: containerRef.current,
                    // height: 25      
                    waveColor: '#ddd',
                    progressColor: '#999',
                    // the Minimap takes all the same options as the WaveSurfer itself
                    plugins: [
                        TimelinePlugin.create()
                    ]
                }),
            ],
        })

        setWavesurfer(ws)

        return () => {
            ws.destroy()
        }
        // eslint-disable-next-line 
    }, [options.peaks[0].length, containerRef])

    return wavesurfer
}

// Create a React component that will render wavesurfer.
// Props are wavesurfer options.
const Waveform = (props: any) => {
    const theme = useTheme()
    const containerRef = useRef()
    const [currentTime, setCurrentTime] = useState(0)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const wavesurfer = useWavesurfer(containerRef, props)

    const [refreshNewAccessToken] = useAuthRefreshNewAccessTokenMutation()

    // On play button click
    const onPlayClick = useCallback(() => {
        wavesurfer?.isPlaying() ? wavesurfer.pause() : wavesurfer?.play()
    }, [wavesurfer])

    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
        if (!wavesurfer) return

        setCurrentTime(0)
        setIsPlaying(false)

        const subscriptions = [
            wavesurfer.on('play', () => {
                setIsPlaying(true)
            }),
            wavesurfer.on('pause', () => {
                setIsPlaying(false)
            }),
            wavesurfer.on('timeupdate', (currentTime: any) => {
                setCurrentTime(currentTime)
                if (currentTime % 10 < 0.1) {
                    refreshNewAccessToken()
                }
            }),
        ]

        return () => {
            subscriptions.forEach((unsub) => unsub())
        }
        // eslint-disable-next-line 
    }, [wavesurfer])

    const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
    // const lightIconColor =
    //     theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

    return (
        <Box>
            <Box ref={containerRef} minHeight={120} />
            <br />
            <Stack direction={'row'} justifyContent={'space-around'} alignItems={'center'} spacing={1}>
                <IconButton
                    size='large'
                    onClick={onPlayClick}
                >
                    {isPlaying ? <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} /> : <PlayArrowRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />}
                </IconButton>
                <Typography>
                    0.25x
                </Typography>
                <Slider
                    aria-label="Speed"
                    defaultValue={1}
                    onChange={(event, value) => { wavesurfer?.setPlaybackRate(value as number, true) }}
                    valueLabelDisplay="auto"
                    step={0.25}
                    marks
                    min={0.25}
                    max={4}
                    sx={{
                        color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                        '& .MuiSlider-track': {
                            border: 'none',
                        },
                        '& .MuiSlider-thumb': {
                            width: 24,
                            height: 24,
                            backgroundColor: '#fff',
                            '&:before': {
                                boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                            },
                            '&:hover, &.Mui-focusVisible, &.Mui-active': {
                                boxShadow: 'none',
                            },
                        },
                    }}
                />
                <Typography>
                    4x
                </Typography>
            </Stack>
            <p>Played {currentTime.toFixed(0)} seconds</p>
        </Box>
    )
}


export default React.memo(Waveform)






// import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
// import { Pause, PlayArrow } from '@mui/icons-material';
// import { Box, IconButton, useTheme } from '@mui/material';
// import WaveSurfer from 'wavesurfer.js';
// import Minimap from 'wavesurfer.js/dist/plugins/minimap';

// interface WaveformProps {
//     audio: string;
// }

// // WaveSurfer hook
// const useWavesurfer = (containerRef: any, options: any) => {
//     const theme = useTheme();
//     const [wavesurfer, setWavesurfer] = useState<WaveSurfer>()
//     const ctx = document.createElement('canvas').getContext('2d')
//     const gradient = ctx?.createLinearGradient(0, 0, 0, 150)
//     gradient?.addColorStop(0, theme.palette.primary.dark)
//     gradient?.addColorStop(0.7, theme.palette.primary.main)
//     gradient?.addColorStop(1, theme.palette.primary.light)

//     // Initialize wavesurfer when the container mounts
//     // or any of the props change
//     useEffect(() => {
//         if (!containerRef.current) return

//         const ws = WaveSurfer.create({
//             ...options,
//             // barWidth={10}
//             // barRadius={4}
//             // barGap={2}
//             waveColor: gradient,
//             barWidth: 2,
//             barHeight: 0.9,
//             progressColor: theme.palette.secondary.main,
//             container: containerRef.current,
//             minPxPerSec: 50,
//             hideScrollbar: true,
//             autoCenter: true,
//             normalize: false,
//             plugins: [
//                 // Register the plugin
//                 Minimap.create({
//                     normalize: false,
//                     container: containerRef.current,
//                     // height: 25      
//                     waveColor: '#ddd',
//                     progressColor: '#999',
//                     // the Minimap takes all the same options as the WaveSurfer itself
//                 }),
//             ],
//         })

//         setWavesurfer(ws)

//         return () => {
//             ws.destroy()
//         }
//     }, [options, containerRef])

//     return wavesurfer
// }

// // Create a React component that will render wavesurfer.
// // Props are wavesurfer options.
// const Waveform = forwardRef((props: any, ref) => {
//     const containerRef = useRef()
//     const [currentTime, setCurrentTime] = useState(0)
//     const [isPlaying, setIsPlaying] = useState<boolean>(false)
//     const wavesurfer = useWavesurfer(containerRef, props)

//     // Assign the ref to the component
//     React.useImperativeHandle(ref, () => ({
//         onPlayClick,
//     }));

//     // On play button click
//     const onPlayClick = useCallback(() => {
//         wavesurfer?.isPlaying() ? wavesurfer.pause() : wavesurfer?.play()
//     }, [wavesurfer])

//     // Initialize wavesurfer when the container mounts
//     // or any of the props change
//     useEffect(() => {
//         if (!wavesurfer) return

//         setCurrentTime(0)
//         setIsPlaying(false)

//         const subscriptions = [
//             wavesurfer.on('play', () => {
//                 setIsPlaying(true)
//             }),
//             wavesurfer.on('pause', () => {
//                 setIsPlaying(false)
//             }),
//             wavesurfer.on('timeupdate', (currentTime: any) => {
//                 setCurrentTime(currentTime)
//             }),
//         ]

//         return () => {
//             subscriptions.forEach((unsub) => unsub())
//         }
//     }, [wavesurfer])


//     return (
//         <Box>
//             <Box ref={containerRef} minHeight={120} />
//             <IconButton
//                 size='large'
//                 onClick={onPlayClick}
//             >
//                 {isPlaying ? <Pause color={'secondary'} fontSize='large' /> : <PlayArrow color='secondary' fontSize='large' />}
//             </IconButton>
//             <p>Seconds played: {currentTime.toFixed(2)}</p>
//         </Box>
//     )
// })


// export default Waveform;
