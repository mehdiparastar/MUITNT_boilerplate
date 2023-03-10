import { Box, Card, CardMedia, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';

type Props = {}

const Chat = (props: Props) => {
    const theme = useTheme();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return () => { };
    }, []);

    return (
        <Box width={1} height={1} display="flex" paddingBottom={15}>
            <Container
                maxWidth="lg"
                sx={{
                    display: "flex",
                    flexDirection: 'column',
                    minHeight: { xs: 'auto', md: 'calc(100vh - 240px)' },
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Typography mb={10} color={theme.palette.text.primary} textAlign={'center'} variant='h4'>Welcome to MUITNT Chat App.</Typography>
                <Card sx={{ maxWidth: 1000, width: { xs: 200, sm: 300, md: 500, lg: 600, xl: 800 } }}>
                    <CardMedia
                        sx={{
                            height: { xs: 150, sm: 225, md: 375, lg: 450, xl: 600 },
                        }}
                        image='/statics/images/chat.png'
                        title="chat"
                    />
                </Card>
            </Container>
        </Box>

    )
}

export default Chat