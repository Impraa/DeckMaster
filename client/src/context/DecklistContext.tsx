import { IDecklistContextValue } from "@/types/contextTypes";
import { createContext, ReactNode, useLayoutEffect, useMemo, useState } from "react";
import { IAddCard, IDecklist, isValidDecklist } from "../../../types/decklist";
import { asyncAddCardToDecklist, asyncRemoveCardFromDecklist, asyncFetchAllCards, asyncFetchAllDecklists, asyncFetchAllUserDecklists, asyncRemoveDecklist } from "@services/Decklist";
import { ICard, IMonsterCard } from "../../../types/card";
import { useLocation, useNavigate } from "react-router-dom";

export const DecklistContext = createContext<IDecklistContextValue | null>(null);

const DecklistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const [decklist, setDecklist] = useState<IDecklist | null>(null);
    const [decklists, setDecklists] = useState<IDecklist[]>([]);
    const [error, setError] = useState<string | null>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const location = useLocation();

    useLayoutEffect(() => {
            setError(null);
          },[location])

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
            
            if (response.data.decklist.allCards && isValidDecklist(processedDecklist)) {
                for (const card of response.data.decklist.allCards as (ICard | IMonsterCard)[]) {
                    if (card.partOfDeck === 'extraDeck') processedDecklist.extraDeck.push(card);
                    else if (card.partOfDeck === 'mainDeck') processedDecklist.mainDeck.push(card);
                    else processedDecklist.sideDeck.push(card);
                }
            }
            
            setDecklist(processedDecklist);
        }
        else setError(response.data);
        setIsLoading(false);
    }

    const fetchAllUserDecklists = async (userId: number) => {
        setIsLoading(true);
        const response = await asyncFetchAllUserDecklists(userId);
        if (!response.error) setDecklists(response.data.decklists);
        else setError(response.data);
        setIsLoading(false);
    }

    const fetchAllDecklists = async () => {
        setIsLoading(true);
        const response = await asyncFetchAllDecklists();
        if (!response.error) setDecklists(response.data.decklists)
        else setError(response.data)
        setIsLoading(false);
    }

    const addCardToDecklist = async (formData: IAddCard, cardId: number) => {
        setIsLoading(true);
        const response = await asyncAddCardToDecklist(formData, cardId);
        if (!response.error) {
            const { card, decklist } = response.data;
            const { quantity, partOfDeck, decklistId, name } = decklist;
            const insertedCard = card;
            insertedCard.quantity = quantity;
            insertedCard.partOfDeck = partOfDeck;
            if (!decklist) {
                setDecklist(() => {
                    const newDecklist: IDecklist = {
                        id: decklistId,
                        name: name,
                        mainDeck: [],
                        extraDeck: [],
                        sideDeck: [],
                    }
                    console.log(newDecklist)
                    newDecklist[response.data.decklist.partOfDeck as 'mainDeck' | 'extraDeck' | 'sideDeck'].push(insertedCard);

                    return newDecklist;
                });
            }
            else {
                setDecklist((oldValue) => {
                    if (!oldValue) return null;

                    const deckPart = oldValue![partOfDeck as 'mainDeck' | 'extraDeck' | 'sideDeck'];
                    const isExistant = deckPart.find((card) => card.id === insertedCard.id);
                    if (isExistant) {
                        return {
                            ...oldValue,
                            [partOfDeck as 'mainDeck' | 'extraDeck' | 'sideDeck']: deckPart.map((card) =>
                                card.id === insertedCard.id
                                    ? { ...card, quantity: card.quantity! + 1 }
                                    : card
                            ),
                        };
                    }
                    else {
                        return {
                            ...oldValue,
                            [partOfDeck as 'mainDeck' | 'extraDeck' | 'sideDeck']: [
                                ...oldValue![partOfDeck as 'mainDeck' | 'extraDeck' | 'sideDeck'],
                                insertedCard
                            ]
                        };
                    }
                });
            }
            setIsLoading(false);
            if(window.location.href[3] !== 'manage-decklist') return navigate(`/manage-decklist/${decklistId}`)
        }
        else setError(response.data);
        setIsLoading(false);
    }

    const removeCardFromDecklist = async (decklistId:number, cardId: number, partOfDeck: 'mainDeck' | 'sideDeck' | 'extraDeck') => {
        setIsLoading(true);
        const response = await asyncRemoveCardFromDecklist(decklistId, cardId, partOfDeck);
        if (!response.error) {
            const cardId = response.data.cardId;
            const partOfDeck = response.data.partOfDeck;
            if (response.data.quantity)
            {
                setDecklist((oldValue) => {
                    if (!oldValue) return null;
                
                    const updatedDeckPart = oldValue[partOfDeck as 'mainDeck' | 'extraDeck' | 'sideDeck']
                        .map((card) => {
                            if (card.id === cardId) {
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
        else setError(response.data);
        setIsLoading(false);
    }

    const changeDeckName = (newName: string) => {
        setDecklist((oldValue) => {
            if (!oldValue)
            {
                return {
                    id: 0,
                    name: newName,
                    mainDeck: [],
                    extraDeck: [],
                    sideDeck: [],
                };
            }
    
            return {
                ...oldValue,
                name: newName,
            };
        });
    }

    const clearDecklist = () => {
        setDecklist(null);
    }

    const removeDecklist = async (decklistId: number) => {
        setIsLoading(true);
        const response = await asyncRemoveDecklist(decklistId);
        if (!response.error)
        {
            setDecklists(decklists.filter((decklist) => decklist.id !== decklistId));
            return navigate('/decklists');
        }
        else setError(response.data);
        setIsLoading(false);
    }

    const value = useMemo(() => ({
        decklist, decklists, isLoading, error, setError, changeDeckName, fetchAllUserDecklists, fetchAllDecklists, clearDecklist,
        fetchAllCards, addCardToDecklist, removeCardFromDecklist, removeDecklist
    }), [decklist, error, decklists, isLoading]);
    return <DecklistContext.Provider value={value}>{children}</DecklistContext.Provider>
}

export default DecklistProvider;