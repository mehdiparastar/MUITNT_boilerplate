import { Card, CardActionArea, CardActions, CardContent, CardHeader, Stack, useTheme } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import Item from 'components/Item/Item'
import { formatDistanceToNow } from 'date-fns'
import React from 'react'
import { IPostsState } from './postsSlice'
import ReactionButtons from './ReactionButtons'

type Props = {
    post: IPostsState
}

const PostsExcerpt =
    ({ post }: Props) => {
        const theme = useTheme();

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
                            <CardHeader title={post.title.substring(0, 20)} subheader={`by ${post.author?.name || 'UNKNOWN AUTHOR'}`} />
                            <CardContent>{post.caption.substring(0, 200)} ...</CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Stack width={'100%'} direction={'row'} display={'flex'} justifyContent='space-between' alignItems={'center'}>
                                {formatDistanceToNow(post.createdAt)} ago
                                <ReactionButtons postId={post.id} />
                            </Stack>
                        </CardActions>
                    </Card >
                </Item>
            </Grid>
        )
    }

export default React.memo(PostsExcerpt)