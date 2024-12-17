import Link from "@components/Link";
import { DecklistContext } from "@context/DecklistContext";
import useCallContext from "@hooks/useCallContext";
import { useLayoutEffect } from "react";

const Decklists = () => {
    const deckContext = useCallContext(DecklistContext);

    useLayoutEffect(() => {
        if (deckContext && deckContext.decklists.length < 1) deckContext.fetchAllDecklists();
    }, [deckContext])

    return (
        <div>
            {deckContext && deckContext.decklists.length > 0 ?
                deckContext.decklists.map((decklist) => {
                    return (<Link URL={`/decklist/${decklist.id}`} key={decklist.id}> 
                        <h2>{ decklist.name }</h2>
                </Link>)
            }) : <p>There are no decklists avaliable</p> }
        </div>
    )
}

export default Decklists;