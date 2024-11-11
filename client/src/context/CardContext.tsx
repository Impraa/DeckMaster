import { ICardContextValue } from "@/types/contextTypes";
import { createContext, ReactNode, useMemo, useState } from "react";
import { ICard } from "../../../types/card";
import { fetchCardsAsync } from "@services/Card";

export const CardContext = createContext<ICardContextValue | null>(null);

const CardProvider:React.FC<{children: ReactNode}> = ({children}) => {
    const [cards, setCards] = useState<ICard[]>([]);
    const [card, setCard] = useState<ICard | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [internalOffset, setInternalOffset] = useState<number>(0);

    const fetchCards = async (offset: number) =>
    {
        setIsLoading(true);
        if (internalOffset !== offset || cards.length < 1)
        {
            setInternalOffset(offset);
            const response = await fetchCardsAsync(offset * 500);
            if (!response.error)
            {
                setCards((prevCards) => (
                    offset === 0 ? response.data : [...prevCards, ...response.data]
                ));
            }
        }
        setIsLoading(false);
    }

    const setCardDetails = (id: number) => {
        const card = cards.find((item) => item.id === id) ?? null;
        setCard(card);
    }

    const fetchCardsWithSearch = async (offset: number, searchTerm: string) => {
        setIsLoading(true);
        const response = await fetchCardsAsync(offset * 500, searchTerm);
        if (!response.error)
        {
            setCards((prevCards) => (
                offset === 0 ? response.data : [...prevCards, ...response.data]
            ));
        }
        setIsLoading(false);
    }

    const value = useMemo(() => ({cards, card, isLoading, fetchCards, fetchCardsWithSearch, setCardDetails}), [cards, card, isLoading]);
    return <CardContext.Provider value={value}> {children} </CardContext.Provider>;
}

export default CardProvider;
