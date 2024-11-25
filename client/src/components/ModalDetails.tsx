import { CardContext } from "@context/CardContext";
import { UserContext } from "@context/UserContext";
import useCallContext from "@hooks/useCallContext";
import { Navigate } from "react-router-dom";

const ModalDetails = () => {

    const cardContext = useCallContext(CardContext);
    const userContext = useCallContext(UserContext);

    if (!cardContext || !userContext) return <Navigate to={'/'} />
    
    const { card } = cardContext;
    const { user } = userContext;

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
                                <button>Delete card</button>
                                <button>Update card</button>
                            </>: <></>}
                    </div>
                </>
                : <>Card could not be displayed</>}

        </div>
    )
}

export default ModalDetails;