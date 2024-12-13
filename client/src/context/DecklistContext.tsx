import { IDecklistContextValue } from "@/types/contextTypes";
import { createContext, ReactNode, useMemo, useState } from "react";
import { IDecklist, isValidDecklist } from "../../../types/decklist";
import { fetchAllCardsAsync } from "@services/Decklist";
import { ICard, IMonsterCard } from "../../../types/card";

export const DecklistContext = createContext<IDecklistContextValue | null>(null);

const DecklistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [decklist, setDecklist] = useState<IDecklist | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchAllCards = async (id:number) => {
        setIsLoading(true);
        const response = await fetchAllCardsAsync(id);
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
    }

    const value = useMemo(() => ({ decklist, isLoading, fetchAllCards }), [decklist, isLoading]);
    return <DecklistContext.Provider value={value}>{children}</DecklistContext.Provider>
}

export default DecklistProvider;