import CardPool from "@components/CardPool"
import { UserContext } from "@context/UserContext";
import useCallContext from "@hooks/useCallContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManageCards = () => {
    const userContext = useCallContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userContext || (userContext && userContext.user && userContext.user.role !== 'ADMIN')) return navigate('/');
    }, [])

    return (
        <div className="w-full">
            <CardPool/>
        </div>
    )
}

export default ManageCards;