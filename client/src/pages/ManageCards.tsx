import CardPool from "@components/CardPool"
import useUserContext from "@hooks/useUserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManageCards = () => {
    const userContext = useUserContext();
    const navigate = useNavigate();

    const { user } = userContext;

    useEffect(() => {
        if (user && user.role !== 'ADMIN') return navigate('/');
    }, [])

    return (
        <div className="w-full">
            <CardPool/>
        </div>
    )
}

export default ManageCards;