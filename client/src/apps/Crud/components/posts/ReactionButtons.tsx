import { Button, ButtonGroup } from '@mui/material';
import { reactionTypeEnum } from 'enum/reactionType.enum';
import { useAppDispatch } from '../../redux/hooks';
import { IPostsState, IReactionState, } from './postsSlice';

const reactionEmoji = {
    [reactionTypeEnum.like]: '👍',
    [reactionTypeEnum.dislike]: '👎',
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
            // onClick={() => dispatch(reactionAdded({ postId: props.post.id, reaction: name as keyof IReactionState }))}
            >
                {emoji}
                {/* {props.post.reactions[name as keyof IReactionState]} */}
            </Button>
        )
    })
    return (
        <ButtonGroup variant='outlined' size='small' >
            {reactionButtons}
        </ButtonGroup>
    )
}
