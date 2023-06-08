import { DeleteForever } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Box, IconButton, LinearProgress, SxProps, Tooltip, Typography, useTheme } from '@mui/material';
import { AxiosResponse } from 'axios';
import Item from 'components/Item/Item';
import { MUIAsyncAutocompleteTags } from 'components/MUIAsyncAutocompleteTags/MUIAsyncAutocompleteTags';
import { filesize } from 'filesize';
import { useFormik } from 'formik';
import HashLargeFile from 'helperFunctions/hash-large-file';
import { IAddMovieFileDto, IAddMovieFileInfoDto } from 'models/MOVIES_APP/addMovieFile.model';
import { ITag } from 'models/TAGS/tag.model';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useGetMovieFileTagsQuery } from 'redux/features/MOVIE_APP/movieFileTagsApiSlice';
import { useCreateMultipleMovieFileInfoMutation, useSetUploadingFileAsCompletedMutation, useUploadMultipleMovieFileMutation } from 'redux/features/MOVIE_APP/moviesApiSlice';
import UploadFileSVG from 'svg/banners/UploadFile/UploadFile';
import * as yup from 'yup';

function FilesDropZone(
    {
        formId,
        setLoading,
        setUploadingProgress
    }: {
        formId: string,
        setLoading: (arg: boolean) => void,
        setUploadingProgress: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>
    }) {
    const [createMultipleMovieFileInfo] = useCreateMultipleMovieFileInfoMutation()
    const [uploadMultipleFile] = useUploadMultipleMovieFileMutation()
    const [setUploadingFileAsCompleted] = useSetUploadingFileAsCompletedMutation()
    const { data: fileTags = [] } = useGetMovieFileTagsQuery()
    const { enqueueSnackbar } = useSnackbar()

    const formik = useFormik({
        initialValues: { files: [] } as { files: IAddMovieFileDto[] },
        onSubmit: async (values: { files: IAddMovieFileDto[] }) => {
            try {
                setLoading(true)
                const segmentSize = 10 * 1024 * 1024; // 10 MB

                if (values.files.length > 0) {
                    const movieFiles: IAddMovieFileInfoDto[] = []
                    // for (const file of values.files) {
                    for (let i = 0; i < values.files.length; i++) {
                        const file = values.files[i]
                        const thisFileHash = await HashLargeFile(file)

                        movieFiles.push({
                            name: file.name,
                            private: file.private || false,
                            fileHash: thisFileHash,
                            size: file.size,
                            type: file.type,
                            tags: file.tags,
                            totalSegments: Math.ceil(file.size / segmentSize)
                        })

                    }
                    const movieFilesInfo = await createMultipleMovieFileInfo(movieFiles).unwrap()
                    setLoading(false)

                    for (let i = 0; i < values.files.length; i++) {
                        const file = values.files[i]
                        const fileHash = movieFiles[i].fileHash

                        const movieFileInfo = [movieFilesInfo[i]]

                        enqueueSnackbar(`Uploading ${file.name.toString()} started.`, { variant: 'info' })

                        const totalSegments = Math.ceil(file.size / segmentSize);

                        // // Divide the file into segments
                        for (let i = 0; i < totalSegments; i++) {
                            const start = i * segmentSize;
                            const end = Math.min(start + segmentSize, file.size);
                            const segment = file.slice(start, end);
                            const formData = new FormData()
                            formData.append('files', segment)
                            formData.append('fileHash', fileHash)
                            formData.append('fileInfoId', movieFileInfo[0].id.toString())
                            formData.append('segmentNo', i.toString())
                            const uploadRes = await uploadMultipleFile(formData).unwrap()
                            setUploadingProgress(uploadingProgress => ({ ...uploadingProgress, [fileHash]: (uploadRes[0].segmentNo + 1) / totalSegments * 100 }))
                        }
                        enqueueSnackbar(`Uploading ${file.name.toString()} successfully Completed.`, { variant: 'success' })
                        await setUploadingFileAsCompleted({ fileInfoId: movieFileInfo[0].id }).unwrap()
                    }
                }

                formik.resetForm()
                setLoading(false)

                // enqueueSnackbar(`${uploadRes.length} files uploaded successfully.`, { variant: 'success' })
            }
            catch (ex) {
                const err = ex as { data: { msg: string } }
                enqueueSnackbar(`uploading Failed! ${err.data?.msg || 'Unknown Error'}`, { variant: 'error' });
                setLoading(false)
            }
        },
        validationSchema:
            yup.object().shape({
                files: yup.mixed().required()
            })
    })
    const theme = useTheme()
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'video/*': ['.mp4']
        },
        onDrop: (acceptedFiles: File[], fileRejections, event) => {
            formik.setFieldValue('files', acceptedFiles.map((file: File) => Object.assign(file, {
                preview: URL.createObjectURL(file),
                tags: [],
                private: false
            })))
        }
    });

    const handleGetTagsList = async () => {
        return Promise.resolve({ data: fileTags } as AxiosResponse<ITag[]>)
    }

    const classes: { [key: string]: SxProps } = {
        thumbsContainer: {
            // display: 'flex',
            // flexDirection: 'row',
            // flexWrap: 'wrap',
            marginTop: theme.spacing(2)
        },
        innerThumpContainer: {
            display: 'flex',
            flexDirection: 'column',
            borderRadius: theme.spacing(1),
            border: '1px solid #eaeaea',
            marginBottom: theme.spacing(2),
            boxSizing: 'border-box'
        },
        thumb: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            maxHeight: theme.spacing(16),
            padding: theme.spacing(2),
        },
        thumbInner: {
            display: 'flex',
            justifyContent: 'flex-start',
            minWidth: 0,
            overflow: 'hidden'
        },
        img: {
            display: 'block',
            width: theme.spacing(15),
            height: '100%',
            marginRight: theme.spacing(3),
        },
        dropzone: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            borderWidth: '2px',
            borderRadius: '2px',
            borderColor: '#eeeeee',
            borderStyle: 'dashed',
            backgroundClor: '#fafafa',
            color: '#bdbdbd',
            outline: 'none',
            transition: 'border .24s ease-in-out',
        }
    }

    const thumbs = formik.values.files.map((file) => {

        return (
            <Box sx={classes.innerThumpContainer} key={file.name}>
                <Box sx={classes.thumb}>
                    <Box sx={classes.thumbInner}>
                        <Box
                            component={'img'}
                            src={file.type.includes('image') ? file.preview : '/fileIcon.ico'}
                            sx={classes.img}
                            // Revoke data uri after image is loaded
                            onLoad={() => { URL.revokeObjectURL(file.preview || '') }}
                        />
                        <Box>
                            <Box display={'flex'} alignItems={'baseline'}>
                                <Typography variant='h6' component={'pre'}>{`file name: `}</Typography>
                                <Typography variant='body1' component={'pre'}>{`${file.name}`}</Typography>
                            </Box>
                            <Box display={'flex'} alignItems={'baseline'}>
                                <Typography variant='h6' component={'pre'}>{`file size: `}</Typography>
                                <Typography variant='body1' component={'pre'}>{`${filesize(file.size)}`}</Typography>
                            </Box>
                            {/* <Box display={'flex'} alignItems={'center'}>
                                <Typography variant='h6' component={'pre'}>{`status: `}</Typography>
                                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                    <LinearProgress sx={{ width: theme.spacing(15) }} variant="determinate" color='primary' value={0} />
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
                                        >{`${Math.round(0)}%`}</Typography>
                                    </Box>
                                </Box>
                            </Box> */}
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Tooltip title={!file.private ? "set file as Private" : "set file as Public"}>
                            <IconButton
                                onClick={
                                    () => formik.setFieldValue(
                                        'files',
                                        formik.values.files.map(
                                            item =>
                                                item === file ?
                                                    (Object.assign(item, { private: !file.private }))
                                                    :
                                                    (item)
                                        )
                                    )}
                            >
                                {
                                    !file.private ?
                                        <LockOpenIcon color='primary' />
                                        :
                                        <LockIcon color='primary' />
                                }
                            </IconButton>
                        </Tooltip>
                        <IconButton
                            onClick={() => {
                                formik.setFieldValue('files', formik.values.files.filter(item => item !== file))
                                URL.revokeObjectURL(file.preview || '')
                            }}
                        >
                            <DeleteForever color='error' />
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{ padding: theme.spacing(1), pt: 0 }}>
                    <MUIAsyncAutocompleteTags
                        name="fileTags"
                        ac_sx={{ width: '100%' }}
                        titleField={'tag'}
                        label='Tags'
                        getOptions={handleGetTagsList}
                        value={file.tags || []}
                        setValue={(newValue) => formik.setFieldValue(
                            'files',
                            formik.values.files.map(
                                item =>
                                    item === file ?
                                        (Object.assign(item, { tags: newValue }))
                                        :
                                        (item)
                            )
                        )}
                        onBlur={formik.handleBlur}
                    // error={Boolean(formik.touched.files?.find(item => item === file).tags)}
                    // helperText={(formik.touched.tags && formik.errors.tags)}
                    />
                </Box>
            </Box>
        )
    });

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => formik.values.files.forEach((file) => URL.revokeObjectURL(file.preview || ''));
    }, [formik.values.files]);


    return (
        <form id={formId} onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <Box>
                <Box {...getRootProps()} sx={classes.dropzone}>
                    <input {...getInputProps()} />
                    <Item>
                        <UploadFileSVG width={'100%'} height={theme.spacing(20)} maxwidth={theme.spacing(60)} />
                    </Item>
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </Box>
                <Box component={'aside'} sx={classes.thumbsContainer}>
                    {thumbs}
                </Box>
            </Box>
        </form>
    );
}

export default FilesDropZone
