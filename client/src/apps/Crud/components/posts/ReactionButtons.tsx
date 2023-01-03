import DeleteForever from '@mui/icons-material/DeleteForever';
import { Button, ButtonGroup, IconButton, Stack } from '@mui/material';
import useAuth from 'auth/hooks/useAuth';
import useAxiosPrivate from 'auth/hooks/useAxiosPrivate';
import { reactionTypeEnum } from 'enum/reactionType.enum';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { deletePost, dislikePost, IPostsState, likePost, selectAllPosts } from './postsSlice';

const reactionEmoji: { [key in reactionTypeEnum]: string } = {
    [reactionTypeEnum.like]: '👍',
    [reactionTypeEnum.dislike]: '👎',
}

interface IReactionButtonsProps {
    post: IPostsState
}

export function ReactionButtons(props: IReactionButtonsProps) {
    const dispatch = useAppDispatch()
    const { enqueueSnackbar } = useSnackbar()
    const axiosPrivate = useAxiosPrivate();
    const { setLoadingFetch } = useAuth()
    const { data: posts } = useAppSelector(selectAllPosts)

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <Button
                key={name}
                onClick={
                    () => {
                        return name === reactionTypeEnum.like ?
                            dispatch(likePost({ axiosPrivate, setLoadingFetch, postId: props.post.id })) :
                            name === reactionTypeEnum.dislike ?
                                dispatch(dislikePost({ axiosPrivate, setLoadingFetch, postId: props.post.id })) :
                                null
                    }
                }
            >
                {emoji} {props && posts && (posts.find((post: IPostsState) => post.id === props.post.id)?.reactions[name as reactionTypeEnum])}
            </Button>
        )
    })
    return (
        <Stack direction={'row'} spacing={1}>
            <ButtonGroup variant='outlined' size='small' >
                {reactionButtons}
            </ButtonGroup>
            <IconButton size='small' onClick={
                () => dispatch(
                    deletePost({
                        axiosPrivate,
                        setLoadingFetch,
                        enqueueSnackbar,
                        postId: props.post.id
                    }))}>
                <DeleteForever color='error' />
            </IconButton>
        </Stack>
    )
}
