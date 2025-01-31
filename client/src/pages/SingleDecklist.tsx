import Button from "@components/Button";
import ChangableDecklist from "@components/ChangableDecklist"
import Link from "@components/Link";
import useDecklistContext from "@hooks/useDecklistContext";
import useUserContext from "@hooks/useUserContext";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleDecklist = () => {
    const userContext = useUserContext();
    const deckContext = useDecklistContext();
    const [isOwner, setIsOwner] = useState(false);
    const { id } = useParams();

    const { user, isUserDeckOwner } = userContext;
    const { clearDecklist, removeDecklist, decklist } = deckContext;

    useLayoutEffect(() => {
        return () => {
            clearDecklist();
        }
    }, [id])
    
    useLayoutEffect(() => {
        if (id && user) isUserDeckOwner(user.id, +id).then(value => setIsOwner(value))
    }, [user])

    const onClickHandler = () => {
        if (id) removeDecklist(+id);
    }

    return (
        <>
            <div className="flex flex-col items-start pl-2 space-y-4 mb-2">
                { decklist &&
                    <h2 className="text-lg text-primary font-smeibold">{decklist.name}</h2>}
                {user && (user.role === 'ADMIN' || isOwner) &&
                    <>
                    <Link URL={`/manage-decklist/${id}`}>Edit deck</Link>
                    <Button style="danger" type="button" onClick={onClickHandler}>Delete deck</Button>
                    </>}
            </div>
            <ChangableDecklist />
        </>
    )
}

export default SingleDecklist