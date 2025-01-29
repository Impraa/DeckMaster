import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IAddCard } from "../../../types/decklist";
import { DisplayErrorMessage } from "@/utils/helperFunctions";
import Input from "@components/Input";
import useDecklistContext from "@hooks/useDecklistContext";
import useCardContext from "@hooks/useCardContext";

const ChangableDecklist = () => {

    const { id } = useParams();
    const deckContext = useDecklistContext();
    const cardContext = useCardContext();

    const { clearDecklist, fetchAllCards, setError, addCardToDecklist, changeDeckName, decklist, error } = deckContext;
    const { card, setCardDetails } = cardContext;

    useEffect(() => {
        if (id && !isNaN(+id)) fetchAllCards(+id);
        if (!id) clearDecklist();
    }, [id])

    const onDragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const handleDragStart = (e: React.DragEvent<HTMLImageElement>, cardId: number) => {
        const target = e.target as HTMLElement;
        const parentElement = target.closest('.cardPool');
        let parentContainer: string | null = null;
        if (parentElement)
        {
            parentContainer = 'cardPool';
        }
        else
        {
            const deckElement = target.closest('.mainDeck, .extraDeck, .sideDeck');
            if (deckElement)
            {
                switch (true)
                {
                    case deckElement.classList.contains('mainDeck'):
                        parentContainer = 'mainDeck';
                        break;
                    case deckElement.classList.contains('extraDeck'):
                        parentContainer = 'extraDeck';
                        break;
                    case deckElement.classList.contains('sideDeck'):
                        parentContainer = 'sideDeck';
                        break;
                    default:
                        parentContainer = null;
                }
            }
        }
        e.dataTransfer.setData("cardId", cardId.toString());
        e.dataTransfer.setData("parentContainer", parentContainer ?? 'none');
    };

    const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData("cardId");

        const target = e.target as HTMLElement;
        const deckTypes = ['mainDeck', 'extraDeck', 'sideDeck'];
        const targetType = deckTypes.find(type => target.classList.contains(type));

        if (cardId && targetType && deckTypes.includes(targetType)) 
        {
            if (card)
            {
                const extraDeckTypes = ['xyz', 'fusion', 'synchro', 'link'];
                if (targetType === 'extraDeck' &&
                    !extraDeckTypes.some((value) => card!.humanReadableCardType.toLocaleLowerCase().includes(value)))
                {
                    setError("Main deck cards can't be put in the side deck");
                    return;
                }
                if(targetType === 'mainDeck' &&
                    extraDeckTypes.some((value) => card!.humanReadableCardType.toLocaleLowerCase().includes(value)))
                {
                    setError("Side deck cards can't be put in the main deck");
                    return;
                }

                let cardCurrentQuantity = 0;
                let isCardFound = null;
                if (decklist)
                {
                    isCardFound = (['mainDeck', 'extraDeck', 'sideDeck'] as ('mainDeck' | 'sideDeck' | 'extraDeck')[]).some((deckType) => {
                    const card = decklist![deckType].find((card) => card.id === +cardId);
                    if (card)
                    {
                        if (card.quantity) cardCurrentQuantity = card.quantity;
                        return card;
                    }
                    else return false;
                });
                }

                const addCardObj: IAddCard = {
                    decklist: deckContext.decklist,
                    quantity: isCardFound ? cardCurrentQuantity : 1,
                    partOfDeck: targetType as 'mainDeck' | 'sideDeck' | 'extraDeck'
                }
                addCardToDecklist(addCardObj, +cardId);
            }
        }
    }

    const handleDeckNameChange = (e:React.ChangeEvent<HTMLInputElement>) => changeDeckName(e.currentTarget.value)

    return (
        <div className="lg:border-black lg:border-l lg:px-2 lg:border-r">
            {error && <DisplayErrorMessage error={error} />}
            {window.location.href.split('/')[3] === ('manage-decklist') &&
                <Input inputName="name" labelText="Deck name" value={decklist?.name}
                    handleChange={handleDeckNameChange} inputType="text" />}
            <div onDragOver={onDragOverHandler} onDrop={onDropHandler} className="max-h-[80dvh] overflow-auto">
            <div className="mainDeck min-h-[50vh]"> 
                <h2>Main deck</h2>
                <hr />
                <div  className="mainDeck flex flex-row flex-wrap min-h-full">
                    {decklist && decklist.mainDeck.map((card) => {
                        if (card.quantity)
                        {
                            const cards = [];
                            for (let i = 0; i < card.quantity; i++)
                            {
                                cards.push(
                                    <img
                                        draggable
                                        key={card.id+i}
                                        onMouseEnter={() => setCardDetails(card.id)}
                                        onDragStart={(e) => handleDragStart(e, card.id)}
                                        src={`http://localhost:8000${card.cardImage}`} className="w-16" />
                                )
                            }
                            return cards;
                        }    
                    })}
                </div>
            </div>
            <div  className="extraDeck min-h-[15vh]"> 
                <h2>Extra deck</h2>
                <hr />
                <div  className="extraDeck flex flex-row flex-wrap">
                    {decklist && decklist.extraDeck.map((card) => {
                        if (card.quantity)
                        {
                            const cards = [];
                            for (let i = 0; i < card.quantity; i++)
                            {
                                cards.push(
                                    <img
                                        draggable
                                        key={card.id+i}
                                        onMouseEnter={() => setCardDetails(card.id)}
                                        onDragStart={(e) => handleDragStart(e, card.id)}
                                        src={`http://localhost:8000${card.cardImage}`} className="w-16" />
                                )
                            }
                            return cards;
                        }    
                    })}
                </div>
            </div>
            <div className="sideDeck min-h-[15vh]"> 
                <h2>Side deck</h2>
                <hr />
                <div  className="sideDeck flex flex-row flex-wrap">
                    {decklist && decklist.sideDeck.map((card) => {
                        if (card.quantity)
                        {
                            const cards = [];
                            for (let i = 0; i < card.quantity; i++)
                            {
                                cards.push(
                                    <img
                                        draggable
                                        key={card.id+i}
                                        onMouseEnter={() => setCardDetails(card.id)}
                                        onDragStart={(e) => handleDragStart(e, card.id)}
                                        src={`http://localhost:8000${card.cardImage}`} className="w-16" />
                                )
                            }
                            return cards;
                        }    
                    })}
                </div>
                </div>
            </div>
        </div>)
}

export default ChangableDecklist;