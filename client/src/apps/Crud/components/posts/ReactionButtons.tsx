import DeleteForever from '@mui/icons-material/DeleteForever';
import { Button, ButtonGroup, IconButton, Stack } from '@mui/material';
import useAuth from 'auth/hooks/useAuth';
import useAxiosPrivate from 'auth/hooks/useAxiosPrivate';
import { reactionTypeEnum } from 'enum/reactionType.enum';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { deletePost, dislikePost, likePost, selectPostReactionsCoundByPostIdAndReactionName } from './postsSlice';

const reactionEmoji: { [key in reactionTypeEnum]: string } = {
    [reactionTypeEnum.like]: '👍',
    [reactionTypeEnum.dislike]: '👎',
}

interface IReactionButtonsProps {
    postId: number
}

const ReactionButtons =
    ({ postId }: IReactionButtonsProps) => {
        const dispatch = useAppDispatch()
        const { enqueueSnackbar } = useSnackbar()
        const axiosPrivate = useAxiosPrivate();
        const { setLoadingFetch } = useAuth()
        const postLikesCount = useAppSelector((state) => selectPostReactionsCoundByPostIdAndReactionName(state, postId, reactionTypeEnum.like))
        const postDislikesCount = useAppSelector((state) => selectPostReactionsCoundByPostIdAndReactionName(state, postId, reactionTypeEnum.dislike))

        const handleLikeClick =
            useCallback(
                () => dispatch(likePost({ axiosPrivate, setLoadingFetch, postId: postId }))
                , [axiosPrivate, dispatch, postId, setLoadingFetch])

        const handleDislikeClick =
            useCallback(
                () => dispatch(dislikePost({ axiosPrivate, setLoadingFetch, postId: postId }))
                , [axiosPrivate, dispatch, postId, setLoadingFetch])

        const handleDeletePostClick =
            useCallback(
                () => dispatch(deletePost({ axiosPrivate, setLoadingFetch, enqueueSnackbar, postId: postId }))
                , [axiosPrivate, dispatch, postId, setLoadingFetch, enqueueSnackbar])


        const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
            return (
                <Button
                    key={name}
                    onClick={
                        name === reactionTypeEnum.like ?
                            handleLikeClick :
                            name === reactionTypeEnum.dislike ?
                                handleDislikeClick :
                                () => null
                    }
                >
                    {emoji} {name === reactionTypeEnum.like ? postLikesCount : name === reactionTypeEnum.dislike ? postDislikesCount : ''}
                </Button>
            )
        })
        return (
            <Stack direction={'row'} spacing={1}>
                <ButtonGroup variant='outlined' size='small' >
                    {reactionButtons}
                </ButtonGroup>
                <IconButton size='small'
                    onClick={handleDeletePostClick}
                >
                    <DeleteForever color='error' />
                </IconButton>
            </Stack>
        )
    }

export default React.memo(ReactionButtons)