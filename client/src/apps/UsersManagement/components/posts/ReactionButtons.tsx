import { Button, ButtonGroup } from '@mui/material';
import { useAppDispatch } from '../../redux/hooks';
import { IPostsState, IReactionState, reactionAdded } from './postsSlice';

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😯',
    heart: '🥰',
    rocket: '🧜‍♂️',
    coffee: '🛀🏼',
}

interface IReactionButtonsProps {
    post: IPostsState
}

export function ReactionButtons(props: IReactionButtonsProps) {
    const dispatch = useAppDispatch()
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <Button
                key={name}
                onClick={() => dispatch(reactionAdded({ postId: props.post.id, reaction: name as keyof IReactionState }))}
            >
                {emoji} {props.post.reactions[name as keyof IReactionState]}
            </Button>
        )
    })
    return (
        <ButtonGroup variant='text'>
            {reactionButtons}
        </ButtonGroup>
    )
}
