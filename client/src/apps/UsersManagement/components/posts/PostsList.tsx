import { Box, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { formatDistanceToNow } from 'date-fns';
import { useAppSelector } from '../../redux/hooks';
import { selectAllPosts } from './postsSlice';
import { ReactionButtons } from './ReactionButtons';

export function PostsList() {
    // The `state` arg is correctly typed as `RootState` already
    const posts = useAppSelector(selectAllPosts).slice().sort((b, a) => a.date.getTime() - b.date.getTime(),)

    const renderedPosts = posts.map(post => (
        <Card key={post.id}>
            <CardHeader title={post.title} subheader={`by ${post.user?.name || 'UNKNOWN AUTHOR'}`} />
            <CardContent>{post.content.substring(0, 100)} ...</CardContent>
            <CardActions>
                <Stack width={'100%'} direction={'row'} display={'flex'} justifyContent='space-between' alignItems={'center'}>
                    {formatDistanceToNow(post.date)} ago
                    <ReactionButtons post={post} />
                </Stack>
            </CardActions>
        </Card >
    ))

    return (
        <Box component={'section'} >
            <Stack spacing={1}>
                <Typography variant='h2'>Posts</Typography>
                {renderedPosts}
            </Stack>
        </Box>
    )
}