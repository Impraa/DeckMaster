import { UserContext } from "@context/UserContext";
import useCallContext from "@hooks/useCallContext";
import { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IUser } from "../../../types/user";
import { fetchSingleUserAsync } from "@services/User";
import Link from "@components/Link";
import { DecklistContext } from "@context/DecklistContext";

const Profile = () => {
    const deckContext = useCallContext(DecklistContext);
    const userContext = useCallContext(UserContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [foundUser, setFoundUser] = useState<IUser | null>(null);
    
    useLayoutEffect(() => {
        if (deckContext && id && deckContext.decklists.length < 1) deckContext.fetchAllUserDecklists(+id);
    }, [deckContext])

    useLayoutEffect(() => {
        if (!id) return navigate('/');
        if (userContext && userContext.user) findUser(+id);
    }, [userContext])

    const findUser = async (id: number) => {
        if ( userContext!.user!.id !== +id)
        {
            const response = await fetchSingleUserAsync(id);
            console.log(response);
            if (!response.error) setFoundUser(response.data);
        }
        else
        {   
            setFoundUser(userContext!.user);    
        }
    }

    return (
        <div>
            {foundUser ? foundUser.username : ""}'s profile
            {userContext && id && userContext.user && userContext.user.id === +id ?
                (<div>
                    <Link URL={`/edit-profile/${userContext.user.id}`}>Edit profile</Link>
                </div>)
                : (<></>)}
            {deckContext && deckContext.decklists.length > 0 ?
                deckContext.decklists.map((decklist) => {
                    return (<Link URL={`/decklist/${decklist.id}`} key={decklist.id}> 
                        <h2>{ decklist.name }</h2>
                </Link>)
            }) : <p>There are no decklists associated with this user</p> }
        </div>
    )
}

export default Profile;