import { CardContext } from "@context/CardContext"
import useCallContext from "@hooks/useCallContext"
import { Navigate } from "react-router-dom";
import { isValidMagic, isValidMonster } from "../../../types/card";
import GeneralCardDetails from "@components/GeneralCardDetails";

const CardDetails = () => {
    const cardContext = useCallContext(CardContext);

    if (!cardContext) return <Navigate to={'/'} />

    return (
        <div>
            {cardContext.card && (isValidMonster(cardContext.card) || isValidMagic(cardContext.card))?
                <GeneralCardDetails card={cardContext.card}/>
                : <p>No card selected</p>
            }
        </div>
    )
}

export default CardDetails