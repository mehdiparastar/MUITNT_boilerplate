import { Box, Card, CardActionArea, CardActions, CardContent, CardHeader, Pagination, Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { formatDistanceToNow } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectAllPosts, getPostsStatus, fetchPosts, getPostsError } from './postsSlice';
import { ReactionButtons } from './ReactionButtons';
import { useEffect, useState } from 'react';
import { thunkStatus } from 'enum/reduxThunkStatus.enum';
import useAxiosPrivate from 'auth/hooks/useAxiosPrivate';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Item from 'components/Item/Item';
import useAuth from 'auth/hooks/useAuth';

export function PostsList() {
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useAppDispatch()
    const theme = useTheme();
    const { setLoadingFetch } = useAuth()

    // The `state` arg is correctly typed as `RootState` already
    const { count: postsAllCount, data: posts } = useAppSelector(selectAllPosts)//.slice().sort((b, a) => a.createdAt.getTime() - b.createdAt.getTime(),)
    const postsStatus = useAppSelector(getPostsStatus)
    const error = useAppSelector(getPostsError)

    const [skip, setSkip] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const limit = 6
    const count = Math.ceil(postsAllCount / limit)

    useEffect(() => {
        dispatch(fetchPosts({ axiosPrivate, setLoadingFetch, skip, limit }))
    }, [dispatch, axiosPrivate, limit, skip])


    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        value: number,
    ) => {
        setPage(value);
        setSkip((value - 1) * limit);
    };

    const renderedPosts = posts.map(post => (
        <Grid key={post.id} xs={12} sm={6} md={4} >
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
                        <CardHeader title={post.title.substring(0, 20)} subheader={`by ${post.author?.name || 'UNKNOWN AUTHOR'}`} />
                        <CardContent>{post.caption.substring(0, 200)} ...</CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Stack width={'100%'} direction={'row'} display={'flex'} justifyContent='space-between' alignItems={'center'}>
                            {formatDistanceToNow(post.createdAt)} ago
                            <ReactionButtons post={post} />
                        </Stack>
                    </CardActions>
                </Card >
            </Item>
        </Grid>
    ))

    return (
        <Box component={'section'} >
            <Stack spacing={1}>
                <Typography variant='h6' sx={{ textAlign: 'right', textDecoration: 'underline' }}>All: {postsAllCount}</Typography>
                <Grid container spacing={2}>
                    {renderedPosts}
                </Grid>
                <Pagination
                    sx={{ display: 'flex', width: 1, justifyContent: 'center' }}
                    variant="outlined"
                    shape="rounded"
                    count={count}
                    page={page}
                    onChange={handleChangePage}
                />
            </Stack>
        </Box>
    )
}