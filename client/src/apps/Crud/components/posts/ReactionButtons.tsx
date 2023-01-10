import DeleteForever from '@mui/icons-material/DeleteForever';
import { Button, ButtonGroup, IconButton, Stack } from '@mui/material';
import useAxiosPrivate from 'auth/hooks/useAxiosPrivate';
import useLoadingFetch from 'auth/hooks/useLoadingFetch';
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
        const { handleLoading } = useLoadingFetch()
        const postLikesCount = useAppSelector((state) => selectPostReactionsCoundByPostIdAndReactionName(state, postId, reactionTypeEnum.like))
        const postDislikesCount = useAppSelector((state) => selectPostReactionsCoundByPostIdAndReactionName(state, postId, reactionTypeEnum.dislike))

        const handleLikeClick =
            useCallback(
                () => dispatch(likePost({ axiosPrivate, handleLoading: handleLoading, postId: postId }))
                , [axiosPrivate, dispatch, postId, handleLoading])

        const handleDislikeClick =
            useCallback(
                () => dispatch(dislikePost({ axiosPrivate, handleLoading: handleLoading, postId: postId }))
                , [axiosPrivate, dispatch, postId, handleLoading])

        const handleDeletePostClick =
            useCallback(
                () => dispatch(deletePost({ axiosPrivate, handleLoading: handleLoading, enqueueSnackbar, postId: postId }))
                , [axiosPrivate, dispatch, postId, handleLoading, enqueueSnackbar])


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