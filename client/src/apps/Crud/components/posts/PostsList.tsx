import { Box, Pagination, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Stack } from '@mui/system';
import useAuth from 'auth/hooks/useAuth';
import useAxiosPrivate from 'auth/hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import PostsExcerpt from './PostsExcerpt';
import { fetchPosts, IPostsState, selectAllPosts } from './postsSlice';

export function PostsList() {
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useAppDispatch()
    const { setLoadingFetch } = useAuth()

    // The `state` arg is correctly typed as `RootState` already
    const limit = 6
    const [page, setPage] = useState<number>(1);
    const [skip, setSkip] = useState<number>(0);

    const paginatePosts = useAppSelector(selectAllPosts)//.slice().sort((b, a) => a.createdAt.getTime() - b.createdAt.getTime(),)
    const postsAllCount = paginatePosts.count
    const posts = paginatePosts.data//.slice(0, limit)
    // const postsStatus = useAppSelector(getPostsStatus)
    // const error = useAppSelector(getPostsError)

    const count = Math.ceil(postsAllCount / limit)

    useEffect(() => {
        dispatch(fetchPosts({ axiosPrivate, setLoadingFetch, skip, limit }))
    }, [dispatch, setLoadingFetch, axiosPrivate, limit, skip])


    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        value: number,
    ) => {
        setPage(value);
        setSkip((value - 1) * limit);
    };

    const renderedPosts = posts.map((post: IPostsState) => <PostsExcerpt key={post.id} post={post} />)

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