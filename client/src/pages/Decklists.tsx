import DecklistCard from "@components/DecklistCard";
import { DecklistContext } from "@context/DecklistContext";
import useCallContext from "@hooks/useCallContext";
import { useLayoutEffect } from "react";

const Decklists = () => {
    const deckContext = useCallContext(DecklistContext);

    useLayoutEffect(() => {
        if (deckContext) deckContext.fetchAllDecklists();
    }, [])

    return (
        <div className="flex flex-col w-full justify-center items-center space-y-5">
            {deckContext && deckContext.decklists.length > 0 ?
                deckContext.decklists.map((decklist) => {
                    return <DecklistCard key={decklist.id} decklist={decklist} link={`/decklist/${decklist.id}`} />
            }) : <p>There are no decklists avaliable</p> }
        </div>
    )
}

export default Decklists;