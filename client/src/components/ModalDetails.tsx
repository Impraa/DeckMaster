import { CardContext } from "@context/CardContext";
import { ModalContext } from "@context/ModalContext";
import { UserContext } from "@context/UserContext";
import useCallContext from "@hooks/useCallContext";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const ModalDetails = () => {

    const cardContext = useCallContext(CardContext);
    const userContext = useCallContext(UserContext);
    const modalContext = useCallContext(ModalContext);

    useEffect(() => {
        if (cardContext && !cardContext.card && modalContext) modalContext.setIsVisible(false); 
    }, [cardContext])

    if (!cardContext || !userContext) return <Navigate to={'/'} />
    
    const { card, deleteCard } = cardContext;
    const { user } = userContext;

    const handleDeleteClick = () => {
        if(card) deleteCard(+card.id);
    }

    return (
        <div className="flex items-center space-x-8 p-8">
            {card ?
                <>
                    <img key={card.id} src={`http://localhost:8000${card.cardImage}`} className="w-[35%]" />
                    <div className="flex flex-col items-start">
                        <h3>{card.name}</h3>
                        <p>{card.cardText}</p>
                        {user && user.role === 'ADMIN' ? 
                            <>
                                <button onClick={handleDeleteClick}>Delete card</button>
                                <button>Update card</button>
                            </>: <></>}
                    </div>
                </>
                : <>Card could not be displayed</>}

        </div>
    )
}

export default ModalDetails;