import { CardContext } from "@context/CardContext";
import { DecklistContext } from "@context/DecklistContext";
import useCallContext from "@hooks/useCallContext";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

const ChangableDecklist = () => {

    const { id } = useParams();
    const deckContext = useCallContext(DecklistContext);
    const cardContext = useCallContext(CardContext);

    useEffect(() => { 
        if (id && !isNaN(+id) && deckContext) deckContext.fetchAllCards(+id); 
    }, [id])
    
    if (!deckContext || !cardContext) return <Navigate to={'/'} />; 


    const onDragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData("cardId");
        const targetId = (e.target as HTMLElement).id;
        if (cardId) 
        {

            console.log(targetId);
        }
    }

    return (
        <div onDragOver={onDragOverHandler} onDrop={onDropHandler}>
            <div id="mainDeck" className="h-[50vh]"> 
                <h2>Main deck</h2>
                <hr/>
            </div>
            <div id="extraDeck" className="h-[15vh]"> 
                <h2>Extra deck</h2>
                <hr />
                <div className="flex flex-row">
                    {deckContext.decklist && deckContext.decklist.extraDeck.map((card) => {
                        if (card.quantity)
                        {
                            const cards = [];
                            for (let i = 0; i < card.quantity; i++)
                            {
                                cards.push(
                                    <img
                                        draggable
                                        key={card.id+i}
                                        onMouseEnter={() => cardContext.setCardDetails(card.id)}
                                        src={`http://localhost:8000${card.cardImage}`} className="w-16" />
                                )
                            }
                            return cards;
                        }    
                    })}
                </div>
            </div>
            <div id="sideDeck" className="h-[15vh]"> 
                <h2>Side deck</h2>
                <hr/>
            </div>
        </div>)
}

export default ChangableDecklist;