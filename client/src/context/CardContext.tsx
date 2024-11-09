import { ICardContextValue } from "@/types/contextTypes";
import { createContext, ReactNode, useMemo, useState } from "react";
import { ICard } from "../../../types/card";
import { fetchCardsAsync } from "@services/Card";

export const CardContext = createContext<ICardContextValue | null>(null);

const CardProvider:React.FC<{children: ReactNode}> = ({children}) => {
    const [cards, setCards] = useState<ICard[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [internalOffset, setInternalOffset] = useState<number>(0);

    const fetchCards = async (offset: number) =>
    {
        setIsLoading(true);
        if (internalOffset !== offset || cards.length < 1)
        {
            setInternalOffset(offset);
            console.log(offset)
            const response = await fetchCardsAsync(offset * 500);
            if (!response.error)
            {
                console.log(response.data);
                setCards((prevCards) => (
                    offset === 0 ? response.data : [...prevCards, ...response.data]
                ));
            }
        }
        setIsLoading(false);
    }

    const value = useMemo(() => ({cards, setCards, isLoading, setIsLoading, fetchCards}), [cards, isLoading]);
    return <CardContext.Provider value={value}> {children} </CardContext.Provider>;
}

export default CardProvider;
