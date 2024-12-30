import ChangableDecklist from "@components/ChangableDecklist"
import Link from "@components/Link";
import { DecklistContext } from "@context/DecklistContext";
import { UserContext } from "@context/UserContext"
import useCallContext from "@hooks/useCallContext"
import { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SingleDecklist = () => {
    const userContext = useCallContext(UserContext);
    const deckContext = useCallContext(DecklistContext);
    const [isOwner, setIsOwner] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useLayoutEffect(() => {
        if (!userContext || !id) return navigate('/')
        return () => {
            if (deckContext) deckContext.clearDecklist();
        }
    }, [id])
    
    useLayoutEffect(() => {
        if (userContext && id && userContext.user)
            userContext.isUserDeckOwner(userContext.user.id, +id).then(value => setIsOwner(value))
    }, [userContext!.user])

    const onClickHandler = () => {
        if (deckContext && id) deckContext.removeDecklist(+id);
    }

    return (
        <>
            {userContext && userContext.user && (userContext.user.role === 'ADMIN' || isOwner) &&
                <>
                < Link URL={`/manage-decklist/${id}`}>Edit deck</Link >
                <button onClick={onClickHandler}>Delete deck</button>
                </>}
            <ChangableDecklist />
        </>
    )
}

export default SingleDecklist