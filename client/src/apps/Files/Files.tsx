import { Upload } from '@mui/icons-material';
import { Box, Container, LinearProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import FilesDropZone from 'apps/Files/components/FilesDropZone/FilesDropZone';
import SimpleSlideDialog from 'components/SimpleSlideDialog/SimpleSlideDialog';
import { ITag } from 'models/TAGS/tag.model';
import { useEffect, useState } from 'react';
import FilesList from './components/FilesList/FilesList';
import Filter from './components/Filter/Filter';

type Props = {}

const Files = (props: Props) => {
    const theme = useTheme();
    const [loading, setLoading] = useState<boolean>(false)
    const [privateFilter, setPrivateFilter] = useState<boolean>(false)
    const [tagsFilter, setTagsFilter] = useState<ITag[]>([])

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
                    sx={{
                        // display: 'flex',
                    }}
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
                                btnTitle='Upload New Files'
                                content={
                                    <FilesDropZone
                                        formId="file-app-dropzone-form"
                                        setLoading={setLoading}
                                    />
                                }
                                title="Upload Your Files"
                                confirmText='upload all'
                                formId="file-app-dropzone-form"
                            />
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
                    />
                </Container>
            </Box>
        </Box>
    )
}

export default Files