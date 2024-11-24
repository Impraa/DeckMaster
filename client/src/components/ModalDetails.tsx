import { CardContext } from "@context/CardContext";
import useCallContext from "@hooks/useCallContext";
import { Navigate } from "react-router-dom";

const ModalDetails = () => {

    const cardContext = useCallContext(CardContext);

    if (!cardContext) return <Navigate to={'/'} />
    
    const { card } = cardContext;

    return (
        <div>
            {card ?
                <>
                    <img key={card.id} src={`http://localhost:8000${card.cardImage}`} className="w-[50%]"/>    
                </>
                : <>Card could not be displayed</>}

        </div>
    )
}

export default ModalDetails;