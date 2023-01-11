import DeleteForever from '@mui/icons-material/DeleteForever';
import { Button, ButtonGroup, IconButton, Stack } from '@mui/material';
import useAxiosPrivate from 'auth/hooks/useAxiosPrivate';
import { reactionTypeEnum } from 'enum/reactionType.enum';
import { useLoading } from 'loading/hooks/useLoading';
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
        const { enableLoading, disableLoading } = useLoading()
        const postLikesCount = useAppSelector((state) => selectPostReactionsCoundByPostIdAndReactionName(state, postId, reactionTypeEnum.like))
        const postDislikesCount = useAppSelector((state) => selectPostReactionsCoundByPostIdAndReactionName(state, postId, reactionTypeEnum.dislike))

        const handleLikeClick =
            useCallback(
                () => dispatch(likePost({ axiosPrivate, enableLoading, disableLoading, postId: postId }))
                , [axiosPrivate, dispatch, enableLoading, disableLoading, postId])

        const handleDislikeClick =
            useCallback(
                () => dispatch(dislikePost({ axiosPrivate, enableLoading, disableLoading, postId: postId }))
                , [axiosPrivate, enableLoading, disableLoading, dispatch, postId])

        const handleDeletePostClick =
            useCallback(
                () => dispatch(deletePost({ axiosPrivate, enableLoading, disableLoading, enqueueSnackbar, postId: postId }))
                , [axiosPrivate, dispatch, enableLoading, disableLoading, postId, enqueueSnackbar])


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