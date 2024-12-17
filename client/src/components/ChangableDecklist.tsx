import { CardContext } from "@context/CardContext";
import { DecklistContext } from "@context/DecklistContext";
import useCallContext from "@hooks/useCallContext";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { IAddCard } from "../../../types/decklist";

const ChangableDecklist = () => {

    const { id } = useParams();
    const deckContext = useCallContext(DecklistContext);
    const cardContext = useCallContext(CardContext);

    useEffect(() => { 
        if (id && !isNaN(+id) && deckContext) deckContext.fetchAllCards(+id); 
        if (deckContext && deckContext.decklist) console.log(deckContext.decklist);
    }, [id])
    
    if (!deckContext || !cardContext) return <Navigate to={'/'} />; 


    const onDragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const handleDragStart = (e: React.DragEvent<HTMLImageElement>, cardId: number) => {
        e.dataTransfer.setData("cardId", cardId.toString());
    };

    const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData("cardId");
        const targetId = (e.target as HTMLElement).id as 'mainDeck' | 'extraDeck' | 'sideDeck';
        console.log(targetId);
        if (cardId) 
        {
            if (deckContext.decklist && cardContext.card)
            {
                const extraDeckTypes = ['xyz', 'fusion', 'synchro', 'link'];
                if (targetId === 'extraDeck' &&
                    !extraDeckTypes.some((value) => cardContext.card!.humanReadableCardType.toLocaleLowerCase().includes(value)))
                {
                    console.log('Sori bed lak');
                    return;
                }

                let cardCurrentQuantity = 0;

                const isCardFound = (['mainDeck', 'extraDeck', 'sideDeck'] as ('mainDeck' | 'sideDeck' | 'extraDeck')[]).some((deckType) => {
                    const card = deckContext.decklist![deckType].find((card) => card.id === +cardId);
                    if (card)
                    {
                        if (card.quantity) cardCurrentQuantity = card.quantity;
                        return card;
                    }
                    else
                    { 
                        return false;
                    }
                });

                const addCardObj: IAddCard = {
                    decklist: deckContext.decklist,
                    quantity: isCardFound ? cardCurrentQuantity : 1,
                    partOfDeck: targetId
                }

                deckContext.addCardToDecklist(addCardObj, +cardId);
            }
        }
    }

    return (
        <div onDragOver={onDragOverHandler} onDrop={onDropHandler} className="max-h-[80vh] overflow-auto">
            <div id="mainDeck" className="min-h-[50vh]"> 
                <h2>Main deck</h2>
                <hr/>
            </div>
            <div  className="min-h-[15vh]"> 
                <h2>Extra deck</h2>
                <hr />
                <div id="extraDeck"  className="flex flex-row flex-wrap">
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
                                        onDragStart={(e) => handleDragStart(e, card.id)}
                                        src={`http://localhost:8000${card.cardImage}`} className="w-16" />
                                )
                            }
                            return cards;
                        }    
                    })}
                </div>
            </div>
            <div id="sideDeck" className="min-h-[15vh]"> 
                <h2>Side deck</h2>
                <hr/>
            </div>
        </div>)
}

export default ChangableDecklist;