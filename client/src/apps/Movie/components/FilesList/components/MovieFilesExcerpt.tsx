import { AttachFileRounded, DeleteForever, Download, Lock, LockOpen } from '@mui/icons-material'
import { Box, Card, CardActionArea, CardActions, CardContent, CardHeader, CircularProgress, IconButton, LinearProgress, Stack, Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import useAxiosPrivate from 'api/axiosApi/useAxiosPrivate'
import Item from 'components/Item/Item'
import { formatDistanceToNow } from 'date-fns'
import { filesize } from 'filesize'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { useDeleteMovieFileMutation, useGetHlsStreamUrlMutation } from 'redux/features/MOVIE_APP/moviesApiSlice'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleOutline';
// import ReactPlayer from 'react-player'
import { IMovieFile } from 'models/MOVIES_APP/movieFile.model'

type Props = {
    file: IMovieFile;
    uploadingProgress: { [key: string]: number };
}

const MovieFilesExcerpt =
    ({ file, uploadingProgress }: Props) => {
        const theme = useTheme();
        const { enqueueSnackbar } = useSnackbar()
        const [loading, setLoading] = useState(false)
        const [downloadingProgress, setDownloadingProgress] = useState<{ [key: string]: number }>({})
        const [streamUrl, setStreamUrl] = useState<string>()
        // const [downloadFile] = useDownloadFileMutation()
        const [deleteFile, { isLoading: deletingLoad }] = useDeleteMovieFileMutation()
        const axiosPrivate = useAxiosPrivate();
        const [streamFile, { isLoading: streamingLoad }] = useGetHlsStreamUrlMutation();


        const downloadFile_usingAxios = async () => {
            try {
                const { data } = await axiosPrivate.get(`movies_app/get-file/${file.id}`, {
                    responseType: 'blob',
                    headers: {
                        Accept: 'application/octet-stream',
                        'Content-Type': file.type,
                    },
                    onDownloadProgress(progressEvent) {
                        const progress = progressEvent.total ? (progressEvent.loaded / progressEvent.total) * 100 : 0;
                        setDownloadingProgress(downloadingProgress => ({ ...downloadingProgress, [file.fileHash]: progress }))
                    },
                });
                if (!(data instanceof Blob)) return;

                const blob = new Blob([data], { type: file.type });
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = file.name;
                link.click();
            } catch (err) {
                console.log(err)
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
                await downloadFile_usingAxios()
                setLoading(false)
                enqueueSnackbar(`file with id '${file.id}' has downloaded successfully.`, { variant: 'success' })
            } catch (ex) {
                setLoading(false)
                const err = ex as { data: { msg: string } }
                enqueueSnackbar(`Downloading Failed! ${err.data?.msg || 'Unknown Error'}`, { variant: 'error' });
            }
        }

        const handleStramFile = async () => {
            try {
                const videoBlob = await streamFile(file.id).unwrap()
                const videoUrl = URL.createObjectURL(videoBlob);

                setStreamUrl(videoUrl)
                // console.log(stream)
            } catch (ex) {
                console.log(ex)
                const err = ex as { data: { msg: string } }
                enqueueSnackbar(`Straming Failed! ${err.data?.msg || 'Unknown Error'}`, { variant: 'error' });
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
                                action={file.private ? <Lock color="secondary" /> : <LockOpen color="primary" />}
                                avatar={<AttachFileRounded color='primary' />}
                                title={file.name}
                                subheader={`uploaded by ${file.owner?.name || 'UNKNOWN AUTHOR'} | ${filesize(file.size)}`}
                            />
                            {/* <ReactPlayer url={streamUrl} /> */}
                            {streamUrl && <video width={'100%'} height={300} src={streamUrl} controls />}
                            <CardContent>tags: {(file.tags && file.tags.length > 0) ? file.tags.map(tag => `#${tag.tag}`).join(', ') : 'without ant tag'}</CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Stack width={'100%'} direction={'row'} display={'flex'} justifyContent='space-between' alignItems={'center'}>
                                {formatDistanceToNow(file.createdAt)} ago
                                <Box>
                                    <IconButton onClick={handleStramFile}>
                                        {
                                            streamingLoad ?
                                                <CircularProgress size={20} />
                                                :
                                                <PlayCircleFilledWhiteIcon color='info' />
                                        }
                                    </IconButton>
                                    <IconButton onClick={handleDownloadFile}>
                                        {
                                            loading ? (
                                                downloadingProgress[file.fileHash] === undefined ?
                                                    <CircularProgress size={25} /> :
                                                    <CircularProgress variant="determinate" value={downloadingProgress[file.fileHash] || 0} size={25} />
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