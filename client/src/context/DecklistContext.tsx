import { IDecklistContextValue } from "@/types/contextTypes";
import { createContext, ReactNode, useMemo, useState } from "react";
import { IDecklist, isValidDecklist } from "../../../types/decklist";
import { fetchAllCardsAsync } from "@services/Decklist";

export const DecklistContext = createContext<IDecklistContextValue | null>(null);

const DecklistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [decklist, setDecklist] = useState<IDecklist | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchAllCards = async (id:number) => {
        setIsLoading(true);
        const response = await fetchAllCardsAsync(id);
        if (!response.error)
        {
            setDecklist(() => ({ id: response.data.decklist.id, name: response.data.decklist.name, extraDeck: [], mainDeck: [], sideDeck: []}));
            if ( decklist && isValidDecklist(decklist))
            {
                for (const card of response.data.decklist.allCards)
                {
                    if (card.partOfDeck == 'extraDeck') decklist.extraDeck.push(card);
                    else if (card.partOfDeck == 'mainDeck') decklist.mainDeck.push(card);
                    else decklist.sideDeck.push(card);
                }
            
            }
        }
    }

    const value = useMemo(() => ({ decklist, isLoading, fetchAllCards }), [decklist, isLoading]);
    return <DecklistContext.Provider value={value}>{children}</DecklistContext.Provider>
}

export default DecklistProvider;