import { Box, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { AddPostForm } from './components/posts/AddPostForm';
import { PostsList } from './components/posts/PostsList';

type Props = {}

const Crud = (props: Props) => {
    const theme = useTheme();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return () => { };
    }, []);

    return (
        <>
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
                        textAlign: 'center',
                        px: 2,
                        py: { xs: 4, sm: 6, md: 8 },
                    }}
                >
                    <AddPostForm />
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
                    <PostsList />
                </Container>
            </Box>
        </>
    )
}

export default Crud