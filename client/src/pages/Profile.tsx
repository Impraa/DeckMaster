import { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IUser } from "../../../types/user";
import { fetchSingleUserAsync } from "@services/User";
import Link from "@components/Link";
import DecklistCard from "@components/DecklistCard";
import useDecklistContext from "@hooks/useDecklistContext";
import useUserContext from "@hooks/useUserContext";

const Profile = () => {
    const deckContext = useDecklistContext();
    const userContext = useUserContext();
    const navigate = useNavigate();
    const { id } = useParams();
    const [foundUser, setFoundUser] = useState<IUser | null>(null);
    
    const { decklists, fetchAllUserDecklists } = deckContext;
    const { user } = userContext;

    useLayoutEffect(() => {
        if (id && decklists.length < 1) fetchAllUserDecklists(+id);
    }, [id])

    useLayoutEffect(() => {
        if (!id) return navigate('/');
        if (user) findUser(+id);
    }, [id, user])

    const findUser = async (id: number) => {
        if (user && user.id !== +id)
        {
            const response = await fetchSingleUserAsync(id);
            if (!response.error) setFoundUser(response.data);
        }
        else setFoundUser(user);    
    }

    return (
        <div className="flex justify-center w-full">
            <div className="flex flex-col space-y-4 w-[85dvw]">
                <h2 className="text-2xl self-start">{foundUser ? foundUser.username : ""}'s profile</h2>
                {id && user && user.id === +id ?
                    (<>
                        <Link URL={`/edit-profile/${user.id}`}>Edit profile</Link>
                    </>)
                    : (<></>)}
                {decklists.length > 0 ?
                    decklists.map((decklist) => {
                        return (<DecklistCard key={decklist.id} decklist={decklist} link={`/decklist/${decklist.id}`} />)
                }) : <h2 className="text-lg font-semibold">There are no decklists associated with this user</h2> }
            </div>
        </div>
    )
}

export default Profile;