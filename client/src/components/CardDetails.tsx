import { CardContext } from "@context/CardContext"
import useCallContext from "@hooks/useCallContext"
import { Navigate } from "react-router-dom";

const CardDetails = () => {
    const cardContext = useCallContext(CardContext);

    if (!cardContext) return <Navigate to={'/'} />
    
    return (
        <div>
            {cardContext.card ?             
                <>
                    <img key={cardContext.card.id} src={`http://localhost:8000${cardContext.card.cardImage}`} />
                </>
                : <p>No card selected</p>
            }
        </div>
    )
}

export default CardDetails