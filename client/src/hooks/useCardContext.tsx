import { ICardContextValue } from "@/types/contextTypes";
import { CardContext } from "@context/CardContext";
import { useContext } from "react";

function useCardContext(): ICardContextValue
{
    const context = useContext(CardContext);
    if (!context) throw new Error("useCardContext must be used within a CardProvider");
    return context;
}

export default useCardContext;