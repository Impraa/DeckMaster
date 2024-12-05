import { IDecklistContextValue } from "@/types/contextTypes";
import { createContext, ReactNode, useMemo, useState } from "react";
import { IDecklist } from "../../../types/decklist";

export const DecklistContext = createContext<IDecklistContextValue | null>(null);

const DecklistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [decklist, setDecklist] = useState<IDecklist | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const value = useMemo(() => ({ decklist, isLoading }), [decklist, isLoading]);
    return <DecklistContext.Provider value={value}>{children}</DecklistContext.Provider>
}

export default DecklistProvider;