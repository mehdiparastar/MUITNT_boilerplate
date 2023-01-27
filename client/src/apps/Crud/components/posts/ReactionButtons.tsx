import DeleteForever from '@mui/icons-material/DeleteForever';
import { Button, ButtonGroup, IconButton, Stack, useTheme } from '@mui/material';
import { reactionTypeEnum } from 'enum/reactionType.enum';
import { ICRUDAPPPost } from 'models/CRUD_APP/post.model';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { useDeletePostMutation, usePostDisLikeMutation, usePostLikeMutation } from 'redux/features/CRUD_APP/post/postsApiSlice';
import { useGetCurrentUserQuery } from 'redux/features/WHOLE_APP/currentUser/currentUserApiSlice';

const reactionEmoji: { [key in reactionTypeEnum]: string } = {
    [reactionTypeEnum.like]: '👍',
    [reactionTypeEnum.dislike]: '👎',
}

interface IReactionButtonsProps {
    post: ICRUDAPPPost
}

const ReactionButtons =
    ({ post }: IReactionButtonsProps) => {
        const theme = useTheme();
        const { enqueueSnackbar } = useSnackbar()
        const { data: currentUser = { id: -1 } } = useGetCurrentUserQuery()
        const [likePost] = usePostLikeMutation()
        const [dislikePost] = usePostDisLikeMutation()
        const [deletePost] = useDeletePostMutation()

        const postLikesCount = post.reactions.reduce((p, c) => p += c.type === reactionTypeEnum.like ? 1 : 0, 0)
        const postDislikesCount = post.reactions.reduce((p, c) => p += c.type === reactionTypeEnum.dislike ? 1 : 0, 0)
        const isLikedThisPost = post.reactions.filter(item => item.type === reactionTypeEnum.like).filter(item => item.creator.id === currentUser.id).length !== 0
        const isDisLikedThisPost = post.reactions.filter(item => item.type === reactionTypeEnum.dislike).filter(item => item.creator.id === currentUser.id).length !== 0

        const handleLikeClick =
            useCallback(
                async () => await likePost({ postId: post.id }).unwrap()
                , [likePost, post.id])

        const handleDislikeClick =
            useCallback(
                async () => await dislikePost({ postId: post.id }).unwrap()
                , [dislikePost, post.id])

        const handleDeletePostClick =
            useCallback(
                async () => {
                    if (window.confirm(`Deleting post ${post.id}`)) {
                        await deletePost({ id: post.id })
                        enqueueSnackbar(`Post with id '${post.id}' has removed successfully`, { variant: 'success' })
                    }
                }
                , [deletePost, post.id, enqueueSnackbar])


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
                    sx={{
                        backgroundColor:
                            name === reactionTypeEnum.like ?
                                (isLikedThisPost ? theme.palette.alternate.dark : 'inherit')
                                :
                                name === reactionTypeEnum.dislike ?
                                    (isDisLikedThisPost ? theme.palette.alternate.dark : 'inherit')
                                    :
                                    'inherit'
                    }}
                >
                    {emoji} {
                        name === reactionTypeEnum.like ?
                            postLikesCount :
                            name === reactionTypeEnum.dislike ?
                                postDislikesCount :
                                ''
                    }
                </Button >
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