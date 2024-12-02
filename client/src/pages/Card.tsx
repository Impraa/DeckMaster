import CardForm from "@components/CardForm";
import { UserContext } from "@context/UserContext";
import useCallContext from "@hooks/useCallContext";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

const Card = () => {

    const userContext = useCallContext(UserContext);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (!userContext || (!userContext.user && !userContext.isLoading) ||
            userContext.error || (userContext.user && userContext.user.role !== 'ADMIN')) return navigate('/');
    }, [userContext, navigate])

    return (
        <div>
            Add Card
            <CardForm/>
        </div>
    )
}

export default Card;