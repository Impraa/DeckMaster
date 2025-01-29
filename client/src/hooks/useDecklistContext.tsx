import { IDecklistContextValue } from "@/types/contextTypes";
import { DecklistContext } from "@context/DecklistContext";
import { useContext } from "react";

function useDecklistContext(): IDecklistContextValue
{
    const context = useContext(DecklistContext);
    if (!context) throw new Error("useDecklistContext must be used within a DecklistProvider");
    return context;
}

export default useDecklistContext;