import { IDecklistContextValue } from "@/types/contextTypes";
import { createContext, ReactNode, useMemo, useState } from "react";
import { IAddCard, IDecklist, isValidDecklist } from "../../../types/decklist";
import { asyncAddCardToDecklist, asyncRemoveCardFromDecklist, asyncFetchAllCards, asyncFetchAllDecklists, asyncFetchAllUserDecklists } from "@services/Decklist";
import { ICard, IMonsterCard } from "../../../types/card";

export const DecklistContext = createContext<IDecklistContextValue | null>(null);

const DecklistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [decklist, setDecklist] = useState<IDecklist | null>(null);
    const [decklists, setDecklists] = useState<IDecklist[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchAllCards = async (id:number) => {
        setIsLoading(true);
        const response = await asyncFetchAllCards(id);
        if (!response.error)
        {
            const processedDecklist: IDecklist = {
                id: response.data.decklist.id,
                name: response.data.decklist.name,
                extraDeck: [],
                mainDeck: [],
                sideDeck: []
            };
            
            if (response.data.decklist.allCards && isValidDecklist(processedDecklist))
            {
                for (const card of response.data.decklist.allCards as (ICard | IMonsterCard)[])
                {
                    if (card.partOfDeck === 'extraDeck') processedDecklist.extraDeck.push(card);
                    else if (card.partOfDeck === 'mainDeck') processedDecklist.mainDeck.push(card);
                    else processedDecklist.sideDeck.push(card);
                }
            }
            
            setDecklist(processedDecklist);
        }
        setIsLoading(false);
    }

    const fetchAllUserDecklists = async (userId: number) => {
        setIsLoading(true);
        const response = await asyncFetchAllUserDecklists(userId);
        if (!response.error)
        {
            setDecklists(response.data.decklists);
        }
    }

    const fetchAllDecklists = async () => {
        setIsLoading(true);
        const response = await asyncFetchAllDecklists();
        if (!response.error)
        {
            setDecklists(response.data.decklists)
        }
        setIsLoading(false);
    }

    const addCardToDecklist = async (formData: IAddCard, cardId: number) => {
        setIsLoading(true);
        const response = await asyncAddCardToDecklist(formData, cardId);
        if (!response.error)
        {
            const { card, decklist } = response.data;
            const { quantity, partOfDeck, id, name } = decklist; 
            const insertedCard = card;
            insertedCard.quantity = quantity;
            insertedCard.partOfDeck = partOfDeck;
            if (!decklist)
            {
                setDecklist(() => {
                    const newDecklist: IDecklist = {
                        id: id,
                        name: name,
                        mainDeck: [],
                        extraDeck: [],
                        sideDeck: [],
                    }

                    newDecklist[response.data.decklist.partOfDeck as 'mainDeck' | 'extraDeck' | 'sideDeck'].push(insertedCard);

                    return newDecklist;
                });
            }
            else
            { 
                setDecklist((oldValue) => {
                    if (!oldValue) return null;

                    const deckPart = oldValue![partOfDeck as 'mainDeck' | 'extraDeck' | 'sideDeck'];
                    const isExistant = deckPart.find((card) => card.id === insertedCard.id);
                    if (isExistant)
                    {
                        return {
                            ...oldValue,
                            [partOfDeck as 'mainDeck' | 'extraDeck' | 'sideDeck']: deckPart.map((card) =>
                                card.id === insertedCard.id
                                    ? { ...card, quantity: card.quantity! + 1 }
                                    : card
                            ),
                        };
                    }
                    else
                    { 
                        return {
                            ...oldValue,
                            [partOfDeck as 'mainDeck' | 'extraDeck' | 'sideDeck']: [
                                ...oldValue![partOfDeck as 'mainDeck' | 'extraDeck' | 'sideDeck'],
                                insertedCard
                        ] };
                    }
                });
            }
        }
        setIsLoading(false);
    }

    const removeCardFromDecklist = async (decklistId:number, cardId: number, partOfDeck: 'mainDeck' | 'sideDeck' | 'extraDeck') => {
        setIsLoading(true);
        const response = await asyncRemoveCardFromDecklist(decklistId, cardId, partOfDeck);
        if (!response.error)
        {
            const cardId = response.data.cardId;
            const partOfDeck = response.data.partOfDeck;
            console.log(response.data);
            if (response.data.quantity)
            {
                setDecklist((oldValue) => {
                    if (!oldValue) return null;
                
                    const updatedDeckPart = oldValue[partOfDeck as 'mainDeck' | 'extraDeck' | 'sideDeck']
                        .map((card) => {
                            if (card.id === cardId)
                            {
                                return { ...card, quantity: card.quantity! - 1 };
                            }
                            return card;
                        });
                
                    return {
                        ...oldValue,
                        [partOfDeck as 'mainDeck' | 'extraDeck' | 'sideDeck']: updatedDeckPart,
                    };
                });
            }
            else
            {
                setDecklist((oldValue) => {
                    if (!oldValue) return null;
                
                    const updatedDeckPart = oldValue[partOfDeck as 'mainDeck' | 'extraDeck' | 'sideDeck']
                        .filter((card) => card.id !== cardId);
                
                    return {
                        ...oldValue,
                        [partOfDeck as 'mainDeck' | 'extraDeck' | 'sideDeck']: updatedDeckPart,
                    };
                });
            }
        }
        setIsLoading(false);
    }

    const value = useMemo(() => ({
        decklist, decklists, isLoading, fetchAllUserDecklists, fetchAllDecklists,
        fetchAllCards, addCardToDecklist, removeCardFromDecklist
    }), [decklist, decklists, isLoading]);
    return <DecklistContext.Provider value={value}>{children}</DecklistContext.Provider>
}

export default DecklistProvider;