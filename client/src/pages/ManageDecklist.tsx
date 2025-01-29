import CardDetails from "@components/CardDetails";
import CardPool from "@components/CardPool";
import ChangableDecklist from "@components/ChangableDecklist";
import useUserContext from "@hooks/useUserContext";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManageDecklist = () => {
    const userContext = useUserContext();
    const navigate = useNavigate();

    const { user, isLoading, error } = userContext;

    useLayoutEffect(() => {
        if (!userContext || (!user && !isLoading) || error) return navigate('/login');
    }, [userContext, navigate])

    return(
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_2fr_1fr] px-5 pt-4 gap-x-2">
            <CardDetails />
            <ChangableDecklist />
            <CardPool />
        </div>
    )
}

export default ManageDecklist;