import { AttachFileRounded, DeleteForever, Download, Lock, LockOpen } from '@mui/icons-material'
import { Box, Card, CardActionArea, CardActions, CardContent, CardHeader, CircularProgress, IconButton, Stack, useTheme } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import useAxiosPrivate from 'api/axiosApi/useAxiosPrivate'
import Item from 'components/Item/Item'
import { formatDistanceToNow } from 'date-fns'
import { filesize } from 'filesize'
import { IFile } from 'models/FILES_APP/file.model'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { useDeleteFileMutation } from 'redux/features/FILE_APP/filesApiSlice'

type Props = {
    file: IFile
}

const FilesExcerpt =
    ({ file }: Props) => {
        const theme = useTheme();
        const { enqueueSnackbar } = useSnackbar()
        const [loading, setLoading] = useState(false)
        // const [downloadFile] = useDownloadFileMutation()
        const [deleteFile, { isLoading: deletingLoad }] = useDeleteFileMutation()
        const axiosPrivate = useAxiosPrivate();

        const downloadFile_usingAxios = async () => {
            try {
                const { data } = await axiosPrivate.get(`files_app/get-file/${file.id}`, {
                    responseType: 'blob',
                    headers: {
                        Accept: 'application/octet-stream',
                        'Content-Type': file.type,
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
                            <CardContent>tags: {(file.tags && file.tags.length > 0) ? file.tags.map(tag => `#${tag.tag}`).join(', ') : 'without ant tag'}</CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Stack width={'100%'} direction={'row'} display={'flex'} justifyContent='space-between' alignItems={'center'}>
                                {formatDistanceToNow(file.createdAt)} ago
                                <Box>
                                    <IconButton onClick={handleDownloadFile}>
                                        {
                                            loading ?
                                                <CircularProgress size={20} />
                                                :
                                                <Download color="primary" />

                                        }
                                    </IconButton>
                                    <IconButton onClick={handleDeleteFile}>
                                        {
                                            deletingLoad ?
                                                <CircularProgress size={20} />
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

export default React.memo(FilesExcerpt)