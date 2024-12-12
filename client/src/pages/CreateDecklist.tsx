import CardDetails from "@components/CardDetails";
import CardPool from "@components/CardPool";
import ChangableDecklist from "@components/ChangableDecklist";
import { UserContext } from "@context/UserContext";
import useCallContext from "@hooks/useCallContext";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateDecklist = () => {
    const userContext = useCallContext(UserContext);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (!userContext || (!userContext.user && !userContext.isLoading) || userContext.error) return navigate('/');
    }, [userContext, navigate])

    return(
        <div className="grid grid-cols-[1fr_2fr_1fr] px-5 pt-4 gap-x-2">
            <CardDetails />
            <ChangableDecklist />
            <CardPool />
        </div>
    )
}

export default CreateDecklist;