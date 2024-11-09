import { ICardContextValue } from "@/types/contextTypes";
import { createContext, ReactNode, useMemo, useState } from "react";
import { ICard } from "../../../types/card";

export const CardContext = createContext<ICardContextValue | null>(null);

const CardProvider:React.FC<{children: ReactNode}> = ({children}) => {
    const [cards, setCards] = useState<ICard[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const value = useMemo(() => ({cards, setCards, isLoading, setIsLoading}), [cards, isLoading]);
    return <CardContext.Provider value={value}> {children} </CardContext.Provider>;
}

export default CardProvider;
