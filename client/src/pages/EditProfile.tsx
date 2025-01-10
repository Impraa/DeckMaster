import EditProfileForm from "@components/EditProfileForm";
import { UserContext } from "@context/UserContext";
import useCallContext from "@hooks/useCallContext";
import { Navigate, useParams } from "react-router-dom";

const EditProfile = () => {
    const userContext = useCallContext(UserContext);
    const { id } = useParams();

    if (!id || isNaN(+id) || !userContext || (!userContext.user && !userContext.isLoading && !userContext.setError)) return <Navigate to={'/'} />;
        
    return (
        <div className="flex items-center justify-center h-[65dvh]">
            <div>
                <h2 className="self-start font-bold text-2xl">Edit profile</h2>
                <EditProfileForm user={userContext.user} updateUser={userContext.updateUser} setError={userContext.setError} error={userContext.error} />
            </div>
        </div>
    );
}

export default EditProfile;