import { UserContext } from "@context/UserContext";
import useCallContext from "@hooks/useCallContext";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { IUser } from "../../../types/user";
import { fetchSingleUserAsync } from "@services/User";
import Link from "@components/Link";

const Profile = () => {
    const userContext = useCallContext(UserContext);
    const { id } = useParams();
    const [foundUser, setFoundUser] = useState<IUser | null>(null);
    
    const findUser = async (id: number) => {
        const response = await fetchSingleUserAsync(id);
        console.log(response);
        if (!response.error) setFoundUser(response.data.user);
    }

    if (!id) return <Navigate to={'/'} />;
    if (userContext && userContext.user && userContext.user.id !== +id) findUser(+id);

    return (
        <div>
            Profile
            {userContext && userContext.user && userContext.user.id === +id ?
                (<div>
                    Your profile
                    <Link URL={`/edit-profile/${userContext.user.id}`}>Edit profile</Link>
                </div>)
                : (<></>)}
        </div>
    )
}

export default Profile;