import EditProfileForm from "@components/EditProfileForm";
import useUserContext from "@hooks/useUserContext";
import { Navigate, useParams } from "react-router-dom";

const EditProfile = () => {
    const userContext = useUserContext();
    const { id } = useParams();
    const { user, isLoading, setError, updateUser, error } = userContext;

    if (!id || isNaN(+id) || (!user && !isLoading && !setError)) return <Navigate to={'/'} />;
        
    return (
        <div className="flex items-center justify-center h-[65dvh]">
            <div>
                <h2 className="self-start font-bold text-2xl">Edit profile</h2>
                <EditProfileForm user={user} updateUser={updateUser} setError={setError} error={error} />
            </div>
        </div>
    );
}

export default EditProfile;