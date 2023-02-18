import { useParams } from 'react-router-dom';

type Props = {}

const Conversation = (props: Props) => {
    let { roomId } = useParams();

    return (
        <div>{roomId}</div>
    )
}

export default Conversation