import { UserContext } from "@context/UserContext";
import useCallContext from "@hooks/useCallContext";
import { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IUser } from "../../../types/user";
import { fetchSingleUserAsync } from "@services/User";
import Link from "@components/Link";
import { DecklistContext } from "@context/DecklistContext";
import DecklistCard from "@components/DecklistCard";

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
        <div className="flex justify-center w-full">
            <div className="flex flex-col space-y-4 w-[85dvw]">
                <h2 className="text-2xl self-start">{foundUser ? foundUser.username : ""}'s profile</h2>
                {userContext && id && userContext.user && userContext.user.id === +id ?
                    (<>
                        <Link URL={`/edit-profile/${userContext.user.id}`}>Edit profile</Link>
                    </>)
                    : (<></>)}
                {deckContext && deckContext.decklists.length > 0 ?
                    deckContext.decklists.map((decklist) => {
                        return (<DecklistCard key={decklist.id} decklist={decklist} link={`/decklist/${decklist.id}`} />)
                }) : <h2 className="text-lg font-semibold">There are no decklists associated with this user</h2> }
            </div>
        </div>
    )
}

export default Profile;