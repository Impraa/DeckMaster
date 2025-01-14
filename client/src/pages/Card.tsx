import CardForm from "@components/CardForm";
import { UserContext } from "@context/UserContext";
import useCallContext from "@hooks/useCallContext";
import { useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Card = () => {
    const { id } = useParams();
    const userContext = useCallContext(UserContext);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (!userContext || (!userContext.user && !userContext.isLoading) ||
            userContext.error || (userContext.user && userContext.user.role !== 'ADMIN')) return navigate('/');
    }, [userContext, navigate])

    return (
        <div className="flex items-center justify-center h-[85dvh]">
            <div className="flex flex-col">
                <h2 className="self-start font-bold text-2xl"> {id ? <>Update card</> : <>Add Card</>} </h2>
                <CardForm/>
            </div>
        </div>
    )
}

export default Card;