import { useEffect } from "react";
import { isValidMonster } from "../../../types/card";
import Link from "./Link";
import Button from "./Button";
import { IAddCard } from "../../../types/decklist";
import useCardContext from "@hooks/useCardContext";
import useUserContext from "@hooks/useUserContext";
import useModalContext from "@hooks/useModalContext";
import useDecklistContext from "@hooks/useDecklistContext";

const ModalDetails = () => {
    const cardContext = useCardContext();
    const userContext = useUserContext();
    const modalContext = useModalContext();
    const deckContext = useDecklistContext();
    
    const { setIsVisible } = modalContext;
    const { card, deleteCard } = cardContext;
    const { decklist, removeCardFromDecklist, addCardToDecklist } = deckContext;
    const { user } = userContext;

    useEffect(() => {
        if (!card) setIsVisible(false); 
    }, [card])

    const handleDeleteClick = () => {
        if(card) deleteCard(+card.id);
    }

    const handleAddCardMainDeck = () => {
        if (card && decklist)
        {
            const addCardObj:IAddCard = {
                decklist: decklist,
                quantity: 1,
                partOfDeck: "mainDeck"
            }
            addCardToDecklist(addCardObj, card.id);
        }
    }

    const handleDeleteCardMainDeck = () => {
        if (card && decklist) removeCardFromDecklist(decklist.id, card.id, 'mainDeck');
    }

    const handleAddCardSideDeck = () => {
        if (card && decklist)
        {
            const addCardObj:IAddCard = {
                decklist: decklist,
                quantity: 1,
                partOfDeck: "sideDeck"
            }
            addCardToDecklist(addCardObj, card.id);
        }
    }

    const handleDeleteCardSideDeck = () => {
        if (card && decklist) removeCardFromDecklist(decklist.id, card.id, 'sideDeck');
    }

    return (
        <div className="flex flex-col lg:flex-row items-center space-y-4 space-x-8 p-8 rounded-md overflow-auto">
            {card ?
                <>
                    <img key={card.id} src={`http://localhost:8000${card.cardImage}`} className="w-[50%] lg:w-[35%]" />
                    <div className="flex flex-col items-start">
                        <h2 className="text-xl font-semibold">{card.name}</h2>
                        <h3 className="text-lg">{card.attribute ? card.attribute + ' /' : ''} {card.race}</h3>
                        {isValidMonster(card) && <h3 className="text-lg">ATK/DEF {card.atk}/{card.def}</h3>}
                        <div>
                            <h3 className="text-lg">Effect: </h3>
                            <p className="text-md">{card.cardText}</p>
                        </div>
                        <div className="flex flex-col space-y-4 lg:grid lg:grid-cols-2 lg:gap-2 mt-4">
                        {user && user.role === 'ADMIN' && window.location.href.split('/')[3] === 'manage-cards' ? 
                                <>
                                    <Link URL={`/card/${card.id}`}>Update card</Link>
                                    <Button type="button" style="danger" onClick={handleDeleteClick}>Delete card</Button>
                                </> : <></>}
                            {window.location.href.split('/')[3] === 'manage-decklist' && 
                                <>
                                    <Button type="button" style="success" onClick={handleAddCardMainDeck}>Add card to the main deck</Button>
                                    <Button type="button" style="success" onClick={handleAddCardSideDeck}>Add card to the side deck</Button>
                                    <Button type="button" style="danger" onClick={handleDeleteCardMainDeck}>Remove card to the main deck</Button>
                                    <Button type="button" style="danger" onClick={handleDeleteCardSideDeck}>Remove card to the side deck</Button>
                                </>}
                        </div>
                    </div>
                </>
                : <>Card could not be displayed</>}

        </div>
    )
}

export default ModalDetails;