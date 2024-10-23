import { UserContext } from "@context/UserContext";
import useCallContext from "@hooks/useCallContext";
import { Navigate, useParams } from "react-router-dom";

const EditProfile = () => {
    const userContext = useCallContext(UserContext);
    const { id } = useParams();
    
    if (!userContext || !userContext.user || !id || userContext.user.id !== +id) return <Navigate to={'/'} />;

    return (
        <div>
            Edit profile {id}
        </div>
    )
}

export default EditProfile;