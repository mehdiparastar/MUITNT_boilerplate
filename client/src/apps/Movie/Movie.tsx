import { Upload } from '@mui/icons-material';
import { Box, Container, LinearProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useTheme } from '@mui/material/styles';
import SimpleSlideDialog from 'components/SimpleSlideDialog/SimpleSlideDialog';
import { ITag } from 'models/TAGS/tag.model';
import { useEffect, useState } from 'react';
import FilesDropZone from './components/FilesDropZone/FilesDropZone';
import FilesList from './components/FilesList/FilesList';
import Filter from './components/Filter/Filter';

type Props = {}

const Movie = (props: Props) => {
    const theme = useTheme();
    const [loading, setLoading] = useState<boolean>(false)
    const [privateFilter, setPrivateFilter] = useState<boolean>(false)
    const [tagsFilter, setTagsFilter] = useState<ITag[]>([])
    const [uploadingProgress, setUploadingProgress] = useState<{ [key: string]: number }>({})

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return () => { };
    }, []);


    return (
        <Box width={1} height={1}>
            {loading && <LinearProgress color='primary' />}
            <Box
                height={1}
                width={1}
                display={'flex'}
                alignItems={'center'}
                bgcolor={theme.palette.alternate.main}
                component={'section'}
            >
                <Container
                    maxWidth="lg"
                >
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            alignItems: 'center',
                            py: { xs: 4, sm: 6 },
                        }}>
                        <Grid xs={12} sm={3}>
                            <SimpleSlideDialog
                                btnProps={{
                                    endIcon: <Upload />,
                                    variant: 'contained',
                                    size: 'large'
                                }}
                                btnTitle='Upload New Movies'
                                content={
                                    <FilesDropZone
                                        formId="movie-app-dropzone-form"
                                        setLoading={setLoading}
                                        setUploadingProgress={setUploadingProgress}
                                    />
                                }
                                title="Upload Your Movies"
                                confirmText='upload all'
                                formId="movie-app-dropzone-form"
                            />
                            <Typography variant='body2' pt={4}>⭐ Max Upload Size = 5000 MB</Typography>
                        </Grid>
                        <Grid xs={12} sm={9}>
                            <Filter
                                privateFilter={privateFilter}
                                setPrivateFilter={setPrivateFilter}
                                tagsFilter={tagsFilter}
                                setTagsFilter={setTagsFilter}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box
                height={1}
                width={1}
                display={'flex'}
                alignItems={'center'}
                component={'section'}
            >
                <Container
                    maxWidth="lg"
                    sx={{
                        textAlign: 'center',
                        px: 2,
                        py: { xs: 4, sm: 6, md: 8 },
                    }}
                >
                    <FilesList
                        privateFilter={privateFilter}
                        tagsFilter={tagsFilter}
                        uploadingProgress={uploadingProgress}
                    />
                </Container>
            </Box>
        </Box>
    )
}

export default Movie