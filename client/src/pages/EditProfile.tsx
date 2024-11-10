import EditProfileForm from "@components/EditProfileForm";
import { UserContext } from "@context/UserContext";
import useCallContext from "@hooks/useCallContext";
import { Navigate, useParams } from "react-router-dom";

const EditProfile = () => {
    const userContext = useCallContext(UserContext);
    const { id } = useParams();

    if (!id || isNaN(+id) || !userContext || (!userContext.user && !userContext.isLoading) || userContext.error) return <Navigate to={'/'} />;
        
    return (
        <div>
            Edit profile
            <EditProfileForm user={userContext.user} updateUser={userContext.updateUser} />
        </div>
    );
}

export default EditProfile;