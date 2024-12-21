import ChangableDecklist from "@components/ChangableDecklist"
import Link from "@components/Link";
import { UserContext } from "@context/UserContext"
import useCallContext from "@hooks/useCallContext"
import { useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SingleDecklist = () => {
    const userContext = useCallContext(UserContext);
    const navigate = useNavigate();
    const { id } = useParams();

    useLayoutEffect(() => {
        if(!userContext || !id) return navigate('/')
    },[])

    return (
        <>
            <Link URL={`/manage-decklist/${id}`}>Edit deck</Link>
            <ChangableDecklist />
        </>
    )
}

export default SingleDecklist