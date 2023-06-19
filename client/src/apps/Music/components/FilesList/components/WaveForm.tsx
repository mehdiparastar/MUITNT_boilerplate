import React, { useCallback, useEffect, useRef, useState } from 'react';
// import WaveSurfer from 'wavesurfer.js';
import { PauseCircle, PlayCircle } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import WaveSurfer from 'wavesurfer.js'


interface WaveformProps {
    audio: string;
}


// WaveSurfer hook
const useWavesurfer = (containerRef: any, options: any) => {
    const [wavesurfer, setWavesurfer] = useState(null)

    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
        if (!containerRef.current) return

        const ws: any = WaveSurfer.create({
            ...options,
            container: containerRef.current,
        })

        setWavesurfer(ws)

        return () => {
            ws.destroy()
        }
    }, [options, containerRef])

    return wavesurfer
}

// Create a React component that will render wavesurfer.
// Props are wavesurfer options.
const Waveform = (props: any) => {
    const containerRef = useRef()
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const wavesurfer: any = useWavesurfer(containerRef, props)

    // On play button click
    const onPlayClick = useCallback(() => {
        wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play()
    }, [wavesurfer])

    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
        if (!wavesurfer) return

        setCurrentTime(0)
        setIsPlaying(false)

        const subscriptions = [
            wavesurfer.on('play', () => setIsPlaying(true)),
            wavesurfer.on('pause', () => setIsPlaying(false)),
            wavesurfer.on('timeupdate', (currentTime:any) => setCurrentTime(currentTime)),
        ]

        return () => {
            subscriptions.forEach((unsub) => unsub())
        }
    }, [wavesurfer])

    return (
        <>
            <Box ref={containerRef} style={{ minHeight: '120px' }} />

            <button onClick={onPlayClick} style={{ marginTop: '1em' }}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>

            <p>Seconds played: {currentTime}</p>
        </>
    )
}

const Waveform1: React.FC<WaveformProps> = ({ audio }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const waveSurferRef = useRef<WaveSurfer | { isPlaying: () => boolean }>({
        isPlaying: () => false,
    });
    const [isPlaying, toggleIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        const waveSurfer = WaveSurfer.create({
            container: document.body,
            waveColor: 'rgb(200, 0, 200)',
            progressColor: 'rgb(100, 0, 100)',
            url: audio
        });

        return () => {
            waveSurfer.destroy();
        };
    }, [audio]);

    return (
        <Box>
            <IconButton
                onClick={() => {
                    (waveSurferRef.current as WaveSurfer).play();
                    toggleIsPlaying(waveSurferRef.current.isPlaying());
                }}
                type="button"
            >
                {isPlaying ? <PlayCircle /> : <PauseCircle />}
            </IconButton>
            <div ref={containerRef} />
        </Box>
    );
};

// Waveform.propTypes = {
//     audio: PropTypes.string.isRequired,
// };

// const WaveSurferWrap = styled.div`
//   display: grid;
//   grid-template-columns: 40px 1fr;
//   align-items: center;

//   button {
//     width: 40px;
//     height: 40px;
//     border: none;
//     padding: 0;
//     background-color: white;
//   }
// `;


export default Waveform;