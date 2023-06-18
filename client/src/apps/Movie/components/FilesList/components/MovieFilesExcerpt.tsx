import { AttachFileRounded, DeleteForever, Download, Lock, LockOpen } from '@mui/icons-material'
import StreamIcon from '@mui/icons-material/Stream'
import { Box, Card, CardActionArea, CardActions, CardContent, CardHeader, CircularProgress, IconButton, LinearProgress, Stack, Typography, useTheme } from '@mui/material'
import {
    CircularProgressProps,
} from '@mui/material/CircularProgress'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import useAxiosPrivate from 'api/axiosApi/useAxiosPrivate'
import Item from 'components/Item/Item'
import { formatDistanceToNow } from 'date-fns'
import { filesize } from 'filesize'
import { IMovieFile } from 'models/MOVIES_APP/movieFile.model'
import { ICurrentUser } from 'models/WHOLE_APP/currentUser.model'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { useDeleteMovieFileMutation } from 'redux/features/MOVIE_APP/moviesApiSlice'
import { UnauthorizedSVG } from 'svg/pages/UnauthorizedSVG'

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                >{`${Math.round(props.value)}`}</Typography>
            </Box>
        </Box>
    );
}

type Props = {
    file: IMovieFile;
    uploadingProgress: { [key: string]: number };
    currentUser: ICurrentUser | null
}

const MovieFilesExcerpt =
    ({ file, uploadingProgress, currentUser }: Props) => {
        const theme = useTheme();
        const { enqueueSnackbar } = useSnackbar()
        const [loading, setLoading] = useState(false)
        const [downloadingProgress, setDownloadingProgress] = useState<{ [key: string]: number }>({})
        // const [downloadFile] = useDownloadFileMutation()
        const [deleteFile, { isLoading: deletingLoad }] = useDeleteMovieFileMutation()
        const axiosPrivate = useAxiosPrivate();
        const [error, setError] = useState<boolean>(false)
        // eslint-disable-next-line
        const saveChunkToFile = (chunk: ArrayBuffer, index: number) => {
            // Create a temporary <a> element to trigger the file download
            const blob = new Blob([chunk], { type: 'application/octet-stream' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `${file.fileHash}.${index + 1}.bin`; // Replace with the desired file name
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        const handleFileChunkDownload = async () => {
            const chunkSize = 128 * 1024 * 1024; // Chunk size in bytes (e.g., 128MB)
            const totalChunks = Math.ceil(file.size / chunkSize)

            try {
                const fileData = [];

                for (let i = 0; i < totalChunks; i++) {
                    const { data }: { data: ArrayBuffer } = await axiosPrivate.get(`movies_app/get-file-chunk/${file.id}/${chunkSize}/${i}`, {
                        responseType: 'arraybuffer',
                        onDownloadProgress(progressEvent) {
                            const progress = file.size ? ((((i) * chunkSize) + progressEvent.loaded) / file.size) * 100 : 0;
                            setDownloadingProgress(downloadingProgress => ({ ...downloadingProgress, [file.fileHash]: progress }))
                        },
                    });

                    fileData.push(data);
                    // saveChunkToFile(data, i)
                    setDownloadingProgress(downloadingProgress => ({ ...downloadingProgress, [file.fileHash]: (i + 1) / totalChunks * 100 }))
                }

                const blob = new Blob(fileData, { type: 'application/octet-stream' });
                const downloadUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', file.name); // Replace with the desired file name
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error(error);
                // Handle file download error
            }
        };

        const handleDownloadFile = async () => {
            try {
                setLoading(true)
                /////////////////////////////////////////////////////////////////////////////////////////////////
                //  You can happily use your baseQuery as an alernative to axios directly to start a download, //
                //  but please don't use RTK-Query for a download. You run the risk of crashing the browser!   //
                //                                                                                             //
                //await downloadFile({ fileId: file.id, fileName: file.name }).unwrap()                        //
                /////////////////////////////////////////////////////////////////////////////////////////////////
                // await downloadFile_usingAxios()
                await handleFileChunkDownload()
                setLoading(false)
                enqueueSnackbar(`file with id '${file.id}' has downloaded successfully.`, { variant: 'success' })
            } catch (ex) {
                setLoading(false)
                const err = ex as { data: { msg: string } }
                enqueueSnackbar(`Downloading Failed! ${err.data?.msg || 'Unknown Error'}`, { variant: 'error' });
            }
        }

        const handleDeleteFile = async () => {
            try {
                if (window.confirm(`Are you sure for Deleting File with the name of '${file.name}'`)) {
                    await deleteFile({ id: file.id }).unwrap()
                    enqueueSnackbar(`file with id '${file.id}' has deleted successfully.`, { variant: 'success' })
                }
            } catch (ex) {
                setLoading(false)
                const err = ex as { data: { msg: string } }
                enqueueSnackbar(`Deleting Failed! ${err.data?.msg || 'Unknown Error'}`, { variant: 'error' });
            }
        }




        return (
            <Grid xs={12} sm={6} md={4} >
                {((uploadingProgress[file.fileHash] !== 100 && uploadingProgress[file.fileHash] !== undefined) || file.uploadedComplete === false) ?
                    <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                    >
                        {`${Math.round(uploadingProgress[file.fileHash])}%`}
                    </Typography>
                    : <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                    >&nbsp;</Typography>
                }
                <LinearProgress variant='determinate' value={(file.uploadedComplete ? 100 : uploadingProgress[file.fileHash]) || 0} />
                <Item
                    width={1}
                    height={1}
                    sx={{
                        textAlign: 'left',
                        transition: 'all .2s ease-in-out',
                        '&:hover': {
                            transform: `translateY(-${theme.spacing(0.5)})`,
                        },
                    }}>
                    <Card sx={{ width: 1, height: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} >
                        <CardActionArea>
                            <CardHeader
                                action={
                                    file.private ?
                                        (file.streamable) ?
                                            <Stack spacing={1} direction={'column'}>
                                                <Lock color="primary" />
                                                <StreamIcon color="secondary" />
                                            </Stack> :
                                            <Lock color="secondary" />
                                        :
                                        (file.streamable) ?
                                            <Stack spacing={1} direction={'column'}>
                                                <LockOpen color="primary" />
                                                <StreamIcon color="secondary" />
                                            </Stack> :
                                            <LockOpen color="primary" />

                                }
                                avatar={<AttachFileRounded color='primary' />}
                                title={file.name.length > 20 ? `${file.name.substring(0, 20)} ...` : file.name}
                                subheader={`uploaded by ${file.owner?.name || 'UNKNOWN AUTHOR'} | ${filesize(file.size)}`}
                            />
                            {
                                error ?
                                    <Box
                                        width={'100%'}
                                        height={300}
                                    >
                                        <UnauthorizedSVG />
                                    </Box>
                                    :
                                    <ReactPlayer
                                        url={`${file.hlsUrl}?auth=Bearer ${currentUser?.streamToken}`}
                                        controls
                                        width={'100%'}
                                        height={300}
                                        onError={(error: any) => {
                                            setError(true)
                                        }}
                                    />
                            }
                            <CardContent>tags: {(file.tags && file.tags.length > 0) ? file.tags.map(tag => `#${tag.tag}`).join(', ') : 'without any tag'}</CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Stack width={'100%'} direction={'row'} display={'flex'} justifyContent='space-between' alignItems={'center'}>
                                {formatDistanceToNow(file.createdAt)} ago
                                <Box>
                                    <IconButton disabled={!file.uploadedComplete} onClick={handleDownloadFile}>
                                        {
                                            loading ? (
                                                downloadingProgress[file.fileHash] === undefined ?
                                                    <CircularProgress size={25} /> :
                                                    <CircularProgressWithLabel value={downloadingProgress[file.fileHash] || 0} size={25} />
                                            )
                                                :
                                                <Download color="primary" />
                                        }
                                    </IconButton>
                                    <IconButton onClick={handleDeleteFile}>
                                        {
                                            deletingLoad ?
                                                <CircularProgress size={25} />
                                                :
                                                <DeleteForever color="error" />
                                        }
                                    </IconButton>
                                </Box>
                            </Stack>
                        </CardActions>
                    </Card >
                </Item>
            </Grid>
        )
    }

export default React.memo(MovieFilesExcerpt)