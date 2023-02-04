import { Box, Pagination, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Stack } from '@mui/system';
import { PageLoader } from 'components/PageLoader/PageLoader';
import { ICRUDAPPPost } from 'models/CRUD_APP/post.model';
import { useState } from 'react';
import { useGetAllPostsQuery } from 'redux/features/CRUD_APP/post/postsApiSlice';
import PostsExcerpt from './PostsExcerpt';

export function PostsList() {

    const limit = 6
    const [page, setPage] = useState<number>(1);
    const [skip, setSkip] = useState<number>(0);

    const query = `skip=${skip}&&limit=${limit}`;
    const { data: paginatePosts = { data: [], count: 0 }, isLoading } = useGetAllPostsQuery({ query })

    const postsAllCount = paginatePosts.count
    const posts = paginatePosts.data

    const count = Math.ceil(postsAllCount / limit)

    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        value: number,
    ) => {
        setPage(value);
        setSkip((value - 1) * limit);
    };

    const renderedPosts = posts.map((post: ICRUDAPPPost) => <PostsExcerpt key={post.id} post={post} />)

    return (
        <Box component={'section'} >
            {isLoading && <PageLoader />}
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