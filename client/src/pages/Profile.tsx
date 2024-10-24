import { UserContext } from "@context/UserContext";
import useCallContext from "@hooks/useCallContext";
import { Navigate, useParams } from "react-router-dom";

const Profile = () => {
    const userContext = useCallContext(UserContext);
    const { id } = useParams();
    
    if (!id) return <Navigate to={'/'} />;

    return (
        <div>
            Profile
            {userContext && userContext.user && userContext.user.id === +id ?
                (<div>Your profile</div>)
                : (<></>)}
        </div>
    )
}

export default Profile;